"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/** Element that gently follows the cursor while hovered, then springs back. */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  href,
  target,
  rel,
  onClick,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (reduced || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const cls = cn(
    "inline-flex items-center justify-center will-change-transform transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        data-cursor="hover"
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cls}
    >
      {children}
    </button>
  );
}
