import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js and its ecosystem ship modern ESM; nothing special needed for Next 15.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
