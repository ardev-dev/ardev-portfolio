"use client";

import { useMemo } from "react";
import { Backdrop } from "@/components/site/Backdrop";
import { Nav } from "@/components/site/Nav";
import { Deck } from "@/components/site/Deck";
import { DeckProvider, type Page } from "@/components/site/DeckContext";
import { HeroPage } from "@/components/site/pages/HeroPage";
import { ProjectPage } from "@/components/site/pages/ProjectPage";
import { SystemsPage } from "@/components/site/pages/SystemsPage";
import { MethodPage } from "@/components/site/pages/MethodPage";
import { CraftPage } from "@/components/site/pages/CraftPage";
import { ContactPage } from "@/components/site/pages/ContactPage";
import { projects } from "@/lib/data";

/** المشاريع ذات اللقطات تحصل كلٌّ منها على شريحة كاملة. */
const SHOWCASE = ["abber", "maskani", "wisal", "azbah"];

export default function Home() {
  const pages = useMemo<Page[]>(() => {
    const showcase = SHOWCASE.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);

    return [
      { id: "top", label: { en: "Intro", ar: "البداية" }, node: <HeroPage /> },
      ...showcase.map((p, i) => ({
        id: p.slug,
        label: { en: p.name, ar: p.nameAr ?? p.name },
        node: <ProjectPage p={p} index={i + 1} total={showcase.length} />,
      })),
      {
        id: "work",
        label: { en: "Systems", ar: "أنظمة" },
        node: <SystemsPage slugs={["wasselak", "factforge"]} />,
      },
      { id: "info", label: { en: "Approach", ar: "طريقتي" }, node: <MethodPage /> },
      { id: "experience", label: { en: "Experience", ar: "الخبرة" }, node: <CraftPage /> },
      { id: "contact", label: { en: "Contact", ar: "تواصل" }, node: <ContactPage /> },
    ];
  }, []);

  return (
    <>
      <Backdrop />
      <DeckProvider pages={pages}>
        <Nav />
        <Deck />
      </DeckProvider>
    </>
  );
}
