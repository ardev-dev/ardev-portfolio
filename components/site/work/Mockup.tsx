"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { Work } from "@/lib/data";
import type { Brand } from "@/components/site/work/brand";
import { cn } from "@/lib/utils";

/**
 * ما يُعرض لمشروعٍ بلا لقطات حقيقية.
 *
 * ⚠️ **بانر منتج لا شاشة مُتخيَّلة.** كانت هنا واجهات نموذجية كاملة (هواتف ولوحات
 * تحكّم بمحتوى مثاليّ)، فأزالها المالك: واجهةٌ لا تطابق التطبيق تجعل الزائر يظنّ
 * التطبيق نفسه وهمياً. البانر يقدّم المنتج بهويته — شعاره واسمه ووصفه وتقنياته —
 * وكلّ ما فيه من الفهرس، فلا يدّعي شيئاً عن شكل الواجهة.
 *
 * وتبقى ثلاثة مخططات لأنّها مبنية على معلومة حقيقية: نافذة الكود (أمر التثبيت أو
 * README)، وخطّ المراحل، وبنية الخدمات.
 *
 * كل القياسات بوحدة cqw (نسبةً إلى عرض اللوحة)، فيتمدّد الرسم مع حجمه كصورة.
 */
type Ctx = {
  a: string;
  soft: string;
  hue: number;
  name: string;
  work: Work;
  brand: Brand;
  ar: boolean;
  group: string;
  tx: (en: string, ar: string) => string;
};

const cq = (n: number) => `${n}cqw`;

function T({ children, s = 3.2, w = 400, o = 0.9, color, className, mono }: { children: ReactNode; s?: number; w?: number; o?: number; color?: string; className?: string; mono?: boolean }) {
  return (
    <span className={cn("block min-w-0 truncate", mono && "font-mono", className)} style={{ fontSize: cq(s), fontWeight: w, lineHeight: 1.35, color: color ?? `rgba(255,255,255,${o})` }}>
      {children}
    </span>
  );
}

/* ── بانر المنتج ─────────────────────────────────────────────────────── */

function Banner({ c }: { c: Ctx }) {
  const { Icon, points } = c.brand;
  const h = c.hue;
  return (
    <div className="grid h-full place-items-center">
      <div
        className={cn("relative aspect-[16/10] max-h-full w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/15 shadow-lift", c.ar && "font-arabic")}
        style={{
          containerType: "size",
          background: `linear-gradient(135deg, hsl(${h} 62% 30%) 0%, hsl(${h + 26} 58% 17%) 52%, hsl(${h + 48} 52% 9%) 100%)`,
        }}
        dir={c.ar ? "rtl" : "ltr"}
      >
        {/* نقش نقطيّ خافت يكسر استواء التدرّج */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.4px)", backgroundSize: `${cq(3.2)} ${cq(3.2)}`, maskImage: "linear-gradient(105deg, transparent 30%, #000 100%)", WebkitMaskImage: "linear-gradient(105deg, transparent 30%, #000 100%)" }}
          aria-hidden
        />

        {/* الشعار قطعةً مركزية داخل حلقات — في جهة نهاية السطر */}
        <div className="absolute grid place-items-center" style={{ insetInlineEnd: cq(-2), top: "50%", width: cq(46), height: cq(46), transform: "translateY(-50%)" }} aria-hidden>
          {[46, 35, 25].map((d, k) => (
            <i key={d} className="absolute block rounded-full" style={{ width: cq(d), height: cq(d), border: `1px solid rgba(255,255,255,${0.07 + k * 0.05})`, background: k === 2 ? "rgba(255,255,255,0.05)" : undefined }} />
          ))}
          <i className="absolute block rounded-full" style={{ width: cq(2.2), height: cq(2.2), top: cq(5), insetInlineStart: cq(11), background: c.a }} />
          <i className="absolute block rounded-full bg-white/70" style={{ width: cq(1.3), height: cq(1.3), bottom: cq(8), insetInlineEnd: cq(9) }} />
          {c.work.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.work.icon} alt="" className="relative border border-white/25" style={{ width: cq(17), height: cq(17), borderRadius: cq(4.4), boxShadow: `0 ${cq(2)} ${cq(6)} rgba(0,0,0,0.45)` }} />
          ) : (
            <span
              className="relative grid place-items-center border border-white/25"
              style={{ width: cq(17), height: cq(17), borderRadius: cq(4.4), background: `linear-gradient(140deg, hsl(${h} 78% 60%), hsl(${h + 28} 70% 38%))`, boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.4), 0 ${cq(2)} ${cq(6)} rgba(0,0,0,0.45)` }}
            >
              <Icon color="#fff" strokeWidth={1.8} style={{ width: cq(8.6), height: cq(8.6) }} />
            </span>
          )}
        </div>

        {/* النصّ */}
        <div className="relative flex h-full flex-col justify-between" style={{ padding: cq(5.2), width: "62%" }}>
          <span className="self-start rounded-full border border-white/20 bg-black/20" style={{ padding: `${cq(0.7)} ${cq(2)}` }}>
            <T s={1.75} w={600} o={0.85}>
              {c.group}
            </T>
          </span>

          <div>
            <h4 className="font-display text-white" style={{ fontSize: cq(c.name.length > 16 ? 5.2 : c.name.length > 10 ? 6.6 : 8), fontWeight: 700, lineHeight: 1.1, letterSpacing: c.ar ? undefined : "-0.02em" }}>
              {c.name}
            </h4>
            <p className="text-white/80" style={{ marginTop: cq(1.6), fontSize: cq(2.35), lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {c.tx(c.work.kind.en, c.work.kind.ar)}
            </p>
            {points && (
              <div className="grid grid-cols-2" style={{ marginTop: cq(2), gap: `${cq(0.9)} ${cq(2)}` }}>
                {points.map((p) => (
                  <div key={p.en} className="flex items-center" style={{ gap: cq(0.9) }}>
                    <Check className="shrink-0" strokeWidth={2.6} style={{ width: cq(2), height: cq(2), color: c.a }} />
                    <T s={1.9} o={0.9}>
                      {c.tx(p.en, p.ar)}
                    </T>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* الصفّ يتبع اتجاه الصفحة؛ النصّ اللاتيني داخل كل شارة يبقى LTR. */}
          <div className="flex flex-wrap items-center" style={{ gap: cq(1.1) }}>
            {c.work.stack.map((x) => (
              <span key={x} dir="ltr" className="rounded-full bg-white/[0.14]" style={{ padding: `${cq(0.6)} ${cq(1.7)}` }}>
                <T s={1.7} mono o={0.92}>
                  {x}
                </T>
              </span>
            ))}
            <span dir="ltr" className="rounded-full border border-white/20" style={{ padding: `${cq(0.6)} ${cq(1.7)}` }}>
              <T s={1.7} mono o={0.75}>
                {c.ar ? c.work.year.replace("Now", "الآن") : c.work.year}
              </T>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── المخططات المبنية على معلومة حقيقية ──────────────────────────────── */

function Win({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-full place-items-center">
      <div className="window flex aspect-[16/10] max-h-full w-full max-w-[660px] flex-col overflow-hidden rounded-xl" dir="ltr">
        <div className="window-bar flex shrink-0 items-center gap-1.5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#0b0b0e]" style={{ containerType: "size" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** نافذة كود: سطر الأمر الحقيقي، ثم الحزمة في pubspec أو ملفّ README كما يصف المشروعَ فهرسُه. */
function Code({ c }: { c: Ctx }) {
  const href = c.work.href ?? "";
  const pub = href.includes("pub.dev/packages/") ? href.split("/packages/")[1]! : null;
  const cmd = pub ? `flutter pub add ${pub}` : href.includes("github.com/") ? `git clone ${href.replace(/^https?:\/\//, "")}` : c.work.stack.includes("Python") ? "python main.py" : "flutter run";
  return (
    <div className="flex h-full flex-col" style={{ padding: cq(2.8), gap: cq(1.6) }}>
      <div className="flex shrink-0" style={{ gap: cq(1) }}>
        {[pub ? "pubspec.yaml" : "README.md", pub ? "main.dart" : "lib/"].map((x, k) => (
          <span key={x} style={{ padding: `${cq(0.5)} ${cq(1.6)}`, borderRadius: cq(0.9), background: k === 0 ? c.soft : "rgba(255,255,255,0.05)" }}>
            <T s={1.5} mono color={k === 0 ? c.a : undefined} o={0.55}>
              {x}
            </T>
          </span>
        ))}
      </div>
      <T s={1.9} mono>
        <span style={{ color: c.a }}>$ </span>
        {cmd}
      </T>
      <div className="flex min-h-0 flex-1 flex-col justify-center bg-white/[0.04]" style={{ borderRadius: cq(1.6), padding: cq(2.4), gap: cq(1.1) }}>
        {pub ? (
          <>
            <T s={1.8} mono o={0.5}>
              dependencies:
            </T>
            <T s={1.8} mono>
              {"  "}
              <span style={{ color: c.a }}>{pub}</span>: any
            </T>
            <T s={1.8} mono o={0.5}>
              {"# lib/main.dart"}
            </T>
            <T s={1.8} mono>
              <span style={{ color: `hsl(${c.hue + 150} 60% 66%)` }}>import</span> {`'package:${pub}/${pub}.dart';`}
            </T>
          </>
        ) : (
          <>
            <T s={2.4} w={700} mono color={c.a}>
              # {c.work.name}
            </T>
            <T s={1.8} mono o={0.75}>
              {c.work.kind.en}
            </T>
            {c.work.stack.map((x) => (
              <T key={x} s={1.8} mono o={0.6}>
                - {x}
              </T>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Node({ c, label, lit = false, w = 15 }: { c: Ctx; label: string; lit?: boolean; w?: number }) {
  return (
    <div className="grid shrink-0 place-items-center text-center" style={{ width: cq(w), height: cq(8), borderRadius: cq(1.6), background: lit ? c.a : "rgba(255,255,255,0.06)", outline: lit ? undefined : "1px solid rgba(255,255,255,0.1)" }}>
      <T s={1.6} mono w={lit ? 700 : 400} color={lit ? "#101014" : undefined} o={0.8} className="max-w-[92%]">
        {label}
      </T>
    </div>
  );
}

/** مراحل كل خطّ كما وردت في وصفه بالفهرس. */
const STAGES: Record<string, string[]> = {
  FactForge: ["idea", "script", "fact-check", "voice", "render", "publish"],
  "Etimad Tenders": ["track", "booklet", "study", "proposal", "review"],
};

function Pipeline({ c }: { c: Ctx }) {
  const stages = STAGES[c.work.name] ?? c.work.stack;
  const w = stages.length > 5 ? 12.4 : stages.length > 4 ? 14.6 : 17;
  return (
    <div className="flex h-full flex-col justify-center" style={{ padding: cq(3), gap: cq(3) }}>
      <div className="flex items-center justify-center">
        {stages.map((s, k) => (
          <div key={s} className="flex items-center">
            {k > 0 && <i className="block shrink-0 bg-white/25" style={{ width: cq(2.2), height: 1.5 }} />}
            <Node c={c} label={s} lit={k < 2} w={w} />
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-white/[0.04]" style={{ borderRadius: cq(1.6), padding: cq(2.2), gap: cq(0.9) }}>
        {stages.slice(0, 4).map((s, k) => (
          <T key={s} s={1.7} mono o={k < 2 ? 0.8 : 0.4}>
            <span style={{ color: k < 2 ? c.a : undefined }}>{k < 2 ? "✓" : k === 2 ? "…" : " "}</span> {s}
          </T>
        ))}
      </div>
    </div>
  );
}

/** «عدّة خدمات Django خلف NGINX، قاعدة بيانات لكل خدمة» — كما في الفهرس. */
function Services({ c }: { c: Ctx }) {
  return (
    <div className="flex h-full flex-col items-center justify-center" style={{ gap: cq(2.4), padding: cq(3) }}>
      <Node c={c} label="NGINX" lit w={22} />
      <i className="block bg-white/25" style={{ width: 1.5, height: cq(2.2) }} />
      <div className="flex" style={{ gap: cq(3) }}>
        {[0, 1, 2].map((k) => (
          <div key={k} className="flex flex-col items-center" style={{ gap: cq(1.5) }}>
            <Node c={c} label="Django" w={19} />
            <i className="block bg-white/25" style={{ width: 1.5, height: cq(1.7) }} />
            <div className="grid place-items-center" style={{ width: cq(15), height: cq(6.4), borderRadius: "50% / 26%", background: c.soft, outline: `1px solid ${c.a}` }}>
              <T s={1.5} mono o={0.8}>
                Postgres
              </T>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Mockup({ work, brand, name, ar, group }: { work: Work; brand: Brand; name: string; ar: boolean; group: string }) {
  const c: Ctx = {
    hue: brand.hue,
    a: `hsl(${brand.hue} 78% 64%)`,
    soft: `hsl(${brand.hue} 70% 60% / 0.18)`,
    name,
    work,
    brand,
    ar,
    group,
    tx: (en, arText) => (ar ? arText : en),
  };
  if (brand.scene === "code") return <Win><Code c={c} /></Win>;
  if (brand.scene === "pipeline") return <Win><Pipeline c={c} /></Win>;
  if (brand.scene === "services") return <Win><Services c={c} /></Win>;
  return <Banner c={c} />;
}
