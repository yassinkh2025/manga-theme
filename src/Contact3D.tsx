// Contact3D.tsx
import { motion } from "framer-motion";

export default function Contact3D() {
  return (
    <section className="w-full py-32 flex justify-center items-center bg-gradient-to-b from-black/95 via-fuchsia-900/10 to-black/100">
      <motion.form
        initial={{ y: 60, opacity: 0, scale: 0.95, rotateY: 40 }}
        whileInView={{ y: 0, opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        viewport={{ once: true }}
        className="backdrop-blur-xl bg-gradient-to-t from-[#23014aaf] via-[#701ba9cc] to-[#1b0538a7] rounded-3xl px-10 py-12 shadow-[0_0_64px_#a21caf30] max-w-lg w-full flex flex-col space-y-5"
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-200 to-cyan-400 mb-2">
          Contact
        </h2>
        <input
          className="rounded-lg px-4 py-3 bg-black/30 text-fuchsia-100 placeholder-fuchsia-400 outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
          placeholder="Ton nom"
        />
        <input
          className="rounded-lg px-4 py-3 bg-black/30 text-fuchsia-100 placeholder-fuchsia-400 outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
          placeholder="Ton mail"
          type="email"
        />
        <textarea
          className="rounded-lg px-4 py-3 bg-black/30 text-fuchsia-100 placeholder-fuchsia-400 outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
          placeholder="Ton message"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 rounded-lg px-8 py-3 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-white font-bold uppercase tracking-wider shadow-[0_0_24px_#c084fc90] hover:scale-105 hover:bg-fuchsia-700/80 transition-all duration-200"
        >
          Envoyer
        </button>
      </motion.form>
    </section>
  );
}
