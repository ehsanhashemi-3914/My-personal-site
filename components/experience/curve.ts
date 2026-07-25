import * as THREE from "three";
import { SECTION_IDS } from "@/lib/sections";

/**
 * THE THREAD — the single continuous path the whole experience is built on.
 *
 * The camera flies along this curve as you scroll; the glowing tube *is* the
 * curve, so scrolling literally moves you through the world instead of moving
 * a page. Each section owns one station along it.
 */
const CONTROL_POINTS = [
  [0, 0, 6],
  [2.4, 1.2, -6],
  [-3.2, -1.6, -18],
  [3.8, 2.2, -30],
  [-2.6, 1.0, -43],
  [2.2, -2.4, -56],
  [-3.6, 0.8, -69],
  [1.8, 2.6, -82],
  [0, 0, -95],
].map(([x, y, z]) => new THREE.Vector3(x, y, z));

export const threadCurve = new THREE.CatmullRomCurve3(
  CONTROL_POINTS,
  false,
  "catmullrom",
  0.5,
);

/** How far along the curve (0..1) each section sits. */
export const STATION_T = SECTION_IDS.map(
  (_, i) => i / (SECTION_IDS.length - 1),
);

/** World position of each station, nudged off the thread so labels can breathe. */
export const STATION_POINTS = STATION_T.map((t) => threadCurve.getPointAt(t));

const _tangent = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _side = new THREE.Vector3();

/**
 * Camera position for a given progress: offset to the side of the thread so the
 * ribbon streaks past the viewport instead of running through the lens.
 */
export function cameraAt(t: number, out: THREE.Vector3) {
  const clamped = Math.min(0.999, Math.max(0, t));
  out.copy(threadCurve.getPointAt(clamped));
  threadCurve.getTangentAt(clamped, _tangent);
  _side.crossVectors(_tangent, _up).normalize();
  // Weave gently from one side of the thread to the other as we travel.
  const weave = Math.sin(clamped * Math.PI * 3) * 1.6;
  out.addScaledVector(_side, weave);
  out.y += 0.9 + Math.cos(clamped * Math.PI * 2) * 0.4;
  return out;
}

/** Point the camera should look at — a little further down the thread. */
export function lookAtAt(t: number, out: THREE.Vector3) {
  const ahead = Math.min(0.999, Math.max(0, t) + 0.035);
  return out.copy(threadCurve.getPointAt(ahead));
}
