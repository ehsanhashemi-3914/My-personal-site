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
  /** Résumé PDFs in /public, one per locale. The download button uses the active locale. */
  resumeUrl: { en: "/resume-en.pdf", fa: "/resume-fa.pdf" },
  githubUser: "ehsanhashemi-3914",
  /** Only verifiable numbers: live demos and public GitHub repositories. */
  stats: {
    liveProjects: 10,
    repos: 20,
    stackLabel: {
      en: "React · Next.js · Node.js · AI",
      fa: "React · Next.js · Node.js · AI",
    },
  },
} as const;
