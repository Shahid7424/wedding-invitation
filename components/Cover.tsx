"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { invitation as D } from "@/data/invitation";
import { FloralCluster } from "./ornaments";

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

export default function Cover({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const { w, h } = useViewport();
  const [opening, setOpening] = useState(false);
  const half = Math.ceil(w / 2) + 1;

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen(); // starts music inside the tap (browsers require a user gesture)
    window.setTimeout(onDone, 2300);
  };

  const ease = [0.7, 0, 0.25, 1] as const;

  return (
    <div className="cover" onClick={open} role="button" aria-label="Tap to open the invitation">
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
        animate={opening ? { rotateY: -100, x: -20 } : { rotateY: 0 }}
        transition={{ duration: 1.7, ease, delay: 0.35 }}
      >
        <DoorArt W={half} H={h} />
        <FloralCluster className="absolute -left-6 -top-4" size={140} />
      </motion.div>
      <motion.div
        className="door door-right"
        animate={opening ? { rotateY: 100, x: 20 } : { rotateY: 0 }}
        transition={{ duration: 1.7, ease, delay: 0.35 }}
      >
        <DoorArt W={half} H={h} mirror />
        <FloralCluster className="absolute -right-6 -bottom-4" size={140} flip />
      </motion.div>

      {/* Top text */}
      <motion.div
        className="absolute left-0 right-0 text-center"
        style={{ top: h * 0.155, zIndex: 3 }}
        animate={opening ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6 }}
      >
        <div className="ur gold-text" style={{ fontSize: 26, fontWeight: 700 }}>
          {D.opening.ur.bismillah}
        </div>
      </motion.div>

      {/* Seal */}
      <AnimatePresence>
        <motion.div
          className="absolute"
          style={{ left: "50%", top: "50%", zIndex: 4, x: "-50%", y: "-50%" }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={opening ? { scale: 1.35, opacity: 0, rotate: 25 } : { scale: 1, opacity: 1 }}
          transition={opening ? { duration: 0.7, ease: "easeIn" } : { type: "spring", stiffness: 140, damping: 14, delay: 0.2 }}
        >
          <div className="relative grid place-items-center" style={{ width: 186, height: 186 }}>
            <span className="pulse-ring absolute inset-0 rounded-full" style={{ border: "2px solid rgba(233,196,111,.7)" }} />
            <span className="pulse-ring absolute inset-0 rounded-full" style={{ border: "2px solid rgba(233,196,111,.5)", animationDelay: "1.1s" }} />
            <svg width="186" height="186" viewBox="-100 -100 200 200" className="absolute inset-0" aria-hidden>
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
            <div className="relative text-center" style={{ marginTop: -6 }}>
              <div className="ur gold-text" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.75, whiteSpace: "nowrap" }}>
                {D.opening.ur.title}
              </div>
              <div className="script gold-text" style={{ fontSize: 27, marginTop: -2, whiteSpace: "nowrap" }}>
                {D.opening.en.title}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom text */}
      <motion.div
        className="absolute left-0 right-0 text-center"
        style={{ top: h * 0.5 + 118, zIndex: 3 }}
        initial={{ opacity: 0 }}
        animate={opening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: opening ? 0 : 0.8 }}
      >
        <div className="caps gold glow-pulse" style={{ fontSize: 14, fontWeight: 700 }}>
          Tap to Open
        </div>
      </motion.div>
    </div>
  );
}
