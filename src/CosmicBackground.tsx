import { useRef, useEffect } from "react";

const STAR_COLORS = ["#fff", "#a084fc", "#7df9ff", "#fff4db", "#e0b3ff"];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function CosmicBackground({ className = "", style = {} }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<any[]>([]);
  const comets = useRef<any[]>([]);

  const STAR_COUNT = 90;
  const COMET_COUNT = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createStars();
      createComets();
    }

    window.addEventListener("resize", resize);

    function createStars() {
      stars.current = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: randomBetween(0.7, 2.1),
          alpha: randomBetween(0.6, 1),
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          speed: randomBetween(0.005, 0.024),
          twinkle: Math.random() > 0.5,
        });
      }
    }

    function createComets() {
      comets.current = [];
      for (let i = 0; i < COMET_COUNT; i++) {
        const y = randomBetween(height * 0.15, height * 0.75);
        comets.current.push({
          x: randomBetween(-width, 0),
          y,
          length: randomBetween(180, 260),
          alpha: randomBetween(0.10, 0.19),
          width: randomBetween(2, 3.7),
          speed: randomBetween(0.5, 1.3),
          color: "#f6e8ff",
        });
      }
    }

    createStars();
    createComets();

    let frame = 0;
    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#05020a";
      ctx.globalAlpha = 0.88;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      for (const s of stars.current) {
        if (s.twinkle) {
          s.alpha += Math.sin(frame * s.speed + s.x * 0.01) * 0.009;
          if (s.alpha > 1) s.alpha = 1;
          if (s.alpha < 0.5) s.alpha = 0.5;
        }
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      for (const c of comets.current) {
        c.x += c.speed;
        if (c.x - c.length > width) {
          c.x = -c.length;
          c.y = randomBetween(height * 0.2, height * 0.8);
        }
        ctx.save();
        ctx.globalAlpha = c.alpha;
        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.length, c.y);
        grad.addColorStop(0, c.color);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = c.width;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.length, c.y);
        ctx.stroke();
        ctx.restore();
      }

      frame++;
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100%",
        minWidth: "100%",
        ...style,
      }}
      width={typeof window !== "undefined" ? window.innerWidth : 1920}
      height={typeof window !== "undefined" ? window.innerHeight : 1080}
      aria-hidden="true"
    />
  );
}
