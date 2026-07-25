import type { SectionId } from "@/lib/store";

/** Order of stations along the experience. */
export const SECTION_IDS: SectionId[] = [
  "hero",
  "about",
  "journey",
  "skills",
  "projects",
  "github",
  "social",
  "contact",
];

/** Sections shown in the nav (everything except the hero). */
export const NAV_SECTIONS: SectionId[] = SECTION_IDS.filter((id) => id !== "hero");
