import Menu from "./Menu";
import Hero from "./Hero";
import AboutSection from "./Carousel3D";
import ProgramSection from "./Program3D";
import ContactSection from "./Contact3D";
import FooterSection from "./Footer3D";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <Menu />
      <Hero />

      {/* Héros / Carousel */}
      <section className="relative">
        <div id="carousel" className="absolute -top 50"></div>
        <AboutSection />
      </section>

      {/* Programme */}
      <section className="relative">
        <div id="program" className="absolute -top 42"></div>
        <ProgramSection />
      </section>

      {/* Contact */}
      <section className="relative">
        <div id="contact" className="absolute -top 42"></div>
        <ContactSection />
      </section>

      <FooterSection />
    </div>
  );
}
