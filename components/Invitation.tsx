"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/data/invitation";
import { Background, Petals, burstPetals } from "./Atmosphere";
import Cover from "./Cover";
import { SvgDefs } from "./ornaments";
import { ScrollProgress, TourDock, useAutoTour } from "./AutoTour";
import { Countdown, Couple, Footer, Hero, Rsvp, SaveTheDate, Timeline, Valima, Venue } from "./Sections";

const VOLUME = 0.7;

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const tour = useAutoTour();
  const startTour = tour.start;

  // start the auto-scroll a moment after the doors have opened
  useEffect(() => {
    if (!coverGone) return;
    const t = window.setTimeout(startTour, 1400);
    return () => window.clearTimeout(t);
  }, [coverGone, startTour]);

  useEffect(() => {
    document.body.classList.toggle("locked", !coverGone);
  }, [coverGone]);

  useEffect(() => {
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
  }, [lang]);

  const fadeTo = (a: HTMLAudioElement, target: number, ms = 1200, then?: () => void) => {
    const start = a.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      a.volume = Math.min(1, Math.max(0, start + (target - start) * k));
      if (k < 1) requestAnimationFrame(step);
      else then?.();
    };
    requestAnimationFrame(step);
  };

  const play = useCallback(() => {
    const a = audio.current;
    if (!a) return;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        fadeTo(a, VOLUME, 1500);
      })
      .catch(() => setPlaying(false));
  }, []);

  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (playing) {
      fadeTo(a, 0, 500, () => a.pause());
      setPlaying(false);
    } else play();
  };

  const onOpen = (byTap: boolean) => {
    window.scrollTo(0, 0);
    setOpened(true);
    if (byTap) play();
    window.setTimeout(() => burstPetals(80), 650);
  };

  return (
    <>
      <SvgDefs />
      <Background />
      <Petals />
      <audio ref={audio} src="/audio/nasheed.mp3" loop preload="auto" />

      {!coverGone && <Cover onOpen={onOpen} onDone={() => setCoverGone(true)} />}

      {opened && (
        <main className="column" dir="ltr">
          <Hero lang={lang} />
          <Couple lang={lang} index={0} />
          <Couple lang={lang} index={1} />
          <SaveTheDate lang={lang} />
          <Valima lang={lang} />
          <Countdown lang={lang} />
          <Timeline lang={lang} />
          <Venue lang={lang} />
          <Rsvp lang={lang} />
          <Footer lang={lang} />
        </main>
      )}

      <AnimatePresence>
        {coverGone && (
          <>
            <ScrollProgress key="progress" />
            <motion.div
              key="lang"
              data-tour-ignore
              className="fab"
              style={{ top: 12, right: 12, padding: 4, display: "flex", gap: 2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {(["en", "ur"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={l === "ur" ? "ur" : "caps"}
                  style={{
                    borderRadius: 999,
                    padding: l === "ur" ? "0 12px" : "6px 12px",
                    fontSize: l === "ur" ? 15 : 12,
                    fontWeight: 700,
                    lineHeight: l === "ur" ? 1.9 : 1.4,
                    background: lang === l ? "linear-gradient(100deg,#b98631,#f6dc96 45%,#c9973f)" : "transparent",
                    color: lang === l ? "#2a0812" : "#fbe9b7",
                    letterSpacing: l === "ur" ? 0 : ".12em",
                  }}
                >
                  {l === "en" ? "EN" : "اردو"}
                </button>
              ))}
            </motion.div>
            <TourDock
              key="dock"
              lang={lang}
              mode={tour.mode}
              resumeP={tour.resumeP}
              index={tour.index}
              onToggle={tour.toggle}
              onJump={tour.jumpTo}
              musicOn={playing}
              onMusic={toggleMusic}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
