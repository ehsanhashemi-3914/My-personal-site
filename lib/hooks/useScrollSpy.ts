"use client";

import { useEffect } from "react";
import { useStore, type SectionId } from "@/lib/store";

/** Sets the active section in the store as each one crosses the viewport middle. */
export function useScrollSpy(ids: SectionId[]) {
  const setActive = useStore((s) => s.setActiveSection);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, setActive]);
}
