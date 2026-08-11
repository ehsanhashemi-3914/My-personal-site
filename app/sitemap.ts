import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** Single-page experience: one URL, and it is the whole site. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
