"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { useDict } from "@/lib/i18n/useDict";
import { Monogram } from "@/components/ui/Monogram";

export function Preloader() {
  const reduced = useReducedMotion();
  const ready = useStore((s) => s.ready);
  const setReady = useStore((s) => s.setReady);
  const { d } = useDict();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      const t = setTimeout(() => setReady(true), 150);
      return () => clearTimeout(t);
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setReady(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);

    // Safety net: rAF is throttled in background/hidden tabs, so a timer
    // guarantees the visitor is never trapped behind the preloader.
    const failsafe = setTimeout(() => {
      setPct(100);
      setReady(true);
    }, duration + 1200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [reduced, setReady]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-ink)]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8"
          >
            <Monogram size="lg" />

            <div className="flex flex-col items-center gap-3">
              <span className="eyebrow">{d.preloader.loading}</span>
              <div className="h-px w-56 overflow-hidden bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-mint)] to-[var(--color-cyan)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-[family-name:var(--font-display)] text-sm tabular-nums text-[var(--color-lo)]">
                {pct.toString().padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
