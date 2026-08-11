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
  phone: { display: "0993 081 3843", tel: "+989930813843" },
  /** Portrait in the About section — replace the file, keep the path. */
  portrait: "/portrait.jpg",
  resumeUrl: "/resume.pdf", // TODO drop the PDF into /public
  githubUser: "ehsanhashemi-3914",
  stats: {
    years: 6,
    projects: 40,
    stackLabel: { en: "React · Three.js · GSAP", fa: "React · Three.js · GSAP" },
  },
} as const;
