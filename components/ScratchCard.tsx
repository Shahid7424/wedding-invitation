"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { burstPetals } from "./Atmosphere";

/**
 * Gold-foil scratch card. Children are hidden underneath until ~45% is scratched.
 */
export default function ScratchCard({
  children,
  width = 270,
  height = 320,
  hint,
  onReveal,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
  hint: ReactNode;
  onReveal?: () => void;
}) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);
  const onRevealRef = useRef(onReveal);
  const touchedRef = useRef(false);
  useEffect(() => {
    onRevealRef.current = onReveal;
  });
  const radius = `${width / 2}px ${width / 2}px 26px 26px`;

  useEffect(() => {
    const c = cv.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = width * dpr;
    c.height = height * dpr;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    ctx.scale(dpr, dpr);

    const paint = () => {
      ctx.globalCompositeOperation = "source-over";
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#a8741f");
      g.addColorStop(0.22, "#e9c46f");
      g.addColorStop(0.4, "#fff3cf");
      g.addColorStop(0.58, "#d9a94e");
      g.addColorStop(0.8, "#f6dc96");
      g.addColorStop(1, "#b98631");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      // geometric emboss
      ctx.strokeStyle = "rgba(122,29,53,.18)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height + 40; y += 40) {
        for (let x = 0; x < width + 40; x += 40) {
          const ox = x + ((y / 40) % 2 ? 20 : 0);
          for (const r of [0, Math.PI / 4]) {
            ctx.save();
            ctx.translate(ox, y);
            ctx.rotate(r);
            ctx.strokeRect(-8, -8, 16, 16);
            ctx.restore();
          }
        }
      }
      // glitter
      for (let i = 0; i < 260; i++) {
        ctx.fillStyle = `rgba(255,255,240,${Math.random() * 0.7})`;
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.4, 0, 6.283);
        ctx.fill();
      }
      // label
      const fam = getComputedStyle(document.documentElement).getPropertyValue("--nf-script") || "cursive";
      ctx.fillStyle = "rgba(90,20,38,.85)";
      ctx.textAlign = "center";
      ctx.font = `44px ${fam}`;
      ctx.fillText("Scratch Here", width / 2, height / 2 + 6);
      ctx.font = `600 13px ${getComputedStyle(document.documentElement).getPropertyValue("--nf-caps") || "serif"}`;
      ctx.fillText("✦  ✦  ✦", width / 2, height / 2 + 36);
    };
    document.fonts.ready.then(paint);

    let drawing = false;
    let last: { x: number; y: number } | null = null;
    let moves = 0;
    let done = false;

    const pos = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * width, y: ((e.clientY - r.top) / r.height) * height };
    };
    const check = () => {
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 24) {
        total++;
        if (data[i] < 40) clear++;
      }
      if (!done && clear / total > 0.45) {
        done = true;
        setRevealed(true);
        burstPetals(90, 0.1);
        onRevealRef.current?.();
      }
    };
    const scratch = (p: { x: number; y: number }) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000";
      ctx.globalAlpha = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 46;
      ctx.beginPath();
      ctx.moveTo(last ? last.x : p.x, last ? last.y : p.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
      if (++moves % 6 === 0) check();
    };
    const down = (e: PointerEvent) => {
      drawing = true;
      last = null;
      touchedRef.current = true;
      setTouched(true);
      c.setPointerCapture(e.pointerId);
      scratch(pos(e));
    };
    const move = (e: PointerEvent) => drawing && scratch(pos(e));
    const up = () => {
      drawing = false;
      last = null;
      check();
    };
    // Auto-tour: when the tour arrives here and nobody has scratched yet, scratch it by itself
    let autoRaf = 0;
    const onArrive = (e: Event) => {
      if ((e as CustomEvent).detail !== "valima" || done || touchedRef.current) return;
      touchedRef.current = true;
      setTouched(true);
      const rows = 7;
      const t0 = performance.now();
      const dur = 1900;
      const at = (k: number) => {
        const f = k * rows;
        const row = Math.min(rows - 1, Math.floor(f));
        const u = f - row;
        const x = row % 2 ? width - 20 - u * (width - 40) : 20 + u * (width - 40);
        const y = 28 + (row + u) * ((height - 56) / rows);
        return { x, y };
      };
      last = at(0);
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "#000";
        ctx.globalAlpha = 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 64;
        const p = at(k);
        ctx.beginPath();
        ctx.moveTo(last!.x, last!.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        last = p;
        if (k < 1) autoRaf = requestAnimationFrame(step);
        else {
          last = null;
          check();
          if (!done) {
            done = true;
            setRevealed(true);
            burstPetals(90, 0.1);
            onRevealRef.current?.();
          }
        }
      };
      window.setTimeout(() => (autoRaf = requestAnimationFrame(step)), 700);
    };
    window.addEventListener("tour:arrive", onArrive);

    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(autoRaf);
      window.removeEventListener("tour:arrive", onArrive);
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
    };
  }, [width, height]);

  return (
    <div className="select-none">
    <div className="relative mx-auto" style={{ width, height, WebkitUserSelect: "none", userSelect: "none" }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: radius,
          border: "2px solid rgba(233,196,111,.9)",
          background: "linear-gradient(180deg, rgba(90,20,38,.9), rgba(36,7,15,.95))",
          boxShadow: "0 0 50px rgba(233,196,111,.22), inset 0 0 40px rgba(0,0,0,.4)",
        }}
      >
        <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
        <motion.canvas
          ref={cv}
          className="scratch-canvas absolute inset-0"
          style={{ width, height }}
          animate={revealed ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
          transition={{ duration: 0.8 }}
          aria-label="Scratch to reveal"
        />
      </div>
      <AnimatePresence>
        {!touched && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[62%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: ["-80%", "-20%", "-80%"], y: [0, -10, 0] }}
            exit={{ opacity: 0 }}
            transition={{ x: { duration: 1.8, repeat: Infinity }, y: { duration: 1.8, repeat: Infinity }, opacity: { duration: 0.4 } }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#fff8e6" stroke="#5a1426" strokeWidth="1" aria-hidden>
              <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0v3.5c0 3.6-2.4 6.5-6 6.5h-.6a5 5 0 0 1-4-2l-3-4a1.5 1.5 0 0 1 2.3-1.9L9 14" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      <div className="mt-4 text-center">{!revealed && hint}</div>
    </div>
  );
}
