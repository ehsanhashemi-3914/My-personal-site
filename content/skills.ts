export interface SkillGroup {
  id: string;
  label: { en: string; fa: string };
  items: string[];
}

/** Grouped by the role each technology plays — rendered as a constellation later. */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: { en: "Frontend", fa: "فرانت‌اند" },
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "motion",
    label: { en: "3D & Motion", fa: "سه‌بعدی و موشن" },
    items: ["Three.js", "React Three Fiber", "GSAP", "Lenis", "GLSL / Shaders"],
  },
  {
    id: "backend",
    label: { en: "Backend", fa: "بک‌اند" },
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    id: "tooling",
    label: { en: "Tooling", fa: "ابزارها" },
    items: ["Git", "Docker", "Figma", "Blender", "Vercel"],
  },
];
