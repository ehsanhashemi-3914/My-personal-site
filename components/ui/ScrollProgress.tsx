"use client";

import { useStore } from "@/lib/store";

/** Thin gradient bar tracking overall scroll progress. */
export function ScrollProgress() {
  const p = useStore((s) => s.scrollProgress);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-px">
      <div
        className="h-full origin-left bg-gradient-to-r from-[var(--color-mint)] via-[var(--color-cyan)] to-[var(--color-violet)]"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
