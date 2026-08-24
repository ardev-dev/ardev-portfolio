import { Background } from "@/components/Background";
import { MouseGlow } from "@/components/MouseGlow";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Work } from "@/components/sections/Work";
import { OpenSource } from "@/components/sections/OpenSource";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Background />
      <MouseGlow />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Work />
        <OpenSource />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
