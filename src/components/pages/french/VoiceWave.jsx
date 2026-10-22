import { useEffect, useRef } from "react";

// French page hero effect: thin sound wave lines that ripple around the mouse,
// like a voice being picked up (a nod to the TCF listening and speaking tests).
// Phones and reduced motion get a still wave.

const RED = "232,63,37";
const INK = "43,43,43";
const LINES = [
  { color: RED, alpha: 0.75, amp: 1.0, k: 0.018, speed: 2.2, phase: 0 },
  { color: RED, alpha: 0.35, amp: 0.7, k: 0.024, speed: 2.9, phase: 1.7 },
  { color: INK, alpha: 0.18, amp: 0.5, k: 0.013, speed: 1.6, phase: 3.1 },
];

const VoiceWave = ({ hostRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const interactive =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, t = 0, last = 0;
    let mouse = null;                 // {x, y} inside host, or null
    let focus = { x: 0, y: 0 };       // eased mouse
    let energy = 0;                   // 0 when idle, 1 when the mouse is in

    const resize = () => {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!focus.x) focus = { x: w * 0.7, y: h * 0.8 };
      draw(performance.now());
    };

    const draw = (now) => {
      raf = 0;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      t += dt;
      energy += ((mouse ? 1 : 0) - energy) * 0.06;
      if (mouse) {
        focus.x += (mouse.x - focus.x) * 0.15;
        focus.y += (mouse.y - focus.y) * 0.15;
      }

      ctx.clearRect(0, 0, w, h);
      const baseY = h * 0.84;
      // the closer the mouse is to the wave band, the louder it gets
      const near = Math.max(0, 1 - Math.abs(focus.y - baseY) / (h * 0.9));
      const loud = 6 + 34 * energy * (0.35 + 0.65 * near);
      const spread = Math.max(160, w * 0.18);

      for (const L of LINES) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const env = Math.exp(-(((x - focus.x) / spread) ** 2));
          const idle = 0.12 + 0.1 * Math.sin(x * 0.004 + L.phase); // gentle still shape
          const a = loud * L.amp * (idle + env * energy);
          const y = baseY + a * Math.sin(x * L.k - t * L.speed * (0.3 + energy) + L.phase);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${L.color},${L.alpha})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }

      if (interactive && (mouse || energy > 0.01)) raf = requestAnimationFrame(draw);
      else last = 0;
    };

    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      kick();
    };
    const onLeave = () => { mouse = null; kick(); };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    if (interactive) {
      host.addEventListener("mousemove", onMove);
      host.addEventListener("mouseleave", onLeave);
    }
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
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default VoiceWave;
