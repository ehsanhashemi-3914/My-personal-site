"use client";

import { useEffect, useRef } from "react";
import { lerp } from "@/lib/utils";

/**
 * Custom cursor: an instant dot + a trailing ring that grows over interactive
 * elements. Only active on fine-pointer devices; touch keeps the native cursor.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(
        'a,button,[data-cursor="hover"],input,textarea',
      );
      hovering = !!el;
    };

    const render = () => {
      ring.x = lerp(ring.x, pos.x, 0.18);
      ring.y = lerp(ring.y, pos.y, 0.18);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.7 : 1})`;
      }
      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-[var(--color-mint)] mix-blend-difference"
      />
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[80] h-9 w-9 rounded-full border border-white/40 transition-[opacity] duration-500 will-change-transform"
      />
    </>
  );
}
