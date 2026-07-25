"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/lib/scroll/SmoothScroll";
import { LocaleSync } from "@/components/ui/LocaleSync";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { Menu } from "@/components/layout/Menu";
import { Backdrop } from "@/components/ui/Backdrop";

// WebGL never runs on the server, and it should not block first paint.
const Stage = dynamic(
  () => import("@/components/experience/Stage").then((m) => m.Stage),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <LocaleSync />
      {/* Backdrop stays as the base layer the WebGL stage sits on top of. */}
      <Backdrop />
      <Stage />
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <Menu />
      {children}
    </SmoothScroll>
  );
}
