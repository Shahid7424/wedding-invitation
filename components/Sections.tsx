"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { invitation as D, type Lang } from "@/data/invitation";
import { calendarLinks, telLink, whatsappLink, shareText } from "@/lib/links";
import CoupleIllustration, { PALETTES } from "./CoupleIllustration";
import ScratchCard from "./ScratchCard";
import {
  ArchCard,
  Divider,
  FloralCluster,
  IconCalendar,
  IconChevron,
  IconClock,
  IconPhone,
  IconPin,
  IconShare,
  IconWhatsApp,
  Reveal,
  RingsIcon,
  Rosette,
  WriteOn,
} from "./ornaments";

const nameSize = "clamp(36px, 11vw, 50px)";

/* ─────────────────────────── HERO ─────────────────────────── */
export function Hero({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section className="section" style={{ paddingTop: 34 }}>
      <FloralCluster className="pointer-events-none absolute -left-10 -top-2" size={150} />

      <div className="relative text-center">
        <Reveal>
          <div className="ur gold-text" style={{ fontSize: 30, fontWeight: 700 }}>
            {D.opening.ur.bismillah}
          </div>
        </Reveal>
        {en && (
          <Reveal delay={0.15}>
            <p className="ital soft mx-auto" style={{ fontSize: 19, marginTop: -6, maxWidth: 300, lineHeight: 1.35 }}>
              {D.opening.en.bismillah}
            </p>
          </Reveal>
        )}
      </div>

      <ArchCard>
        <WriteOn rtl delay={0.3}>
          <div className="ur gold-text" style={{ fontSize: "clamp(46px, 14vw, 60px)", fontWeight: 700, lineHeight: 2, whiteSpace: "nowrap" }}>
            {D.opening.ur.title}
          </div>
        </WriteOn>
        {en && (
          <WriteOn delay={0.8}>
            <div className="script gold-text" style={{ fontSize: 54, marginTop: -18 }}>
              {D.opening.en.title}
            </div>
          </WriteOn>
        )}
        <Divider />
        <Reveal>
          <div className="ur gold-text" style={{ fontSize: 27, fontWeight: 700 }}>
            {D.opening.ur.occasion}
          </div>
        </Reveal>

        {en ? (
          <>
            <Reveal delay={0.1}>
              <div className="caps" style={{ fontSize: 18, marginTop: 6 }}>
                {D.hosts.en.prefix}
              </div>
            </Reveal>
            <WriteOn delay={0.2}>
              <div className="script gold-text" style={{ fontSize: nameSize }}>
                {D.hosts.en.name}
              </div>
            </WriteOn>
            <Reveal delay={0.3}>
              <p className="serif" style={{ fontSize: 20, lineHeight: 1.45, marginTop: 8 }}>
                Request the pleasure of your company on auspicious occasion of the{" "}
                <span className="ital gold" style={{ fontSize: 22 }}>
                  Marriage ceremony
                </span>{" "}
                of Their Sons
              </p>
            </Reveal>
          </>
        ) : (
          <>
            <Reveal delay={0.1}>
              <div className="ur soft" style={{ fontSize: 20 }}>
                {D.hosts.ur.prefix}
              </div>
            </Reveal>
            <WriteOn rtl delay={0.2}>
              <div className="ur gold-text" style={{ fontSize: 36, fontWeight: 700 }}>
                {D.hosts.ur.name}
              </div>
            </WriteOn>
          </>
        )}

        <Divider width={160} />
        <Reveal delay={0.1}>
          <div className="ur soft" style={{ fontSize: 19, lineHeight: 2.3 }}>
            {D.opening.couplet.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
        </Reveal>
      </ArchCard>

      <div className="mt-8 flex flex-col items-center gap-1 text-center">
        <span className="caps soft" style={{ fontSize: 11 }}>
          Scroll
        </span>
        <span className="chev gold">
          <IconChevron s={26} />
        </span>
      </div>
    </section>
  );
}

/* ─────────────────────────── COUPLE ─────────────────────────── */
export function Couple({ lang, index }: { lang: Lang; index: 0 | 1 }) {
  const w = D.weddings[index];
  const en = lang === "en";
  return (
    <section className="section" id={w.id}>
      <div className="text-center">
        <Reveal>
          <span className="pill">
            <span className="gold">
              <IconCalendar s={18} />
            </span>
            {en ? (
              <span className="serif gold-text" style={{ fontSize: 19, fontWeight: 600 }}>
                {w.en.dateLine}
              </span>
            ) : (
              <span className="ur gold-text" style={{ fontSize: 18, lineHeight: 1.9 }}>
                {w.ur.dateLine}
              </span>
            )}
          </span>
        </Reveal>
        {en && (
          <Reveal delay={0.15}>
            <div className="ur gold" style={{ fontSize: 17, marginTop: 4 }}>
              {w.ur.dateLine}
            </div>
          </Reveal>
        )}
      </div>

      <ArchCard>
        <div style={{ margin: "-6px -12px 0" }}>
          <CoupleIllustration palette={PALETTES[index]} />
        </div>

        {en ? (
          <>
            <WriteOn delay={0.1}>
              <div className="script gold-text" style={{ fontSize: nameSize, marginTop: 6 }}>
                {w.en.groom}
              </div>
            </WriteOn>
            <Reveal delay={0.2}>
              <p className="ital" style={{ fontSize: 20 }}>
                {w.en.groomParent}
              </p>
            </Reveal>
          </>
        ) : (
          <>
            <Reveal>
              <div className="ur soft" style={{ fontSize: 16 }}>
                {w.ur.groomTitle}
              </div>
            </Reveal>
            <WriteOn rtl delay={0.1}>
              <div className="ur gold-text" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.9 }}>
                {w.ur.groom}
              </div>
            </WriteOn>
            <Reveal delay={0.2}>
              <p className="ur" style={{ fontSize: 18 }}>
                {w.ur.groomParent}
              </p>
            </Reveal>
          </>
        )}

        <div className="my-2 flex flex-col items-center">
          <RingsIcon size={92} />
          <Reveal delay={0.4}>
            <span className={en ? "ital soft" : "ur soft"} style={{ fontSize: en ? 18 : 17 }}>
              ({en ? w.en.weds : w.ur.weds})
            </span>
          </Reveal>
        </div>

        {en ? (
          <>
            <WriteOn delay={0.1}>
              <div className="script gold-text" style={{ fontSize: nameSize }}>
                {w.en.bride}
              </div>
            </WriteOn>
            <Reveal delay={0.2}>
              <p className="serif" style={{ fontSize: 20 }}>
                {w.en.brideParent}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="serif soft" style={{ fontSize: 18, lineHeight: 1.4 }}>
                {w.en.brideAddress.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </Reveal>
          </>
        ) : (
          <>
            <Reveal>
              <div className="ur soft" style={{ fontSize: 16 }}>
                {w.ur.brideTitle}
              </div>
            </Reveal>
            <WriteOn rtl delay={0.1}>
              <div className="ur gold-text" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.9 }}>
                {w.ur.bride}
              </div>
            </WriteOn>
            <Reveal delay={0.2}>
              <p className="ur" style={{ fontSize: 18 }}>
                {w.ur.brideParent}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="ur soft" style={{ fontSize: 17 }}>
                {w.ur.brideAddress.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </Reveal>
          </>
        )}
      </ArchCard>
    </section>
  );
}

/* ─────────────────────────── SAVE THE DATE (calendar) ─────────────────────────── */
const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MARKED: Record<number, number> = { 10: 0, 11: 1, 12: 2 };

export function SaveTheDate({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const offset = new Date(2026, 10, 1).getDay(); // 1 Nov 2026
  const cells = [...Array(offset).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)];
  const legend = [
    { d: 10, label: en ? `${D.weddings[0].en.groom} & ${D.weddings[0].en.bride}` : `${D.weddings[0].ur.groom} و ${D.weddings[0].ur.bride}` },
    { d: 11, label: en ? `${D.weddings[1].en.groom} & ${D.weddings[1].en.bride}` : `${D.weddings[1].ur.groom} و ${D.weddings[1].ur.bride}` },
    { d: 12, label: en ? D.valima.en.title : D.valima.ur.title },
  ];
  return (
    <section className="section text-center">
      <Reveal>
        <h2 className="script gold-text" style={{ fontSize: 56 }}>
          Save the Date
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div
          className="mx-auto mt-3 rounded-[22px] px-4 pb-5 pt-4"
          style={{
            maxWidth: 380,
            border: "1.5px solid rgba(233,196,111,.7)",
            background: "linear-gradient(180deg, rgba(90,20,38,.55), rgba(36,7,15,.7))",
            boxShadow: "0 18px 50px rgba(0,0,0,.35), inset 0 0 30px rgba(233,196,111,.06)",
          }}
        >
          <div className="caps gold-text" style={{ fontSize: 22, fontWeight: 700 }}>
            {D.weddings[0].en.monthYear}
          </div>
          <div className="cal-grid mt-3">
            {WEEK.map((d) => (
              <div key={d} className="caps soft" style={{ fontSize: 10.5, letterSpacing: ".08em" }}>
                {d}
              </div>
            ))}
            {cells.map((n, i) => {
              const k = n ? MARKED[n] : undefined;
              return (
                <motion.div
                  key={i}
                  className="cal-day"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.012 }}
                >
                  {n && k !== undefined ? (
                    <>
                      <motion.svg
                        className="absolute"
                        width="44"
                        height="42"
                        viewBox="0 0 24 23"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: [0, 1.35, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + k * 0.45, duration: 0.6 }}
                        aria-hidden
                      >
                        <path
                          d="M12 21.5C7 17.6 1.5 13.6 1.5 8.1 1.5 4.8 4 2.3 7.1 2.3c2 0 3.8 1.1 4.9 2.8 1.1-1.7 2.9-2.8 4.9-2.8 3.1 0 5.6 2.5 5.6 5.8 0 5.5-5.5 9.5-10.5 13.4z"
                          fill={k === 2 ? "url(#gGold)" : "#b8324f"}
                          stroke="#f3d68f"
                          strokeWidth=".8"
                        />
                      </motion.svg>
                      <span className="relative" style={{ color: k === 2 ? "#3a0a17" : "#fff", fontWeight: 600, fontSize: 15, marginTop: -2 }}>
                        {n}
                      </span>
                    </>
                  ) : (
                    n
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="mt-4 space-y-2 text-left">
            {legend.map((l, i) => (
              <Reveal key={l.d} delay={0.2 + i * 0.12}>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
                    style={{
                      background: i === 2 ? "linear-gradient(135deg,#f6dc96,#c9973f)" : "#b8324f",
                      color: i === 2 ? "#3a0a17" : "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                      border: "1px solid #f3d68f",
                    }}
                  >
                    {l.d}
                  </span>
                  <span className={en ? "serif" : "ur"} style={{ fontSize: en ? 17 : 16, lineHeight: en ? 1.25 : 1.9 }}>
                    {l.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────── VALIMA (scratch to reveal) ─────────────────────────── */
export function Valima({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const [shown, setShown] = useState(false);
  return (
    <section className="section text-center">
      <Reveal>
        <span className={en ? "pill-fill" : "pill-fill ur"} style={{ fontSize: en ? 15 : 18, letterSpacing: en ? undefined : 0 }}>
          {en ? D.valima.en.label.toUpperCase() : D.valima.ur.label}
        </span>
      </Reveal>
      {en ? (
        <>
          <Reveal delay={0.1}>
            <p className="ital" style={{ fontSize: 22, marginTop: 14 }}>
              {D.valima.en.insha}
            </p>
          </Reveal>
          <WriteOn delay={0.2}>
            <div className="script gold-text" style={{ fontSize: "clamp(42px, 12vw, 56px)", marginTop: -4 }}>
              {D.valima.en.title}
            </div>
          </WriteOn>
          <Reveal delay={0.3}>
            <div className="ur gold" style={{ fontSize: 20 }}>
              {D.valima.ur.insha} {D.valima.ur.title}
            </div>
          </Reveal>
        </>
      ) : (
        <WriteOn rtl delay={0.2}>
          <div className="ur gold-text" style={{ fontSize: 38, fontWeight: 700, marginTop: 10 }}>
            {D.valima.ur.insha} {D.valima.ur.title}
          </div>
        </WriteOn>
      )}

      <div className="mt-6">
        <ScratchCard
          onReveal={() => setShown(true)}
          hint={
            <span className="script gold-text" style={{ fontSize: 30 }}>
              Scratch to Reveal
            </span>
          }
        >
          <div className="px-5">
            <div className="gold mx-auto mb-1 flex justify-center">
              <IconCalendar s={26} />
            </div>
            {en ? (
              <>
                <div className="caps" style={{ fontSize: 16 }}>
                  {D.valima.en.day}
                </div>
                <div className="caps gold-text" style={{ fontSize: 78, fontWeight: 700, lineHeight: 1 }}>
                  {D.valima.en.dayNum}
                </div>
                <div className="caps" style={{ fontSize: 16, marginTop: 2 }}>
                  {D.valima.en.monthYear}
                </div>
                <div className="mx-auto my-3 h-px w-24" style={{ background: "rgba(233,196,111,.6)" }} />
                <div className="flex items-center justify-center gap-2">
                  <span className="gold">
                    <IconClock s={20} />
                  </span>
                  <span className="serif" style={{ fontSize: 22, fontWeight: 600 }}>
                    {D.valima.en.time}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="ur gold-text" style={{ fontSize: 26, fontWeight: 700 }}>
                  {D.valima.ur.dateLine}
                </div>
                <div className="mx-auto my-2 h-px w-24" style={{ background: "rgba(233,196,111,.6)" }} />
                <div className="ur" style={{ fontSize: 24 }}>
                  {D.valima.ur.time}
                </div>
              </>
            )}
          </div>
        </ScratchCard>
      </div>

      <AnimatePresence>
        {shown && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-5">
            <p className={en ? "serif soft" : "ur soft"} style={{ fontSize: 18 }}>
              {en ? `${D.valima.en.dateLine} · ${D.valima.en.time}` : `${D.valima.ur.dateLine}، ${D.valima.ur.time}`}
            </p>
            <a className={`btn btn-gold mt-3 ${en ? "" : "ur-btn"}`} href={calendarLinks.valima} target="_blank" rel="noreferrer">
              <IconCalendar s={18} /> {en ? "Save the Date" : "کیلنڈر میں محفوظ کریں"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────── COUNTDOWN ─────────────────────────── */
function useCountdown(targetISO: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const target = Date.parse(targetISO);
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetISO]);
  if (left === null) return null;
  const s = Math.floor(left / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

function Tile({ v, label, ur }: { v: number | null; label: string; ur?: boolean }) {
  const txt = v === null ? "--" : String(v).padStart(2, "0");
  return (
    <div className="tile text-center">
      <div className="relative h-[44px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={txt}
            className="caps gold-text absolute inset-x-0"
            style={{ fontSize: 34, fontWeight: 700, lineHeight: "44px", letterSpacing: ".04em" }}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {txt}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={ur ? "ur soft" : "caps soft"} style={{ fontSize: ur ? 13 : 10, lineHeight: ur ? 1.8 : 1.6 }}>
        {label}
      </div>
    </div>
  );
}

export function Countdown({ lang }: { lang: Lang }) {
  const c = useCountdown(D.valima.startISO);
  const en = lang === "en";
  const labels = en ? ["Days", "Hours", "Minutes", "Seconds"] : ["دن", "گھنٹے", "منٹ", "سیکنڈ"];
  return (
    <section className="section text-center">
      <Reveal>
        <h2 className="script gold-text" style={{ fontSize: 46 }}>
          Counting down to
        </h2>
        <div className={en ? "caps" : "ur gold"} style={{ fontSize: en ? 17 : 22, marginTop: en ? -2 : -8 }}>
          {en ? D.valima.en.title : D.valima.ur.title}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mx-auto mt-5 grid max-w-[380px] grid-cols-4 gap-2.5" dir="ltr">
          <Tile v={c?.d ?? null} label={labels[0]} ur={!en} />
          <Tile v={c?.h ?? null} label={labels[1]} ur={!en} />
          <Tile v={c?.m ?? null} label={labels[2]} ur={!en} />
          <Tile v={c?.s ?? null} label={labels[3]} ur={!en} />
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────── TIMELINE ─────────────────────────── */
export function Timeline({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const items = [
    {
      date: en ? D.weddings[0].en.dateLine : D.weddings[0].ur.dateLine,
      a: en ? D.weddings[0].en.groom : D.weddings[0].ur.groom,
      b: en ? D.weddings[0].en.bride : D.weddings[0].ur.bride,
      cal: calendarLinks["shahid-tarannum"],
    },
    {
      date: en ? D.weddings[1].en.dateLine : D.weddings[1].ur.dateLine,
      a: en ? D.weddings[1].en.groom : D.weddings[1].ur.groom,
      b: en ? D.weddings[1].en.bride : D.weddings[1].ur.bride,
      cal: calendarLinks["irfan-afsana"],
    },
    {
      date: en ? `${D.valima.en.dateLine} · ${D.valima.en.time}` : `${D.valima.ur.dateLine}، ${D.valima.ur.time}`,
      a: en ? `${D.valima.en.insha} ${D.valima.en.title}` : `${D.valima.ur.insha} ${D.valima.ur.title}`,
      b: null as string | null,
      cal: calendarLinks.valima,
    },
  ];
  return (
    <section className="section">
      <Reveal className="text-center">
        <h2 className="script gold-text" style={{ fontSize: 50 }}>
          Celebrations
        </h2>
      </Reveal>
      <div className="relative mx-auto mt-6 max-w-[400px] pl-12 pr-2" dir={en ? "ltr" : "rtl"} style={en ? {} : { paddingLeft: 8, paddingRight: 48 }}>
        <motion.div
          className="absolute top-2 bottom-2 w-[2px] origin-top"
          style={{ [en ? "left" : "right"]: 20, background: "linear-gradient(180deg,#f3d68f,#a8741f)" } as React.CSSProperties}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {items.map((it, i) => (
          <Reveal key={i} delay={0.25 + i * 0.25} className="relative mb-7">
            <span
              className="absolute top-1 grid h-9 w-9 place-items-center rounded-full"
              style={{
                [en ? "left" : "right"]: -46,
                background: "radial-gradient(circle at 35% 35%,#7a1d35,#2a0812)",
                border: "2px solid #e9c46f",
                boxShadow: "0 0 16px rgba(233,196,111,.35)",
              } as React.CSSProperties}
            >
              <span className="caps gold-text" style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0 }}>
                {10 + i}
              </span>
            </span>
            <div className={en ? "caps gold" : "ur gold"} style={{ fontSize: en ? 12.5 : 16, lineHeight: en ? 1.5 : 2 }}>
              {it.date}
            </div>
            {it.b ? (
              <div className={en ? "script gold-text" : "ur gold-text"} style={{ fontSize: en ? 31 : 23, fontWeight: en ? 400 : 700, lineHeight: en ? 1.2 : 1.9 }}>
                <div>{it.a}</div>
                <div className={en ? "ital soft" : "ur soft"} style={{ fontSize: en ? 15 : 14, fontWeight: 400, lineHeight: en ? 1.4 : 1.8 }}>
                  ({en ? "Wed's" : "ہمراہ"})
                </div>
                <div>{it.b}</div>
              </div>
            ) : (
              <div className={en ? "script gold-text" : "ur gold-text"} style={{ fontSize: en ? 31 : 23, fontWeight: en ? 400 : 700, lineHeight: en ? 1.2 : 1.9 }}>
                {it.a}
              </div>
            )}
            <a href={it.cal} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 soft" style={{ fontSize: 14 }}>
              <span className="gold">
                <IconCalendar s={15} />
              </span>
              <span className={en ? "serif underline decoration-dotted underline-offset-4" : "ur"}>
                {en ? "Add to Calendar" : "کیلنڈر میں شامل کریں"}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── VENUE ─────────────────────────── */
function MapArt() {
  return (
    <svg viewBox="0 0 300 150" width="100%" style={{ display: "block" }} aria-hidden>
      <rect width="300" height="150" rx="16" fill="#2a0812" />
      <g stroke="rgba(233,196,111,.18)" strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={"v" + i} d={`M${i * 32 + 6} 0 V150`} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={"h" + i} d={`M0 ${i * 32 + 10} H300`} />
        ))}
      </g>
      <path d="M-10 118 C60 96 90 120 150 92 S250 40 310 52" stroke="rgba(233,196,111,.55)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M-10 118 C60 96 90 120 150 92 S250 40 310 52" stroke="#2a0812" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
      <path d="M70 -10 C80 40 120 70 150 92 S170 140 180 160" stroke="rgba(233,196,111,.35)" strokeWidth="4" fill="none" />
      <circle cx="40" cy="40" r="14" fill="rgba(95,115,82,.45)" />
      <circle cx="250" cy="115" r="18" fill="rgba(95,115,82,.4)" />
      <circle cx="215" cy="28" r="10" fill="rgba(95,115,82,.4)" />
      <g transform="translate(150 92)">
        <circle r="10" fill="none" stroke="#e9c46f" strokeWidth="2" className="pulse-ring" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        <motion.g initial={{ y: -60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}>
          <path d="M0 0 C-4 -8 -14 -16 -14 -26 A14 14 0 0 1 14 -26 C14 -16 4 -8 0 0Z" fill="url(#gGold)" stroke="#fff3cf" strokeWidth="1" />
          <circle cy="-26" r="5" fill="#2a0812" />
        </motion.g>
      </g>
    </svg>
  );
}

export function Venue({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section className="section">
      <ArchCard>
        <Reveal>
          {en ? (
            <span className="pill caps" style={{ fontSize: 14 }}>
              {D.venue.en.label}
            </span>
          ) : (
            <span className="pill ur" style={{ fontSize: 17, lineHeight: 1.8 }}>
              {D.venue.ur.label}
            </span>
          )}
        </Reveal>
        {en && (
          <Reveal delay={0.1}>
            <p className="ital soft" style={{ fontSize: 17, marginTop: 6 }}>
              {D.venue.en.labelFull}
            </p>
          </Reveal>
        )}
        {en ? (
          <WriteOn delay={0.2}>
            <div className="script gold-text" style={{ fontSize: nameSize }}>
              {D.venue.en.name}
            </div>
          </WriteOn>
        ) : (
          <WriteOn rtl delay={0.2}>
            <div className="ur gold-text" style={{ fontSize: 34, fontWeight: 700 }}>
              {D.venue.ur.name}
            </div>
          </WriteOn>
        )}
        <Reveal delay={0.3}>
          <p className={en ? "serif" : "ur"} style={{ fontSize: en ? 19 : 18, lineHeight: en ? 1.4 : 2 }}>
            {(en ? D.venue.en.address : D.venue.ur.address).map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <a href={D.venue.mapUrl} target="_blank" rel="noreferrer" className="mt-5 block overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(233,196,111,.6)" }}>
            <MapArt />
          </a>
        </Reveal>
        <Reveal delay={0.45}>
          <a className={`btn btn-gold mt-5 ${en ? "" : "ur-btn"}`} href={D.venue.mapUrl} target="_blank" rel="noreferrer">
            <IconPin s={18} /> {en ? "Open in Google Maps" : "گوگل میپ پر دیکھیں"}
          </a>
        </Reveal>
      </ArchCard>
    </section>
  );
}

/* ─────────────────────────── RSVP ─────────────────────────── */
export function Rsvp({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const names = en ? D.rsvp.en.names : D.rsvp.ur.names;
  return (
    <section className="section text-center">
      <Reveal>
        <h2 className="caps gold-text" style={{ fontSize: 36, fontWeight: 700, letterSpacing: ".22em" }}>
          {D.rsvp.en.label}
        </h2>
        <div className="ur gold" style={{ fontSize: 22, marginTop: -4 }}>
          {D.rsvp.ur.label}
        </div>
      </Reveal>
      <div className="mx-auto mt-4 grid max-w-[380px] grid-cols-2 gap-2.5" dir={en ? "ltr" : "rtl"}>
        {names.map((n, i) => (
          <motion.div
            key={n}
            className="rounded-full px-3 py-2"
            style={{ border: "1px solid rgba(233,196,111,.55)", background: "rgba(40,8,18,.5)" }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 180, damping: 16 }}
          >
            <span className={en ? "serif" : "ur"} style={{ fontSize: en ? 18 : 16, fontWeight: 600, lineHeight: en ? 1.3 : 1.8 }}>
              {n}
            </span>
          </motion.div>
        ))}
      </div>
      <Reveal delay={0.4}>
        <p className={en ? "ital gold" : "ur gold"} style={{ fontSize: en ? 21 : 18, marginTop: 14 }}>
          {en ? D.rsvp.en.family : D.rsvp.ur.family}
        </p>
      </Reveal>
      <Reveal delay={0.5}>
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="gold">
            <IconPhone s={18} />
          </span>
          <span className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: ".04em" }}>
            Mob: {D.rsvp.phoneDisplay}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a className={`btn btn-ghost ${en ? "" : "ur-btn"}`} href={telLink}>
            <IconPhone s={18} /> {en ? "Call" : "کال کریں"}
          </a>
          <a className={`btn btn-gold ${en ? "" : "ur-btn"}`} href={whatsappLink} target="_blank" rel="noreferrer">
            <IconWhatsApp s={19} /> WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
export function Footer({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const share = async () => {
    const url = window.location.href.split("#")[0];
    const text = shareText(url);
    if (navigator.share) {
      try {
        await navigator.share({ title: "Dawat Nama", text });
        return;
      } catch {
        /* user closed the sheet */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };
  return (
    <footer className="section relative pb-28 text-center">
      <FloralCluster className="pointer-events-none absolute -left-8 top-6" size={110} />
      <FloralCluster className="pointer-events-none absolute -right-8 top-6" size={110} flip />
      <div className="flex justify-center">
        <Rosette size={58} />
      </div>
      <Divider width={200} />
      <Reveal>
        <div className="ur gold-text" style={{ fontSize: 24, fontWeight: 700, lineHeight: 2.2 }}>
          {D.hosts.ur.request}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="ur soft" style={{ fontSize: 18 }}>
          {D.hosts.ur.prefix}
        </div>
        {en ? (
          <>
            <div className="caps" style={{ fontSize: 15, marginTop: 2 }}>
              {D.hosts.en.prefix}
            </div>
            <div className="script gold-text" style={{ fontSize: "clamp(36px, 11vw, 46px)" }}>
              {D.hosts.en.name}
            </div>
          </>
        ) : (
          <div className="ur gold-text" style={{ fontSize: 30, fontWeight: 700 }}>
            {D.hosts.ur.name}
          </div>
        )}
      </Reveal>
      <Reveal delay={0.3}>
        <button onClick={share} className={`btn btn-ghost mt-6 ${en ? "" : "ur-btn"}`}>
          <IconShare s={18} /> {en ? "Share Invitation" : "دعوت نامہ شیئر کریں"}
        </button>
      </Reveal>
    </footer>
  );
}
