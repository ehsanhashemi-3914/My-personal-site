/**
 * Mutable, module-level input state.
 *
 * Everything that reacts every frame (camera, particles, thread) reads from
 * here instead of React state — no re-renders, no dropped frames. `x/y` are the
 * raw normalised pointer (-1..1); `sx/sy` are the smoothed values the scene
 * actually uses; `speed` is pointer velocity; `scrollVelocity` is signed and
 * decays, so the world can lean into fast scrolling.
 */
export const input = {
  x: 0,
  y: 0,
  sx: 0,
  sy: 0,
  speed: 0,
  down: false,
  /** 0..1 scroll position */
  scroll: 0,
  /** signed, decaying scroll velocity */
  scrollVelocity: 0,
  /** seconds since the last pointer move */
  idle: 0,
};

let lastX = 0;
let lastY = 0;
let bound = false;

/** Attach global listeners once. Returns a cleanup function. */
export function bindInput() {
  if (typeof window === "undefined" || bound) return () => {};
  bound = true;

  const onMove = (e: PointerEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -((e.clientY / window.innerHeight) * 2 - 1);
    input.speed = Math.min(1, Math.hypot(nx - lastX, ny - lastY) * 6);
    lastX = nx;
    lastY = ny;
    input.x = nx;
    input.y = ny;
    input.idle = 0;
  };
  const onDown = () => (input.down = true);
  const onUp = () => (input.down = false);
  const onLeave = () => {
    input.x = 0;
    input.y = 0;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  document.addEventListener("pointerleave", onLeave);

  return () => {
    bound = false;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    document.removeEventListener("pointerleave", onLeave);
  };
}

/** Called once per frame to smooth inputs and decay velocities. */
export function stepInput(delta: number) {
  const k = 1 - Math.pow(0.001, delta); // frame-rate independent smoothing
  input.sx += (input.x - input.sx) * k;
  input.sy += (input.y - input.sy) * k;
  input.speed *= 1 - Math.min(1, delta * 4);
  input.scrollVelocity *= 1 - Math.min(1, delta * 3);
  input.idle += delta;
}
