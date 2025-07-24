import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Données
const cards = [
  { name: "Luffy", desc: "Maître de l'énergie du futur.", img: "/fake-luffy.jpg" },
  { name: "Goku", desc: "Déchire les limites du réel.", img: "/fake-goku.jpg" },
  { name: "Gojo", desc: "L'œil du néant.", img: "/fake-gojo.jpg" },
  { name: "Tanjiro", desc: "L’instinct du samouraï.", img: "/fake-ichigo.jpg" },
  { name: "Naruto", desc: "L’énergie sans fin.", img: "/fake-naruto.jpg" },
];

const CARD_W = 300;
const CARD_H = 420;
const RADIUS = 430;

export default function Carousel3D() {
  const [current, setCurrent] = useState(0);
  const total = cards.length;

  // Drag mobile
  const dragRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const div = dragRef.current;
    if (!div) return;
    let startX = 0;
    function onStart(e: TouchEvent | MouseEvent) {
      startX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      window.addEventListener("touchmove", onMove);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchend", onEnd);
      window.addEventListener("mouseup", onEnd);
    }
    function onMove(e: TouchEvent | MouseEvent) {
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      if (x - startX > 60) {
        setCurrent((prev) => (prev - 1 + total) % total);
        endDrag();
      } else if (x - startX < -60) {
        setCurrent((prev) => (prev + 1) % total);
        endDrag();
      }
    }
    function onEnd() {
      endDrag();
    }
    function endDrag() {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("mouseup", onEnd);
    }
    div.addEventListener("touchstart", onStart);
    div.addEventListener("mousedown", onStart as any);
    return () => {
      div.removeEventListener("touchstart", onStart);
      div.removeEventListener("mousedown", onStart as any);
      endDrag();
    };
  }, [total]);

  const rotate = (dir: 1 | -1) => setCurrent((prev) => (prev + dir + total) % total);

  return (
    <section className="relative w-full flex flex-col items-center bg-gradient-to-b from-black via-[#1a0020] to-black py-10 min-h-[560px]">
      {/* Titre très rapproché du Hero */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-400 to-fuchsia-500 mb-3 mt-2 uppercase text-center drop-shadow">
        Le Cercle des Héros
      </h2>
      <div
        ref={dragRef}
        className="relative flex flex-col items-center justify-center"
        style={{ touchAction: "pan-y", minHeight: CARD_H + 32 }}
      >
        {/* Manège 3D */}
        <div
          className="relative"
          style={{
            width: RADIUS * 2 + CARD_W,
            height: CARD_H + 32,
            perspective: 1800,
            perspectiveOrigin: "50% 60%",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: 0,
              transform: `translate(-50%, -56%)`,
            }}
          >
            {cards.map((card, i) => {
              const angle = (360 / total) * ((i - current + total) % total);
              const x = RADIUS * Math.sin((angle * Math.PI) / 180);
              const z = RADIUS * Math.cos((angle * Math.PI) / 180);
              const isActive = ((i - current + total) % total) === 0;
              return (
                <motion.div
                  key={card.name}
                  animate={{
                    x,
                    z,
                    rotateY: angle,
                    scale: isActive ? 1.08 : 0.96,
                    filter: isActive
                      ? "brightness(1.09) drop-shadow(0 12px 60px #a084fc80)"
                      : "brightness(0.7) grayscale(30%) blur(1px) opacity(0.83)",
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 19 }}
                  className="absolute"
                  style={{
                    left: -CARD_W / 2,
                    top: -CARD_H / 2,
                    width: CARD_W,
                    height: CARD_H,
                    zIndex: isActive ? 20 : 10 + Math.round(z),
                  }}
                >
                  {/* Carte en full image */}
                  <div
                    className="relative rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-end transition-all duration-200 border-0"
                    style={{
                      width: CARD_W,
                      height: CARD_H,
                      backgroundImage: `url(${card.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      boxShadow: isActive
                        ? "0 16px 80px 0 #a084fc80, 0 0 64px #8b5cf660"
                        : "0 4px 32px 0 #1a0020bb",
                    }}
                  >
                    {/* Overlay dégradé pour la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-end h-full pb-10 px-4">
                      <span className="text-2xl font-black text-fuchsia-100 drop-shadow text-center mb-1">
                        {card.name}
                      </span>
                      <span className="text-base text-purple-100 text-center font-medium drop-shadow">
                        {card.desc}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Contrôles stylisés manga */}
        <div className="flex gap-10 justify-center mt-6">
          <button
            aria-label="Carte précédente"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-fuchsia-800 via-fuchsia-600 to-blue-400 text-white shadow-lg hover:scale-110 hover:shadow-fuchsia-500/30 transition group border-2 border-fuchsia-400/50 active:scale-95 focus:outline-none"
            onClick={() => rotate(-1)}
          >
            <svg
              className="w-8 h-8 mx-auto group-hover:-translate-x-1 transition-transform drop-shadow-md"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15.5 5L8.5 12L15.5 19" />
              <path d="M8.5 12H21" strokeDasharray="4 2" />
            </svg>
          </button>
          <button
            aria-label="Carte suivante"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-fuchsia-500 to-fuchsia-400 text-white shadow-lg hover:scale-110 hover:shadow-blue-500/30 transition group border-2 border-fuchsia-400/50 active:scale-95 focus:outline-none"
            onClick={() => rotate(1)}
          >
            <svg
              className="w-8 h-8 mx-auto group-hover:translate-x-1 transition-transform drop-shadow-md"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 5L15.5 12L8.5 19" />
              <path d="M15.5 12H3" strokeDasharray="4 2" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-xs text-fuchsia-300 opacity-60">Swipe ou utilise les flèches</div>
      </div>
    </section>
  );
}
