"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { cameraAt, lookAtAt } from "./curve";
import { input, stepInput } from "@/lib/pointer";

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _target = new THREE.Vector3();

/**
 * Turns scroll into camera movement. Scroll progress drives position along the
 * thread; the pointer adds a parallax lean; scroll velocity adds roll and FOV
 * push so fast scrolling *feels* fast.
 */
export function CameraRig({ reduced }: { reduced: boolean }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const smoothT = useRef(0);
  const roll = useRef(0);
  const fov = useRef(52);

  useFrame((_, delta) => {
    const d = Math.min(delta, 1 / 30); // clamp after tab-switches
    stepInput(d);

    // Ease toward the scroll target so the camera glides rather than snaps.
    const target = input.scroll;
    const ease = reduced ? 1 : 1 - Math.pow(0.0015, d);
    smoothT.current += (target - smoothT.current) * ease;

    cameraAt(smoothT.current, _pos);
    lookAtAt(smoothT.current, _look);

    if (!reduced) {
      // Pointer parallax — the world leans toward wherever you are.
      _pos.x += input.sx * 1.5;
      _pos.y += input.sy * 0.9;
      _look.x += input.sx * 0.8;
      _look.y += input.sy * 0.5;
    }

    camera.position.copy(_pos);
    _target.copy(_look);
    camera.lookAt(_target);

    if (!reduced) {
      // Roll into the direction of travel, and widen the lens with speed.
      const v = THREE.MathUtils.clamp(input.scrollVelocity * 22, -1, 1);
      roll.current += (v * 0.09 - roll.current) * (1 - Math.pow(0.002, d));
      camera.rotation.z += roll.current;

      const targetFov = 52 + Math.abs(v) * 9;
      fov.current += (targetFov - fov.current) * (1 - Math.pow(0.01, d));
      if (Math.abs(camera.fov - fov.current) > 0.01) {
        camera.fov = fov.current;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
