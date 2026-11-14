"use client";

import type { CSSProperties, ReactNode } from "react";
import { Calculator, FileText, KeyRound, Palette, QrCode, Timer } from "lucide-react";
import type { Work } from "@/lib/data";
import type { Brand } from "@/components/site/work/brand";
import { cn } from "@/lib/utils";

/**
 * نماذج التصميم للمشاريع التي لا لقطات حقيقية لها.
 *
 * ⚠️ **هيكلٌ لا نصوص.** كل ما في النموذج أشرطة وأشكال بلون المشروع، والنصّ
 * الوحيد الحقيقي هو اسم المشروع وما ورد عنه في الفهرس (تقنياته، مراحله).
 * فلا أرقام ولا عبارات مُختلَقة قد تُقرأ على أنّها من المنتج نفسه.
 *
 * كل القياسات بوحدة cqw (نسبةً إلى عرض الجهاز)، فيتمدّد النموذج مع حجمه كصورة.
 */
type Ctx = { a: string; soft: string; panel: string; hue: number; name: string; work: Work };

const cq = (n: number) => `${n}cqw`;

function Bar({ w, o = 0.16, h = 1.9, className }: { w: string; o?: number; h?: number; className?: string }) {
  return <i className={cn("block shrink-0 rounded-full", className)} style={{ width: w, height: cq(h), background: `rgba(255,255,255,${o})` }} />;
}
function Box({ className, style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={cn("shrink-0", className)} style={style}>
      {children}
    </div>
  );
}

/* ── الأجهزة ─────────────────────────────────────────────────────────── */

function Phone({ c, children, className }: { c: Ctx; children: ReactNode; className?: string }) {
  return (
    <div className={cn("aspect-[9/19] shrink-0 border border-white/20 bg-black p-[2.4%] shadow-lift", className)} style={{ borderRadius: "13% / 6.2%" }}>
      {/* الحاوية تُعرّف الوحدة cqw لأبنائها — لا لنفسها — فالحشو على طبقة داخلية. */}
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: "11% / 5.2%", background: `hsl(${c.hue} 30% 8%)`, containerType: "size" }} dir="ltr">
        <div className="relative flex h-full w-full flex-col" style={{ padding: `${cq(13)} ${cq(6)} ${cq(5)}`, gap: cq(3.6) }}>
          {children}
        </div>
        <i className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black" style={{ top: cq(2.6), width: cq(30), height: cq(5) }} />
      </div>
    </div>
  );
}

function AppBar({ c }: { c: Ctx }) {
  return (
    <div className="flex shrink-0 items-center" style={{ gap: cq(2.5) }}>
      <i className="block shrink-0" style={{ width: cq(7.5), height: cq(7.5), borderRadius: cq(2.2), background: c.a }} />
      <span className="min-w-0 flex-1 truncate font-display font-semibold text-white/90" style={{ fontSize: cq(4.4) }}>
        {c.name}
      </span>
      <i className="block shrink-0 rounded-full bg-white/10" style={{ width: cq(7), height: cq(7) }} />
    </div>
  );
}

function TabBar({ c }: { c: Ctx }) {
  return (
    <div className="mt-auto flex shrink-0 items-center justify-around rounded-full bg-white/[0.06]" style={{ height: cq(11), padding: `0 ${cq(4)}` }}>
      {[0, 1, 2, 3].map((k) => (
        <i key={k} className="block rounded-full" style={{ width: cq(k === 0 ? 9 : 5), height: cq(k === 0 ? 2 : 5), background: k === 0 ? c.a : "rgba(255,255,255,0.18)" }} />
      ))}
    </div>
  );
}

function Row({ c, tone = 0.1, pill = false }: { c: Ctx; tone?: number; pill?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" style={{ gap: cq(3) }}>
      <i className="block shrink-0" style={{ width: cq(10), height: cq(10), borderRadius: cq(3), background: `hsl(${c.hue} 60% 60% / ${tone + 0.12})` }} />
      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: cq(1.8) }}>
        <Bar w="70%" o={0.3} />
        <Bar w="45%" />
      </div>
      {pill ? <i className="block shrink-0 rounded-full" style={{ width: cq(13), height: cq(5.5), background: c.soft }} /> : <Bar w="14%" o={0.26} />}
    </div>
  );
}

/* ── مشاهد الهاتف ────────────────────────────────────────────────────── */

function Listings({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      <Box className="rounded-full bg-white/[0.07]" style={{ height: cq(9) }} />
      {[0, 1].map((k) => (
        <Box key={k} className="overflow-hidden bg-white/[0.05]" style={{ borderRadius: cq(4) }}>
          <div className="relative" style={{ height: cq(30), background: `linear-gradient(135deg, hsl(${c.hue + k * 20} 55% 42%), hsl(${c.hue + 40} 45% 22%))` }}>
            <i className="absolute block rounded-full bg-black/45" style={{ top: cq(3), left: cq(3), width: cq(16), height: cq(5.5) }} />
          </div>
          <div className="flex flex-col" style={{ gap: cq(2), padding: cq(3.5) }}>
            <Bar w="62%" o={0.32} />
            <Bar w="38%" />
          </div>
        </Box>
      ))}
      <TabBar c={c} />
    </>
  );
}

function MapScene({ c }: { c: Ctx }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 100% ${cq(11)}, linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / ${cq(11)} 100%, hsl(${c.hue} 26% 10%)`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 211" preserveAspectRatio="none" aria-hidden>
        <path d="M22 150 L22 112 L58 112 L58 70 L80 70 L80 40" fill="none" stroke={c.a} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0 96 L100 82 M40 0 L46 211" stroke="rgba(255,255,255,0.09)" strokeWidth="5" />
        <circle cx="22" cy="150" r="4.2" fill="#fff" />
        <circle cx="80" cy="40" r="5" fill={c.a} stroke="#fff" strokeWidth="1.6" />
      </svg>
      <div className="relative z-10">
        <AppBar c={c} />
      </div>
      <div className="relative z-10 mt-auto flex flex-col bg-black/70 backdrop-blur" style={{ gap: cq(3.4), padding: cq(4.5), borderRadius: cq(5) }}>
        <Row c={c} />
        <i className="block rounded-full" style={{ height: cq(10), background: c.a }} />
      </div>
    </>
  );
}

function Ledger({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      <Box className="flex flex-col justify-between" style={{ height: cq(30), padding: cq(4.5), borderRadius: cq(5), background: `linear-gradient(135deg, hsl(${c.hue} 62% 46%), hsl(${c.hue + 30} 55% 26%))` }}>
        <Bar w="34%" o={0.5} />
        <Bar w="58%" o={0.95} h={4.2} />
        <Bar w="44%" o={0.45} />
      </Box>
      <Box className="flex items-end justify-between bg-white/[0.05]" style={{ height: cq(26), padding: cq(4), borderRadius: cq(4.5) }}>
        {[38, 62, 46, 78, 54, 92, 66].map((h, k) => (
          <i key={k} className="block" style={{ width: cq(6.5), height: `${h}%`, borderRadius: cq(1.6), background: k === 5 ? c.a : "rgba(255,255,255,0.16)" }} />
        ))}
      </Box>
      <Row c={c} />
      <Row c={c} tone={0.02} />
      <Row c={c} />
      <TabBar c={c} />
    </>
  );
}

function Checkout({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      <Box className="relative flex flex-col justify-end" style={{ height: cq(48), padding: cq(5), borderRadius: cq(5.5), gap: cq(2.4), background: `linear-gradient(135deg, hsl(${c.hue} 64% 48%), hsl(${c.hue + 36} 58% 24%))` }}>
        <i className="absolute block bg-white/75" style={{ top: cq(6), left: cq(5), width: cq(11), height: cq(8), borderRadius: cq(1.8) }} />
        <Bar w="72%" o={0.9} h={3} />
        <Bar w="40%" o={0.5} />
      </Box>
      <Box className="flex flex-col items-center" style={{ gap: cq(2.4), padding: `${cq(2)} 0` }}>
        <Bar w="30%" />
        <Bar w="52%" o={0.85} h={5} />
      </Box>
      {[0, 1].map((k) => (
        <Box key={k} className="flex items-center bg-white/[0.06]" style={{ height: cq(13), padding: `0 ${cq(4)}`, borderRadius: cq(4), gap: cq(3), outline: k === 0 ? `1.5px solid ${c.a}` : undefined }}>
          <i className="block rounded-full" style={{ width: cq(5), height: cq(5), background: k === 0 ? c.a : "rgba(255,255,255,0.18)" }} />
          <Bar w="46%" o={0.3} />
        </Box>
      ))}
      <i className="mt-auto block shrink-0 rounded-full" style={{ height: cq(12), background: c.a }} />
    </>
  );
}

function Feed({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      <Box className="flex" style={{ gap: cq(3) }}>
        {[0, 1, 2, 3, 4].map((k) => (
          <i key={k} className="block shrink-0 rounded-full" style={{ width: cq(13), height: cq(13), background: `hsl(${c.hue + k * 24} 50% 45%)`, outline: k < 2 ? `2px solid ${c.a}` : "2px solid transparent", outlineOffset: 2 }} />
        ))}
      </Box>
      {[0, 1].map((k) => (
        <Box key={k} className="flex flex-col bg-white/[0.05]" style={{ borderRadius: cq(4.5), padding: cq(3.5), gap: cq(3) }}>
          <div className="flex items-center" style={{ gap: cq(2.5) }}>
            <i className="block rounded-full" style={{ width: cq(8), height: cq(8), background: `hsl(${c.hue + 70 * k} 50% 50%)` }} />
            <Bar w="36%" o={0.32} />
          </div>
          <div style={{ height: cq(k === 0 ? 32 : 18), borderRadius: cq(3), background: `linear-gradient(135deg, hsl(${c.hue + k * 30} 52% 40%), hsl(${c.hue + 50} 44% 20%))` }} />
          <div className="flex items-center" style={{ gap: cq(2.5) }}>
            <i className="block rounded-full" style={{ width: cq(5), height: cq(5), background: c.a }} />
            <i className="block rounded-full bg-white/20" style={{ width: cq(5), height: cq(5) }} />
            <Bar w="30%" className="ml-auto" />
          </div>
        </Box>
      ))}
    </>
  );
}

function Links({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      <Box className="rounded-full bg-white/[0.07]" style={{ height: cq(9) }} />
      <Box className="flex" style={{ gap: cq(2) }}>
        {[22, 18, 26, 16].map((w, k) => (
          <i key={k} className="block rounded-full" style={{ width: cq(w), height: cq(6.5), background: k === 0 ? c.a : "rgba(255,255,255,0.09)" }} />
        ))}
      </Box>
      {[0, 1, 2, 3, 4].map((k) => (
        <Row key={k} c={c} tone={k % 2 ? 0.02 : 0.16} pill />
      ))}
      <TabBar c={c} />
    </>
  );
}

function Lessons({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      <Box className="flex items-center bg-white/[0.06]" style={{ borderRadius: cq(5), padding: cq(4.5), gap: cq(4) }}>
        <svg viewBox="0 0 40 40" style={{ width: cq(20), height: cq(20) }} aria-hidden>
          <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
          <circle cx="20" cy="20" r="15" fill="none" stroke={c.a} strokeWidth="5" strokeLinecap="round" strokeDasharray="62 95" transform="rotate(-90 20 20)" />
        </svg>
        <div className="flex flex-1 flex-col" style={{ gap: cq(2.4) }}>
          <Bar w="76%" o={0.34} h={2.6} />
          <Bar w="50%" />
        </div>
      </Box>
      <Box className="grid grid-cols-2" style={{ gap: cq(3) }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex flex-col justify-between" style={{ height: cq(27), padding: cq(3.5), borderRadius: cq(4.5), background: k === 0 ? c.a : `hsl(${c.hue + k * 26} 46% 30% / 0.55)` }}>
            <i className="block rounded-full bg-white/75" style={{ width: cq(8), height: cq(8) }} />
            <Bar w="70%" o={0.75} />
          </div>
        ))}
      </Box>
      <Row c={c} />
      <TabBar c={c} />
    </>
  );
}

function Hud({ c }: { c: Ctx }) {
  return (
    <div className="flex shrink-0 items-center justify-between">
      <i className="block rounded-full" style={{ width: cq(24), height: cq(7), background: c.soft }} />
      <span className="truncate px-2 font-display font-semibold text-white/90" style={{ fontSize: cq(4.4) }}>
        {c.name}
      </span>
      <i className="block rounded-full bg-white/10" style={{ width: cq(16), height: cq(7) }} />
    </div>
  );
}

function Match3({ c }: { c: Ctx }) {
  const hues = [0, 48, 130, 205, 285, 330];
  return (
    <>
      <Hud c={c} />
      <Box className="grid grid-cols-6 bg-white/[0.05]" style={{ gap: cq(1.6), padding: cq(3), borderRadius: cq(5), marginTop: cq(6) }}>
        {Array.from({ length: 42 }, (_, k) => {
          const h = hues[(k * 7 + ((k / 6) | 0) * 3) % hues.length]!;
          const lit = k >= 14 && k <= 16;
          return <i key={k} className="block aspect-square" style={{ borderRadius: lit ? "50%" : "32%", background: `hsl(${h} 78% ${lit ? 68 : 54}%)`, boxShadow: lit ? "0 0 0 2px #fff" : "inset 0 -2px 0 rgba(0,0,0,0.25)" }} />;
        })}
      </Box>
      <Box className="mt-auto flex items-center justify-between">
        {[0, 1, 2].map((k) => (
          <i key={k} className="block" style={{ width: cq(24), height: cq(13), borderRadius: cq(4), background: k === 1 ? c.a : "rgba(255,255,255,0.08)" }} />
        ))}
      </Box>
    </>
  );
}

function TicTacToe({ c }: { c: Ctx }) {
  const cells = ["x", "o", "", "", "x", "o", "o", "", "x"];
  return (
    <>
      <Hud c={c} />
      <Box className="grid grid-cols-3" style={{ gap: cq(3), marginTop: cq(10) }}>
        {cells.map((v, k) => (
          <div key={k} className="grid aspect-square place-items-center bg-white/[0.06]" style={{ borderRadius: cq(5), outline: [0, 4, 8].includes(k) ? `2px solid ${c.a}` : undefined }}>
            <svg viewBox="0 0 24 24" style={{ width: "52%", height: "52%" }} aria-hidden>
              {v === "x" && <path d="M5 5 L19 19 M19 5 L5 19" stroke={c.a} strokeWidth="3.4" strokeLinecap="round" />}
              {v === "o" && <circle cx="12" cy="12" r="7.5" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3.2" />}
            </svg>
          </div>
        ))}
      </Box>
      <Box className="mt-auto flex" style={{ gap: cq(3) }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex flex-1 items-center bg-white/[0.06]" style={{ height: cq(14), borderRadius: cq(4.5), padding: `0 ${cq(3)}`, gap: cq(2.5) }}>
            <i className="block rounded-full" style={{ width: cq(7), height: cq(7), background: k === 0 ? c.a : "rgba(255,255,255,0.4)" }} />
            <Bar w="50%" o={0.3} />
          </div>
        ))}
      </Box>
    </>
  );
}

function Words({ c }: { c: Ctx }) {
  // شبكة حروف ثابتة؛ الصفّ المضيء يكتب «جمل» — اسم اللعبة.
  const rows = ["سكبتقد", "رنوعفا", "هـجملث", "يطظصخل", "ذضغشزح", "أءؤةىك"].map((r) => [...r.replace("ـ", "")]);
  return (
    <>
      <Hud c={c} />
      <Box className="grid bg-white/[0.05]" style={{ gridTemplateColumns: "repeat(6, 1fr)", gap: cq(1.6), padding: cq(3), borderRadius: cq(5), marginTop: cq(6) }} >
        {rows.flatMap((r, y) =>
          r.slice(0, 6).map((ch, x) => {
            const lit = y === 2 && x >= 1 && x <= 3;
            return (
              <span key={`${y}-${x}`} className="grid aspect-square place-items-center font-arabic font-semibold" style={{ fontSize: cq(5.4), borderRadius: cq(2.6), color: lit ? "#111" : "rgba(255,255,255,0.78)", background: lit ? c.a : "rgba(255,255,255,0.06)" }}>
                {ch}
              </span>
            );
          })
        )}
      </Box>
      <Box className="flex flex-wrap" style={{ gap: cq(2) }}>
        {[24, 18, 28, 20, 16].map((w, k) => (
          <i key={k} className="block rounded-full" style={{ width: cq(w), height: cq(7), background: k === 0 ? c.soft : "rgba(255,255,255,0.07)" }} />
        ))}
      </Box>
      <TabBar c={c} />
    </>
  );
}

function Colors({ c }: { c: Ctx }) {
  return (
    <>
      <Hud c={c} />
      <Box className="relative mx-auto" style={{ width: cq(62), height: cq(56), marginTop: cq(8) }}>
        <i className="absolute block rounded-full" style={{ left: 0, top: 0, width: cq(38), height: cq(38), background: `hsl(${c.hue} 80% 58%)`, mixBlendMode: "screen" }} />
        <i className="absolute block rounded-full" style={{ right: 0, top: 0, width: cq(38), height: cq(38), background: `hsl(${c.hue + 120} 80% 55%)`, mixBlendMode: "screen" }} />
        <i className="absolute block rounded-full" style={{ left: cq(12), bottom: 0, width: cq(38), height: cq(38), background: `hsl(${c.hue + 240} 80% 58%)`, mixBlendMode: "screen" }} />
      </Box>
      {[72, 40, 58].map((v, k) => (
        <Box key={k} className="relative rounded-full bg-white/10" style={{ height: cq(3) }}>
          <i className="absolute block rounded-full bg-white" style={{ left: `${v}%`, top: cq(-1.6), width: cq(6.2), height: cq(6.2) }} />
          <i className="block h-full rounded-full" style={{ width: `${v}%`, background: `hsl(${c.hue + k * 120} 80% 58%)` }} />
        </Box>
      ))}
      <Box className="mt-auto grid grid-cols-5" style={{ gap: cq(2.4) }}>
        {[0, 1, 2, 3, 4].map((k) => (
          <i key={k} className="block aspect-square" style={{ borderRadius: cq(3), background: `hsl(${c.hue + k * 62} 70% ${46 + k * 4}%)` }} />
        ))}
      </Box>
    </>
  );
}

function Messages({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      {[58, 74, 46, 66, 52].map((w, k) => {
        const recovered = k === 1 || k === 3;
        return (
          <Box key={k} className={cn("flex flex-col", k % 2 ? "self-end" : "self-start")} style={{ width: `${w}%`, gap: cq(2), padding: cq(3.5), borderRadius: cq(4.5), background: recovered ? c.soft : "rgba(255,255,255,0.07)", outline: recovered ? `1.5px dashed ${c.a}` : undefined }}>
            <Bar w="88%" o={0.34} />
            <Bar w="54%" />
          </Box>
        );
      })}
      <TabBar c={c} />
    </>
  );
}

/** شاشتان جانبيتان عامّتان تكمّلان المروحة حول الشاشة الرئيسة. */
function SideList({ c }: { c: Ctx }) {
  return (
    <>
      <AppBar c={c} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Row key={k} c={c} tone={k % 2 ? 0.02 : 0.14} />
      ))}
    </>
  );
}
function SideDetail({ c }: { c: Ctx }) {
  return (
    <>
      <Box style={{ height: cq(46), borderRadius: cq(5), background: `linear-gradient(135deg, hsl(${c.hue} 55% 42%), hsl(${c.hue + 44} 46% 20%))` }} />
      <Bar w="66%" o={0.36} h={3} />
      <Bar w="88%" />
      <Bar w="80%" />
      <Bar w="52%" />
      <Box className="flex" style={{ gap: cq(2.4) }}>
        {[0, 1, 2].map((k) => (
          <i key={k} className="block flex-1" style={{ height: cq(16), borderRadius: cq(4), background: "rgba(255,255,255,0.06)" }} />
        ))}
      </Box>
      <i className="mt-auto block shrink-0 rounded-full" style={{ height: cq(11), background: c.a }} />
    </>
  );
}

/* ── نوافذ الويب والكود ──────────────────────────────────────────────── */

function Win({ c, host, children, dark = false }: { c: Ctx; host?: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className="window flex aspect-[16/10] max-h-full w-full max-w-[660px] flex-col overflow-hidden rounded-xl" dir="ltr">
      <div className="window-bar flex shrink-0 items-center gap-1.5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {host && <span className="mx-auto truncate px-3 font-mono text-[11px] text-fg-faint">{host}</span>}
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden" style={{ containerType: "size", background: dark ? "#0b0b0e" : `hsl(${c.hue} 26% 9%)` }}>
        {children}
      </div>
    </div>
  );
}

function WebNav({ c }: { c: Ctx }) {
  return (
    <div className="flex shrink-0 items-center border-b border-white/[0.07]" style={{ gap: cq(1.6), padding: `${cq(1.6)} ${cq(3)}` }}>
      <i className="block" style={{ width: cq(3), height: cq(3), borderRadius: cq(0.8), background: c.a }} />
      <span className="font-display font-semibold text-white/90" style={{ fontSize: cq(1.9) }}>
        {c.name}
      </span>
      <div className="ml-auto flex items-center" style={{ gap: cq(2) }}>
        <Bar w={cq(6)} h={0.8} />
        <Bar w={cq(6)} h={0.8} />
        <Bar w={cq(6)} h={0.8} />
        <i className="block rounded-full" style={{ width: cq(9), height: cq(3), background: c.a }} />
      </div>
    </div>
  );
}

function Shop({ c }: { c: Ctx }) {
  return (
    <div className="flex h-full flex-col">
      <WebNav c={c} />
      <div className="flex flex-1 flex-col" style={{ padding: cq(3), gap: cq(2.4) }}>
        <div className="flex shrink-0 flex-col justify-center" style={{ height: cq(15), padding: `0 ${cq(3)}`, gap: cq(1.4), borderRadius: cq(1.6), background: `linear-gradient(120deg, hsl(${c.hue} 60% 44%), hsl(${c.hue + 40} 52% 22%))` }}>
          <Bar w="34%" o={0.95} h={1.8} />
          <Bar w="22%" o={0.55} h={0.9} />
        </div>
        <div className="grid flex-1 grid-cols-4" style={{ gap: cq(2) }}>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} className="flex flex-col bg-white/[0.05]" style={{ borderRadius: cq(1.4), padding: cq(1.2), gap: cq(1.1) }}>
              <div className="flex-1" style={{ borderRadius: cq(1), background: `hsl(${c.hue + k * 28} 46% ${30 + k * 4}%)` }} />
              <Bar w="74%" o={0.32} h={0.9} />
              <div className="flex items-center justify-between">
                <Bar w="34%" h={0.9} />
                <i className="block rounded-full" style={{ width: cq(3.6), height: cq(1.9), background: c.a }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ c, table = false }: { c: Ctx; table?: boolean }) {
  return (
    <div className="flex h-full">
      <div className="flex shrink-0 flex-col border-r border-white/[0.07]" style={{ width: "20%", padding: cq(2.2), gap: cq(1.9) }}>
        <div className="flex items-center" style={{ gap: cq(1.2), marginBottom: cq(1.2) }}>
          <i className="block" style={{ width: cq(3), height: cq(3), borderRadius: cq(0.8), background: c.a }} />
          <span className="truncate font-display font-semibold text-white/90" style={{ fontSize: cq(1.8) }}>
            {c.name}
          </span>
        </div>
        {[0, 1, 2, 3, 4].map((k) => (
          <div key={k} className="flex items-center" style={{ gap: cq(1.2), padding: `${cq(0.9)} ${cq(1)}`, borderRadius: cq(1), background: k === 0 ? c.soft : undefined }}>
            <i className="block rounded-full" style={{ width: cq(1.5), height: cq(1.5), background: k === 0 ? c.a : "rgba(255,255,255,0.2)" }} />
            <Bar w={`${46 + ((k * 13) % 30)}%`} o={k === 0 ? 0.5 : 0.16} h={0.9} />
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col" style={{ padding: cq(2.6), gap: cq(2.2) }}>
        {!table && (
          <div className="grid shrink-0 grid-cols-3" style={{ gap: cq(1.8) }}>
            {[0, 1, 2].map((k) => (
              <div key={k} className="flex flex-col bg-white/[0.05]" style={{ borderRadius: cq(1.4), padding: cq(1.6), gap: cq(1.3) }}>
                <Bar w="46%" h={0.8} />
                <Bar w="66%" o={k === 0 ? 0.9 : 0.5} h={1.9} />
              </div>
            ))}
          </div>
        )}
        {table ? (
          <div className="flex shrink-0" style={{ gap: cq(1.2) }}>
            {[9, 7, 11, 8].map((w, k) => (
              <i key={k} className="block rounded-full" style={{ width: cq(w), height: cq(2.6), background: k === 0 ? c.a : "rgba(255,255,255,0.08)" }} />
            ))}
          </div>
        ) : (
          <div className="relative min-h-0 flex-1 overflow-hidden bg-white/[0.04]" style={{ borderRadius: cq(1.4) }}>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d="M0 32 L14 26 L28 29 L42 17 L56 21 L70 10 L84 14 L100 5 L100 40 L0 40 Z" fill={c.soft} />
              <path d="M0 32 L14 26 L28 29 L42 17 L56 21 L70 10 L84 14 L100 5" fill="none" stroke={c.a} strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        )}
        <div className={cn("flex flex-col", table && "min-h-0 flex-1")} style={{ gap: cq(1.3) }}>
          {Array.from({ length: table ? 6 : 3 }, (_, k) => (
            <div key={k} className="flex items-center bg-white/[0.035]" style={{ gap: cq(2), padding: `${cq(1.1)} ${cq(1.6)}`, borderRadius: cq(1) }}>
              <i className="block rounded-full" style={{ width: cq(2.2), height: cq(2.2), background: `hsl(${c.hue + k * 40} 50% 50%)` }} />
              <Bar w="26%" o={0.3} h={0.9} />
              <Bar w="18%" h={0.9} />
              <i className="ml-auto block rounded-full" style={{ width: cq(6), height: cq(1.9), background: k % 3 === 0 ? c.soft : "rgba(255,255,255,0.08)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tools({ c }: { c: Ctx }) {
  const icons = [QrCode, Palette, Calculator, Timer, KeyRound, FileText];
  const names = c.work.name.split(" · ");
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2" style={{ gap: cq(2), padding: cq(3) }}>
      {icons.map((Icon, k) => (
        <div key={k} className="flex flex-col justify-between bg-white/[0.05]" style={{ borderRadius: cq(1.8), padding: cq(2) }}>
          <span className="grid place-items-center" style={{ width: cq(7), height: cq(7), borderRadius: cq(1.8), background: `hsl(${c.hue + k * 55} 62% 50%)` }}>
            <Icon color="#fff" style={{ width: cq(3.8), height: cq(3.8) }} strokeWidth={2} />
          </span>
          {names[k] ? (
            <span className="truncate font-mono text-white/80" style={{ fontSize: cq(1.9) }}>
              {names[k]}
            </span>
          ) : (
            <Bar w="60%" o={0.24} h={0.9} />
          )}
        </div>
      ))}
    </div>
  );
}

function CodeLines({ c, n = 7 }: { c: Ctx; n?: number }) {
  const w = [38, 62, 54, 30, 70, 46, 58, 26, 64];
  return (
    <>
      {Array.from({ length: n }, (_, k) => (
        <div key={k} className="flex items-center" style={{ gap: cq(1.4), paddingLeft: cq(k % 4 === 0 ? 0 : k % 4 === 3 ? 6 : 3) }}>
          <i className="block rounded-full" style={{ width: cq(7), height: cq(1.1), background: k % 3 === 0 ? c.a : `hsl(${c.hue + 150} 60% 62%)`, opacity: 0.85 }} />
          <Bar w={`${w[k % w.length]! / 2}%`} o={0.22} h={1.1} />
          {k % 2 === 0 && <Bar w={`${w[(k + 3) % w.length]! / 4}%`} o={0.1} h={1.1} />}
        </div>
      ))}
    </>
  );
}

/** سطر الأمر الحقيقي لتثبيت الحزمة أو جلب المستودع، مشتقّ من رابطها في الفهرس. */
function command(work: Work) {
  const href = work.href ?? "";
  if (href.includes("pub.dev/packages/")) return `flutter pub add ${href.split("/packages/")[1]}`;
  if (href.includes("github.com/")) return `git clone ${href.replace(/^https?:\/\//, "")}`;
  return work.stack.includes("Python") ? "python main.py" : "flutter run";
}

function Code({ c }: { c: Ctx }) {
  return (
    <div className="flex h-full flex-col" style={{ padding: cq(3.2), gap: cq(1.9) }}>
      <p className="truncate font-mono text-white/85" style={{ fontSize: cq(2.1) }}>
        <span style={{ color: c.a }}>$ </span>
        {command(c.work)}
      </p>
      <Bar w="42%" o={0.12} h={1.1} />
      <div className="flex min-h-0 flex-1 flex-col justify-center bg-white/[0.04]" style={{ borderRadius: cq(1.6), padding: cq(2.6), gap: cq(1.7) }}>
        <CodeLines c={c} />
      </div>
      <div className="flex" style={{ gap: cq(1.4) }}>
        {c.work.stack.map((s) => (
          <span key={s} className="rounded-full font-mono text-white/75" style={{ fontSize: cq(1.7), padding: `${cq(0.5)} ${cq(1.6)}`, background: c.soft }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Node({ c, label, lit = false, w = 15 }: { c: Ctx; label?: string; lit?: boolean; w?: number }) {
  return (
    <div className="grid shrink-0 place-items-center text-center" style={{ width: cq(w), height: cq(8), borderRadius: cq(1.6), background: lit ? c.a : "rgba(255,255,255,0.06)", outline: lit ? undefined : "1px solid rgba(255,255,255,0.1)" }}>
      {label ? (
        <span className="truncate font-mono" style={{ fontSize: cq(1.6), maxWidth: "92%", color: lit ? "#101014" : "rgba(255,255,255,0.8)" }}>
          {label}
        </span>
      ) : (
        <Bar w="56%" o={0.3} h={1} />
      )}
    </div>
  );
}
const Arrow = () => <i className="block shrink-0 bg-white/25" style={{ width: cq(2.2), height: 1.5 }} />;

function Pipeline({ c }: { c: Ctx }) {
  // مراحل FactForge كما وردت في وصفه؛ وغيره يعرض تقنياته محطّاتٍ.
  const stages = c.work.name === "FactForge" ? ["idea", "script", "fact-check", "voice", "render", "publish"] : [...c.work.stack, "", ""].slice(0, 4);
  const w = stages.length > 4 ? 12.6 : 17;
  return (
    <div className="flex h-full flex-col justify-center" style={{ padding: cq(3), gap: cq(3.4) }}>
      <div className="flex items-center justify-center">
        {stages.map((s, k) => (
          <div key={k} className="flex items-center">
            {k > 0 && <Arrow />}
            <Node c={c} label={s || undefined} lit={k < 2} w={w} />
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-white/[0.04]" style={{ borderRadius: cq(1.6), padding: cq(2.4), gap: cq(1.6) }}>
        <CodeLines c={c} n={5} />
      </div>
    </div>
  );
}

function Services({ c }: { c: Ctx }) {
  // «عدّة خدمات Django خلف NGINX، قاعدة بيانات لكل خدمة» — كما في الفهرس.
  return (
    <div className="flex h-full flex-col items-center justify-center" style={{ gap: cq(2.6), padding: cq(3) }}>
      <Node c={c} label="NGINX" lit w={22} />
      <i className="block bg-white/25" style={{ width: 1.5, height: cq(2.4) }} />
      <div className="flex" style={{ gap: cq(3) }}>
        {[0, 1, 2].map((k) => (
          <div key={k} className="flex flex-col items-center" style={{ gap: cq(1.6) }}>
            <Node c={c} label="Django" w={19} />
            <i className="block bg-white/25" style={{ width: 1.5, height: cq(1.8) }} />
            <div className="grid place-items-center" style={{ width: cq(13), height: cq(6.4), borderRadius: "50% / 26%", background: c.soft, outline: `1px solid ${c.a}` }}>
              <span className="font-mono text-white/80" style={{ fontSize: cq(1.5) }}>
                DB
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline({ c }: { c: Ctx }) {
  return (
    <div className="flex h-full flex-col" style={{ padding: cq(3), gap: cq(2.2) }}>
      <div className="flex min-h-0 flex-1" style={{ gap: cq(2.2) }}>
        <div className="grid flex-1 place-items-center" style={{ borderRadius: cq(1.6), background: `linear-gradient(135deg, hsl(${c.hue} 52% 34%), hsl(${c.hue + 50} 46% 16%))` }}>
          <i className="block" style={{ width: 0, height: 0, borderTop: `${cq(2.6)} solid transparent`, borderBottom: `${cq(2.6)} solid transparent`, borderLeft: `${cq(4.4)} solid rgba(255,255,255,0.9)` }} />
        </div>
        <div className="flex flex-col justify-center bg-white/[0.04]" style={{ width: "30%", borderRadius: cq(1.6), padding: cq(2), gap: cq(1.6) }}>
          {[70, 52, 64, 40, 58].map((w, k) => (
            <Bar key={k} w={`${w}%`} o={k === 0 ? 0.34 : 0.14} h={1} />
          ))}
        </div>
      </div>
      {[0, 1, 2].map((t) => (
        <div key={t} className="flex shrink-0 items-center" style={{ height: cq(5.4), gap: cq(0.8) }}>
          {t < 2
            ? [18, 26, 12, 22, 14].map((w, k) => <i key={k} className="block h-full" style={{ width: `${w}%`, borderRadius: cq(0.9), background: (k + t) % 2 ? `hsl(${c.hue + 40 * t} 55% 42%)` : c.a, opacity: k === 3 ? 0.45 : 1 }} />)
            : Array.from({ length: 64 }, (_, k) => <i key={k} className="block flex-1 rounded-full bg-white/30" style={{ height: `${22 + ((k * 37) % 70)}%` }} />)}
        </div>
      ))}
    </div>
  );
}

function Menubar({ c }: { c: Ctx }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-end bg-white/[0.06]" style={{ gap: cq(2.2), padding: `${cq(1.3)} ${cq(2.6)}` }}>
        {[0, 1, 2].map((k) => (
          <i key={k} className="block rounded-full bg-white/30" style={{ width: cq(2.2), height: cq(2.2) }} />
        ))}
        <i className="block" style={{ width: cq(2.8), height: cq(2.8), borderRadius: cq(0.7), background: c.a }} />
        <Bar w={cq(8)} o={0.3} h={1} />
      </div>
      <div className="ml-auto flex min-h-0 flex-1 flex-col bg-white/[0.07]" style={{ width: "46%", margin: `${cq(1.4)} ${cq(4)} ${cq(3)} auto`, borderRadius: cq(1.8), padding: cq(1.8), gap: cq(1.2), outline: "1px solid rgba(255,255,255,0.12)" }}>
        <span className="font-display font-semibold text-white/90" style={{ fontSize: cq(1.9), padding: `0 ${cq(0.8)}` }}>
          {c.name}
        </span>
        {[72, 54, 86, 40, 64, 58].map((w, k) => (
          <div key={k} className="flex items-center" style={{ gap: cq(1.4), padding: `${cq(1)} ${cq(1.2)}`, borderRadius: cq(1), background: k === 0 ? c.soft : undefined }}>
            <Bar w={`${w}%`} o={k === 0 ? 0.5 : 0.2} h={1} />
            <span className="ml-auto font-mono text-white/45" style={{ fontSize: cq(1.5) }}>
              ⌘{k + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── التركيب ─────────────────────────────────────────────────────────── */

const PHONE: Partial<Record<Brand["scene"], (p: { c: Ctx }) => ReactNode>> = {
  listings: Listings, map: MapScene, ledger: Ledger, checkout: Checkout, feed: Feed, links: Links,
  lessons: Lessons, match3: Match3, ttt: TicTacToe, words: Words, colors: Colors, messages: Messages,
};

export function Mockup({ work, brand, name }: { work: Work; brand: Brand; name: string }) {
  const c: Ctx = {
    hue: brand.hue,
    a: `hsl(${brand.hue} 78% 62%)`,
    soft: `hsl(${brand.hue} 70% 60% / 0.18)`,
    panel: `hsl(${brand.hue} 22% 13%)`,
    name,
    work,
  };
  const host = work.href?.replace(/^https?:\/\//, "");

  if (brand.device === "phone") {
    const Main = PHONE[brand.scene] ?? Listings;
    return (
      <div className="flex h-full items-center justify-center" dir="ltr">
        <Phone c={c} className="-me-12 h-[80%] -rotate-[5deg] opacity-80 sm:-me-9">
          <SideList c={c} />
        </Phone>
        <Phone c={c} className="z-10 h-full">
          <Main c={c} />
        </Phone>
        <Phone c={c} className="-ms-12 h-[80%] rotate-[5deg] opacity-80 sm:-ms-9">
          <SideDetail c={c} />
        </Phone>
      </div>
    );
  }

  const web: Partial<Record<Brand["scene"], ReactNode>> = {
    shop: <Shop c={c} />,
    dashboard: <Dashboard c={c} />,
    table: <Dashboard c={c} table />,
    tools: <Tools c={c} />,
    code: <Code c={c} />,
    pipeline: <Pipeline c={c} />,
    services: <Services c={c} />,
    timeline: <Timeline c={c} />,
    menubar: <Menubar c={c} />,
  };
  return (
    <div className="grid h-full place-items-center">
      <Win c={c} host={brand.device === "web" ? host ?? name : undefined} dark={brand.device === "code"}>
        {web[brand.scene] ?? <Dashboard c={c} />}
      </Win>
    </div>
  );
}
