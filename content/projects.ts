export interface Project {
  slug: string;
  title: string;
  year: string;
  description: { en: string; fa: string };
  tags: string[];
  github?: string;
  demo?: string;
  /** Two-stop gradient used for the placeholder tile until a real preview exists. */
  accent: [string, string];
  image?: string; // TODO /public/projects/<slug>.jpg (wired up in a later phase)
}

/** TODO replace with real projects. */
export const projects: Project[] = [
  {
    slug: "aurora",
    title: "Aurora",
    year: "2024",
    description: {
      en: "A scroll-driven product story with a persistent WebGL background and camera choreography.",
      fa: "روایتِ محصولِ اسکرول‌محور با پس‌زمینه‌ی WebGL ثابت و کوریوگرافیِ دوربین.",
    },
    tags: ["Next.js", "Three.js", "GSAP"],
    github: "https://github.com/your-username/aurora",
    demo: "https://example.com",
    accent: ["#6ee7d8", "#8b7cf6"],
  },
  {
    slug: "helios",
    title: "Helios",
    year: "2023",
    description: {
      en: "Real-time data dashboard reimagined as a calm, glassmorphic control room.",
      fa: "داشبوردِ داده‌ی بلادرنگ که به‌شکلِ یک اتاقِ کنترلِ آرام و شیشه‌ای بازتصور شده.",
    },
    tags: ["React", "TypeScript", "D3"],
    github: "https://github.com/your-username/helios",
    demo: "https://example.com",
    accent: ["#57e0ff", "#6ee7d8"],
  },
  {
    slug: "monolith",
    title: "Monolith",
    year: "2023",
    description: {
      en: "An interactive 3D configurator — drag, orbit and customise a product in the browser.",
      fa: "پیکربندِ سه‌بعدیِ تعاملی — بکش، بچرخان و محصول را در مرورگر شخصی‌سازی کن.",
    },
    tags: ["R3F", "Drei", "GLSL"],
    github: "https://github.com/your-username/monolith",
    demo: "https://example.com",
    accent: ["#f5b981", "#ff8fa3"],
  },
  {
    slug: "cadence",
    title: "Cadence",
    year: "2022",
    description: {
      en: "A generative audio-reactive visual toy built with the Web Audio API and shaders.",
      fa: "یک اسباب‌بازیِ بصریِ مولد و صوت‌واکنش که با Web Audio API و شیدرها ساخته شده.",
    },
    tags: ["WebGL", "Web Audio", "Canvas"],
    github: "https://github.com/your-username/cadence",
    demo: "https://example.com",
    accent: ["#8b7cf6", "#57e0ff"],
  },
];
