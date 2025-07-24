// Footer3D.tsx
import { motion } from "framer-motion";

export default function Footer3D() {
  return (
    <footer className="w-full text-center py-10 mt-12 text-base text-fuchsia-300 tracking-wide font-mono opacity-90 bg-gradient-to-t from-black via-purple-900/40 to-transparent shadow-[0_-2px_32px_#8b5cf6cc]">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        Fait avec 💜 par SAYATH — 2025
      </motion.div>
    </footer>
  );
}
