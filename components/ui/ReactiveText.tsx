"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Splits text into characters that individually respond to the cursor — each
 * glyph lifts, brightens and drifts as the pointer passes over it, so headlines
 * feel like a surface you can disturb rather than a printed image.
 */
export function ReactiveText({
  text,
  className,
  radius = 130,
  lift = 14,
}: {
  text: string;
  className?: string;
  radius?: number;
  lift?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const chars = Array.from(
      host.querySelectorAll<HTMLElement>("[data-char]"),
    );
    let raf = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const render = () => {
      for (const el of chars) {
        const r = el.getBoundingClientRect();
        const dx = pointerX - (r.left + r.width / 2);
        const dy = pointerY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const force = Math.max(0, 1 - dist / radius);
        const eased = force * force;

        el.style.transform = `translate3d(0, ${-eased * lift}px, 0)`;
        el.style.opacity = `${0.72 + eased * 0.28}`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [radius, lift, text]);

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {text.split(" ").map((word, wi, words) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <span
              key={ci}
              data-char
              aria-hidden
              className="inline-block will-change-transform [transition:opacity_.4s_ease]"
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span aria-hidden>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
