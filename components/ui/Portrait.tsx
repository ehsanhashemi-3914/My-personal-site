"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useDict, pick } from "@/lib/i18n/useDict";
import { profile } from "@/content/profile";

/**
 * Portrait in a glass frame that tilts toward the cursor in 3D, so the photo
 * feels like an object in the scene rather than a flat image.
 *
 * If the file is missing, a labelled placeholder keeps the layout intact.
 */
export function Portrait() {
  const { locale } = useDict();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (reduced || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 9}deg) rotateY(${px * 11}deg) scale(1.02)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="hover"
      className="glass group relative overflow-hidden rounded-[var(--radius-lg)] p-3 transition-transform duration-500 will-change-transform [transition-timing-function:var(--ease-out-expo)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface-2)]">
        {!failed ? (
          <Image
            src={profile.portrait}
            alt={pick(profile.name, locale)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <span className="font-[family-name:var(--font-display-latin)] text-3xl text-[var(--color-lo)]">
              {profile.monogram}
            </span>
            <span className="px-6 text-xs text-[var(--color-lo)]">
              public{profile.portrait}
            </span>
          </div>
        )}

        {/* light sweep, matching the thread palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background:linear-gradient(120deg,transparent_35%,rgba(110,231,216,0.14)_50%,transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:linear-gradient(to_top,rgba(5,6,11,0.55),transparent_45%)]"
        />
      </div>

      <div className="flex items-baseline justify-between gap-3 px-2 pb-1 pt-4">
        <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-hi)]">
          {pick(profile.name, locale)}
        </p>
        <p className="text-xs text-[var(--color-lo)]">{pick(profile.role, locale)}</p>
      </div>
    </div>
  );
}
