export interface Milestone {
  year: string;
  title: { en: string; fa: string };
  body: { en: string; fa: string };
}

/** TODO replace with the real career timeline. */
export const journey: Milestone[] = [
  {
    year: "2018",
    title: { en: "First lines of code", fa: "اولین خط‌های کد" },
    body: {
      en: "Fell down the rabbit hole of the web — HTML, CSS and the moment a page first moved on its own.",
      fa: "در سوراخِ خرگوشِ وب افتادم — HTML، CSS و لحظه‌ای که برای اولین‌بار یک صفحه خودش حرکت کرد.",
    },
  },
  {
    year: "2020",
    title: { en: "Into the framework era", fa: "ورود به عصرِ فریم‌ورک‌ها" },
    body: {
      en: "Went all-in on React and TypeScript, shipping real products and learning to think in components and state.",
      fa: "تمام‌قد وارد React و TypeScript شدم؛ محصولات واقعی منتشر کردم و یاد گرفتم مؤلفه‌ای و state-محور فکر کنم.",
    },
  },
  {
    year: "2022",
    title: { en: "The pull of 3D", fa: "کششِ سه‌بعدی" },
    body: {
      en: "Discovered WebGL, Three.js and GSAP — and started treating the browser as a real-time cinematic canvas.",
      fa: "WebGL، Three.js و GSAP را کشف کردم و مرورگر را مثل یک بومِ سینماییِ بلادرنگ دیدم.",
    },
  },
  {
    year: "2024",
    title: { en: "Experience-led engineering", fa: "مهندسیِ تجربه‌محور" },
    body: {
      en: "Now I build immersive, performant sites end to end — where motion, 3D and architecture serve one story.",
      fa: "حالا سایت‌های غوطه‌ور و پرفورمنس را سرتاسر می‌سازم؛ جایی که موشن، سه‌بعدی و معماری در خدمتِ یک روایت‌اند.",
    },
  },
];
