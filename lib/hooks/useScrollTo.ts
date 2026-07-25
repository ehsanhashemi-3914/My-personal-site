"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";
import type { SectionId } from "@/lib/store";

/** Smooth-scrolls to a section by id, using Lenis when available. */
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (id: SectionId) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );
}
