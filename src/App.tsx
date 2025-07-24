import CosmicBackground from "./CosmicBackground";
import Menu from "./Menu";
import Hero from "./Hero";
import Carousel3D from "./Carousel3D";
import ProgramSection from "./Program3D";
import ContactSection from "./Contact3D";
import FooterSection from "./Footer3D";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <CosmicBackground />
      <Menu />
      <Hero />
      <section className="relative">
        <div id="carousel" className="absolute -top-36"></div>
        <Carousel3D />
      </section>
      <section className="relative">
        <div id="program" className="absolute -top-36"></div>
        <ProgramSection />
      </section>
      <section className="relative">
        <div id="contact" className="absolute -top-36"></div>
        <ContactSection />
      </section>
      <FooterSection />
    </div>
  );
}
