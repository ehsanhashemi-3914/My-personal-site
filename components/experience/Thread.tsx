"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { threadCurve } from "./curve";
import { input } from "@/lib/pointer";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uEnergy;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorHot;

  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vNormal;

  void main() {
    // Rim light: the tube glows brightest at its silhouette.
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, normalize(vNormal))), 2.0);

    // Base gradient travelling the length of the thread.
    vec3 base = mix(uColorA, uColorB, vUv.x);

    // Energy pulses racing along it — faster and hotter as you scroll harder.
    float speed = 0.35 + uEnergy * 2.2;
    float pulse = sin(vUv.x * 90.0 - uTime * speed * 6.0);
    pulse = pow(max(pulse, 0.0), 14.0);

    // A bright head that sits where the viewer currently is on the journey.
    float head = exp(-pow((vUv.x - uScroll) * 26.0, 2.0));

    vec3 colour = base * (0.30 + fresnel * 1.5);
    colour += uColorHot * pulse * (0.7 + uEnergy * 2.0);
    colour += uColorHot * head * 1.4;

    float alpha = 0.16 + fresnel * 0.85 + pulse * 0.5 + head * 0.7;
    gl_FragColor = vec4(colour, clamp(alpha, 0.0, 1.0));
  }
`;

export function Thread({ segments = 620 }: { segments?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(threadCurve, segments, 0.055, 10, false),
    [segments],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uEnergy: { value: 0 },
      uColorA: { value: new THREE.Color("#6ee7d8") },
      uColorB: { value: new THREE.Color("#8b7cf6") },
      uColorHot: { value: new THREE.Color("#d9fff8") },
    }),
    [],
  );

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 1 / 30);
    m.uniforms.uScroll.value = input.scroll;
    // Pointer motion and scroll speed both feed the thread's energy.
    const energy = Math.min(1, Math.abs(input.scrollVelocity) * 14 + input.speed * 0.5);
    m.uniforms.uEnergy.value += (energy - m.uniforms.uEnergy.value) * 0.1;
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
