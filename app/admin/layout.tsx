import type { ReactNode } from "react";

/**
 * The editor sits outside the cinematic shell — no WebGL stage, no smooth
 * scroll, no custom cursor. It is a plain tool, and it should behave like one.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen bg-[var(--color-ink)]">
      {children}
    </div>
  );
}
