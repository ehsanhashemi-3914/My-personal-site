"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor, Preload } from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { Thread } from "./Thread";
import { Nebula } from "./Nebula";
import { Stations } from "./Stations";
import { useQualityTier } from "@/lib/hooks/useQualityTier";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useStore } from "@/lib/store";
import { bindInput, input } from "@/lib/pointer";

function Scene({ reduced }: { reduced: boolean }) {
  const { settings } = useQualityTier();
  const setTier = useStore((s) => s.setQualityTier);

  return (
    <>
      {/* Fog dissolves the far end of the corridor into the void. */}
      <fog attach="fog" args={["#05060b", 12, 88]} />
      <ambientLight intensity={0.35} />

      <PerformanceMonitor
        onDecline={() => setTier("low")}
        flipflops={3}
        onFallback={() => setTier("low")}
      />

      <CameraRig reduced={reduced} />
      <Thread segments={settings.threadSegments} />
      <Nebula count={settings.particles} />
      <Stations />

      <EffectComposer enableNormalPass={false}>
        <Bloom
          intensity={settings.heavyEffects ? 1.5 : 1.0}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0006, 0.0009)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.22} darkness={0.82} />
        <Noise opacity={0.028} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

/**
 * The persistent WebGL stage. One canvas lives behind the whole document for
 * the entire visit — sections never cut, the camera simply travels.
 */
export function Stage() {
  const reduced = usePrefersReducedMotion();
  const scrollProgress = useStore((s) => s.scrollProgress);
  const { settings } = useQualityTier();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => bindInput(), []);

  // Feed scroll into the frame-loop state (velocity is derived, not stored).
  useEffect(() => {
    input.scrollVelocity = scrollProgress - input.scroll;
    input.scroll = scrollProgress;
  }, [scrollProgress]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={settings.dpr}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
        }}
        camera={{ fov: 52, near: 0.1, far: 200, position: [0, 1, 8] }}
        // A still frame is enough when the visitor asked for less motion.
        frameloop={reduced ? "demand" : "always"}
        onCreated={({ gl }) => {
          gl.setClearColor("#05060b", 1);
        }}
      >
        <Suspense fallback={null}>
          <Scene reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
