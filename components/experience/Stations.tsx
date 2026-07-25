"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { STATION_T, STATION_POINTS } from "./curve";
import { input } from "@/lib/pointer";

/**
 * One glowing node per section, sitting on the thread. A node ignites as the
 * viewer arrives at its part of the journey and dims once they pass.
 */
export function Stations() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 1 / 30);

    g.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const distance = Math.abs(input.scroll - STATION_T[i]);
      // 1 when the viewer is exactly at this station, falling off either side.
      const nearness = Math.exp(-Math.pow(distance * 16, 2));

      const scale = 0.5 + nearness * 2.4;
      mesh.scale.x += (scale - mesh.scale.x) * (1 - Math.pow(0.005, d));
      mesh.scale.setScalar(mesh.scale.x);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      const pulse = 0.75 + Math.sin(performance.now() * 0.002 + i) * 0.25;
      mat.opacity = 0.12 + nearness * 0.85 * pulse;
    });
  });

  return (
    <group ref={group}>
      {STATION_POINTS.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#9ffff0" : "#c9bcff"}
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
