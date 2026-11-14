"use client";

import {
  Baby, Bot, BookOpen, Boxes, Braces, Briefcase, Building2, Calculator, CalendarDays, ClipboardList, Code, CreditCard,
  FileText, Film, FolderOpen, Gamepad2, GraduationCap, HardHat, Keyboard, KeyRound, Layers, LayoutDashboard, Library,
  Link2, ListChecks, MapPin, MessageSquareText, MessagesSquare, Newspaper, Package, Palette, PenLine, Puzzle, QrCode,
  Receipt, Router, Ruler, Server, Share2, ShieldCheck, ShoppingBag, Smile, Sparkles, Store, Timer, Truck, Users,
  Utensils, Wallet, Watch, Workflow, Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Work } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * هوية المشروع في عرض الأعمال: لونه، وأيقونته، ونوع نموذجه.
 *
 * للمشاريع التي لها شعار ولقطات حقيقية لا يُستعمل من هذا إلا اللون. والبقية
 * (خلفيات، حِزم، أدوات، مشاريع قديمة بلا أصول) تأخذ من هنا شعاراً مصمَّماً
 * ونموذج تصميم — وكلاهما موسوم في الواجهة بأنّه «تصوّر» لا لقطة من المنتج.
 */
export type Scene =
  | "listings" | "map" | "ledger" | "admin" | "checkout" | "feed" | "articles" | "links" | "stickers" | "lessons"
  | "match3" | "ttt" | "words" | "colors" | "messages" | "watch"
  | "shop" | "site" | "dashboard" | "table" | "filetools" | "tool"
  | "code" | "pipeline" | "services" | "timeline" | "menubar";
export type Device = "phone" | "watch" | "web" | "code";
export type Brand = { hue: number; Icon: LucideIcon; scene: Scene; device: Device };

const GROUPS: Record<string, Brand> = {
  marketplaces: { hue: 262, Icon: MessagesSquare, scene: "feed", device: "phone" },
  realestate: { hue: 38, Icon: Building2, scene: "listings", device: "phone" },
  logistics: { hue: 168, Icon: Truck, scene: "map", device: "phone" },
  finance: { hue: 150, Icon: Wallet, scene: "ledger", device: "phone" },
  social: { hue: 286, Icon: Users, scene: "feed", device: "phone" },
  commerce: { hue: 342, Icon: ShoppingBag, scene: "shop", device: "web" },
  business: { hue: 214, Icon: Briefcase, scene: "dashboard", device: "web" },
  network: { hue: 192, Icon: Router, scene: "code", device: "code" },
  education: { hue: 24, Icon: GraduationCap, scene: "lessons", device: "phone" },
  games: { hue: 318, Icon: Gamepad2, scene: "match3", device: "phone" },
  ai: { hue: 246, Icon: Workflow, scene: "pipeline", device: "code" },
  oss: { hue: 204, Icon: Package, scene: "code", device: "code" },
  tools: { hue: 48, Icon: Wrench, scene: "tool", device: "web" },
  early: { hue: 28, Icon: FolderOpen, scene: "site", device: "web" },
};

/**
 * ما يخالف افتراض مجموعته. المفتاح = اسم المشروع في الفهرس كاملاً.
 *
 * ⚠️ **مطابقة تامّة لا «يبدأ بـ».** كانت المطابقة بالبادئة، فصار «Wasselak»
 * يلتقط «Wasselak Admin» و«qr» يلتقط أيّ اسمٍ يبدأ بالحرفين — أي أنّ إضافة
 * مشروعٍ جديد تغيّر شكل مشروعٍ قديم بصمت.
 */
const OVERRIDES: Record<string, Partial<Brand>> = {
  // لوحات الإدارة: شاشة أرقام وطلبات
  "Abber Admin": { Icon: ShieldCheck, scene: "admin" },
  "Wisal Admin": { Icon: ShieldCheck, scene: "admin" },
  "Maskani Admin": { Icon: ShieldCheck, scene: "admin" },
  "Azbah Admin": { Icon: ShieldCheck, scene: "admin" },
  "Wasselak Admin": { Icon: ShieldCheck, scene: "admin" },
  "Wasselak Employee": { Icon: Users, scene: "admin" },
  "Wasselak Business": { Icon: Store, scene: "admin" },
  "Abber Blog": { Icon: Newspaper, scene: "articles" },
  "Abber Watch": { Icon: Watch, scene: "watch", device: "watch" },
  // التوصيل
  "Wasselak Core": { Icon: Server, scene: "dashboard", device: "web" },
  "TruckGo Web": { Icon: LayoutDashboard, scene: "dashboard", device: "web" },
  "Mapbox App": { Icon: MapPin },
  // المال
  Kushak: { Icon: Store },
  Alminshar: { Icon: Receipt },
  Aleuhda: { Icon: CreditCard, scene: "checkout" },
  "Payment gateways": { Icon: CreditCard, scene: "checkout" },
  "HyperPay Flutter": { Icon: CreditCard, scene: "checkout" },
  Moqawlat: { Icon: HardHat, scene: "ledger", device: "phone" },
  // الاجتماعية والمحتوى
  KingLink: { Icon: Link2, scene: "links" },
  Wasla: { Icon: Share2, scene: "links" },
  Story: { Icon: Newspaper },
  Blogstory: { Icon: Newspaper, scene: "articles" },
  Mogamo3aty: { Icon: Users, scene: "links" },
  "WhatsApp Stickers": { Icon: Smile, scene: "stickers" },
  // التجارة والأعمال
  Mateam: { Icon: Utensils },
  Danya: { Icon: Store },
  WiseBuy: { Icon: ListChecks, scene: "table" },
  Purete: { Icon: Server, scene: "services", device: "code" },
  AppProof: { Icon: ClipboardList },
  "AppProof Web": { Icon: ClipboardList },
  Somow: { Icon: LayoutDashboard },
  // التعليم
  Lumi: { Icon: Baby },
  Minasa: { Icon: BookOpen, device: "web", scene: "table" },
  "Library System": { Icon: Library, device: "web", scene: "table" },
  // الألعاب
  Jumal: { Icon: Puzzle, scene: "words" },
  TicTacTonz: { Icon: Gamepad2, scene: "ttt" },
  "Hue Mixer": { Icon: Palette, scene: "colors" },
  // الذكاء والأتمتة
  FactForge: { Icon: Bot },
  CutReact: { Icon: Film, scene: "timeline" },
  "Etimad Tenders": { Icon: FileText },
  // الشبكات والحِزم
  "MikroTik Manager Pro": { Icon: Router },
  shared_utils: { Icon: Boxes },
  "clean-architecture": { Icon: Layers },
  hyperpay_flutter_plugin: { Icon: CreditCard },
  voice_call_core: { Icon: MessageSquareText },
  // الأدوات
  CopyPaste: { Icon: ClipboardList, scene: "menubar", device: "code" },
  "WhatsApp Notification Saver": { Icon: MessageSquareText, scene: "messages", device: "phone" },
  Oxfile: { Icon: FileText, scene: "filetools" },
  qr: { Icon: QrCode, hue: 48 },
  colorcraft: { Icon: Palette, hue: 300 },
  typeblaze: { Icon: Keyboard, hue: 18 },
  calcpro: { Icon: Calculator, hue: 140 },
  brainquiz: { Icon: Sparkles, hue: 262 },
  resumeforge: { Icon: FileText, hue: 210 },
  timer: { Icon: Timer, hue: 2 },
  passgen: { Icon: KeyRound, hue: 160 },
  numwords: { Icon: Calculator, hue: 188 },
  codesnap: { Icon: Code, hue: 278 },
  markflow: { Icon: PenLine, hue: 330 },
  units: { Icon: Ruler, hue: 96 },
  age: { Icon: CalendarDays, hue: 230 },
  // البدايات
  "Discussion Boards": { Icon: MessagesSquare, scene: "table" },
  "Django Blog": { Icon: Newspaper },
  "HTML Templates": { Icon: Braces },
  "Services Platform": { Icon: LayoutDashboard, scene: "dashboard" },
  "To-do API": { Icon: ListChecks, scene: "code", device: "code" },
  "Portfolio 2023": { Icon: Briefcase },
  "Company Site": { Icon: Building2 },
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
