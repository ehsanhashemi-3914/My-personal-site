"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Text that responds to the cursor: each piece lifts and brightens as the
 * pointer passes over it, so headlines feel like a surface you can disturb.
 *
 * Granularity depends on the script. Latin splits per character. Persian and
 * Arabic are cursive — their glyphs change shape depending on their neighbours,
 * and splitting a word into separate elements breaks both that shaping and the
 * bidirectional ordering. Those scripts therefore split per word, which keeps
 * every word intact while still reacting to the pointer.
 */
export function ReactiveText({
  text,
  className,
  radius = 130,
  lift = 14,
  gradient = false,
}: {
  text: string;
  className?: string;
  radius?: number;
  lift?: number;
  /**
   * Paint the gradient on each piece rather than on an ancestor. The pieces are
   * inline-block (transforms need a block box), and `background-clip: text` on a
   * parent paints nothing through inline-block children — the text would simply
   * disappear. Applying it per piece is what actually renders.
   */
  gradient?: boolean;
}) {
  const locale = useStore((s) => s.locale);
  const perWord = locale === "fa";
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const parts = Array.from(host.querySelectorAll<HTMLElement>("[data-part]"));
    if (!parts.length) return;

    let raf = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const render = () => {
      for (const el of parts) {
        const r = el.getBoundingClientRect();
        const dx = pointerX - (r.left + r.width / 2);
        const dy = pointerY - (r.top + r.height / 2);
        const force = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
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
  }, [radius, lift, text, perWord]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {/* The split-up copy is decorative; assistive tech reads this instead. */}
      <span className="sr-only">{text}</span>

      <span aria-hidden>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {perWord ? (
              /* Cursive script: the word stays one unbroken run of text. */
              <span
                data-part
                className={cn(
                  "inline-block will-change-transform [transition:opacity_.4s_ease]",
                  gradient && "text-gradient",
                )}
              >
                {word}
              </span>
            ) : (
              Array.from(word).map((ch, ci) => (
                <span
                  key={ci}
                  data-part
                  className={cn(
                    "inline-block will-change-transform [transition:opacity_.4s_ease]",
                    gradient && "text-gradient",
                  )}
                >
                  {ch}
                </span>
              ))
            )}
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </span>
  );
}
