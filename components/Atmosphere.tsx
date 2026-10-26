"use client";

import { useEffect, useRef } from "react";

/** Fire a burst of rose petals from anywhere: burstPetals(60) */
export function burstPetals(count = 60, originY = -0.05) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("petals:burst", { detail: { count, originY } }));
}

/* Gold bokeh particles + slow drifting geometric pattern (fixed behind content) */
export function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0, h = 0, dpr = 1, raf = 0, running = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = w < 600 ? 34 : 60;
    const parts = Array.from({ length: N }, (_, i) => {
      const big = i < 6;
      return {
        x: Math.random(),
        y: Math.random(),
        r: big ? 14 + Math.random() * 26 : 1.2 + Math.random() * 3.6,
        sp: big ? 0.004 + Math.random() * 0.006 : 0.008 + Math.random() * 0.02,
        ph: Math.random() * 6.28,
        sw: 8 + Math.random() * 22,
        tw: 0.6 + Math.random() * 1.6,
        a: big ? 0.05 + Math.random() * 0.06 : 0.25 + Math.random() * 0.5,
        pink: Math.random() < (big ? 0.5 : 0.18),
      };
    });

    const draw = (ms: number) => {
      const t = ms / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        const y = (((p.y - p.sp * t) % 1) + 1) % 1;
        const px = p.x * w + Math.sin(t * 0.5 + p.ph) * p.sw;
        const py = y * (h + 80) - 40;
        const a = p.a * (0.55 + 0.45 * Math.sin(t * p.tw + p.ph));
        const col = p.pink ? "255,182,190" : "255,214,140";
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        g.addColorStop(0, `rgba(${col},${a})`);
        g.addColorStop(0.6, `rgba(${col},${a * 0.45})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, 6.283);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      if (running && !reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const vis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <>
      <div className="bg-layer" />
      <div className="bg-pattern" />
      <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} aria-hidden />
      <div className="bg-vignette" />
    </>
  );
}

/* Falling rose petals: a few drift all the time, bursts on special moments */
export function Petals() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0, h = 0, dpr = 1, raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type P = { x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; flip: number; vf: number; hue: number; life: number };
    const petals: P[] = [];
    const COLORS = [
      ["#fbe2dd", "#e7a1ab"],
      ["#f7d3d2", "#d98f99"],
      ["#b8324f", "#7a1d35"],
      ["#f6dc96", "#c9973f"],
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (burst: boolean, originY = -0.05) => {
      petals.push({
        x: burst ? w * (0.15 + Math.random() * 0.7) : Math.random() * w,
        y: burst ? h * originY - Math.random() * h * 0.25 : -20,
        vx: (Math.random() - 0.5) * (burst ? 2.2 : 0.6),
        vy: burst ? 1.2 + Math.random() * 2.2 : 0.6 + Math.random() * 0.8,
        r: 6 + Math.random() * 8,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.06,
        flip: Math.random() * 6.28,
        vf: 0.03 + Math.random() * 0.05,
        hue: Math.floor(Math.random() * COLORS.length),
        life: 1,
      });
    };

    const onBurst = (e: Event) => {
      if (reduce) return;
      const { count = 60, originY = -0.05 } = (e as CustomEvent).detail || {};
      for (let i = 0; i < count; i++) spawn(true, originY);
    };
    window.addEventListener("petals:burst", onBurst);

    let last = 0;
    const draw = (ms: number) => {
      const dt = Math.min(2.5, (ms - last) / 16.67 || 1);
      last = ms;
      ctx.clearRect(0, 0, w, h);
      if (!reduce && petals.length < 9 && Math.random() < 0.02 * dt) spawn(false);
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.flip += p.vf * dt;
        p.rot += p.vr * dt;
        p.x += (p.vx + Math.sin(p.flip * 0.7) * 0.6) * dt;
        p.y += p.vy * dt;
        p.vx *= 0.995;
        if (p.y > h + 30) {
          petals.splice(i, 1);
          continue;
        }
        const [c1, c2] = COLORS[p.hue];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(Math.cos(p.flip), 1);
        const g = ctx.createLinearGradient(0, -p.r, 0, p.r);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.92;
        ctx.beginPath();
        ctx.moveTo(0, -p.r);
        ctx.bezierCurveTo(p.r * 0.9, -p.r * 0.6, p.r * 0.7, p.r * 0.7, 0, p.r);
        ctx.bezierCurveTo(-p.r * 0.7, p.r * 0.7, -p.r * 0.9, -p.r * 0.6, 0, -p.r);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("petals:burst", onBurst);
    };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none" }} aria-hidden />;
}
