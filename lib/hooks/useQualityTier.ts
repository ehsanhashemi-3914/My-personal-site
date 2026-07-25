"use client";

import { useEffect } from "react";
import { useStore, type QualityTier } from "@/lib/store";

/** Particle counts / effect budgets per tier. */
export const TIER_SETTINGS: Record<
  QualityTier,
  { particles: number; threadSegments: number; heavyEffects: boolean; dpr: [number, number] }
> = {
  high: { particles: 4200, threadSegments: 700, heavyEffects: true, dpr: [1, 2] },
  medium: { particles: 2200, threadSegments: 460, heavyEffects: false, dpr: [1, 1.5] },
  low: { particles: 900, threadSegments: 260, heavyEffects: false, dpr: [0.75, 1] },
};

/**
 * Picks a starting tier from device signals. `PerformanceMonitor` in the scene
 * then adjusts downward at runtime if frames actually drop.
 */
export function useQualityTier() {
  const tier = useStore((s) => s.qualityTier);
  const setTier = useStore((s) => s.setQualityTier);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

    if (narrow || coarse || cores <= 4 || memory <= 4) {
      setTier(cores <= 2 || memory <= 2 ? "low" : "medium");
    } else {
      setTier("high");
    }
  }, [setTier]);

  return { tier, settings: TIER_SETTINGS[tier] };
}
