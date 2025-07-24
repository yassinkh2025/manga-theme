const Hero = () => {
  return (
    <header className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/gojo-hollow-purple.1920x1080.mp4"
      />
      {/* Overlay lumineux */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-600/15 to-black/60 z-10" />
    </header>
  );
};

export default Hero;
