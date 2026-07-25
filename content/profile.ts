/**
 * PROFILE — placeholder identity data.
 * Replace every value marked TODO with the real thing. Text fields carry both
 * locales so the site stays bilingual with no code changes.
 */
export const profile = {
  name: { en: "Seyed Ehsan Hashemi", fa: "سید احسان هاشمی" },
  monogram: "EH",
  role: { en: "Creative Developer", fa: "توسعه‌دهنده‌ی خلاق" },
  location: { en: "Tehran, Iran", fa: "تهران، ایران" },
  email: "bedune.freefire@gmail.com",
  resumeUrl: "/resume.pdf", // TODO drop the PDF into /public
  githubUser: "your-username", // TODO GitHub username (used by the GitHub section)
  stats: {
    years: 6,
    projects: 40,
    stackLabel: { en: "React · Three.js · GSAP", fa: "React · Three.js · GSAP" },
  },
} as const;
