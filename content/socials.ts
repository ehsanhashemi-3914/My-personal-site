export type SocialId = "github" | "instagram" | "telegram" | "email";

export interface Social {
  id: SocialId;
  label: string;
  handle: string;
  url: string;
}

/** TODO replace handles / urls with the real accounts. */
export const socials: Social[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@your-username",
    url: "https://github.com/your-username",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@your.handle",
    url: "https://instagram.com/your.handle",
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@your_handle",
    url: "https://t.me/your_handle",
  },
  {
    id: "email",
    label: "Email",
    handle: "bedune.freefire@gmail.com",
    url: "mailto:bedune.freefire@gmail.com",
  },
];
