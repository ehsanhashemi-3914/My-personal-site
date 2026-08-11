/**
 * PROFILE — placeholder identity data.
 * Replace every value marked TODO with the real thing. Text fields carry both
 * locales so the site stays bilingual with no code changes.
 */
export const profile = {
  name: { en: "Seyed Ehsan Hashemi", fa: "سید احسان هاشمی" },
  monogram: "EH",
  role: { en: "Full-stack Developer", fa: "توسعه‌دهنده‌ی فول‌استک" },
  location: { en: "Mashhad, Iran", fa: "مشهد، ایران" },
  email: "bedune.freefire@gmail.com",
  phone: { display: "0993 081 3843", tel: "+989930813843" },
  /** Portrait in the About section — replace the file, keep the path. */
  portrait: "/portrait.jpg",
  /**
   * Drop the PDF at public/resume.pdf and set this to "/resume.pdf" — the
   * download button appears on its own. Empty means no button at all, which is
   * better than a button that 404s.
   */
  resumeUrl: "",
  githubUser: "ehsanhashemi-3914",
  stats: {
    years: 6,
    projects: 40,
    stackLabel: {
      en: "Next.js · Node · Python · PostgreSQL",
      fa: "Next.js · Node · Python · PostgreSQL",
    },
  },
} as const;
