import { useEffect, useRef } from "react";

// Tu peux changer ces couleurs/styles
const PLANETS = [
  { size: 120, x: "8%", y: "30%", color: "#c7a3ff", blur: 24, glow: "#9a7cff" },
  { size: 80, x: "80%", y: "20%", color: "#fff799", blur: 10, glow: "#c4ad48" },
  { size: 60, x: "60%", y: "65%", color: "#6ef3e0", blur: 18, glow: "#2eb0a1" },
  { size: 95, x: "24%", y: "68%", color: "#ffadc5", blur: 16, glow: "#cc5481" },
];

// Optionnel : nébuleuse SVG
function Nebula() {
  return (
    <svg
      width="650"
      height="320"
      viewBox="0 0 650 320"
      fill="none"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 z-0 pointer-events-none"
      style={{ filter: "blur(32px)" }}
    >
      <ellipse cx="310" cy="120" rx="310" ry="80" fill="url(#nebulaGrad)" />
      <defs>
        <radialGradient id="nebulaGrad" cx="0.5" cy="0.5" r="1" fx="0.7" fy="0.3">
          <stop offset="0%" stopColor="#9f74e6" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#34b1e8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2b083b" stopOpacity="0.1" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function CosmicPlanets() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation douce des planètes (petite orbite ou pulser)
  useEffect(() => {
    let id: number;
    function animate() {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const t = Date.now() / 1000 + i * 0.7;
        const r = 8 + i * 4; // rayon orbite
        const angle = Math.sin(t * (0.17 + i * 0.06)) * 0.6 + Math.cos(t * (0.19 + i * 0.03)) * 0.7;
        el.style.transform =
          `translate(-50%, -50%) scale(${1 + 0.05 * Math.sin(t * 0.8 + i)}) `
          + `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`;
      });
      id = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Nebula />
      {PLANETS.map((p, i) => (
        <div
          key={i}
          ref={el => refs.current[i] = el}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 60% 40%, ${p.color}, ${p.glow}80 90%, #18122a 100%)`,
            filter: `blur(${p.blur}px) brightness(1.25) drop-shadow(0 0 40px ${p.glow}80)`,
            opacity: 0.9,
            boxShadow: `0 0 40px 12px ${p.glow}44`,
            zIndex: 2 + i,
          }}
        />
      ))}
    </div>
  );
}
