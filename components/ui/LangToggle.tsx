"use client";

import { motion } from "framer-motion";
import { useStore, type Locale } from "@/lib/store";
import { cn } from "@/lib/utils";

const OPTIONS: { id: Locale; label: string; font: string }[] = [
  { id: "en", label: "EN", font: "var(--font-display-latin)" },
  { id: "fa", label: "فا", font: "var(--font-fa-family)" },
];

/**
 * Segmented language control: a glass pill with a lit indicator that slides to
 * the active language, so the current state is obvious at a glance.
 */
export function LangToggle({ className }: { className?: string }) {
  const locale = useStore((s) => s.locale);
  const setLocale = useStore((s) => s.setLocale);

  return (
    <div
      role="group"
      aria-label="Language / زبان"
      className={cn(
        "relative inline-flex items-center gap-0.5 rounded-full border border-[var(--color-line)] bg-white/[0.03] p-1 backdrop-blur-md",
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLocale(opt.id)}
            data-cursor="hover"
            aria-pressed={active}
            aria-label={opt.id === "en" ? "English" : "فارسی"}
            className="relative flex h-7 min-w-[2.4rem] items-center justify-center rounded-full px-2.5 text-xs leading-none transition-colors duration-300"
            style={{ fontFamily: opt.font }}
          >
            {active && (
              <motion.span
                layoutId="lang-indicator"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-full border border-[var(--color-mint)]/35 bg-[var(--color-mint)]/12"
              />
            )}
            <span
              className={cn(
                "relative transition-colors duration-300",
                active
                  ? "text-[var(--color-hi)]"
                  : "text-[var(--color-lo)] hover:text-[var(--color-mid)]",
              )}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
