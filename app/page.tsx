import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Bento } from "@/components/sections/Bento";
import { Work } from "@/components/sections/Work";
import { OpenSource } from "@/components/sections/OpenSource";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Bento />
        <Work />
        <OpenSource />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
