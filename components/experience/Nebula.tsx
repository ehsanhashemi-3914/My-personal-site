"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { threadCurve } from "./curve";
import { input } from "@/lib/pointer";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uEnergy;
  uniform vec2 uPointer;
  uniform float uSize;

  attribute float aScale;
  attribute float aSeed;

  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec3 p = position;

    // Slow organic drift so the field never feels static.
    float t = uTime * 0.12 + aSeed * 6.2831;
    p.x += sin(t) * 0.6;
    p.y += cos(t * 0.8) * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Push away from the pointer in view space — the field notices you.
    float dist = length(mv.xy - uPointer * 8.0);
    float push = smoothstep(7.0, 0.0, dist);
    mv.xy += normalize(mv.xy - uPointer * 8.0 + 0.0001) * push * 1.5;

    gl_Position = projectionMatrix * mv;

    // Fade with depth; scale up with scroll energy so speed reads as streaks.
    float depth = -mv.z;
    vAlpha = smoothstep(120.0, 8.0, depth) * (0.35 + push * 0.9);
    vSeed = aSeed;
    gl_PointSize = uSize * aScale * (1.0 + uEnergy * 1.6) * (30.0 / max(depth, 1.0));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;

  varying float vAlpha;
  varying float vSeed;

  void main() {
    // Soft round sprite, no texture needed.
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float falloff = pow(1.0 - d * 2.0, 2.4);

    // Gentle twinkle, offset per particle.
    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + vSeed * 40.0);

    vec3 colour = mix(uColorA, uColorB, vSeed);
    gl_FragColor = vec4(colour, falloff * vAlpha * twinkle);
  }
`;

export function Nebula({ count = 3500 }: { count?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Particles cluster loosely around the thread so the corridor reads as a place.
  const { positions, scales, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);
    const p = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      threadCurve.getPointAt(t, p);
      const radius = 3 + Math.pow(Math.random(), 0.6) * 26;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = p.x + Math.cos(angle) * radius;
      positions[i * 3 + 1] = p.y + Math.sin(angle) * radius * 0.7;
      positions[i * 3 + 2] = p.z + (Math.random() - 0.5) * 14;
      scales[i] = 0.35 + Math.random() * 1.5;
      seeds[i] = Math.random();
    }
    return { positions, scales, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uEnergy: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uSize: { value: 2.2 },
      uColorA: { value: new THREE.Color("#6ee7d8") },
      uColorB: { value: new THREE.Color("#8b7cf6") },
    }),
    [],
  );

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 1 / 30);
    m.uniforms.uPointer.value.set(input.sx, input.sy);
    const energy = Math.min(1, Math.abs(input.scrollVelocity) * 14);
    m.uniforms.uEnergy.value += (energy - m.uniforms.uEnergy.value) * 0.08;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
