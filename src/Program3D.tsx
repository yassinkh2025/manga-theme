import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Arc de l'Éveil", desc: "La rencontre du mentor et le début du voyage." },
  { step: "02", title: "Arc de la Maîtrise", desc: "Surmonter les épreuves, révéler sa vraie force." },
  { step: "03", title: "Arc de l’Apothéose", desc: "Atteindre l’apogée, inspirer les autres." },
];

export default function Program3D() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-gradient-to-b from-black/95 via-purple-900/30 to-black/95">
      {/* Titre ultra manga */}
      <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-blue-300 to-cyan-300 drop-shadow-xl tracking-widest text-center mb-3"
          style={{ letterSpacing: ".04em", fontFamily: "'Bangers', 'Gloock', serif" }}>
        L’Initiation du Héros
      </h2>
      <div className="text-lg md:text-2xl text-purple-200/90 font-semibold mb-10 text-center drop-shadow-sm">
        Les trois grandes étapes d’un destin légendaire
      </div>

      {/* Timeline + Cartes */}
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 w-full max-w-5xl justify-center relative">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.13, duration: 0.7, type: "spring" }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-[#291155f2] via-[#7840d7bb] to-[#32005fd8] backdrop-blur-xl rounded-2xl px-5 py-12 flex flex-col items-center shadow-[0_12px_48px_#7c3aed55] min-w-[240px] max-w-[340px] w-full transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_64px_#7c3aed99] mx-auto"
            >
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-6 blur-lg rounded-full bg-fuchsia-800/40 opacity-40 -z-10" />
              <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-fuchsia-200 via-blue-200 to-cyan-300 drop-shadow group-hover:drop-shadow-lg transition-all duration-200">
                {item.step}
              </span>
              <span className="text-xl md:text-2xl text-purple-50 font-extrabold mt-3 mb-2 text-center drop-shadow" style={{fontFamily:"'Bangers','Gloock',serif"}}>
                {item.title}
              </span>
              <span className="text-base md:text-lg text-purple-200 text-center opacity-90 font-medium">
                {item.desc}
              </span>
              <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:shadow-[0_0_32px_12px_rgba(236,72,153,0.24)] group-hover:opacity-100 opacity-0 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Timeline animée sous les cartes */}
        <div className="relative w-full max-w-4xl h-8 md:h-12 mt-8 flex items-center">
          {/* Ligne */}
          <div className="absolute left-7 md:left-0 right-7 md:right-0 top-1/2 h-2 bg-gradient-to-r from-fuchsia-400 via-blue-400 to-cyan-400 rounded-full opacity-25 -translate-y-1/2" />
          {/* Points lumineux */}
          {steps.map((_, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                left: `calc(${(idx / (steps.length - 1)) * 100}% - 16px)`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-300 to-cyan-400 shadow-lg border-2 border-white opacity-85 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
