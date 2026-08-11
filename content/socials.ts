export type SocialId = "github" | "instagram" | "telegram" | "email" | "phone";

export interface Social {
  id: SocialId;
  label: string;
  handle: string;
  url: string;
  /** Latin handles stay LTR even when the page is right-to-left. */
  ltr?: boolean;
}

export const socials: Social[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@nothing.is_endless",
    // Tracking parameters from the shared link intentionally stripped.
    url: "https://www.instagram.com/nothing.is_endless",
    ltr: true,
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@EhsanHashemi_1453",
    url: "https://t.me/EhsanHashemi_1453",
    ltr: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@ehsanhashemi-3914",
    url: "https://github.com/ehsanhashemi-3914",
    ltr: true,
  },
  {
    id: "email",
    label: "Email",
    handle: "bedune.freefire@gmail.com",
    url: "mailto:bedune.freefire@gmail.com",
    ltr: true,
  },
  {
    id: "phone",
    label: "Phone",
    handle: "0993 081 3843",
    url: "tel:+989930813843",
    ltr: true,
  },
];
