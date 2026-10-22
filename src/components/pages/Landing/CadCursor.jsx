import { useEffect, useRef } from "react";

// Hero mouse effect: an AutoCAD style crosshair with live coordinates, and
// grid points (on the hero's existing 60px grid) that swell and turn red
// near the cursor. Desktop with a mouse only; off for reduced motion.
// Also writes --mx / --my (-1..1) on the hero element for parallax.

const GRID = 60;          // matches the hero's CSS grid
const RADIUS = 170;       // influence radius in px
const RED = [232, 63, 37];

const CadCursor = ({ hostRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1, raf = 0;
    let target = null;              // where the mouse is (null = outside)
    let pos = { x: -9999, y: -9999 }; // eased position
    let strength = 0;               // fades in on enter, out on leave

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      kick();
    };

    const draw = () => {
      raf = 0;
      const goal = target ? 1 : 0;
      strength += (goal - strength) * 0.12;
      if (target) {
        pos.x += (target.x - pos.x) * 0.25;
        pos.y += (target.y - pos.y) * 0.25;
      }

      ctx.clearRect(0, 0, w, h);
      if (strength < 0.01) return;

      // Grid points near the cursor
      const x0 = Math.max(0, Math.floor((pos.x - RADIUS) / GRID)) * GRID;
      const y0 = Math.max(0, Math.floor((pos.y - RADIUS) / GRID)) * GRID;
      for (let gx = x0; gx <= pos.x + RADIUS && gx <= w; gx += GRID) {
        for (let gy = y0; gy <= pos.y + RADIUS && gy <= h; gy += GRID) {
          const dx = gx - pos.x, dy = gy - pos.y;
          const d = Math.hypot(dx, dy);
          if (d > RADIUS) continue;
          const t = (1 - d / RADIUS) * strength;   // 0..1
          // pull slightly toward the cursor
          const px = gx - dx * 0.12 * t, py = gy - dy * 0.12 * t;
          const size = 2 + 5 * t * t;
          ctx.fillStyle = `rgba(${RED[0]},${RED[1]},${RED[2]},${0.25 + 0.7 * t})`;
          ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }
      }

      // Crosshair
      const a = 0.35 * strength;
      ctx.strokeStyle = `rgba(${RED[0]},${RED[1]},${RED[2]},${a})`;
      ctx.lineWidth = 1;
      const gap = 10;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(pos.y) + 0.5); ctx.lineTo(pos.x - gap, Math.round(pos.y) + 0.5);
      ctx.moveTo(pos.x + gap, Math.round(pos.y) + 0.5); ctx.lineTo(w, Math.round(pos.y) + 0.5);
      ctx.moveTo(Math.round(pos.x) + 0.5, 0); ctx.lineTo(Math.round(pos.x) + 0.5, pos.y - gap);
      ctx.moveTo(Math.round(pos.x) + 0.5, pos.y + gap); ctx.lineTo(Math.round(pos.x) + 0.5, h);
      ctx.stroke();

      // Pickbox
      ctx.strokeStyle = `rgba(${RED[0]},${RED[1]},${RED[2]},${0.9 * strength})`;
      ctx.strokeRect(Math.round(pos.x - 5) + 0.5, Math.round(pos.y - 5) + 0.5, 10, 10);

      // Coordinates, in grid units like a drawing
      const label = `X ${(pos.x / GRID).toFixed(2)}   Y ${((h - pos.y) / GRID).toFixed(2)}`;
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      const tw = ctx.measureText(label).width;
      const lx = Math.min(pos.x + 14, w - tw - 14);
      const ly = pos.y + 30 > h - 8 ? pos.y - 16 : pos.y + 28;
      ctx.fillStyle = `rgba(255,255,255,${0.9 * strength})`;
      ctx.fillRect(lx - 5, ly - 11, tw + 10, 16);
      ctx.strokeStyle = `rgba(${RED[0]},${RED[1]},${RED[2]},${0.5 * strength})`;
      ctx.strokeRect(lx - 4.5, ly - 10.5, tw + 9, 15);
      ctx.fillStyle = `rgba(43,43,43,${0.85 * strength})`;
      ctx.fillText(label, lx, ly);

      const settled =
        (!target && strength < 0.01) ||
        (target && Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3 && strength > 0.99);
      if (!settled) kick();
    };

    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (!target) { pos = { x, y }; }
      target = { x, y };
      host.style.setProperty("--mx", ((x / r.width) * 2 - 1).toFixed(3));
      host.style.setProperty("--my", ((y / r.height) * 2 - 1).toFixed(3));
      kick();
    };
    const onLeave = () => {
      target = null;
      host.style.setProperty("--mx", "0");
      host.style.setProperty("--my", "0");
      kick();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, [hostRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-20"
    />
  );
};

export default CadCursor;
