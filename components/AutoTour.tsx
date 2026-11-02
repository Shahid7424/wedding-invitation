"use client";

/**
 * Auto-scroll "tour" through the invitation, section by section.
 *  - Plays by itself after the doors open.
 *  - Any touch / scroll / wheel pauses it immediately, so guests can read or go anywhere.
 *  - When they let go and stop scrolling for RESUME_MS, it continues from where they are.
 *  - "Sections" menu jumps straight to any part; the tour then continues from there.
 */

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { invitation as D, type Lang } from "@/data/invitation";
import { IconMusicOff } from "./ornaments";

export const RESUME_MS = 4000;
const PAN_SPEED = 46; // px per second while reading a tall section

export type TourMode = "idle" | "playing" | "paused" | "off" | "done";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const easeSine = (k: number) => -(Math.cos(Math.PI * k) - 1) / 2;

const sectionsInDom = () => Array.from(document.querySelectorAll<HTMLElement>("[data-tour]"));
const absTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

export function useAutoTour() {
  const [mode, setModeState] = useState<TourMode>("idle");
  const [resumeP, setResumeP] = useState(0);
  const [index, setIndex] = useState(0);
  const modeRef = useRef<TourMode>("idle");
  const r = useRef({ raf: 0, timer: 0, token: 0, lastProg: 0, lastInput: 0, lastGesture: -1e9, touching: false });

  const setMode = (m: TourMode) => {
    modeRef.current = m;
    setModeState(m);
  };

  const stopMotion = () => {
    r.current.token++;
    cancelAnimationFrame(r.current.raf);
    window.clearTimeout(r.current.timer);
  };

  const scrollToY = (y: number) => {
    r.current.lastProg = performance.now();
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  };

  const animateTo = (target: number, ms: number, token: number, ease = easeInOut) =>
    new Promise<boolean>((resolve) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const to = clamp(target, 0, Math.max(0, max));
      const from = window.scrollY;
      if (Math.abs(to - from) < 2) return resolve(token === r.current.token);
      const t0 = performance.now();
      const step = (now: number) => {
        if (token !== r.current.token) return resolve(false);
        const k = Math.min(1, (now - t0) / ms);
        scrollToY(from + (to - from) * ease(k));
        if (k < 1) r.current.raf = requestAnimationFrame(step);
        else resolve(true);
      };
      r.current.raf = requestAnimationFrame(step);
    });

  const wait = (ms: number, token: number) =>
    new Promise<boolean>((resolve) => {
      r.current.timer = window.setTimeout(() => resolve(token === r.current.token), ms);
    });

  /** Play from section `start`. If `inside`, we are already within that section – just finish reading it. */
  const run = useCallback(async (start: number, inside = false) => {
    stopMotion();
    const token = r.current.token;
    setMode("playing");
    setResumeP(0);
    const list = sectionsInDom();
    for (let i = start; i < list.length; i++) {
      const el = list[i];
      setIndex(i);
      const V = window.innerHeight;
      const top = absTop(el);
      const h = el.offsetHeight;
      const tall = h > V * 0.98;
      const dwell = Number(el.dataset.dwell || 4800);

      if (!(inside && i === start)) {
        const target = tall ? top : top - (V - h) / 2;
        const dist = Math.abs(target - window.scrollY);
        if (!(await animateTo(target, clamp(dist * 0.85, 700, 1700), token))) return;
        window.dispatchEvent(new CustomEvent("tour:arrive", { detail: el.dataset.tour }));
        if (!(await wait(tall ? 2400 : dwell, token))) return;
      }
      if (tall) {
        const end = absTop(el) + el.offsetHeight - window.innerHeight;
        const dist = end - window.scrollY;
        if (dist > 4) {
          if (!(await animateTo(end, Math.max(1800, (dist / PAN_SPEED) * 1000), token, easeSine))) return;
          if (!(await wait(2300, token))) return;
        }
      }
    }
    setMode("done");
  }, []);

  /** Continue from wherever the guest left the page. */
  const resumeHere = useCallback(() => {
    const list = sectionsInDom();
    if (!list.length) return;
    const V = window.innerHeight;
    const y = window.scrollY;
    let i = 0;
    list.forEach((el, k) => {
      if (absTop(el) <= y + V * 0.4) i = k;
    });
    const el = list[i];
    const bottom = absTop(el) + el.offsetHeight;
    if (bottom > y + V + 30) run(i, true);
    else if (i + 1 < list.length) run(i + 1);
    else setMode("done");
  }, [run]);

  const pause = useCallback(() => {
    r.current.lastInput = performance.now();
    r.current.lastGesture = performance.now();
    const m = modeRef.current;
    if (m === "playing") {
      stopMotion();
      setMode("paused");
    }
  }, []);

  // user input → pause
  useEffect(() => {
    const ignore = (t: EventTarget | null) => t instanceof Element && !!t.closest("[data-tour-ignore]");
    const onTouchStart = (e: TouchEvent) => {
      if (ignore(e.target)) return;
      r.current.touching = true;
      pause();
    };
    const onTouchEnd = () => {
      r.current.touching = false;
      r.current.lastInput = performance.now();
      r.current.lastGesture = performance.now();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !ignore(e.target)) pause();
    };
    const onWheel = () => pause();
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) pause();
    };
    const onScroll = () => {
      const now = performance.now();
      // ignore our own scrolling and browser layout adjustments –
      // only a scroll that follows a real finger / wheel / key (incl. momentum) counts
      if (now - r.current.lastProg < 160) return;
      if (r.current.touching || now - r.current.lastGesture < 2500) pause();
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pause]);

  // paused → count down → resume
  useEffect(() => {
    const id = window.setInterval(() => {
      if (modeRef.current !== "paused") return;
      if (r.current.touching) {
        setResumeP(0);
        return;
      }
      const p = (performance.now() - r.current.lastInput) / RESUME_MS;
      setResumeP(clamp(p, 0, 1));
      if (p >= 1) resumeHere();
    }, 150);
    return () => window.clearInterval(id);
  }, [resumeHere]);

  useEffect(() => () => stopMotion(), []);

  const start = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("off");
      return;
    }
    run(0);
  }, [run]);

  /** Dock button */
  const toggle = useCallback(() => {
    const m = modeRef.current;
    if (m === "playing") {
      stopMotion();
      setMode("off");
    } else if (m === "done") {
      stopMotion();
      const token = r.current.token;
      setMode("playing");
      animateTo(0, 1600, token).then((ok) => {
        if (ok) run(0);
      });
    } else {
      resumeHere();
    }
  }, [run, resumeHere]);

  /** Sections menu */
  const jumpTo = useCallback((key: string) => {
    const el = document.querySelector<HTMLElement>(`[data-tour="${key}"]`);
    if (!el) return;
    stopMotion();
    const token = r.current.token;
    const V = window.innerHeight;
    const h = el.offsetHeight;
    const target = h > V ? absTop(el) : absTop(el) - (V - h) / 2;
    const list = sectionsInDom();
    setIndex(list.indexOf(el));
    const keepOff = modeRef.current === "off";
    if (!keepOff) setMode("paused");
    r.current.lastInput = performance.now();
    animateTo(target, clamp(Math.abs(target - window.scrollY) * 0.6, 700, 1500), token).then(() => {
      // give a little extra reading time after a jump
      r.current.lastInput = performance.now() + 2000;
      window.dispatchEvent(new CustomEvent("tour:arrive", { detail: key }));
    });
  }, []);

  return { mode, resumeP, index, start, toggle, jumpTo };
}

/* ───────────────────────── UI ───────────────────────── */

export const TOUR_SECTIONS = (lang: Lang) => {
  const en = lang === "en";
  const [a, b] = D.weddings;
  return [
    { key: "hero", label: en ? "Dawat Nama" : D.opening.ur.title, sub: en ? `${D.hosts.en.prefix} ${D.hosts.en.name}` : D.hosts.ur.name },
    { key: a.id, label: en ? `${a.en.groom} & ${a.en.bride}` : `${a.ur.groom} و ${a.ur.bride}`, sub: en ? a.en.dateLine : a.ur.dateLine },
    { key: b.id, label: en ? `${b.en.groom} & ${b.en.bride}` : `${b.ur.groom} و ${b.ur.bride}`, sub: en ? b.en.dateLine : b.ur.dateLine },
    { key: "calendar", label: en ? "Save the Date" : "تاریخیں", sub: en ? "10 · 11 · 12 November 2026" : "۱۰، ۱۱ اور ۱۲ نومبر ۲۰۲۶ء" },
    { key: "valima", label: en ? D.valima.en.title : D.valima.ur.title, sub: en ? `${D.valima.en.dateLine} · ${D.valima.en.time}` : `${D.valima.ur.dateLine}، ${D.valima.ur.time}` },
    { key: "countdown", label: en ? "Countdown" : "الٹی گنتی", sub: en ? D.valima.en.title : D.valima.ur.title },
    { key: "timeline", label: en ? "Celebrations" : "پروگرام", sub: en ? "10, 11 & 12 November" : "۱۰، ۱۱ اور ۱۲ نومبر" },
    { key: "venue", label: en ? "Location & Map" : "مقام اور نقشہ", sub: en ? D.venue.en.address.join(" ") : D.venue.ur.address.join(" ") },
    { key: "rsvp", label: en ? "R.S.V.P." : D.rsvp.ur.label, sub: `Mob: ${D.rsvp.phoneDisplay}` },
    { key: "footer", label: en ? "Share Invitation" : "شیئر کریں", sub: en ? `${D.hosts.en.prefix} ${D.hosts.en.name}` : D.hosts.ur.name },
  ];
};

function Ring({ p }: { p: number }) {
  const C = 2 * Math.PI * 19;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0" aria-hidden>
      <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(233,196,111,.25)" strokeWidth="2.5" />
      <circle
        cx="22"
        cy="22"
        r="19"
        fill="none"
        stroke="#f3d68f"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - p)}
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
);
const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <rect x="5.5" y="4" width="4.5" height="16" rx="1.2" />
    <rect x="14" y="4" width="4.5" height="16" rx="1.2" />
  </svg>
);
const ReplayIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </svg>
);
const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1.3" fill="currentColor" />
    <circle cx="4.5" cy="12" r="1.3" fill="currentColor" />
    <circle cx="4.5" cy="18" r="1.3" fill="currentColor" />
  </svg>
);

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? window.scrollY / max : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0" style={{ height: 3, zIndex: 65, background: "rgba(233,196,111,.12)" }} aria-hidden>
      <div style={{ height: "100%", width: `${p * 100}%`, background: "linear-gradient(90deg,#a8741f,#f6dc96,#e9c46f)", boxShadow: "0 0 10px rgba(246,220,150,.7)" }} />
    </div>
  );
}

export function TourDock({
  lang,
  mode,
  resumeP,
  index,
  onToggle,
  onJump,
  musicOn,
  onMusic,
}: {
  lang: Lang;
  mode: TourMode;
  resumeP: number;
  index: number;
  onToggle: () => void;
  onJump: (key: string) => void;
  musicOn: boolean;
  onMusic: () => void;
}) {
  const en = lang === "en";
  const [menu, setMenu] = useState(false);
  const [hint, setHint] = useState<null | "auto" | "paused">(null);
  const shownAuto = useRef(false);
  const shownPause = useRef(false);
  const items = TOUR_SECTIONS(lang);

  // one-time hints so guests understand what is happening
  useEffect(() => {
    let t = 0;
    if (mode === "playing" && !shownAuto.current) {
      shownAuto.current = true;
      setHint("auto");
      t = window.setTimeout(() => setHint(null), 4200);
    } else if (mode === "paused" && !shownPause.current) {
      shownPause.current = true;
      setHint("paused");
      t = window.setTimeout(() => setHint(null), 3800);
    }
    return () => window.clearTimeout(t);
  }, [mode]);

  const autoLabel = en
    ? { playing: "Pause", paused: "Resuming", off: "Auto Play", done: "Replay", idle: "Auto Play" }[mode]
    : { playing: "روکیں", paused: "جاری", off: "خودکار", done: "دوبارہ", idle: "خودکار" }[mode];

  const labelCls = en ? "caps" : "ur";
  const labelStyle = en
    ? { fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em" }
    : { fontSize: 14, fontWeight: 700, lineHeight: 1.7 };

  return (
    <>
      {/* hint toast */}
      <AnimatePresence>
        {hint && (
          <motion.div
            key={hint}
            data-tour-ignore
            className="fixed left-1/2 z-[66] w-max max-w-[92vw] rounded-full px-4 py-2 text-center"
            style={{
              top: 62,
              x: "-50%",
              background: "rgba(36,7,15,.9)",
              border: "1px solid rgba(233,196,111,.7)",
              boxShadow: "0 8px 26px rgba(0,0,0,.45)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <span className={en ? "serif" : "ur"} style={{ fontSize: en ? 15 : 14, color: "#fbe9b7", fontWeight: 600, lineHeight: en ? 1.3 : 1.8 }}>
              {hint === "auto"
                ? en
                  ? "✦ Auto-scrolling · touch the screen anytime to stop"
                  : "✦ خودکار اسکرول · روکنے کے لیے اسکرین کو چھوئیں"
                : en
                  ? "Paused · it will continue by itself in a few seconds"
                  : "رکا ہوا · چند سیکنڈ میں خود جاری ہوگا"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* dock */}
      <motion.div
        data-tour-ignore
        className="fixed left-1/2 z-[60] flex items-center gap-1.5 rounded-full p-1.5"
        style={{
          bottom: "calc(14px + env(safe-area-inset-bottom))",
          x: "-50%",
          background: "rgba(30,6,13,.86)",
          border: "1.5px solid rgba(233,196,111,.8)",
          boxShadow: "0 10px 30px rgba(0,0,0,.5), 0 0 22px rgba(233,196,111,.15)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <button
          onClick={onToggle}
          className="flex items-center gap-2 rounded-full py-1 pr-4 pl-1"
          style={{
            background: mode === "playing" ? "linear-gradient(100deg,#b98631,#f6dc96 45%,#c9973f)" : "rgba(233,196,111,.12)",
            color: mode === "playing" ? "#2a0812" : "#fbe9b7",
          }}
          aria-label={autoLabel}
        >
          <span className="relative grid h-11 w-11 place-items-center">
            {mode === "paused" && <Ring p={resumeP} />}
            {mode === "playing" ? <PauseIcon /> : mode === "done" ? <ReplayIcon /> : <PlayIcon />}
          </span>
          <span className={labelCls} style={labelStyle}>
            {autoLabel}
          </span>
        </button>

        <button
          onClick={() => setMenu(true)}
          className="flex h-11 items-center gap-2 rounded-full px-4"
          style={{ background: "rgba(233,196,111,.12)", color: "#fbe9b7" }}
          aria-label="Sections"
        >
          <ListIcon />
          <span className={labelCls} style={labelStyle}>
            {en ? "Sections" : "فہرست"}
          </span>
        </button>

        <button
          onClick={onMusic}
          className="grid h-11 w-11 place-items-center rounded-full"
          style={{ background: "rgba(233,196,111,.12)", color: "#fbe9b7" }}
          aria-label={musicOn ? "Pause music" : "Play music"}
        >
          {musicOn ? (
            <span className="eq flex h-5 items-end gap-[3px]">
              <span />
              <span />
              <span />
              <span />
            </span>
          ) : (
            <IconMusicOff s={20} />
          )}
        </button>
      </motion.div>

      {/* sections sheet */}
      <AnimatePresence>
        {menu && (
          <motion.div data-tour-ignore className="fixed inset-0 z-[75]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0" style={{ background: "rgba(10,2,6,.6)" }} onClick={() => setMenu(false)} />
            <motion.div
              className="absolute bottom-0 left-1/2 w-full max-w-[470px] overflow-y-auto rounded-t-[26px] px-4 pt-3"
              style={{
                x: "-50%",
                maxHeight: "78vh",
                paddingBottom: "calc(18px + env(safe-area-inset-bottom))",
                background: "linear-gradient(180deg,#3c0c1c,#1c0510)",
                borderTop: "1.5px solid rgba(233,196,111,.8)",
                boxShadow: "0 -20px 50px rgba(0,0,0,.5)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              dir={en ? "ltr" : "rtl"}
            >
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full" style={{ background: "rgba(233,196,111,.5)" }} />
              <div className="mb-2 flex items-center justify-between">
                <span className={en ? "script gold-text" : "ur gold-text"} style={{ fontSize: en ? 34 : 24, fontWeight: en ? 400 : 700 }}>
                  {en ? "Sections" : "فہرست"}
                </span>
                <button onClick={() => setMenu(false)} className="grid h-10 w-10 place-items-center rounded-full" style={{ color: "#fbe9b7", border: "1px solid rgba(233,196,111,.5)" }} aria-label="Close">
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                {items.map((it, i) => (
                  <button
                    key={it.key}
                    onClick={() => {
                      setMenu(false);
                      onJump(it.key);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5"
                    style={{
                      textAlign: en ? "left" : "right",
                      background: i === index ? "rgba(233,196,111,.16)" : "rgba(255,233,220,.04)",
                      border: `1px solid ${i === index ? "rgba(233,196,111,.85)" : "rgba(233,196,111,.25)"}`,
                    }}
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full caps"
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: 0,
                        color: i === index ? "#2a0812" : "#fbe9b7",
                        background: i === index ? "linear-gradient(135deg,#f6dc96,#c9973f)" : "rgba(233,196,111,.12)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate ${en ? "serif" : "ur"}`} style={{ fontSize: en ? 18 : 16, fontWeight: 600, color: "#f7e8e1", lineHeight: en ? 1.25 : 1.9 }}>
                        {it.label}
                      </span>
                      <span className={`block truncate ${en ? "serif" : "ur"}`} style={{ fontSize: en ? 13.5 : 12.5, color: "rgba(247,232,225,.65)", lineHeight: en ? 1.3 : 1.8 }}>
                        {it.sub}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
