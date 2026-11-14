"use client";

import {
  Baby, Bot, BookOpen, Boxes, Braces, Briefcase, Building2, Calculator, CalendarDays, ClipboardList, Code, CreditCard,
  FileText, Film, FolderOpen, Gamepad2, GraduationCap, HardHat, Keyboard, KeyRound, Layers, LayoutDashboard, Library,
  Link2, ListChecks, MapPin, MessageSquareText, MessagesSquare, Newspaper, Package, Palette, PenLine, Puzzle, QrCode,
  Receipt, Router, Ruler, Server, Share2, ShieldCheck, ShoppingBag, Smile, Sparkles, Store, Timer, Truck, Users,
  Utensils, Wallet, Watch, Workflow, Wrench,
  type LucideIcon,
} from "lucide-react";
import type { L, Work } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * هوية المشروع في عرض الأعمال: لونه، وأيقونته، وما يُعرض له حين لا لقطات حقيقية.
 *
 * ⚠️ **لا شاشات مُتخيَّلة.** جُرِّب رسم واجهة نموذجية لكل مشروع بلا لقطات، فقرّر
 * المالك إزالتها: شاشةٌ لا تشبه التطبيق توحي للزائر بأنّ التطبيق نفسه وهميّ.
 * فالمشروع بلا لقطات يأخذ **بانر منتج** — شعاره واسمه ووصفه وتقنياته — وهو
 * لا يدّعي شيئاً عن شكل الواجهة.
 *
 * والاستثناء ما بُني على معلومة حقيقية لا على تخيّل: أمر تثبيت الحزمة، ومراحل
 * خطّ الإنتاج كما في وصفه، وبنية الخدمات كما في مستودعها.
 */
export type Scene = "banner" | "code" | "pipeline" | "services";
export type Brand = {
  hue: number;
  Icon: LucideIcon;
  scene: Scene;
  /** مكوّنات حقيقية تُعرض في البانر — من المشروع نفسه لا من التخمين. */
  points?: L[];
};

const GROUPS: Record<string, Brand> = {
  marketplaces: { hue: 262, Icon: MessagesSquare, scene: "banner" },
  realestate: { hue: 38, Icon: Building2, scene: "banner" },
  logistics: { hue: 168, Icon: Truck, scene: "banner" },
  finance: { hue: 150, Icon: Wallet, scene: "banner" },
  social: { hue: 286, Icon: Users, scene: "banner" },
  commerce: { hue: 342, Icon: ShoppingBag, scene: "banner" },
  business: { hue: 214, Icon: Briefcase, scene: "banner" },
  network: { hue: 192, Icon: Router, scene: "code" },
  education: { hue: 24, Icon: GraduationCap, scene: "banner" },
  games: { hue: 318, Icon: Gamepad2, scene: "banner" },
  ai: { hue: 246, Icon: Workflow, scene: "banner" },
  oss: { hue: 204, Icon: Package, scene: "code" },
  tools: { hue: 48, Icon: Wrench, scene: "banner" },
  early: { hue: 28, Icon: FolderOpen, scene: "banner" },
};

/**
 * ما يخالف افتراض مجموعته. المفتاح = اسم المشروع في الفهرس كاملاً.
 *
 * ⚠️ **مطابقة تامّة لا «يبدأ بـ».** كانت المطابقة بالبادئة، فصار «Wasselak»
 * يلتقط «Wasselak Admin» و«qr» يلتقط أيّ اسمٍ يبدأ بالحرفين — أي أنّ إضافة
 * مشروعٍ جديد تغيّر شكل مشروعٍ قديم بصمت.
 */
const OVERRIDES: Record<string, Partial<Brand>> = {
  // لوحات الإدارة والتطبيقات الفرعية
  "Abber Admin": { Icon: ShieldCheck },
  "Wisal Admin": { Icon: ShieldCheck },
  "Maskani Admin": { Icon: ShieldCheck },
  "Azbah Admin": { Icon: ShieldCheck },
  "Wasselak Admin": { Icon: ShieldCheck },
  "Wasselak Employee": { Icon: Users },
  "Wasselak Business": { Icon: Store },
  "Abber Blog": { Icon: Newspaper },
  "Abber Watch": { Icon: Watch },
  // التوصيل
  "Wasselak Core": { Icon: Server },
  "TruckGo Web": { Icon: LayoutDashboard },
  "Mapbox App": { Icon: MapPin },
  // المال
  Kushak: { Icon: Store },
  Alminshar: { Icon: Receipt },
  Aleuhda: { Icon: CreditCard },
  "Payment gateways": { Icon: CreditCard },
  "HyperPay Flutter": { Icon: CreditCard },
  Moqawlat: { Icon: HardHat },
  // الاجتماعية والمحتوى
  KingLink: { Icon: Link2 },
  Wasla: { Icon: Share2 },
  Story: { Icon: Newspaper },
  Blogstory: { Icon: Newspaper },
  Mogamo3aty: { Icon: Users },
  "WhatsApp Stickers": { Icon: Smile },
  // التجارة والأعمال
  Mateam: { Icon: Utensils },
  Danya: { Icon: Store },
  WiseBuy: { Icon: ListChecks },
  // بنية الخدمات كما في مستودعها: NGINX أمام عدّة خدمات Django، قاعدة بيانات لكل خدمة.
  Purete: { Icon: Server, scene: "services" },
  AppProof: { Icon: ClipboardList },
  "AppProof Web": { Icon: ClipboardList },
  Somow: { Icon: LayoutDashboard },
  // التعليم
  Lumi: { Icon: Baby },
  Minasa: { Icon: BookOpen },
  "Library System": { Icon: Library },
  // الألعاب
  Jumal: { Icon: Puzzle },
  TicTacTonz: { Icon: Gamepad2 },
  "Hue Mixer": { Icon: Palette },
  // الذكاء والأتمتة — المراحل كما وردت في وصف كل خطّ
  FactForge: { Icon: Bot, scene: "pipeline" },
  "Etimad Tenders": { Icon: FileText, scene: "pipeline" },
  CutReact: { Icon: Film },
  // الشبكات والحِزم
  "MikroTik Manager Pro": { Icon: Router },
  shared_utils: { Icon: Boxes },
  "clean-architecture": { Icon: Layers },
  hyperpay_flutter_plugin: { Icon: CreditCard },
  voice_call_core: { Icon: MessageSquareText },
  // الأدوات
  CopyPaste: { Icon: ClipboardList },
  "WhatsApp Notification Saver": { Icon: MessageSquareText },
  // أسماء الأدوات من ملفّات ترجمة Oxfile نفسها.
  Oxfile: {
    Icon: FileText,
    points: [
      { en: "Merge PDF", ar: "دمج PDF" },
      { en: "Split PDF", ar: "تقسيم PDF" },
      { en: "Compress PDF", ar: "ضغط PDF" },
      { en: "PDF to Word", ar: "PDF إلى Word" },
      { en: "Rotate PDF", ar: "تدوير PDF" },
      { en: "Protect PDF", ar: "حماية PDF" },
    ],
  },
  "QR Generator": { Icon: QrCode, hue: 48 },
  ColorCraft: { Icon: Palette, hue: 300 },
  TypeBlaze: { Icon: Keyboard, hue: 18 },
  CalcPro: { Icon: Calculator, hue: 140 },
  BrainQuiz: { Icon: Sparkles, hue: 262 },
  ResumeForge: { Icon: FileText, hue: 210 },
  TimerPro: { Icon: Timer, hue: 2 },
  PassGen: { Icon: KeyRound, hue: 160 },
  NumWords: { Icon: Calculator, hue: 188 },
  CodeSnap: { Icon: Code, hue: 278 },
  MarkFlow: { Icon: PenLine, hue: 330 },
  "Units Converter": { Icon: Ruler, hue: 96 },
  AgeBlaze: { Icon: CalendarDays, hue: 230 },
  // البدايات
  "Discussion Boards": { Icon: MessagesSquare },
  "Django Blog": { Icon: Newspaper },
  "HTML Templates": { Icon: Braces },
  "Services Platform": { Icon: LayoutDashboard },
  "To-do API": { Icon: ListChecks, scene: "code" },
  "Portfolio 2023": { Icon: Briefcase },
  "Al-Mashriqi Furniture": { Icon: Building2 },
};

/** إزاحة ثابتة صغيرة من الاسم، فلا تتطابق ألوان مشاريع المجموعة الواحدة. */
function shift(name: string) {
  let h = 0;
  for (let k = 0; k < name.length; k++) h = (h * 31 + name.charCodeAt(k)) >>> 0;
  return (h % 29) - 14;
}

export function brandOf(work: Work, groupId: string): Brand {
  const base = GROUPS[groupId] ?? GROUPS.tools!;
  const b = { ...base, ...(OVERRIDES[work.name] ?? {}) };
  return { ...b, hue: (b.hue + shift(work.name) + 360) % 360 };
}

/** شعار المشروع: الحقيقي إن وُجد، وإلا شارة مصمَّمة بلونه وأيقونة مجاله. */
export function Logo({ work, brand, size = 52, className }: { work: Work; brand: Brand; size?: number; className?: string }) {
  const r = Math.round(size * 0.27);
  if (work.icon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={work.icon}
        alt=""
        width={size}
        height={size}
        loading={size < 30 ? "lazy" : undefined}
        className={cn("shrink-0 border border-white/15", className)}
        style={{ width: size, height: size, borderRadius: r }}
      />
    );
  }
  const { Icon, hue } = brand;
  return (
    <span
      className={cn("grid shrink-0 place-items-center border border-white/20", className)}
      style={{
        width: size,
        height: size,
        borderRadius: r,
        background: `linear-gradient(140deg, hsl(${hue} 72% 56%), hsl(${(hue + 28) % 360} 68% 36%))`,
        boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.35)",
      }}
      aria-hidden
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={size < 30 ? 2.4 : 1.9} color="#fff" />
    </span>
  );
}
