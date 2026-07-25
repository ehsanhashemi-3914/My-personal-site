"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore, type SectionId } from "@/lib/store";
import { useDict } from "@/lib/i18n/useDict";
import { useScrollTo } from "@/lib/hooks/useScrollTo";
import { SECTION_IDS } from "@/lib/sections";

/** Fullscreen navigation overlay (primary nav on small screens). */
export function Menu() {
  const open = useStore((s) => s.menuOpen);
  const setMenuOpen = useStore((s) => s.setMenuOpen);
  const { d } = useDict();
  const scrollTo = useScrollTo();

  const go = (id: SectionId) => {
    setMenuOpen(false);
    // Let the overlay start closing before the scroll kicks off.
    window.setTimeout(() => scrollTo(id), 260);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-[var(--color-ink)]/95 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container-x flex h-[72px] items-center justify-between">
            <span className="eyebrow">{d.nav.menu}</span>
            <button
              onClick={() => setMenuOpen(false)}
              data-cursor="hover"
              className="text-sm text-[var(--color-hi)]"
            >
              {d.nav.close}
            </button>
          </div>

          <nav className="container-x flex flex-1 flex-col justify-center gap-1">
            {SECTION_IDS.map((id, i) => (
              <motion.button
                key={id}
                onClick={() => go(id)}
                data-cursor="hover"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="w-fit py-1 text-start font-[family-name:var(--font-display)] text-[clamp(2.25rem,9vw,3.75rem)] text-[var(--color-hi)]"
              >
                {d.nav.links[id]}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
