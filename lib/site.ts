/**
 * Canonical origin of the deployed site, used for metadata, sitemap and robots.
 *
 * Vercel injects VERCEL_PROJECT_PRODUCTION_URL at build time, so this is
 * correct automatically once deployed. Set NEXT_PUBLIC_SITE_URL to override it
 * with a custom domain.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
