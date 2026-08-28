"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { L } from "@/lib/data";

type Lang = "en" | "ar";
type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (o: L) => string;
};

const LangContext = createContext<Ctx | null>(null);

/**
 * عزل ثنائي الاتجاه: أي مقطع لاتيني أو رقمي داخل جملة عربية يُغلَّف بـ
 * FSI…PDI. بدونه يخلط خوارزمية bidi ترتيبَ الكلمات المجاورة، فتظهر
 * «إلى App Store وGoogle Play» كأنها «Google Playg App Store إلى».
 */
// النقطة الختامية تبقى خارج العزل لتكون نهاية الجملة العربية لا نهاية الاسم اللاتيني.
const LATIN_RUN = /([A-Za-z0-9][A-Za-z0-9 .,+_/#&:'’-]*[A-Za-z0-9+)]|[A-Za-z0-9])/g;

export function isolateLatin(text: string): string {
  return text.replace(LATIN_RUN, "\u2068$1\u2069");
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // نبدأ دائماً بالإنجليزية لمطابقة ما يُصيّره الخادم (لا يوجد عدم تطابق hydration)،
  // ثم نُحمّل تفضيل المستخدم من localStorage بعد الترطيب.
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // أولوية لِمعامل الرابط ?lang= (قابل للمشاركة)، ثم التفضيل المحفوظ.
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "ar" || q === "en") {
        setLang(q);
        return;
      }
      const saved = localStorage.getItem("lang");
      if (saved === "ar" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "ar" ? "en" : "ar")), []);
  const t = useCallback((o: L) => (lang === "ar" ? isolateLatin(o.ar) : o.en), [lang]);

  return (
    <LangContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang must be used within LanguageProvider");
  return c;
}
