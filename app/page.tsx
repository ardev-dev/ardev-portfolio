import { Ambience } from "@/components/Ambience";
import { Sidebar } from "@/components/Sidebar";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Ambience />
      <div className="mx-auto min-h-screen max-w-6xl px-6 sm:px-10 md:px-14 lg:flex lg:justify-between lg:gap-12 lg:px-20">
        <Sidebar />
        <main className="lg:w-[54%] lg:py-24">
          <About />
          <Experience />
          <Work />
          <OpenSource />
          <Contact />
        </main>
      </div>
    </>
  );
}
