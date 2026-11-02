"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { invitation as D } from "@/data/invitation";
import { FloralCluster, IconCalendar, IconPhone, IconPin } from "./ornaments";

function useViewport() {
  const [vp, setVp] = useState({ w: 390, h: 844 });
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return vp;
}

/** Half of the door artwork, drawn in real pixels so curves never stretch. */
function DoorArt({ W, H, mirror }: { W: number; H: number; mirror?: boolean }) {
  const L = Math.max(26, W * 0.14);
  const A = H * 0.1;
  const S = H * 0.3;
  const B = H - Math.max(40, H * 0.05);
  const arch = (k: number) => {
    const l = L + k, a = A + k * 1.3, s = S, b = B - k;
    return `M${l} ${b} L${l} ${s} C${l} ${s - (s - a) * 0.62} ${l + (W - l) * 0.28} ${a + (s - a) * 0.52} ${l + (W - l) * 0.62} ${a + (s - a) * 0.36} C${l + (W - l) * 0.86} ${a + (s - a) * 0.24} ${W - 3} ${a + (s - a) * 0.1} ${W} ${a} L${W} ${b} Z`;
  };
  const id = mirror ? "jR" : "jL";
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: "absolute", inset: 0, transform: mirror ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#e2b862" strokeOpacity=".28" strokeWidth="1.1">
            <rect x="13" y="13" width="18" height="18" />
            <rect x="13" y="13" width="18" height="18" transform="rotate(45 22 22)" />
            <circle cx="22" cy="22" r="3.5" />
            <path d="M0 22h6M38 22h6M22 0v6M22 38v6" />
          </g>
        </pattern>
        <linearGradient id={id + "g"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8e4a8" />
          <stop offset=".4" stopColor="#d9a94e" />
          <stop offset=".65" stopColor="#fff0c4" />
          <stop offset="1" stopColor="#a8741f" />
        </linearGradient>
      </defs>
      <rect x="12" y="12" width={W} height={H - 24} fill="none" stroke={`url(#${id}g)`} strokeWidth="1.5" opacity=".75" />
      <path d={arch(0)} fill={`url(#${id})`} />
      <path d={arch(0)} fill="none" stroke={`url(#${id}g)`} strokeWidth="2.5" />
      <path d={arch(11)} fill="none" stroke={`url(#${id}g)`} strokeWidth="1" opacity=".7" />
      {/* door handle */}
      <g transform={`translate(${W - 20} ${H * 0.72})`}>
        <circle r="9" fill="none" stroke={`url(#${id}g)`} strokeWidth="2.5" />
        <circle r="3" fill={`url(#${id}g)`} />
      </g>
    </svg>
  );
}

const AUTO_OPEN_AFTER = 12; // seconds – opens by itself if nobody taps

function TapHand() {
  return (
    <motion.svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="#fff8e6"
      stroke="#5a1426"
      strokeWidth="1.1"
      aria-hidden
      animate={{ scale: [1, 0.82, 1], y: [0, 3, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0v3.5c0 3.6-2.4 6.5-6 6.5h-.6a5 5 0 0 1-4-2l-3-4a1.5 1.5 0 0 1 2.3-1.9L9 14" />
    </motion.svg>
  );
}

export default function Cover({ onOpen, onDone }: { onOpen: (byTap: boolean) => void; onDone: () => void }) {
  const { w, h } = useViewport();
  const [opening, setOpening] = useState(false);
  const [left, setLeft] = useState(AUTO_OPEN_AFTER);
  const openingRef = useRef(false);
  const half = Math.ceil(w / 2) + 1;
  const seal = Math.round(Math.min(176, h * 0.21));
  const compact = h < 700;

  const open = (byTap: boolean) => {
    if (openingRef.current) return;
    openingRef.current = true;
    setOpening(true);
    onOpen(byTap); // a real tap also starts the music (browsers require a user gesture)
    window.setTimeout(onDone, 2300);
  };

  // gentle countdown – if a guest doesn't understand, the invitation opens by itself
  useEffect(() => {
    let s = AUTO_OPEN_AFTER;
    const id = window.setInterval(() => {
      s -= 1;
      setLeft(s);
      if (s <= 0) {
        window.clearInterval(id);
        open(false); // called from the timer, never from inside a state update
      }
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ease = [0.7, 0, 0.25, 1] as const;
  const nudge = { duration: 1.2, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" as const, delay: 1.5 };
  const w0 = D.weddings[0].en;
  const w1 = D.weddings[1].en;

  return (
    <div
      className="cover"
      onClick={() => open(true)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(true)}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
    >
      {/* light behind the doors */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(255,240,200,.95), rgba(233,196,111,.5) 25%, rgba(90,20,38,0) 65%)",
        }}
        initial={{ opacity: 0 }}
        animate={opening ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.8, times: [0, 0.35, 1], delay: 0.25 }}
      />

      <motion.div
        className="door door-left"
        animate={opening ? { rotateY: -100, x: -20 } : { rotateY: [0, -9, 0, -4, 0] }}
        transition={opening ? { duration: 1.7, ease, delay: 0.35 } : nudge}
      >
        <DoorArt W={half} H={h} />
        <FloralCluster className="absolute -left-6 -top-4" size={130} />
      </motion.div>
      <motion.div
        className="door door-right"
        animate={opening ? { rotateY: 100, x: 20 } : { rotateY: [0, 9, 0, 4, 0] }}
        transition={opening ? { duration: 1.7, ease, delay: 0.35 } : nudge}
      >
        <DoorArt W={half} H={h} mirror />
        <FloralCluster className="absolute -right-6 -bottom-4" size={130} flip />
      </motion.div>

      {/* light leaking through the gap between the doors */}
      <motion.div
        aria-hidden
        className="absolute top-0 bottom-0 left-1/2"
        style={{
          width: 6,
          x: "-50%",
          zIndex: 2,
          background: "linear-gradient(180deg, transparent, rgba(255,236,190,.95) 25%, #fff6dc 50%, rgba(255,236,190,.95) 75%, transparent)",
          filter: "blur(2.5px)",
          boxShadow: "0 0 30px 8px rgba(255,214,140,.45)",
        }}
        animate={opening ? { opacity: 0 } : { opacity: [0.25, 0.75, 0.25] }}
        transition={opening ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* soft dark backdrop so the text is easy to read */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(ellipse 95% 60% at 50% 58%, rgba(18,3,10,.82) 0%, rgba(18,3,10,.55) 45%, rgba(18,3,10,0) 80%)",
        }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-evenly px-4 text-center"
        style={{ zIndex: 4, paddingTop: "max(3vh, 14px)", paddingBottom: "max(3vh, 14px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={opening ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="ur gold-text" style={{ fontSize: compact ? 22 : 26, fontWeight: 700, lineHeight: 1.9 }}>
            {D.opening.ur.bismillah}
          </div>
          <div className="caps" style={{ fontSize: 12, letterSpacing: ".3em", color: "#fbe9b7", marginTop: -2 }}>
            Wedding Invitation
          </div>
        </motion.div>

        {/* Seal */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={opening ? { scale: 1.35, opacity: 0, rotate: 25 } : { scale: 1, opacity: 1 }}
          transition={opening ? { duration: 0.7, ease: "easeIn" } : { type: "spring", stiffness: 140, damping: 14, delay: 0.2 }}
        >
          <div className="relative grid place-items-center" style={{ width: seal, height: seal }}>
            <span className="pulse-ring absolute inset-0 rounded-full" style={{ border: "2px solid rgba(233,196,111,.7)" }} />
            <span className="pulse-ring absolute inset-0 rounded-full" style={{ border: "2px solid rgba(233,196,111,.5)", animationDelay: "1.1s" }} />
            <svg width={seal} height={seal} viewBox="-100 -100 200 200" className="absolute inset-0" aria-hidden>
              <defs>
                <radialGradient id="sealFill" cx=".4" cy=".35" r=".8">
                  <stop offset="0" stopColor="#7a1d35" />
                  <stop offset="1" stopColor="#2a0812" />
                </radialGradient>
              </defs>
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i / 24) * Math.PI * 2;
                return <circle key={i} cx={Math.cos(a) * 88} cy={Math.sin(a) * 88} r="11" fill="url(#gGold)" />;
              })}
              <circle r="88" fill="url(#gGold)" />
              <circle r="78" fill="url(#sealFill)" stroke="#f3d68f" strokeWidth="1.5" />
              <circle r="70" fill="none" stroke="#e9c46f" strokeWidth="1" strokeDasharray="2 5" />
            </svg>
            <div className="relative text-center" style={{ marginTop: -4 }}>
              <div className="ur gold-text" style={{ fontSize: seal * 0.15, fontWeight: 700, lineHeight: 1.75, whiteSpace: "nowrap" }}>
                {D.opening.ur.title}
              </div>
              <div className="script gold-text" style={{ fontSize: seal * 0.145, marginTop: -2, whiteSpace: "nowrap" }}>
                {D.opening.en.title}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Teaser: who & when */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={opening ? { opacity: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: opening ? 0 : 0.5 }}
        >
          <div className="script gold-text" style={{ fontSize: Math.min(26, w * 0.062), lineHeight: 1.3, whiteSpace: "nowrap" }}>
            {w0.groom} &amp; {w0.bride}
          </div>
          <div className="script gold-text" style={{ fontSize: Math.min(26, w * 0.062), lineHeight: 1.3, whiteSpace: "nowrap" }}>
            {w1.groom} &amp; {w1.bride}
          </div>
          <div className="caps" style={{ fontSize: 13, fontWeight: 700, color: "#fbe9b7", marginTop: 6, letterSpacing: ".18em" }}>
            10 · 11 · 12 November 2026
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={opening ? { opacity: 0, scale: 0.9 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: opening ? 0 : 0.8 }}
        >
          <div className="relative">
            <span className="pulse-ring absolute inset-0 rounded-full" style={{ border: "2px solid rgba(246,220,150,.8)" }} />
            <div
              className="relative flex items-center gap-3 overflow-hidden rounded-full"
              style={{
                padding: compact ? "12px 24px 12px 16px" : "14px 28px 14px 18px",
                background: "linear-gradient(100deg,#b98631,#f6dc96 45%,#c9973f)",
                boxShadow: "0 10px 34px rgba(233,196,111,.45), 0 0 0 1px #fff3cf inset",
              }}
            >
              <TapHand />
              <span className="caps" style={{ fontSize: compact ? 15 : 16, fontWeight: 700, color: "#2a0812", letterSpacing: ".1em", whiteSpace: "nowrap" }}>
                Tap to Open Invitation
              </span>
              {/* shine sweep */}
              <motion.span
                aria-hidden
                className="absolute top-0 bottom-0"
                style={{ width: 60, left: -80, background: "linear-gradient(100deg, transparent, rgba(255,255,255,.75), transparent)", transform: "skewX(-20deg)" }}
                animate={{ left: ["-30%", "130%"] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>
          <div className="ur" style={{ fontSize: compact ? 15 : 17, color: "#fbe9b7", lineHeight: 2, marginTop: 8 }}>
            دعوت نامہ کھولنے کے لیے ٹیپ کریں
          </div>
          <div style={{ fontSize: compact ? 14 : 15, color: "rgba(251,233,183,.9)", fontFamily: "'Noto Sans Devanagari', 'Kohinoor Devanagari', 'Mangal', sans-serif", marginTop: -2 }}>
            पूरा निमंत्रण देखने के लिए टैप करें
          </div>
        </motion.div>

        {/* What's inside */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={opening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.6, delay: opening ? 0 : 1.2 }}
        >
          <div className="caps" style={{ fontSize: 10.5, letterSpacing: ".28em", color: "rgba(251,233,183,.75)" }}>
            Inside the invitation
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {[
              { i: <IconCalendar s={14} />, t: "Dates" },
              { i: <span style={{ fontSize: 13 }}>♥</span>, t: "Valima" },
              { i: <IconPin s={14} />, t: "Location" },
              { i: <IconPhone s={14} />, t: "RSVP" },
            ].map((c) => (
              <span
                key={c.t}
                className="inline-flex items-center gap-1.5 rounded-full"
                style={{ padding: "4px 11px", border: "1px solid rgba(233,196,111,.6)", background: "rgba(36,7,15,.65)", color: "#fbe9b7", fontSize: 13 }}
              >
                <span style={{ color: "#ecc874", display: "inline-flex" }}>{c.i}</span>
                <span className="serif" style={{ fontWeight: 600 }}>
                  {c.t}
                </span>
              </span>
            ))}
          </div>
          {left <= 5 && left > 0 && !opening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="serif"
              style={{ fontSize: 13, color: "rgba(251,233,183,.8)", marginTop: 2 }}
            >
              Opening automatically in {left}…
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}