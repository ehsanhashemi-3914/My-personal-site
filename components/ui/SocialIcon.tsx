import type { SocialId } from "@/content/socials";

/** Minimal inline glyphs — no icon dependency. */
export function SocialIcon({
  id,
  className,
}: {
  id: SocialId;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em",
    "aria-hidden": true,
  } as const;

  switch (id) {
    case "github":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.8c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0012 .5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M21.5 4.3 2.8 11.6c-.8.3-.8 1.4.1 1.6l4.6 1.3 1.8 5.3c.2.7 1.1.8 1.6.3l2.6-2.5 4.5 3.3c.6.4 1.4.1 1.6-.6l3.3-14.6c.2-.9-.7-1.6-1.9-.4Z" />
          <path d="m7.5 14.5 9-6.3-6.9 7.3" />
        </svg>
      );
    case "email":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
        </svg>
      );
  }
}
