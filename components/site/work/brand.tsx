"use client";

import {
  Bot, BookOpen, Boxes, Braces, Briefcase, Building2, Calculator, ClipboardList, CreditCard, Film, Gamepad2,
  GraduationCap, HardHat, Layers, LayoutDashboard, Library, Link2, MapPin, MessageSquareText, MessagesSquare,
  Newspaper, Package, Palette, Puzzle, QrCode, Receipt, Router, Server, Share2, ShoppingBag, Sparkles, Store,
  Truck, Users, Utensils, Wallet, Workflow, Wrench,
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
  | "listings" | "map" | "ledger" | "checkout" | "feed" | "links" | "shop" | "dashboard" | "services"
  | "lessons" | "table" | "match3" | "ttt" | "words" | "colors" | "pipeline" | "timeline" | "code"
  | "tools" | "menubar" | "messages";
export type Device = "phone" | "web" | "code";
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
  tools: { hue: 48, Icon: Wrench, scene: "tools", device: "web" },
};

/** ما يخالف افتراض مجموعته. المفتاح = بداية الاسم في الفهرس. */
const OVERRIDES: Record<string, Partial<Brand>> = {
  "Mapbox App": { Icon: MapPin },
  "Kushak": { Icon: Store },
  "Alminshar": { Icon: Receipt },
  "Aleuhda": { Icon: CreditCard, scene: "checkout" },
  "Payment gateways": { Icon: CreditCard, scene: "checkout" },
  "KingLink": { Icon: Link2, scene: "links" },
  "Story": { Icon: Newspaper },
  "Wasla": { Icon: Share2, scene: "links" },
  "Mateam": { Icon: Utensils },
  "Danya": { Icon: Store },
  "Moqawlat": { Icon: HardHat, scene: "ledger", device: "phone" },
  "Purete": { Icon: Server, scene: "services", device: "code" },
  "AppProof": { Icon: ClipboardList },
  "Somow": { Icon: LayoutDashboard },
  "Lumi": { Icon: Sparkles },
  "Minasa": { Icon: BookOpen, device: "web", scene: "table" },
  "Library System": { Icon: Library, device: "web", scene: "table" },
  "Jumal": { Icon: Puzzle, scene: "words" },
  "TicTacTonz": { Icon: Gamepad2, scene: "ttt" },
  "Hue Mixer": { Icon: Palette, scene: "colors" },
  "FactForge": { Icon: Bot },
  "CutReact": { Icon: Film, scene: "timeline" },
  "shared_utils": { Icon: Boxes },
  "clean-architecture": { Icon: Layers },
  "hyperpay_flutter_plugin": { Icon: CreditCard },
  "voice_call_core": { Icon: MessageSquareText },
  "CopyPaste": { Icon: ClipboardList, scene: "menubar", device: "code" },
  "WhatsApp Notification Saver": { Icon: MessageSquareText, scene: "messages", device: "phone" },
  "qr": { Icon: QrCode },
  "brainquiz": { Icon: Braces },
  "numwords": { Icon: Calculator },
};

/** إزاحة ثابتة صغيرة من الاسم، فلا تتطابق ألوان مشاريع المجموعة الواحدة. */
function shift(name: string) {
  let h = 0;
  for (let k = 0; k < name.length; k++) h = (h * 31 + name.charCodeAt(k)) >>> 0;
  return (h % 29) - 14;
}

export function brandOf(work: Work, groupId: string): Brand {
  const base = GROUPS[groupId] ?? GROUPS.tools!;
  const key = Object.keys(OVERRIDES).find((k) => work.name.startsWith(k));
  const b = { ...base, ...(key ? OVERRIDES[key] : {}) };
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
