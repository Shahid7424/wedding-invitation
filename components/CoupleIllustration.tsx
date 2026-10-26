"use client";

import { motion } from "motion/react";

export type CouplePalette = {
  lehenga: string;
  lehengaDark: string;
  dupatta: string;
  coat: string;
  coatTrim: string;
  stole: string;
  turban: string;
};

export const PALETTES: CouplePalette[] = [
  // Couple 1 – bride in classic maroon, groom in ivory sherwani
  { lehenga: "#8e1b33", lehengaDark: "#5e0f22", dupatta: "#b02a47", coat: "#f3e6d2", coatTrim: "#d9a94e", stole: "#7a1d35", turban: "#d9a94e" },
  // Couple 2 – bride in rose pink, groom in maroon sherwani
  { lehenga: "#d0607a", lehengaDark: "#9c3550", dupatta: "#e58ca0", coat: "#6d1428", coatTrim: "#e9c46f", stole: "#f3e6d2", turban: "#f0d9a6" },
];

const SKIN = "#d9a27c";
const SKIN_SH = "#c48d68";

function Groom({ p }: { p: CouplePalette }) {
  return (
    <g>
      {/* shadow */}
      <ellipse cx="0" cy="0" rx="34" ry="5" fill="rgba(0,0,0,.35)" />
      {/* mojari shoes */}
      <path d="M-20 -2 Q-12 -9 -3 -6 L-3 -1 Z" fill="#e9c46f" />
      <path d="M20 -2 Q12 -9 3 -6 L3 -1 Z" fill="#e9c46f" />
      {/* churidar */}
      <path d="M-13 -52 L-3 -52 L-4 -5 L-12 -5 Z" fill="#f7efe2" />
      <path d="M13 -52 L3 -52 L4 -5 L12 -5 Z" fill="#efe4d3" />
      {/* sherwani */}
      <path d="M-23 -150 Q0 -156 23 -150 L32 -52 Q0 -46 -32 -52 Z" fill={p.coat} />
      <path d="M-32 -52 Q0 -46 32 -52 L31.3 -58 Q0 -52 -31.3 -58 Z" fill={p.coatTrim} />
      <path d="M0 -153 L0 -50" stroke={p.coatTrim} strokeWidth="2.2" />
      {[-144, -134, -124, -114, -104].map((y) => (
        <circle key={y} cx="0" cy={y} r="1.8" fill="#fff3cf" stroke={p.coatTrim} strokeWidth=".6" />
      ))}
      {/* embroidery motifs */}
      {[[-14, -80], [14, -80], [-18, -66], [18, -66], [-10, -95], [10, -95]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill={p.coatTrim} opacity=".8" />
      ))}
      {/* stole */}
      <path d="M-21 -150 L-12 -150 L26 -96 L18 -90 Z" fill={p.stole} />
      <path d="M-21 -150 L-12 -150 L26 -96" fill="none" stroke="#e9c46f" strokeWidth="1" />
      <path d="M-22 -148 L-14 -146 L-17 -84 L-25 -86 Z" fill={p.stole} />
      <path d="M-25 -86 L-17 -84" stroke="#e9c46f" strokeWidth="2" />
      {/* arms */}
      <path d="M-23 -148 Q-31 -128 -29 -98 L-21 -98 Q-21 -126 -16 -140 Z" fill={p.coat} />
      <path d="M23 -148 Q31 -128 29 -98 L21 -98 Q21 -126 16 -140 Z" fill={p.coat} />
      <path d="M-29.5 -101 L-20.5 -101 M29.5 -101 L20.5 -101" stroke={p.coatTrim} strokeWidth="2" />
      <circle cx="-25" cy="-93" r="5" fill={SKIN} />
      <circle cx="25" cy="-93" r="5" fill={SKIN} />
      {/* collar + neck */}
      <rect x="-5" y="-165" width="10" height="12" rx="2" fill={SKIN_SH} />
      <path d="M-9 -156 L9 -156 L8 -150 L-8 -150 Z" fill={p.coatTrim} />
      {/* head (faceless) */}
      <circle cx="0" cy="-177" r="14.5" fill={SKIN} />
      <path d="M-14 -175 Q-15 -168 -12 -165" stroke={SKIN_SH} strokeWidth="2" fill="none" />
      {/* safa / turban */}
      <path d="M-16.5 -178 C-19 -199 19 -203 16.5 -178 Q0 -184 -16.5 -178 Z" fill={p.turban} />
      <path d="M-16 -182 Q0 -190 16 -182 M-14 -188 Q0 -196 14 -188" stroke="#a8741f" strokeWidth="1.2" fill="none" opacity=".7" />
      <path d="M15 -186 Q30 -178 27 -160 Q22 -172 13 -180 Z" fill={p.turban} opacity=".95" />
      {/* kalgi */}
      <path d="M0 -197 Q-4 -210 3 -216 Q2 -206 4 -198 Z" fill="#fff3cf" stroke="#e9c46f" strokeWidth=".8" />
      <circle cx="0" cy="-194" r="3" fill="#fff" stroke="#e9c46f" strokeWidth="1" />
    </g>
  );
}

function Bride({ p }: { p: CouplePalette }) {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="62" ry="6" fill="rgba(0,0,0,.35)" />
      {/* dupatta back fall */}
      <path d="M-22 -172 C-34 -150 -46 -100 -50 -40 L-38 -44 C-32 -100 -24 -140 -14 -160 Z" fill={p.dupatta} opacity=".88" />
      <path d="M22 -172 C34 -150 46 -100 50 -40 L38 -44 C32 -100 24 -140 14 -160 Z" fill={p.dupatta} opacity=".88" />
      {/* lehenga */}
      <path d="M-15 -114 C-30 -82 -54 -34 -62 -3 Q0 6 62 -3 C54 -34 30 -82 15 -114 Z" fill={p.lehenga} />
      <path d="M-15 -114 C-24 -90 -34 -60 -40 -30 L-26 -28 C-22 -60 -16 -90 -9 -112 Z" fill={p.lehengaDark} opacity=".45" />
      <path d="M40 -30 C34 -60 24 -90 15 -114 L9 -112 C16 -90 22 -60 26 -28 Z" fill={p.lehengaDark} opacity=".35" />
      <path d="M-62 -3 Q0 6 62 -3 L59 -15 Q0 -6 -59 -15 Z" fill="#e9c46f" />
      <path d="M-57 -22 Q0 -13 57 -22 L55.5 -27 Q0 -18 -55.5 -27 Z" fill="#e9c46f" opacity=".85" />
      {[[-30, -44], [0, -40], [30, -44], [-18, -64], [18, -64], [-40, -60], [40, -60], [0, -84], [-10, -100], [10, -100]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} fill="#f6dc96">
          <circle r="2" />
          <circle cx="4" r="1" />
          <circle cx="-4" r="1" />
        </g>
      ))}
      {/* choli */}
      <path d="M-15 -150 Q0 -155 15 -150 L15 -113 Q0 -110 -15 -113 Z" fill={p.lehengaDark} />
      <path d="M-15 -115 Q0 -112 15 -115" stroke="#e9c46f" strokeWidth="2" fill="none" />
      {/* arms meeting at front with bangles */}
      <path d="M-15 -149 Q-24 -130 -16 -114 Q-8 -106 -2 -110 L-3 -116 Q-9 -116 -12 -122 Q-15 -132 -9 -145 Z" fill={SKIN} />
      <path d="M15 -149 Q24 -130 16 -114 Q8 -106 2 -110 L3 -116 Q9 -116 12 -122 Q15 -132 9 -145 Z" fill={SKIN} />
      <path d="M-16 -121 l5 -3 M-17 -118 l5 -3 M16 -121 l-5 -3 M17 -118 l-5 -3" stroke="#e9c46f" strokeWidth="1.6" />
      <circle cx="0" cy="-110" r="5" fill={SKIN} />
      {/* neck + necklace */}
      <rect x="-4.5" y="-162" width="9" height="12" rx="2" fill={SKIN_SH} />
      <path d="M-9 -152 Q0 -142 9 -152" stroke="#e9c46f" strokeWidth="2.4" fill="none" />
      <circle cx="0" cy="-145" r="2.2" fill="#fff3cf" />
      {/* head (faceless) + hair */}
      <path d="M-14 -170 Q-16 -150 -10 -150 L10 -150 Q16 -150 14 -170 Z" fill="#3a1d14" />
      <circle cx="0" cy="-172" r="13.5" fill={SKIN} />
      <path d="M-13 -176 Q0 -190 13 -176 Q8 -184 0 -185 Q-8 -184 -13 -176 Z" fill="#3a1d14" />
      {/* maang tikka */}
      <path d="M0 -185 L0 -181" stroke="#e9c46f" strokeWidth="1" />
      <circle cx="0" cy="-180" r="2.2" fill="#fff3cf" stroke="#e9c46f" strokeWidth=".8" />
      {/* dupatta over head */}
      <path d="M-24 -168 C-24 -196 24 -196 24 -168 C20 -176 16 -183 0 -186 C-16 -183 -20 -176 -24 -168 Z" fill={p.dupatta} />
      <path d="M-24 -168 C-24 -196 24 -196 24 -168" fill="none" stroke="#e9c46f" strokeWidth="2" strokeDasharray="1 3" strokeLinecap="round" />
    </g>
  );
}

function ArchOfFlowers() {
  const pts: [number, number, number][] = [];
  for (let y = 262; y >= 132; y -= 16) {
    pts.push([138, y, 0.15]);
    pts.push([222, y, 0.15]);
  }
  for (let a = 180; a >= 0; a -= 15) {
    const r = (a * Math.PI) / 180;
    pts.push([180 + Math.cos(r) * 42, 128 - Math.sin(r) * 42, 0.16]);
  }
  return (
    <g>
      <path d="M138 266 L138 128 A42 42 0 0 1 222 128 L222 266" fill="none" stroke="url(#gGold)" strokeWidth="2" opacity=".7" />
      {pts.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <motion.g
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 160, damping: 11, delay: 0.25 + i * 0.03 }}
          >
            {i % 3 === 0 && <use href="#leaf" transform={`rotate(${i * 47}) scale(.18)`} />}
            <use href="#blossom" transform={`rotate(${i * 31}) scale(${s})`} />
          </motion.g>
        </g>
      ))}
    </g>
  );
}

function Lantern({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <g className="sway">
        <path d="M0 0 L0 34" stroke="#e9c46f" strokeWidth="1" />
        <path d="M-8 34 L8 34 L11 42 L-11 42 Z" fill="url(#gGold)" />
        <path d="M-10 42 L10 42 L8 64 L-8 64 Z" fill="rgba(255,214,140,.35)" stroke="url(#gGold)" strokeWidth="1.5" />
        <circle cx="0" cy="53" r="4" fill="#fff3cf" className="glow-pulse" />
        <path d="M-9 64 L9 64 L4 70 L-4 70 Z" fill="url(#gGold)" />
        <path d="M0 70 L0 76" stroke="#e9c46f" strokeWidth="1.5" />
      </g>
    </g>
  );
}

export default function CoupleIllustration({ palette }: { palette: CouplePalette }) {
  return (
    <svg viewBox="0 0 360 290" width="100%" style={{ maxWidth: 360, overflow: "visible" }} aria-hidden>
      <ellipse cx="180" cy="266" rx="170" ry="16" fill="rgba(233,196,111,.12)" />
      <path d="M20 266 Q180 290 340 266" stroke="url(#gGold)" strokeWidth="1.2" fill="none" opacity=".5" />
      <Lantern x={34} />
      <Lantern x={326} />
      <ArchOfFlowers />
      <motion.g
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <g transform="translate(86 264)">
          <Bride p={palette} />
        </g>
      </motion.g>
      <motion.g
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        <g transform="translate(276 264)">
          <Groom p={palette} />
        </g>
      </motion.g>
    </svg>
  );
}
