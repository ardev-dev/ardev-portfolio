"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { catalog, catalogStats, type Work, type WorkGroup } from "@/lib/data";
import { Shell } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useDeck } from "@/components/site/DeckContext";
import { brandOf, Logo, type Brand } from "@/components/site/work/brand";
import { Mockup } from "@/components/site/work/Mockup";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

/** مدّة الشريحة الواحدة عند التشغيل التلقائي. */
const SLIDE_MS = 6000;
const EASE = "cubic-bezier(0.22,1,0.36,1)";

type Slide = { work: Work; group: WorkGroup; brand: Brand; n: number };

/**
 * عرض الأعمال: كل المشاريع في نافذة واحدة.
 *
 * كانت الصفحة فهرساً نصّياً طويلاً يُمرَّر؛ صارت نافذة تعرض مشروعاً واحداً في
 * كل مرّة بتصميمه، وتحتها شريط يضمّ كل المشاريع للقفز إلى أيٍّ منها.
 *
 * ⚠️ **الحقيقي والمصمَّم لا يختلطان.** المشروع الذي له شعار ولقطات حقيقية
 * يعرضها كما هي. والذي ليس له (خلفيات، حِزم، أدوات، مشاريع قديمة بلا أصول) يأخذ
 * شعاراً ونموذج تصميم مصنوعين هنا — بطلب المالك — وتظهر عليه شارة «تصوّر
 * تصميمي»، فلا يُقرأ النموذج على أنّه لقطة من المنتج.
 */
export function SystemsPage() {
  const { t, lang } = useLang();
  const { pages, index } = useDeck();
  const reduce = useReducedMotion();
  const rtl = lang === "ar";

  const slides = useMemo<Slide[]>(
    () =>
      catalog
        .flatMap((group) => group.items.map((work) => ({ work, group, brand: brandOf(work, group.id) })))
        .map((s, n) => ({ ...s, n })),
    []
  );
  const total = slides.length;

  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const active = pages[index]?.id === "work";
  const cur = slides[i]!;

  const go = useCallback((next: number) => setI(((next % total) + total) % total), [total]);
  const step = useCallback((d: number) => setI((c) => (((c + d) % total) + total) % total), [total]);

  // رابط مباشر إلى مشروع بعينه: ‎/?project=maskani#work
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("project")?.toLowerCase();
    if (!q) return;
    const hit = slides.find((s) => s.work.name.toLowerCase().startsWith(q));
    if (hit) setI(hit.n);
  }, [slides]);

  // الأسهم الأفقية للعرض؛ الرأسية تبقى لقلب صفحات الموقع (Deck).
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      else if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, rtl, step]);

  // السحب الأفقي على النافذة. السحب الرأسي يبقى للموقع.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const p = e.touches[0];
    if (p) touch.current = { x: p.clientX, y: p.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t0 = touch.current;
    touch.current = null;
    const p = e.changedTouches[0];
    if (!t0 || !p) return;
    const dx = p.clientX - t0.x;
    const dy = p.clientY - t0.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    // السحب نحو بداية السطر = التالي (يسار في LTR، يمين في RTL).
    step((dx < 0) !== rtl ? 1 : -1);
  };

  // يُبقي زرّ المشروع النشط ظاهراً في الشريط دون تمرير الصفحة نفسها.
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = rail.current;
    const chip = box?.querySelector<HTMLElement>(`[data-chip="${i}"]`);
    if (!box || !chip) return;
    // بالفرق بين مركزَي الزرّ والشريط على الشاشة — يصحّ في الاتجاهين. (scrollLeft
    // سالب في RTL، فحساب الموضع من offsetLeft كان يُبقي الشريط عند أوّله بالعربية.)
    const c = chip.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    box.scrollBy({ left: c.left + c.width / 2 - (b.left + b.width / 2), behavior: reduce ? "auto" : "smooth" });
  }, [i, reduce]);

  const running = active && playing && !hover && !reduce;
  const name = (w: Work) => (rtl && w.nameAr ? w.nameAr : w.name);
  const Prev = rtl ? ArrowRight : ArrowLeft;
  const Next = rtl ? ArrowLeft : ArrowRight;

  return (
    <Shell wide className="!justify-start gap-5 lg:!justify-center">
      <header className="anim flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <h2 className="font-display text-display text-ink">
          {t({ en: "Everything", ar: "كل ما" })} <Em>{t({ en: "shipped", ar: "بنيتُه" })}</Em>
        </h2>
        <dl className="flex flex-wrap gap-x-7 gap-y-1">
          {catalogStats.map((s) => (
            <div key={s.label.en} className="flex items-baseline gap-1.5">
              <dt className="font-display text-[15px] font-semibold text-ink">
                <span dir="ltr">{s.value}</span>
              </dt>
              <dd className="text-[11px] uppercase tracking-wider text-fg-muted">{t(s.label)}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div
        className="anim window relative overflow-hidden rounded-3xl"
        style={{ "--d": "0.08s" } as React.CSSProperties}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription={t({ en: "slideshow", ar: "عرض شرائح" })}
        aria-label={t({ en: "All projects", ar: "كل المشاريع" })}
      >
        {/* شريط النافذة: أين أنت، وأزرار التحكّم */}
        <div className="window-bar flex items-center gap-3 px-4 py-2.5">
          <span className="hidden gap-1.5 sm:flex" aria-hidden>
            <i className="h-2 w-2 rounded-full bg-white/25" />
            <i className="h-2 w-2 rounded-full bg-white/25" />
            <i className="h-2 w-2 rounded-full bg-white/25" />
          </span>
          <p className="min-w-0 flex-1 truncate text-[12.5px] text-fg-muted sm:text-center">
            <span className="text-ink">{t(cur.group.title)}</span>
            <span className="mx-2 text-fg-faint">·</span>
            <span className="font-mono text-[11px]" dir="ltr">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </p>
          <div className="flex items-center gap-1.5">
            <CtrlButton label={t({ en: "Previous project", ar: "المشروع السابق" })} onClick={() => step(-1)}>
              <Prev size={14} />
            </CtrlButton>
            <CtrlButton
              label={playing ? t({ en: "Pause", ar: "إيقاف مؤقّت" }) : t({ en: "Play", ar: "تشغيل" })}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause size={13} /> : <Play size={13} />}
            </CtrlButton>
            <CtrlButton label={t({ en: "Next project", ar: "المشروع التالي" })} onClick={() => step(1)}>
              <Next size={14} />
            </CtrlButton>
          </div>
        </div>

        {/* الشريحة */}
        <div className="grid grid-cols-[minmax(0,1fr)] items-stretch lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
          <div
            key={`info-${i}`}
            className="order-2 flex min-w-0 flex-col justify-center px-6 py-6 sm:px-9 lg:order-1 lg:py-8"
            style={reduce ? undefined : { animation: `rise-in 0.6s ${EASE} both` }}
          >
            <div className="flex items-center gap-3.5">
              <Logo work={cur.work} brand={cur.brand} size={52} className="shadow-lift" />
              <div className="min-w-0">
                <h3 className="truncate font-display text-h2 text-ink">{name(cur.work)}</h3>
                <p className="mt-0.5 font-mono text-[11px] text-fg-faint" dir="ltr">
                  {rtl ? cur.work.year.replace("Now", "الآن") : cur.work.year}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg">{t(cur.work.kind)}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {cur.work.stack.map((s) => (
                <span key={s} className="glass rounded-lg px-2.5 py-1 font-mono text-[11px] text-fg-muted" dir="ltr">
                  {s}
                </span>
              ))}
            </div>

            {cur.work.href && (
              <a
                href={cur.work.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-7 inline-flex w-fit items-center gap-1 border-b border-white/15 pb-0.5 text-sm text-ink transition-colors hover:border-white/60"
              >
                {t({ en: "Open", ar: "افتحه" })}
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>

          <div
            key={`stage-${i}`}
            className="relative order-1 h-[clamp(250px,42dvh,380px)] min-w-0 px-5 pt-6 sm:px-8 lg:order-2 lg:h-[clamp(300px,calc(100dvh-29rem),600px)] lg:py-7"
            style={reduce ? undefined : { animation: "blur-in 0.65s ease both" }}
          >
            <Stage work={cur.work} brand={cur.brand} title={name(cur.work)} />
            {!real(cur.work) && (
              <span className="glass pointer-events-none absolute end-4 top-4 rounded-full px-2.5 py-1 text-[10.5px] text-fg-muted">
                {t({ en: "Concept mockup", ar: "تصوّر تصميمي" })}
              </span>
            )}
          </div>
        </div>

        {/* تقدّم الشريحة — انتهاؤه هو ما ينقل إلى التالية */}
        <div className="h-[2px] bg-white/[0.06]" aria-hidden>
          {running && (
            <div
              key={i}
              onAnimationEnd={() => step(1)}
              className="h-full bg-white/60"
              style={{
                transformOrigin: rtl ? "right" : "left",
                animation: `show-progress ${SLIDE_MS}ms linear both`,
              }}
            />
          )}
        </div>
      </div>

      {/* الشريط: كل المشاريع، مجموعةً بحسب مجالها */}
      <nav
        className="anim relative"
        style={{ "--d": "0.16s" } as React.CSSProperties}
        aria-label={t({ en: "Projects", ar: "المشاريع" })}
      >
        <div ref={rail} className="mask-fade-x flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {catalog.map((group) => (
            <div key={group.id} className="flex shrink-0 items-center gap-1.5">
              <span className="shrink-0 px-2 text-[10.5px] uppercase tracking-wider text-fg-faint">{t(group.title)}</span>
              {slides
                .filter((s) => s.group.id === group.id)
                .map((s) => {
                  const on = s.n === i;
                  return (
                    <button
                      key={s.work.name}
                      data-chip={s.n}
                      onClick={() => go(s.n)}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] transition-colors",
                        on
                          ? "border-white/35 bg-white/[0.14] text-ink"
                          : "border-white/[0.09] bg-white/[0.03] text-fg-muted hover:border-white/20 hover:text-ink"
                      )}
                    >
                      <Logo work={s.work} brand={s.brand} size={18} />
                      <span className="whitespace-nowrap">{name(s.work)}</span>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </nav>
    </Shell>
  );
}

function CtrlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="glass grid h-8 w-8 place-items-center rounded-full text-fg transition-all hover:scale-105 hover:text-ink"
    >
      {children}
    </button>
  );
}

/** هل للمشروع تصميم حقيقي (لقطات أو لقطة موقع)؟ */
const real = (w: Work) => Boolean(w.shots?.length || w.cover);

/** منصّة العرض: لقطات التطبيق، أو لقطة الموقع، أو نموذج مصمَّم لمن لا لقطات له. */
function Stage({ work, brand, title }: { work: Work; brand: Brand; title: string }) {
  if (work.shots?.length) return <Shots shots={work.shots} title={title} />;
  if (work.cover) return <Cover src={work.cover} title={title} host={work.href?.replace(/^https?:\/\//, "")} />;
  return <Mockup work={work} brand={brand} name={title} />;
}

function Shots({ shots, title }: { shots: string[]; title: string }) {
  const three = shots.slice(0, 3);
  const fan = three.length === 3;
  return (
    <div className="flex h-full items-center justify-center" dir="ltr">
      {three.map((src, k) => {
        // في المروحة: الوسطى أكبر وفي المقدّمة، والجانبيتان مائلتان قليلاً نحو الخارج.
        const mid = !fan || k === 1;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${title} — ${k + 1}`}
            className={cn(
              "w-auto rounded-[18px] border border-white/15 bg-black/40 object-contain shadow-lift sm:rounded-[22px]",
              mid ? "z-10 h-full" : "h-[82%]",
              !fan && k > 0 && "ms-4",
              fan && k === 0 && "-me-12 -rotate-[5deg] sm:-me-8",
              fan && k === 2 && "-ms-12 rotate-[5deg] sm:-ms-8"
            )}
          />
        );
      })}
    </div>
  );
}

function Cover({ src, title, host }: { src: string; title: string; host?: string }) {
  return (
    <div className="grid h-full place-items-center">
      <div className="window flex max-h-full w-full max-w-[640px] flex-col overflow-hidden rounded-xl">
        <div className="window-bar flex items-center gap-1.5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          {host && (
            <span className="mx-auto font-mono text-[11px] text-fg-faint" dir="ltr">
              {host}
            </span>
          )}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} className="min-h-0 w-full flex-1 object-cover object-top" />
      </div>
    </div>
  );
}
