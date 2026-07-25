"use client";

import { cn } from "@/lib/utils";
import { profile } from "@/content/profile";

/**
 * The brand mark: initials inside a glass disc, wrapped by an arc that closes
 * into a full ring on hover — a small echo of the thread the site is built on.
 */
export function Monogram({
  size = "sm",
  className,
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const dimension = size === "lg" ? "h-24 w-24" : "h-11 w-11";
  const type = size === "lg" ? "text-3xl" : "text-sm";

  return (
    <span
      className={cn(
        "group/mark relative inline-flex shrink-0 items-center justify-center",
        dimension,
        className,
      )}
    >
      {/* glass disc */}
      <span className="absolute inset-0 rounded-full border border-[var(--color-line)] bg-white/[0.03] backdrop-blur-md transition-colors duration-500 group-hover/mark:border-[var(--color-mint)]/40" />

      {/* halo that blooms on hover */}
      <span className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover/mark:opacity-100 [background:radial-gradient(circle,rgba(110,231,216,0.25),transparent_70%)]" />

      {/* the thread: an arc that draws itself closed */}
      <svg
        viewBox="0 0 48 48"
        aria-hidden
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r="23"
          fill="none"
          stroke="var(--color-mint)"
          strokeWidth="1"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="72"
          className="opacity-70 transition-[stroke-dashoffset,opacity] duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover/mark:opacity-100 group-hover/mark:[stroke-dashoffset:0]"
        />
      </svg>

      <span
        className={cn(
          "relative font-[family-name:var(--font-display-latin)] tracking-[0.08em] text-[var(--color-hi)]",
          type,
        )}
      >
        {profile.monogram}
      </span>
    </span>
  );
}
