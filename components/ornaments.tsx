"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/* Shared SVG definitions (gradients, flowers). Rendered once on the page. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8e4a8" />
          <stop offset=".35" stopColor="#d9a94e" />
          <stop offset=".6" stopColor="#fff0c4" />
          <stop offset="1" stopColor="#a8741f" />
        </linearGradient>
        <linearGradient id="gGoldH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e2b862" stopOpacity="0" />
          <stop offset=".5" stopColor="#f3d68f" />
          <stop offset="1" stopColor="#e2b862" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="gPetal" cx=".5" cy=".95" r=".95">
          <stop offset="0" stopColor="#fff6f1" />
          <stop offset=".45" stopColor="#f7d3d2" />
          <stop offset="1" stopColor="#d98f99" />
        </radialGradient>
        <radialGradient id="gPetal2" cx=".5" cy=".95" r=".9">
          <stop offset="0" stopColor="#fffaf6" />
          <stop offset=".6" stopColor="#fbe2dd" />
          <stop offset="1" stopColor="#eab0b6" />
        </radialGradient>
        <radialGradient id="gCenter" cx=".4" cy=".4" r=".7">
          <stop offset="0" stopColor="#fff2c2" />
          <stop offset="1" stopColor="#c48f35" />
        </radialGradient>
        <linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5f7352" />
          <stop offset="1" stopColor="#a5b58e" />
        </linearGradient>
        <path id="petal5" d="M0 0 C -38 -16, -48 -64, -18 -86 C -8 -93, 8 -93, 18 -86 C 48 -64, 38 -16, 0 0Z" fill="url(#gPetal)" stroke="#c9808b" strokeWidth="1.2" strokeOpacity=".6" />
        <path id="petalIn" d="M0 0 C -26 -10, -32 -42, -10 -56 C -4 -60, 4 -60, 10 -56 C 32 -42, 26 -10, 0 0Z" fill="url(#gPetal2)" stroke="#d4949d" strokeWidth="1" strokeOpacity=".5" />
        <g id="blossom">
          {[0, 72, 144, 216, 288].map((r) => (
            <use key={r} href="#petal5" transform={`rotate(${r})`} />
          ))}
          {[36, 108, 180, 252, 324].map((r) => (
            <use key={r} href="#petalIn" transform={`rotate(${r})`} />
          ))}
          <circle r="17" fill="url(#gCenter)" />
          <g fill="#b07a2a">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              return <circle key={i} cx={Math.round(Math.cos(a) * 24)} cy={Math.round(Math.sin(a) * 24)} r="3" />;
            })}
          </g>
        </g>
        <g id="leaf">
          <path d="M0 0 C 26 -18, 70 -20, 110 0 C 70 20, 26 18, 0 0Z" fill="url(#gLeaf)" />
          <path d="M4 0 L104 0" stroke="#4d5e42" strokeWidth="1.5" opacity=".6" />
        </g>
        <g id="bud">
          <path d="M0 0 C -14 -10, -12 -34, 0 -44 C 12 -34, 14 -10, 0 0Z" fill="url(#gPetal)" stroke="#c9808b" strokeOpacity=".5" />
          <path d="M0 0 C -8 -6,-12 -14,-14 -20 M0 0 C 8 -6, 12 -14, 14 -20" stroke="#6f8460" strokeWidth="3" fill="none" />
        </g>
        <filter id="fSoft" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000" floodOpacity=".45" />
        </filter>
        <filter id="fGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

type FloraItem = { k: "f" | "l" | "b"; x: number; y: number; r: number; s: number };

const CLUSTER: FloraItem[] = [
  { k: "l", x: 100, y: 120, r: -150, s: 1.0 },
  { k: "l", x: 170, y: 70, r: -20, s: 0.9 },
  { k: "l", x: 60, y: 190, r: 95, s: 0.85 },
  { k: "l", x: 200, y: 150, r: 25, s: 0.7 },
  { k: "b", x: 260, y: 95, r: 70, s: 0.9 },
  { k: "b", x: 40, y: 270, r: 170, s: 0.8 },
  { k: "f", x: 80, y: 90, r: 0, s: 1.0 },
  { k: "f", x: 185, y: 45, r: 20, s: 0.62 },
  { k: "f", x: 40, y: 205, r: -15, s: 0.6 },
  { k: "f", x: 165, y: 150, r: 40, s: 0.42 },
];

/** Corner flower cluster (blush roses like the printed card). */
export function FloralCluster({
  className,
  flip = false,
  delay = 0,
  size = 170,
}: {
  className?: string;
  flip?: boolean;
  delay?: number;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.05}
      viewBox="0 0 300 315"
      style={{ transform: flip ? "scale(-1,-1)" : undefined, overflow: "visible" }}
      aria-hidden
    >
      <g filter="url(#fSoft)">
        {CLUSTER.map((it, i) => (
          <g key={i} transform={`translate(${it.x} ${it.y}) rotate(${it.r})`}>
            <motion.g
              initial={{ scale: 0, rotate: it.k === "f" ? -60 : 0 }}
              whileInView={{ scale: it.s, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: delay + i * 0.05 }}
            >
              <g className={it.k === "f" ? "" : "sway"} style={{ animationDelay: `${-i * 0.7}s` }}>
                <use href={it.k === "f" ? "#blossom" : it.k === "l" ? "#leaf" : "#bud"} />
              </g>
            </motion.g>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Divider({ width = 220 }: { width?: number }) {
  return (
    <motion.svg
      className="divider"
      style={{ width }}
      viewBox="0 0 220 22"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      aria-hidden
    >
      <rect x="0" y="10" width="220" height="1.6" fill="url(#gGoldH)" />
      <path d="M110 2 L119 11 L110 20 L101 11Z" fill="#2a0812" stroke="#e9c46f" strokeWidth="1.6" />
      <circle cx="86" cy="11" r="2.4" fill="#e9c46f" />
      <circle cx="134" cy="11" r="2.4" fill="#e9c46f" />
    </motion.svg>
  );
}

export function Rosette({ size = 44, spin = true }: { size?: number; spin?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" aria-hidden>
      <circle r="46" fill="#2a0812" stroke="url(#gGold)" strokeWidth="4" />
      <g className={spin ? "spin-slow" : ""} fill="none" stroke="url(#gGold)" strokeWidth="3">
        <rect x="-24" y="-24" width="48" height="48" />
        <rect x="-24" y="-24" width="48" height="48" transform="rotate(45)" />
      </g>
      <circle r="8" fill="url(#gGold)" />
    </svg>
  );
}

export function RingsIcon({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.56} viewBox="0 0 170 96" aria-hidden style={{ filter: "drop-shadow(0 0 8px rgba(233,196,111,.45))" }}>
      {[64, 106].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="56"
          r="32"
          fill="none"
          stroke="url(#gGold)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.25, ease: "easeInOut" }}
        />
      ))}
      <motion.path
        d="M106 6 L116 16 L106 28 L96 16Z"
        fill="#fff3cf"
        stroke="#d9a94e"
        strokeWidth="2"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3, type: "spring" }}
      />
    </svg>
  );
}

/* Arch-shaped frame (Mughal mehrab). The crown is drawn on view. */
export function ArchCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const outer =
    "M1 92 L1 74 C1 44 70 36 136 26 C170 20 194 12 200 1 C206 12 230 20 264 26 C330 36 399 44 399 74 L399 92";
  const inner =
    "M10 92 L10 77 C10 52 76 44 138 34.5 C172 29 194 22 200 13 C206 22 228 29 262 34.5 C324 44 390 52 390 77 L390 92";
  return (
    <div className={`arch-card ${className}`}>
      <svg className="arch-crown" viewBox="0 0 400 92" preserveAspectRatio="none" aria-hidden>
        <path d={outer + " Z"} fill="rgba(255,233,220,0.06)" stroke="none" />
        <motion.path
          d={outer}
          fill="none"
          stroke="rgba(233,196,111,0.9)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.path
          d={inner}
          fill="none"
          stroke="rgba(233,196,111,0.55)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
        />
      </svg>
      <div className="arch-body">
        <div className="finial">
          <Rosette size={44} />
        </div>
        {children}
      </div>
    </div>
  );
}

/* Fade-up on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "span" | "h2" | "h3";
}) {
  const C = motion[as];
  return (
    <C
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </C>
  );
}

/* Masked left→right (or right→left for Urdu) write-on reveal, for script names */
export function WriteOn({
  children,
  className,
  delay = 0,
  rtl = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  rtl?: boolean;
}) {
  const dir = rtl ? "270deg" : "90deg";
  const from = rtl ? "0%" : "100%";
  const to = rtl ? "100%" : "0%";
  return (
    <motion.div
      className={className}
      initial={{ "--mx": from, opacity: 0 }}
      whileInView={{ "--mx": to, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.3, delay, ease: "easeInOut", opacity: { duration: 0.3, delay } }}
      style={{
        WebkitMaskImage: `linear-gradient(${dir}, #000 40%, transparent 60%)`,
        maskImage: `linear-gradient(${dir}, #000 40%, transparent 60%)`,
        WebkitMaskPosition: "var(--mx) 0%",
        maskPosition: "var(--mx) 0%",
        WebkitMaskSize: "260% 100%",
        maskSize: "260% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ───────── Icons ───────── */
const ic = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconCalendar = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...ic} aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
    <path d="M12 13.2c.9-1.4 3.2-1 3.2.8 0 1.5-2 2.6-3.2 3.6-1.2-1-3.2-2.1-3.2-3.6 0-1.8 2.3-2.2 3.2-.8z" fill="currentColor" stroke="none" />
  </svg>
);
export const IconClock = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...ic} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
export const IconPin = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...ic} aria-hidden>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.6" />
  </svg>
);
export const IconPhone = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...ic} aria-hidden>
    <path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a2 2 0 0 1-2 2C10.6 21 3 13.4 3 5.5a2 2 0 0 1 2-2z" />
  </svg>
);
export const IconWhatsApp = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <path d="M12 2.2A9.7 9.7 0 0 0 3.7 16.9L2.4 21.6l4.8-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.1 1.7 2.6 4.1 3.7 1.5.6 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.4z" />
  </svg>
);
export const IconShare = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...ic} aria-hidden>
    <circle cx="18" cy="5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="19" r="2.6" />
    <path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" />
  </svg>
);
export const IconMusicOff = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...ic} aria-hidden>
    <path d="M9 18V6l10-2v10" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="14" r="2.5" />
    <path d="M3 3l18 18" />
  </svg>
);
export const IconChevron = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...ic} aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
