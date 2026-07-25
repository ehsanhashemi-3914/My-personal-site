/**
 * Base layer beneath the WebGL stage: it paints the void the moment the page
 * loads (before the canvas mounts) and keeps a colour floor if WebGL is
 * unavailable. Deliberately subtle so the 3D scene reads on top.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-20 overflow-hidden bg-[var(--color-ink)]"
    >
      <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_-10%,#0b0e1e_0%,#05060b_55%,#04040a_100%)]" />
      <div className="absolute -top-1/4 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full opacity-25 blur-[120px] [animation:drift_18s_ease-in-out_infinite] [background:radial-gradient(circle,rgba(110,231,216,0.12),transparent_60%)]" />
      <div className="absolute bottom-[-20%] left-[8%] h-[55vmax] w-[55vmax] rounded-full opacity-20 blur-[120px] [animation:drift_22s_ease-in-out_infinite_reverse] [background:radial-gradient(circle,rgba(139,124,246,0.14),transparent_60%)]" />
      <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
