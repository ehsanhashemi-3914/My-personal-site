"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/lib/store";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/**
 * Drives Lenis from the GSAP ticker (single rAF loop for scroll + animation),
 * mirrors progress into the store, and locks scrolling when the UI needs it.
 * Uses the instance from context rather than a ref so it is never undefined.
 */
function LenisBridge() {
  const setScrollProgress = useStore((s) => s.setScrollProgress);
  const ready = useStore((s) => s.ready);
  const menuOpen = useStore((s) => s.menuOpen);

  const lenis = useLenis((instance) => {
    setScrollProgress(instance.progress ?? 0);
    ScrollTrigger.update();
  });

  // One rAF loop: GSAP ticks Lenis.
  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  // Lock while the preloader is up or the menu is open.
  useEffect(() => {
    if (!lenis) return;
    if (ready && !menuOpen) lenis.start();
    else lenis.stop();
  }, [lenis, ready, menuOpen]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      // Remount if the motion preference changes so options re-init cleanly.
      key={reduced ? "reduced" : "smooth"}
      options={{
        autoRaf: false,
        lerp: reduced ? 1 : 0.1,
        smoothWheel: !reduced,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
