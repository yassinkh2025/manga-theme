import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { name: "Héros", href: "#carousel" },
  { name: "Programme", href: "#program" },
  { name: "Contact", href: "#contact" },
];

function MagicIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 48 48" className="drop-shadow-xl">
      <circle cx="24" cy="24" r="20" fill="url(#magic)" />
      <radialGradient id="magic" cx="50%" cy="50%" r="80%">
        <stop offset="0%" stopColor="#fffbe6" />
        <stop offset="70%" stopColor="#9f6fff" />
        <stop offset="100%" stopColor="#281447" />
      </radialGradient>
      <circle cx="24" cy="24" r="13" fill="#fff" fillOpacity="0.15" />
    </svg>
  );
}

export default function Menu() {
  const [showBtn, setShowBtn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBtn(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Bouton magique en bas à droite */}
      <button
        className={`fixed bottom-7 right-7 z-50 p-0 m-0 rounded-full bg-gradient-to-br from-fuchsia-700 via-blue-500 to-indigo-900 shadow-2xl transition-all border-4 border-fuchsia-300/30
          ${showBtn ? "opacity-95 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"}
          ${open ? "ring-4 ring-fuchsia-400/60" : ""}
        `}
        style={{ width: 54, height: 54 }}
        aria-label="Ouvrir le menu"
        onClick={() => setOpen((o) => !o)}
      >
        <MagicIcon />
      </button>
      {/* Menu pop-up */}
      <AnimatePresence>
        {open && showBtn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 340, damping: 25 }}
            className="fixed bottom-24 right-9 z-50 flex flex-col gap-3 bg-black/80 rounded-2xl px-6 py-6 border-2 border-fuchsia-400/60 shadow-2xl backdrop-blur-md"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-bold text-lg text-fuchsia-100 tracking-wide uppercase hover:text-fuchsia-300 transition text-left"
                onClick={() => setOpen(false)}
              >
                {l.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
