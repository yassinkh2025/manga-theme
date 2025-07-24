import { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détecte mobile (moins de 640px)
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header className="relative w-full h-screen overflow-hidden">
      {/* Vidéo desktop */}
      {!isMobile && (
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/gojo-hollow-purple.1920x1080.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ background: "#05020a" }}
        />
      )}

      {/* Vidéo mobile */}
      {isMobile && (
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/gojo-purple-hollow-technique.720x1280.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ background: "#05020a" }}
        />
      )}

      {/* Overlay lumineux */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-700/10 to-black/75 z-10 pointer-events-none" />
    </header>
  );
};

export default Hero;
