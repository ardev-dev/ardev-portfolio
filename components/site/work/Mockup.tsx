"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDownLeft, ArrowLeftRight, ArrowUpRight, BarChart3, Bath, BedDouble, Bell, BookOpen, Bookmark, Calendar, Check,
  ChevronLeft, ChevronRight, CircleHelp, Download, FileText, Globe, Hash, Heart, House, Image as ImageIcon,
  LayoutDashboard, Lock, MapPin, MessageCircle, Moon, Pause, Phone as PhoneIcon, Play, Plus, RotateCw, Scissors,
  Search, Settings, Share2, ShoppingBag, ShoppingCart, Shuffle, Smile, Sparkles, Star, Type, Undo2, User, Users,
  Wallet, X, Zap,
  type LucideIcon,
} from "lucide-react";
import type { Work } from "@/lib/data";
import type { Brand } from "@/components/site/work/brand";
import { cn } from "@/lib/utils";

/**
 * نماذج التصميم للمشاريع التي لا لقطات حقيقية لها.
 *
 * كل شاشة واجهة كاملة العناصر: عناوين وأيقونات وأزرار وقوائم، بمحتوى نموذجي
 * يناسب نوع المشروع. وهي موسومة في العرض بشارة «تصوّر تصميمي» لأنّها ليست لقطات
 * من المنتج — والمحتوى فيها مثالٌ للشكل، لا بياناتٌ من المشروع.
 *
 * كل القياسات بوحدة cqw (نسبةً إلى عرض الجهاز)، فيتمدّد النموذج مع حجمه كصورة.
 */
type Ctx = {
  a: string;
  soft: string;
  hue: number;
  name: string;
  work: Work;
  ar: boolean;
  /** نصّ بلغة الواجهة الحالية. */
  tx: (en: string, ar: string) => string;
};
type SceneFC = (p: { c: Ctx }) => ReactNode;

const cq = (n: number) => `${n}cqw`;

function T({ children, s = 3.2, w = 400, o = 0.9, color, className, mono }: { children: ReactNode; s?: number; w?: number; o?: number; color?: string; className?: string; mono?: boolean }) {
  return (
    <span className={cn("block min-w-0 truncate", mono && "font-mono", className)} style={{ fontSize: cq(s), fontWeight: w, lineHeight: 1.35, color: color ?? `rgba(255,255,255,${o})` }}>
      {children}
    </span>
  );
}
function Ic({ i: Icon, s = 4, o = 0.7, color }: { i: LucideIcon; s?: number; o?: number; color?: string }) {
  return <Icon className="shrink-0" strokeWidth={2} style={{ width: cq(s), height: cq(s), color: color ?? `rgba(255,255,255,${o})` }} />;
}
function Box({ className, style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={cn("shrink-0", className)} style={style}>
      {children}
    </div>
  );
}
const grad = (h: number, k = 0) => `linear-gradient(135deg, hsl(${h + k} 58% 46%), hsl(${h + 40 + k} 48% 22%))`;

/* ── الأجهزة ─────────────────────────────────────────────────────────── */

function Phone({ c, children, className }: { c: Ctx; children: ReactNode; className?: string }) {
  return (
    <div className={cn("aspect-[9/19] shrink-0 border border-white/20 bg-black p-[2.4%] shadow-lift", className)} style={{ borderRadius: "13% / 6.2%" }}>
      {/* الحاوية تُعرّف الوحدة cqw لأبنائها — لا لنفسها — فالحشو على طبقة داخلية. */}
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: "11% / 5.2%", background: `hsl(${c.hue} 30% 8%)`, containerType: "size" }}>
        <div className={cn("relative flex h-full w-full flex-col", c.ar && "font-arabic")} style={{ padding: `${cq(13)} ${cq(6)} ${cq(5)}`, gap: cq(3.4) }} dir={c.ar ? "rtl" : "ltr"}>
          {children}
        </div>
        <i className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black" style={{ top: cq(2.6), width: cq(30), height: cq(5) }} />
      </div>
    </div>
  );
}

function AppBar({ c, title }: { c: Ctx; title?: string }) {
  return (
    <div className="flex shrink-0 items-center" style={{ gap: cq(2.5) }}>
      <i className="block shrink-0" style={{ width: cq(7.5), height: cq(7.5), borderRadius: cq(2.2), background: c.a }} />
      <T s={4.4} w={600} className="flex-1">
        {title ?? c.name}
      </T>
      <span className="grid shrink-0 place-items-center rounded-full bg-white/10" style={{ width: cq(8), height: cq(8) }}>
        <Ic i={Bell} s={4} />
      </span>
    </div>
  );
}

function SearchField({ hint }: { hint: string }) {
  return (
    <Box className="flex items-center rounded-full bg-white/[0.07]" style={{ height: cq(9.5), padding: `0 ${cq(3.5)}`, gap: cq(2) }}>
      <Ic i={Search} s={4} o={0.5} />
      <T s={3.1} o={0.45}>
        {hint}
      </T>
    </Box>
  );
}

function Chips({ c, items }: { c: Ctx; items: string[] }) {
  return (
    <Box className="flex" style={{ gap: cq(1.8) }}>
      {items.map((x, k) => (
        <span key={x} className="rounded-full" style={{ padding: `${cq(1.2)} ${cq(3)}`, background: k === 0 ? c.a : "rgba(255,255,255,0.08)" }}>
          <T s={2.8} w={k === 0 ? 600 : 400} color={k === 0 ? "#0c0c10" : undefined} o={0.75}>
            {x}
          </T>
        </span>
      ))}
    </Box>
  );
}

function TabBar({ c, tabs }: { c: Ctx; tabs?: [LucideIcon, string][] }) {
  const items: [LucideIcon, string][] = tabs ?? [
    [House, c.tx("Home", "الرئيسية")],
    [Search, c.tx("Search", "بحث")],
    [Bookmark, c.tx("Saved", "المحفوظات")],
    [User, c.tx("Profile", "حسابي")],
  ];
  return (
    <div className="mt-auto flex shrink-0 items-center justify-around bg-white/[0.06]" style={{ height: cq(13), borderRadius: cq(5) }}>
      {items.map(([Icon, label], k) => (
        <div key={label} className="flex flex-col items-center" style={{ gap: cq(0.6) }}>
          <Ic i={Icon} s={4.4} color={k === 0 ? c.a : undefined} o={0.5} />
          <T s={2.1} color={k === 0 ? c.a : undefined} o={0.5}>
            {label}
          </T>
        </div>
      ))}
    </div>
  );
}

function Tile({ c, icon }: { c: Ctx; icon: LucideIcon }) {
  return (
    <span className="grid shrink-0 place-items-center" style={{ width: cq(10), height: cq(10), borderRadius: cq(3), background: c.soft }}>
      <Ic i={icon} s={5} color={c.a} />
    </span>
  );
}

function Row({ c, icon, title, sub, end, endAccent = false }: { c: Ctx; icon: LucideIcon; title: string; sub: string; end?: ReactNode; endAccent?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" style={{ gap: cq(3) }}>
      <Tile c={c} icon={icon} />
      <div className="min-w-0 flex-1">
        <T s={3.2} w={600}>
          {title}
        </T>
        <T s={2.6} o={0.5}>
          {sub}
        </T>
      </div>
      {typeof end === "string" ? (
        <T s={3} w={600} color={endAccent ? c.a : undefined} className="shrink-0" mono>
          {end}
        </T>
      ) : (
        end
      )}
    </div>
  );
}

function Button({ c, children, ghost = false }: { c: Ctx; children: ReactNode; ghost?: boolean }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full" style={{ height: cq(11), background: ghost ? "rgba(255,255,255,0.08)" : c.a }}>
      <T s={3.3} w={600} color={ghost ? undefined : "#0c0c10"}>
        {children}
      </T>
    </span>
  );
}

function Pill({ c, children, solid = false }: { c: Ctx; children: ReactNode; solid?: boolean }) {
  return (
    <span className="shrink-0 self-start rounded-full" style={{ padding: `${cq(1)} ${cq(2.6)}`, background: solid ? c.a : c.soft }}>
      <T s={2.5} w={600} color={solid ? "#0c0c10" : c.a}>
        {children}
      </T>
    </span>
  );
}

/* ── مشاهد الهاتف ────────────────────────────────────────────────────── */

const Listings: SceneFC = ({ c }) => {
  const cards = [
    [c.tx("3-bedroom apartment", "شقة ثلاث غرف"), c.tx("For sale", "للبيع"), "3", "2"],
    [c.tx("Villa with a garden", "فيلا بحديقة"), c.tx("For rent", "للإيجار"), "5", "4"],
    [c.tx("Family house", "بيت عائلي"), c.tx("For sale", "للبيع"), "4", "3"],
  ] as const;
  return (
    <>
      <AppBar c={c} />
      <SearchField hint={c.tx("Search for a property", "ابحث عن عقار")} />
      <Chips c={c} items={[c.tx("For sale", "للبيع"), c.tx("For rent", "للإيجار"), c.tx("Land", "أراضٍ")]} />
      {cards.map(([title, badge, beds, baths], k) => (
        <Box key={title} className="overflow-hidden bg-white/[0.05]" style={{ borderRadius: cq(4) }}>
          <div className="relative grid place-items-center" style={{ height: cq(19), background: grad(c.hue, k * 24) }}>
            <Ic i={ImageIcon} s={7} o={0.35} />
            <span className="absolute rounded-full bg-black/55" style={{ top: cq(2.5), insetInlineStart: cq(2.5), padding: `${cq(0.8)} ${cq(2.4)}` }}>
              <T s={2.4} w={600}>
                {badge}
              </T>
            </span>
          </div>
          <div style={{ padding: cq(3) }}>
            <T s={3.2} w={600}>
              {title}
            </T>
            <div className="flex items-center" style={{ gap: cq(2.4), marginTop: cq(1) }}>
              <Ic i={MapPin} s={3} o={0.5} />
              <T s={2.6} o={0.55} className="flex-1">
                {c.tx("City centre", "وسط المدينة")}
              </T>
              <Ic i={BedDouble} s={3.2} o={0.5} />
              <T s={2.6} o={0.6}>
                {beds}
              </T>
              <Ic i={Bath} s={3.2} o={0.5} />
              <T s={2.6} o={0.6}>
                {baths}
              </T>
            </div>
          </div>
        </Box>
      ))}
      <TabBar c={c} />
    </>
  );
};

const MapScene: SceneFC = ({ c }) => (
  <>
    <div
      className="absolute"
      style={{
        inset: 0,
        background: `linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 100% ${cq(11)}, linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / ${cq(11)} 100%, hsl(${c.hue} 26% 10%)`,
      }}
    >
      <svg className="h-full w-full" viewBox="0 0 100 211" preserveAspectRatio="none" aria-hidden>
        <path d="M0 96 L100 82 M40 0 L46 211" stroke="rgba(255,255,255,0.09)" strokeWidth="5" />
        <path d="M22 132 L22 104 L58 104 L58 66 L80 66 L80 44" fill="none" stroke={c.a} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="132" r="4.2" fill="#fff" />
        <circle cx="80" cy="44" r="5" fill={c.a} stroke="#fff" strokeWidth="1.6" />
      </svg>
    </div>
    <div className="relative z-10 flex items-center justify-between">
      <span className="rounded-full bg-black/60" style={{ padding: `${cq(1.4)} ${cq(3.2)}` }}>
        <T s={3} w={600}>
          {c.name}
        </T>
      </span>
      <Pill c={c} solid>
        {c.tx("On the way", "في الطريق")}
      </Pill>
    </div>
    <div className="relative z-10 mt-auto flex flex-col bg-black/75" style={{ gap: cq(3.2), padding: cq(4), borderRadius: cq(5) }}>
      <Row
        c={c}
        icon={User}
        title={c.tx("Your captain", "المندوب")}
        sub={c.tx("Arrives in 12 min", "يصل خلال ١٢ دقيقة")}
        end={
          <span className="grid shrink-0 place-items-center rounded-full" style={{ width: cq(9), height: cq(9), background: c.soft }}>
            <Ic i={PhoneIcon} s={4.2} color={c.a} />
          </span>
        }
      />
      <Button c={c}>{c.tx("Track order", "تتبّع الطلب")}</Button>
    </div>
  </>
);

const Ledger: SceneFC = ({ c }) => (
  <>
    <AppBar c={c} />
    <Box className="flex flex-col" style={{ padding: cq(4.5), borderRadius: cq(5), gap: cq(1.4), background: grad(c.hue) }}>
      <T s={2.8} o={0.75}>
        {c.tx("Current balance", "الرصيد الحالي")}
      </T>
      <T s={7} w={700} mono>
        12,450
      </T>
      <div className="flex" style={{ gap: cq(2), marginTop: cq(1) }}>
        {[c.tx("Income", "دخل"), c.tx("Expense", "مصروف")].map((x, k) => (
          <span key={x} className="flex items-center rounded-full bg-black/25" style={{ padding: `${cq(0.9)} ${cq(2.4)}`, gap: cq(1) }}>
            <Ic i={k ? ArrowUpRight : ArrowDownLeft} s={3} o={0.9} />
            <T s={2.5} w={600}>
              {x}
            </T>
          </span>
        ))}
      </div>
    </Box>
    <Box className="flex flex-col bg-white/[0.05]" style={{ padding: cq(3.5), borderRadius: cq(4.5), gap: cq(2) }}>
      <T s={2.8} w={600} o={0.7}>
        {c.tx("This week", "هذا الأسبوع")}
      </T>
      <div className="flex items-end justify-between" style={{ height: cq(15) }}>
        {[38, 62, 46, 78, 54, 92, 66].map((h, k) => (
          <i key={k} className="block" style={{ width: cq(6.5), height: `${h}%`, borderRadius: cq(1.6), background: k === 5 ? c.a : "rgba(255,255,255,0.16)" }} />
        ))}
      </div>
    </Box>
    <Row c={c} icon={ArrowDownLeft} title={c.tx("Sales invoice", "فاتورة مبيعات")} sub={c.tx("Today", "اليوم")} end="+ 320" endAccent />
    <Row c={c} icon={ArrowUpRight} title={c.tx("Operating expense", "مصروف تشغيل")} sub={c.tx("Yesterday", "أمس")} end="− 85" />
    <Row c={c} icon={ArrowDownLeft} title={c.tx("Branch settlement", "تسوية فرع")} sub={c.tx("Yesterday", "أمس")} end="+ 1,200" endAccent />
    <Row c={c} icon={ArrowUpRight} title={c.tx("Staff salary", "راتب موظف")} sub={c.tx("This week", "هذا الأسبوع")} end="− 900" />
    <Row c={c} icon={ArrowDownLeft} title={c.tx("Customer payment", "دفعة عميل")} sub={c.tx("This week", "هذا الأسبوع")} end="+ 640" endAccent />
    <TabBar c={c} tabs={[[House, c.tx("Home", "الرئيسية")], [FileText, c.tx("Invoices", "الفواتير")], [BarChart3, c.tx("Reports", "التقارير")], [User, c.tx("Profile", "حسابي")]]} />
  </>
);

const Admin: SceneFC = ({ c }) => {
  const stats: [LucideIcon, string, string][] = [
    [ShoppingBag, c.tx("Requests", "الطلبات"), "128"],
    [Users, c.tx("Users", "المستخدمون"), "2,340"],
    [MessageCircle, c.tx("Tickets", "البلاغات"), "12"],
    [Wallet, c.tx("Payouts", "التحويلات"), "86"],
  ];
  return (
    <>
      <AppBar c={c} />
      <Box className="grid grid-cols-2" style={{ gap: cq(2.6) }}>
        {stats.map(([Icon, label, n], k) => (
          <div key={label} className="flex flex-col" style={{ padding: cq(3.2), borderRadius: cq(4), gap: cq(1), background: k === 0 ? grad(c.hue) : "rgba(255,255,255,0.055)" }}>
            <Ic i={Icon} s={4.6} color={k === 0 ? "#fff" : c.a} />
            <T s={5.2} w={700} mono>
              {n}
            </T>
            <T s={2.5} o={0.65}>
              {label}
            </T>
          </div>
        ))}
      </Box>
      <Box className="flex flex-col bg-white/[0.05]" style={{ padding: cq(3.2), borderRadius: cq(4.5), gap: cq(2) }}>
        <T s={2.8} w={600} o={0.7}>
          {c.tx("Activity this week", "نشاط الأسبوع")}
        </T>
        <div className="flex items-end justify-between" style={{ height: cq(13) }}>
          {[44, 58, 36, 72, 64, 88, 52].map((h, k) => (
            <i key={k} className="block" style={{ width: cq(6.5), height: `${h}%`, borderRadius: cq(1.6), background: k === 5 ? c.a : "rgba(255,255,255,0.16)" }} />
          ))}
        </div>
      </Box>
      <T s={3} w={600} o={0.75}>
        {c.tx("Latest requests", "أحدث الطلبات")}
      </T>
      <Row c={c} icon={FileText} title={c.tx("Request #1042", "طلب #1042")} sub={c.tx("2 min ago", "منذ دقيقتين")} end={<Pill c={c}>{c.tx("New", "جديد")}</Pill>} />
      <Row c={c} icon={FileText} title={c.tx("Request #1041", "طلب #1041")} sub={c.tx("18 min ago", "منذ ١٨ دقيقة")} end={<Pill c={c}>{c.tx("Review", "مراجعة")}</Pill>} />
      <Row c={c} icon={FileText} title={c.tx("Request #1040", "طلب #1040")} sub={c.tx("1 h ago", "منذ ساعة")} end={<Pill c={c}>{c.tx("Done", "مكتمل")}</Pill>} />
      <TabBar c={c} tabs={[[LayoutDashboard, c.tx("Overview", "اللوحة")], [ShoppingBag, c.tx("Requests", "الطلبات")], [Users, c.tx("Users", "المستخدمون")], [Settings, c.tx("Settings", "الإعدادات")]]} />
    </>
  );
};

const Checkout: SceneFC = ({ c }) => (
  <>
    <AppBar c={c} title={c.tx("Checkout", "الدفع")} />
    <Box className="relative flex flex-col justify-end" style={{ height: cq(44), padding: cq(5), borderRadius: cq(5.5), gap: cq(1), background: grad(c.hue) }}>
      <i className="absolute block bg-white/80" style={{ top: cq(6), insetInlineStart: cq(5), width: cq(11), height: cq(8), borderRadius: cq(1.8) }} />
      <T s={4.4} w={600} mono>
        •••• •••• 4242
      </T>
      <T s={2.6} o={0.7}>
        {c.tx("Card holder", "حامل البطاقة")} · 12/28
      </T>
    </Box>
    <Box className="flex items-baseline justify-between">
      <T s={3} o={0.6}>
        {c.tx("Total", "الإجمالي")}
      </T>
      <T s={6.2} w={700} mono>
        120.00
      </T>
    </Box>
    {["Apple Pay", c.tx("Credit card", "بطاقة ائتمانية")].map((x, k) => (
      <Box key={x} className="flex items-center bg-white/[0.06]" style={{ height: cq(12), padding: `0 ${cq(4)}`, borderRadius: cq(4), gap: cq(3), outline: k === 1 ? `1.5px solid ${c.a}` : undefined }}>
        <i className="block rounded-full" style={{ width: cq(4.6), height: cq(4.6), background: k === 1 ? c.a : "rgba(255,255,255,0.18)" }} />
        <T s={3.1} w={600}>
          {x}
        </T>
      </Box>
    ))}
    <div className="mt-auto flex flex-col">
      <Button c={c}>{c.tx("Pay now", "ادفع الآن")}</Button>
    </div>
  </>
);

const Feed: SceneFC = ({ c }) => {
  const posts = [
    [c.tx("Sara", "سارة"), c.tx("1h", "منذ ساعة"), "24", "8"],
    [c.tx("Omar", "عمر"), c.tx("3h", "منذ ٣ ساعات"), "112", "31"],
    [c.tx("Layla", "ليلى"), c.tx("5h", "منذ ٥ ساعات"), "67", "14"],
  ] as const;
  return (
    <>
      <AppBar c={c} />
      <Box className="flex" style={{ gap: cq(3) }}>
        {[0, 1, 2, 3, 4].map((k) => (
          <span key={k} className="grid shrink-0 place-items-center rounded-full" style={{ width: cq(13), height: cq(13), background: `hsl(${c.hue + k * 24} 50% 45%)`, outline: k < 2 ? `2px solid ${c.a}` : "2px solid transparent", outlineOffset: 2 }}>
            {k === 0 ? <Ic i={Plus} s={5} o={0.95} /> : <Ic i={User} s={5.4} o={0.7} />}
          </span>
        ))}
      </Box>
      {posts.map(([who, when, likes, comments], k) => (
        <Box key={who} className="flex flex-col bg-white/[0.05]" style={{ borderRadius: cq(4.5), padding: cq(3.2), gap: cq(2.6) }}>
          <div className="flex items-center" style={{ gap: cq(2.5) }}>
            <span className="grid place-items-center rounded-full" style={{ width: cq(8), height: cq(8), background: `hsl(${c.hue + 70 * k} 50% 50%)` }}>
              <Ic i={User} s={4.4} o={0.9} />
            </span>
            <T s={3.1} w={600} className="flex-1">
              {who}
            </T>
            <T s={2.4} o={0.45}>
              {when}
            </T>
          </div>
          <div className="grid place-items-center" style={{ height: cq(k === 2 ? 14 : 25), borderRadius: cq(3), background: grad(c.hue, k * 30) }}>
            <Ic i={ImageIcon} s={7} o={0.35} />
          </div>
          <div className="flex items-center" style={{ gap: cq(1.6) }}>
            <Ic i={Heart} s={4} color={c.a} />
            <T s={2.6} o={0.7}>
              {likes}
            </T>
            <span style={{ width: cq(2) }} />
            <Ic i={MessageCircle} s={4} o={0.6} />
            <T s={2.6} o={0.7} className="flex-1">
              {comments}
            </T>
            <Ic i={Share2} s={4} o={0.6} />
          </div>
        </Box>
      ))}
    </>
  );
};

const Articles: SceneFC = ({ c }) => {
  const rows = [
    [c.tx("Latest updates", "أحدث التحديثات"), c.tx("Today", "اليوم")],
    [c.tx("Tips and guidance", "نصائح وإرشادات"), c.tx("Yesterday", "أمس")],
    [c.tx("Questions and answers", "أسئلة وأجوبة"), c.tx("This week", "هذا الأسبوع")],
    [c.tx("Success stories", "قصص نجاح"), c.tx("This week", "هذا الأسبوع")],
    [c.tx("Platform news", "أخبار المنصّة"), c.tx("This month", "هذا الشهر")],
  ];
  return (
    <>
      <AppBar c={c} />
      <Box className="relative flex flex-col justify-end overflow-hidden" style={{ height: cq(42), padding: cq(4), borderRadius: cq(5), gap: cq(1.4), background: grad(c.hue) }}>
        <Pill c={c} solid>
          {c.tx("Featured", "مميّز")}
        </Pill>
        <T s={4} w={700}>
          {c.tx("Getting started guide", "دليل البداية")}
        </T>
        <T s={2.6} o={0.7}>
          {c.tx("5 min read", "قراءة ٥ دقائق")}
        </T>
      </Box>
      {rows.map(([title, when], k) => (
        <Box key={title} className="flex items-center" style={{ gap: cq(3) }}>
          <span className="grid shrink-0 place-items-center" style={{ width: cq(17), height: cq(13), borderRadius: cq(3), background: grad(c.hue, 30 + k * 26) }}>
            <Ic i={BookOpen} s={5} o={0.5} />
          </span>
          <div className="min-w-0 flex-1">
            <T s={3.2} w={600}>
              {title}
            </T>
            <T s={2.5} o={0.5}>
              {when}
            </T>
          </div>
          <Ic i={Bookmark} s={4} o={0.4} />
        </Box>
      ))}
      <TabBar c={c} />
    </>
  );
};

const Links: SceneFC = ({ c }) => {
  const rows: [string, string][] = [
    [c.tx("Developers group", "مجموعة المبرمجين"), c.tx("120 members", "١٢٠ عضواً")],
    [c.tx("City market", "سوق المدينة"), c.tx("860 members", "٨٦٠ عضواً")],
    [c.tx("University students", "طلاب الجامعة"), c.tx("412 members", "٤١٢ عضواً")],
    [c.tx("Travel lovers", "عشّاق السفر"), c.tx("95 members", "٩٥ عضواً")],
    [c.tx("Tech news", "أخبار التقنية"), c.tx("1,240 members", "١٢٤٠ عضواً")],
    [c.tx("Property market", "سوق العقار"), c.tx("530 members", "٥٣٠ عضواً")],
    [c.tx("Deals and offers", "عروض وتخفيضات"), c.tx("2,100 members", "٢١٠٠ عضو")],
    [c.tx("Job openings", "وظائف شاغرة"), c.tx("780 members", "٧٨٠ عضواً")],
  ];
  return (
    <>
      <AppBar c={c} />
      <SearchField hint={c.tx("Search groups", "ابحث عن مجموعة")} />
      <Chips c={c} items={[c.tx("All", "الكل"), "WhatsApp", "Telegram"]} />
      {rows.map(([title, sub]) => (
        <Row key={title} c={c} icon={Users} title={title} sub={sub} end={<Pill c={c}>{c.tx("Join", "انضم")}</Pill>} />
      ))}
      <TabBar c={c} />
    </>
  );
};

const Stickers: SceneFC = ({ c }) => (
  <>
    <AppBar c={c} />
    <Chips c={c} items={[c.tx("All", "الكل"), c.tx("Funny", "مضحكة"), c.tx("Greetings", "تهانٍ")]} />
    {[c.tx("Pack one", "الحزمة الأولى"), c.tx("Pack two", "الحزمة الثانية"), c.tx("Pack three", "الحزمة الثالثة")].map((title, k) => (
      <Box key={title} className="flex flex-col bg-white/[0.05]" style={{ borderRadius: cq(4.5), padding: cq(3.2), gap: cq(2.6) }}>
        <div className="flex items-center justify-between">
          <T s={3.2} w={600}>
            {title}
          </T>
          <T s={2.5} o={0.5}>
            {c.tx("12 stickers", "١٢ ملصقاً")}
          </T>
        </div>
        <div className="grid grid-cols-4" style={{ gap: cq(2) }}>
          {[0, 1, 2, 3].map((j) => (
            <span key={j} className="grid aspect-square place-items-center" style={{ borderRadius: cq(3.4), background: `hsl(${c.hue + (k * 4 + j) * 38} 62% 52%)` }}>
              <Ic i={Smile} s={8} o={0.95} />
            </span>
          ))}
        </div>
        <Button c={c} ghost={k > 0}>
          {c.tx("Add to WhatsApp", "أضف إلى واتساب")}
        </Button>
      </Box>
    ))}
  </>
);

const Lessons: SceneFC = ({ c }) => {
  const tiles: [LucideIcon, string][] = [
    [Type, c.tx("Letters", "الحروف")],
    [Hash, c.tx("Numbers", "الأرقام")],
    [BookOpen, c.tx("Words", "الكلمات")],
    [Sparkles, c.tx("Stories", "القصص")],
  ];
  return (
    <>
      <AppBar c={c} />
      <Box className="flex items-center bg-white/[0.06]" style={{ borderRadius: cq(5), padding: cq(4), gap: cq(3.5) }}>
        <svg viewBox="0 0 40 40" style={{ width: cq(18), height: cq(18) }} aria-hidden>
          <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
          <circle cx="20" cy="20" r="15" fill="none" stroke={c.a} strokeWidth="5" strokeLinecap="round" strokeDasharray="57 95" transform="rotate(-90 20 20)" />
        </svg>
        <div className="min-w-0 flex-1">
          <T s={3.4} w={600}>
            {c.tx("Today's progress", "تقدّمك اليوم")}
          </T>
          <T s={2.7} o={0.55}>
            {c.tx("3 of 5 lessons", "٣ من ٥ دروس")}
          </T>
        </div>
      </Box>
      <Box className="grid grid-cols-2" style={{ gap: cq(3) }}>
        {tiles.map(([Icon, label], k) => (
          <div key={label} className="flex flex-col justify-between" style={{ height: cq(25), padding: cq(3.4), borderRadius: cq(4.5), background: k === 0 ? c.a : `hsl(${c.hue + k * 26} 46% 30% / 0.6)` }}>
            <Ic i={Icon} s={6.4} color={k === 0 ? "#0c0c10" : "#fff"} />
            <T s={3.3} w={600} color={k === 0 ? "#0c0c10" : undefined}>
              {label}
            </T>
          </div>
        ))}
      </Box>
      <T s={3} w={600} o={0.75}>
        {c.tx("Up next", "التالي")}
      </T>
      <Row c={c} icon={Play} title={c.tx("Next lesson", "الدرس التالي")} sub={c.tx("5 minutes", "٥ دقائق")} end={<Ic i={c.ar ? ChevronLeft : ChevronRight} s={4.4} o={0.5} />} />
      <Row c={c} icon={Star} title={c.tx("Weekly challenge", "تحدّي الأسبوع")} sub={c.tx("10 minutes", "١٠ دقائق")} end={<Ic i={c.ar ? ChevronLeft : ChevronRight} s={4.4} o={0.5} />} />
      <Row c={c} icon={RotateCw} title={c.tx("Yesterday's review", "مراجعة الأمس")} sub={c.tx("3 minutes", "٣ دقائق")} end={<Ic i={c.ar ? ChevronLeft : ChevronRight} s={4.4} o={0.5} />} />
      <TabBar c={c} />
    </>
  );
};

function Hud({ c, left, right }: { c: Ctx; left: string; right: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between" dir="ltr">
      <span className="flex items-center rounded-full" style={{ padding: `${cq(1.2)} ${cq(2.6)}`, gap: cq(1.2), background: c.soft }}>
        <Ic i={Star} s={3.6} color={c.a} />
        <T s={3} w={700} mono>
          {left}
        </T>
      </span>
      <T s={4.2} w={600} className="px-2">
        {c.name}
      </T>
      <span className="rounded-full bg-white/10" style={{ padding: `${cq(1.2)} ${cq(2.8)}` }}>
        <T s={3} w={700} mono>
          {right}
        </T>
      </span>
    </div>
  );
}

const Match3: SceneFC = ({ c }) => {
  const hues = [0, 48, 130, 205, 285, 330];
  return (
    <>
      <Hud c={c} left="2450" right="18" />
      <Box className="grid grid-cols-6 bg-white/[0.05]" style={{ gap: cq(1.6), padding: cq(3), borderRadius: cq(5), marginTop: cq(4) }}>
        {Array.from({ length: 42 }, (_, k) => {
          const h = hues[(k * 7 + ((k / 6) | 0) * 3) % hues.length]!;
          const lit = k >= 14 && k <= 16;
          return <i key={k} className="block aspect-square" style={{ borderRadius: lit ? "50%" : "32%", background: `hsl(${h} 78% ${lit ? 68 : 54}%)`, boxShadow: lit ? "0 0 0 2px #fff" : "inset 0 -2px 0 rgba(0,0,0,0.25)" }} />;
        })}
      </Box>
      <Box className="mt-auto flex items-center justify-between">
        {[Shuffle, Zap, Pause].map((Icon, k) => (
          <span key={k} className="grid place-items-center" style={{ width: cq(24), height: cq(13), borderRadius: cq(4), background: k === 1 ? c.a : "rgba(255,255,255,0.08)" }}>
            <Ic i={Icon} s={5.6} color={k === 1 ? "#0c0c10" : undefined} />
          </span>
        ))}
      </Box>
    </>
  );
};

const TicTacToe: SceneFC = ({ c }) => {
  const cells = ["x", "o", "", "", "x", "o", "o", "", "x"];
  return (
    <>
      <Hud c={c} left="2" right="1" />
      <Box className="grid grid-cols-3" style={{ gap: cq(3), marginTop: cq(8) }}>
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
        {[c.tx("You", "أنت"), c.tx("Rival", "الخصم")].map((who, k) => (
          <div key={who} className="flex flex-1 items-center bg-white/[0.06]" style={{ height: cq(14), borderRadius: cq(4.5), padding: `0 ${cq(3)}`, gap: cq(2.5), outline: k === 0 ? `1.5px solid ${c.a}` : undefined }}>
            <Ic i={User} s={5} color={k === 0 ? c.a : undefined} />
            <T s={3.1} w={600}>
              {who}
            </T>
          </div>
        ))}
      </Box>
    </>
  );
};

const Words: SceneFC = ({ c }) => {
  // شبكة حروف ثابتة؛ الصفّ المضيء يكتب «جمل» — اسم اللعبة.
  const rows = ["سكبتقد", "رنوعفا", "هجملثي", "يطظصخل", "ذضغشزح", "أءؤةىك"].map((r) => [...r]);
  return (
    <>
      <Hud c={c} left="340" right="3/8" />
      <Box className="grid bg-white/[0.05]" style={{ gridTemplateColumns: "repeat(6, 1fr)", gap: cq(1.6), padding: cq(3), borderRadius: cq(5), marginTop: cq(4) }}>
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
      <Box className="flex flex-wrap font-arabic" style={{ gap: cq(2) }}>
        {["جمل", "كتاب", "قلم", "بيت", "نور"].map((wd, k) => (
          <span key={wd} className="rounded-full" style={{ padding: `${cq(1.2)} ${cq(3.2)}`, background: k === 0 ? c.soft : "rgba(255,255,255,0.07)" }}>
            <T s={3} w={600} color={k === 0 ? c.a : undefined} o={0.7} className={k === 0 ? "line-through" : undefined}>
              {wd}
            </T>
          </span>
        ))}
      </Box>
      <div className="mt-auto flex flex-col">
        <Button c={c}>{c.tx("Hint", "تلميح")}</Button>
      </div>
    </>
  );
};

const Colors: SceneFC = ({ c }) => (
  <>
    <Hud c={c} left="7" right="92%" />
    <Box className="relative mx-auto" style={{ width: cq(62), height: cq(54), marginTop: cq(5) }}>
      <i className="absolute block rounded-full" style={{ left: 0, top: 0, width: cq(38), height: cq(38), background: `hsl(${c.hue} 80% 58%)`, mixBlendMode: "screen" }} />
      <i className="absolute block rounded-full" style={{ right: 0, top: 0, width: cq(38), height: cq(38), background: `hsl(${c.hue + 120} 80% 55%)`, mixBlendMode: "screen" }} />
      <i className="absolute block rounded-full" style={{ left: cq(12), bottom: 0, width: cq(38), height: cq(38), background: `hsl(${c.hue + 240} 80% 58%)`, mixBlendMode: "screen" }} />
    </Box>
    {[72, 40, 58].map((v, k) => (
      <Box key={k} className="flex items-center" style={{ gap: cq(2.5) }}>
        <T s={2.8} w={700} mono o={0.6}>
          {"RGB"[k]}
        </T>
        <div className="relative flex-1 rounded-full bg-white/10" style={{ height: cq(3) }} dir="ltr">
          <i className="absolute block rounded-full bg-white" style={{ left: `${v}%`, top: cq(-1.6), width: cq(6.2), height: cq(6.2) }} />
          <i className="block h-full rounded-full" style={{ width: `${v}%`, background: `hsl(${c.hue + k * 120} 80% 58%)` }} />
        </div>
      </Box>
    ))}
    <div className="mt-auto flex flex-col">
      <Button c={c}>{c.tx("Mix", "اخلط")}</Button>
    </div>
  </>
);

const Messages: SceneFC = ({ c }) => {
  const msgs: [string, boolean][] = [
    [c.tx("Hi, did you get the file?", "مرحباً، هل وصلك الملف؟"), false],
    [c.tx("Deleted message, recovered", "رسالة محذوفة، مُستعادة"), true],
    [c.tx("See you tomorrow", "أراك غداً"), false],
    [c.tx("Deleted message, recovered", "رسالة محذوفة، مُستعادة"), true],
    [c.tx("Thanks a lot", "شكراً جزيلاً"), false],
    [c.tx("Deleted message, recovered", "رسالة محذوفة، مُستعادة"), true],
    [c.tx("On my way", "أنا في الطريق"), false],
  ];
  return (
    <>
      <AppBar c={c} title={c.tx("Recovered", "المُستعادة")} />
      {msgs.map(([text, recovered], k) => (
        <Box key={k} className={cn("flex flex-col", k % 2 ? "self-end" : "self-start")} style={{ maxWidth: "88%", gap: cq(1), padding: cq(3.2), borderRadius: cq(4.5), background: recovered ? c.soft : "rgba(255,255,255,0.07)", outline: recovered ? `1.5px dashed ${c.a}` : undefined }}>
          <div className="flex items-center" style={{ gap: cq(1.6) }}>
            {recovered && <Ic i={Undo2} s={3.6} color={c.a} />}
            <T s={2.9} w={recovered ? 600 : 400} color={recovered ? c.a : undefined}>
              {text}
            </T>
          </div>
          <T s={2.2} o={0.4} mono>
            {`1${k}:2${k}`}
          </T>
        </Box>
      ))}
      <TabBar c={c} tabs={[[MessageCircle, c.tx("Chats", "المحادثات")], [Undo2, c.tx("Recovered", "المُستعادة")], [ImageIcon, c.tx("Media", "الوسائط")], [Settings, c.tx("Settings", "الإعدادات")]]} />
    </>
  );
};

/** شاشتان جانبيتان تكمّلان المروحة حول الشاشة الرئيسة: الإعدادات، وصفحة تفاصيل. */
const SideSettings: SceneFC = ({ c }) => {
  const rows: [LucideIcon, string][] = [
    [User, c.tx("Account", "الحساب")],
    [Bell, c.tx("Notifications", "الإشعارات")],
    [Globe, c.tx("Language", "اللغة")],
    [Moon, c.tx("Dark mode", "الوضع الداكن")],
    [Lock, c.tx("Privacy", "الخصوصية")],
    [CircleHelp, c.tx("Help", "المساعدة")],
  ];
  return (
    <>
      <T s={5} w={700}>
        {c.tx("Settings", "الإعدادات")}
      </T>
      <Box className="flex items-center" style={{ padding: cq(3.4), borderRadius: cq(4.5), gap: cq(3), background: grad(c.hue) }}>
        <span className="grid shrink-0 place-items-center rounded-full bg-black/25" style={{ width: cq(12), height: cq(12) }}>
          <Ic i={User} s={6.4} o={0.95} />
        </span>
        <div className="min-w-0 flex-1">
          <T s={3.4} w={700}>
            {c.tx("My account", "حسابي")}
          </T>
          <T s={2.6} o={0.75}>
            {c.name}
          </T>
        </div>
      </Box>
      {rows.map(([Icon, label], k) => (
        <Box key={label} className="flex items-center bg-white/[0.05]" style={{ padding: cq(3), borderRadius: cq(4), gap: cq(3) }}>
          <Ic i={Icon} s={4.6} color={c.a} />
          <T s={3.2} w={600} className="flex-1">
            {label}
          </T>
          {k === 3 ? (
            <i className="relative block shrink-0 rounded-full" style={{ width: cq(10), height: cq(5.6), background: c.a }}>
              <i className="absolute block rounded-full bg-white" style={{ top: cq(0.8), insetInlineEnd: cq(0.8), width: cq(4), height: cq(4) }} />
            </i>
          ) : (
            <Ic i={c.ar ? ChevronLeft : ChevronRight} s={4} o={0.4} />
          )}
        </Box>
      ))}
      <div className="mt-auto flex flex-col">
        <Button c={c} ghost>
          {c.tx("Sign out", "تسجيل الخروج")}
        </Button>
      </div>
    </>
  );
};

const SideDetail: SceneFC = ({ c }) => {
  const meta: [LucideIcon, string][] = [
    [Calendar, c.tx("Today", "اليوم")],
    [MapPin, c.tx("Location", "الموقع")],
    [Star, c.tx("Rating 4.8", "التقييم ٤٫٨")],
  ];
  return (
    <>
      <Box className="grid place-items-center" style={{ height: cq(44), borderRadius: cq(5), background: grad(c.hue) }}>
        <Ic i={ImageIcon} s={10} o={0.35} />
      </Box>
      <T s={4.4} w={700}>
        {c.tx("Details", "التفاصيل")}
      </T>
      {meta.map(([Icon, label]) => (
        <Box key={label} className="flex items-center" style={{ gap: cq(2.5) }}>
          <Ic i={Icon} s={4.2} color={c.a} />
          <T s={3.1} o={0.75}>
            {label}
          </T>
        </Box>
      ))}
      <div className="mt-auto flex flex-col" style={{ gap: cq(2.4) }}>
        <Button c={c}>{c.tx("Continue", "متابعة")}</Button>
        <Button c={c} ghost>
          {c.tx("Share", "مشاركة")}
        </Button>
      </div>
    </>
  );
};

/* ── الساعة ──────────────────────────────────────────────────────────── */

function Watch({ c, children }: { c: Ctx; children: ReactNode }) {
  return (
    <div className="aspect-[5/6] h-[64%] shrink-0 border border-white/20 bg-black p-[1.2%] shadow-lift" style={{ borderRadius: "24% / 20%" }}>
      <div className="h-full w-full overflow-hidden" style={{ borderRadius: "22% / 18%", background: `hsl(${c.hue} 30% 7%)`, containerType: "size" }}>
        <div className={cn("flex h-full w-full flex-col", c.ar && "font-arabic")} style={{ padding: cq(8), gap: cq(4) }} dir={c.ar ? "rtl" : "ltr"}>
          {children}
        </div>
      </div>
    </div>
  );
}

const WatchScene: SceneFC = ({ c }) => {
  const stats = [
    [c.tx("Today", "اليوم"), "3"],
    [c.tx("Wallet", "المحفظة"), "240"],
  ];
  return (
    <div className="flex h-full items-center justify-center gap-6 sm:gap-10" dir="ltr">
      <Watch c={c}>
        <div className="flex items-center justify-between">
          <T s={8} w={700}>
            {c.name}
          </T>
          <T s={7} mono o={0.6}>
            10:09
          </T>
        </div>
        <div className="flex items-center justify-between" style={{ padding: cq(6), borderRadius: cq(9), background: c.soft }}>
          <T s={7.5} w={600} color={c.a}>
            {c.tx("Available", "متاح")}
          </T>
          <i className="relative block shrink-0 rounded-full" style={{ width: cq(22), height: cq(12), background: c.a }}>
            <i className="absolute block rounded-full bg-white" style={{ top: cq(1.6), insetInlineEnd: cq(1.6), width: cq(8.8), height: cq(8.8) }} />
          </i>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-2" style={{ gap: cq(4) }}>
          {stats.map(([label, n]) => (
            <div key={label} className="flex flex-col justify-center bg-white/[0.07]" style={{ borderRadius: cq(8), padding: cq(5) }}>
              <T s={13} w={700} mono>
                {n}
              </T>
              <T s={6} o={0.6}>
                {label}
              </T>
            </div>
          ))}
        </div>
      </Watch>
      <Watch c={c}>
        <T s={7} w={600} o={0.6}>
          {c.tx("New request", "طلب جديد")}
        </T>
        <div className="flex min-h-0 flex-1 flex-col justify-center" style={{ borderRadius: cq(9), padding: cq(6), gap: cq(2), background: grad(c.hue) }}>
          <T s={9} w={700}>
            {c.tx("Written request", "طلب كتابي")}
          </T>
          <T s={6.4} o={0.8}>
            {c.tx("Just now", "الآن")}
          </T>
        </div>
        <div className="flex justify-between" style={{ gap: cq(5) }}>
          <span className="grid flex-1 place-items-center rounded-full bg-white/10" style={{ height: cq(22) }}>
            <Ic i={X} s={11} />
          </span>
          <span className="grid flex-1 place-items-center rounded-full" style={{ height: cq(22), background: c.a }}>
            <Ic i={Check} s={11} color="#0c0c10" />
          </span>
        </div>
      </Watch>
    </div>
  );
};

/* ── نوافذ الويب والكود ──────────────────────────────────────────────── */

function Win({ c, host, children, dark = false, rtl = false }: { c: Ctx; host?: string; children: ReactNode; dark?: boolean; rtl?: boolean }) {
  return (
    <div className="window flex aspect-[16/10] max-h-full w-full max-w-[660px] flex-col overflow-hidden rounded-xl" dir="ltr">
      <div className="window-bar flex shrink-0 items-center gap-1.5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {host && <span className="mx-auto truncate px-3 font-mono text-[11px] text-fg-faint">{host}</span>}
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden" style={{ containerType: "size", background: dark ? "#0b0b0e" : `hsl(${c.hue} 26% 9%)` }}>
        <div className={cn("h-full w-full", rtl && "font-arabic")} dir={rtl ? "rtl" : "ltr"}>
          {children}
        </div>
      </div>
    </div>
  );
}

function WebNav({ c, links, cta }: { c: Ctx; links: string[]; cta?: string }) {
  return (
    <div className="flex shrink-0 items-center border-b border-white/[0.07]" style={{ gap: cq(1.4), padding: `${cq(1.5)} ${cq(3)}` }}>
      <i className="block shrink-0" style={{ width: cq(3), height: cq(3), borderRadius: cq(0.8), background: c.a }} />
      <T s={1.9} w={700}>
        {c.name}
      </T>
      <div className="ms-auto flex items-center" style={{ gap: cq(2.4) }}>
        {links.map((x) => (
          <T key={x} s={1.5} o={0.6}>
            {x}
          </T>
        ))}
        {cta && (
          <span className="rounded-full" style={{ padding: `${cq(0.6)} ${cq(1.8)}`, background: c.a }}>
            <T s={1.5} w={700} color="#0c0c10">
              {cta}
            </T>
          </span>
        )}
      </div>
    </div>
  );
}

const Shop: SceneFC = ({ c }) => {
  const items = [
    [c.tx("Specialty coffee", "قهوة مختصّة"), "49"],
    [c.tx("Natural honey", "عسل طبيعي"), "85"],
    [c.tx("Premium dates", "تمر فاخر"), "60"],
    [c.tx("Olive oil", "زيت زيتون"), "72"],
  ];
  return (
    <div className="flex h-full flex-col">
      <WebNav c={c} links={[c.tx("Home", "الرئيسية"), c.tx("Products", "المنتجات"), c.tx("Offers", "العروض")]} cta={c.tx("Cart", "السلّة")} />
      <div className="flex min-h-0 flex-1 flex-col" style={{ padding: cq(2.6), gap: cq(2.2) }}>
        <div className="flex shrink-0 flex-col justify-center" style={{ height: cq(15), padding: `0 ${cq(3)}`, gap: cq(0.6), borderRadius: cq(1.6), background: grad(c.hue) }}>
          <T s={3} w={700}>
            {c.tx("Season offers", "عروض الموسم")}
          </T>
          <T s={1.6} o={0.8}>
            {c.tx("Discounts across every category", "خصومات على كل الأقسام")}
          </T>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-4" style={{ gap: cq(1.8) }}>
          {items.map(([name, price], k) => (
            <div key={name} className="flex min-h-0 flex-col bg-white/[0.05]" style={{ borderRadius: cq(1.4), padding: cq(1.2), gap: cq(0.8) }}>
              <div className="grid min-h-0 flex-1 place-items-center" style={{ borderRadius: cq(1), background: `hsl(${c.hue + k * 28} 46% ${30 + k * 4}%)` }}>
                <Ic i={ShoppingBag} s={4} o={0.4} />
              </div>
              <T s={1.6} w={600}>
                {name}
              </T>
              <div className="flex items-center justify-between">
                <T s={1.7} w={700} color={c.a} mono>
                  {price}
                </T>
                <span className="grid place-items-center rounded-full" style={{ width: cq(3.2), height: cq(3.2), background: c.a }}>
                  <Ic i={ShoppingCart} s={1.8} color="#0c0c10" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** موقع تعريفي عامّ: ترويسة، عنوان رئيس، وثلاث بطاقات. */
const Site: SceneFC = ({ c }) => {
  const cards: [LucideIcon, string][] = [
    [Sparkles, c.tx("Services", "الخدمات")],
    [ImageIcon, c.tx("Work", "الأعمال")],
    [MessageCircle, c.tx("Contact", "تواصل")],
  ];
  return (
    <div className="flex h-full flex-col">
      <WebNav c={c} links={[c.tx("Home", "الرئيسية"), c.tx("About", "من نحن"), c.tx("Contact", "تواصل")]} cta={c.tx("Start", "ابدأ")} />
      <div className="flex min-h-0 flex-1 flex-col justify-center" style={{ padding: `${cq(2.5)} ${cq(5)}`, gap: cq(2.6) }}>
        <div>
          <T s={4.2} w={700}>
            {c.name}
          </T>
          <T s={1.8} o={0.6}>
            {c.tx(c.work.kind.en, c.work.kind.ar)}
          </T>
        </div>
        <div className="grid grid-cols-3" style={{ gap: cq(2) }}>
          {cards.map(([Icon, label], k) => (
            <div key={label} className="flex flex-col bg-white/[0.05]" style={{ padding: cq(2), borderRadius: cq(1.6), gap: cq(1.2) }}>
              <span className="grid place-items-center" style={{ width: cq(5), height: cq(5), borderRadius: cq(1.4), background: k === 0 ? c.a : c.soft }}>
                <Ic i={Icon} s={2.8} color={k === 0 ? "#0c0c10" : c.a} />
              </span>
              <T s={1.8} w={600}>
                {label}
              </T>
              <i className="block rounded-full bg-white/15" style={{ width: "80%", height: cq(0.8) }} />
              <i className="block rounded-full bg-white/10" style={{ width: "56%", height: cq(0.8) }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Dashboard({ c, table = false }: { c: Ctx; table?: boolean }) {
  const nav: [LucideIcon, string][] = [
    [LayoutDashboard, c.tx("Overview", "الرئيسية")],
    [ShoppingBag, c.tx("Orders", "الطلبات")],
    [Users, c.tx("Customers", "العملاء")],
    [BarChart3, c.tx("Reports", "التقارير")],
    [Settings, c.tx("Settings", "الإعدادات")],
  ];
  const kpi = [
    [c.tx("Orders", "الطلبات"), "128"],
    [c.tx("Customers", "العملاء"), "2,340"],
    [c.tx("Open", "المفتوحة"), "12"],
  ];
  const statuses = [c.tx("Done", "مكتمل"), c.tx("In progress", "قيد التنفيذ"), c.tx("New", "جديد")];
  return (
    <div className="flex h-full">
      <div className="flex shrink-0 flex-col border-e border-white/[0.07]" style={{ width: "21%", padding: cq(2), gap: cq(1.1) }}>
        <div className="flex items-center" style={{ gap: cq(1.2), marginBottom: cq(1.4) }}>
          <i className="block shrink-0" style={{ width: cq(3), height: cq(3), borderRadius: cq(0.8), background: c.a }} />
          <T s={1.8} w={700}>
            {c.name}
          </T>
        </div>
        {nav.map(([Icon, label], k) => (
          <div key={label} className="flex items-center" style={{ gap: cq(1.2), padding: `${cq(0.9)} ${cq(1)}`, borderRadius: cq(1), background: k === 0 ? c.soft : undefined }}>
            <Ic i={Icon} s={2} color={k === 0 ? c.a : undefined} o={0.5} />
            <T s={1.5} w={k === 0 ? 700 : 400} color={k === 0 ? c.a : undefined} o={0.6}>
              {label}
            </T>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col" style={{ padding: cq(2.4), gap: cq(1.9) }}>
        {table ? (
          <div className="flex shrink-0 items-center" style={{ gap: cq(1.2) }}>
            {[c.tx("All", "الكل"), c.tx("Active", "نشط"), c.tx("Archived", "مؤرشف")].map((x, k) => (
              <span key={x} className="rounded-full" style={{ padding: `${cq(0.5)} ${cq(1.8)}`, background: k === 0 ? c.a : "rgba(255,255,255,0.08)" }}>
                <T s={1.5} w={600} color={k === 0 ? "#0c0c10" : undefined} o={0.7}>
                  {x}
                </T>
              </span>
            ))}
            <span className="ms-auto flex items-center rounded-full bg-white/[0.07]" style={{ padding: `${cq(0.5)} ${cq(1.6)}`, gap: cq(0.8) }}>
              <Ic i={Search} s={1.8} o={0.5} />
              <T s={1.4} o={0.45}>
                {c.tx("Search", "بحث")}
              </T>
            </span>
          </div>
        ) : (
          <>
            <div className="grid shrink-0 grid-cols-3" style={{ gap: cq(1.6) }}>
              {kpi.map(([label, n], k) => (
                <div key={label} className="bg-white/[0.05]" style={{ borderRadius: cq(1.4), padding: cq(1.5) }}>
                  <T s={1.4} o={0.55}>
                    {label}
                  </T>
                  <T s={2.8} w={700} mono color={k === 0 ? c.a : undefined}>
                    {n}
                  </T>
                </div>
              ))}
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden bg-white/[0.04]" style={{ borderRadius: cq(1.4) }} dir="ltr">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                <path d="M0 32 L14 26 L28 29 L42 17 L56 21 L70 10 L84 14 L100 5 L100 40 L0 40 Z" fill={c.soft} />
                <path d="M0 32 L14 26 L28 29 L42 17 L56 21 L70 10 L84 14 L100 5" fill="none" stroke={c.a} strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </>
        )}
        <div className={cn("flex flex-col", table && "min-h-0 flex-1")} style={{ gap: cq(1.1) }}>
          {Array.from({ length: table ? 6 : 3 }, (_, k) => (
            <div key={k} className="flex items-center bg-white/[0.035]" style={{ gap: cq(1.6), padding: `${cq(0.9)} ${cq(1.6)}`, borderRadius: cq(1) }}>
              <i className="block shrink-0 rounded-full" style={{ width: cq(2.2), height: cq(2.2), background: `hsl(${c.hue + k * 40} 50% 50%)` }} />
              <T s={1.5} w={600} className="flex-1">
                {c.tx("Record", "سجلّ")} {1042 - k}
              </T>
              <span className="rounded-full" style={{ padding: `${cq(0.3)} ${cq(1.4)}`, background: k % 3 === 0 ? c.soft : "rgba(255,255,255,0.08)" }}>
                <T s={1.3} w={600} color={k % 3 === 0 ? c.a : undefined} o={0.6}>
                  {statuses[k % 3]}
                </T>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Oxfile: شبكة أدواته — الأسماء من ملفّات ترجمته نفسها. */
const FileTools: SceneFC = ({ c }) => {
  const tools: [LucideIcon, string][] = [
    [Plus, c.tx("Merge PDF", "دمج PDF")],
    [Scissors, c.tx("Split PDF", "تقسيم PDF")],
    [Download, c.tx("Compress PDF", "ضغط PDF")],
    [FileText, c.tx("PDF to Word", "PDF إلى Word")],
    [RotateCw, c.tx("Rotate PDF", "تدوير PDF")],
    [Lock, c.tx("Protect PDF", "حماية PDF")],
  ];
  return (
    <div className="flex h-full flex-col">
      <WebNav c={c} links={[c.tx("Tools", "الأدوات"), c.tx("Blog", "المدوّنة")]} />
      <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2" style={{ gap: cq(1.8), padding: cq(2.6) }}>
        {tools.map(([Icon, label], k) => (
          <div key={label} className="flex flex-col justify-between bg-white/[0.05]" style={{ borderRadius: cq(1.8), padding: cq(2) }}>
            <span className="grid place-items-center" style={{ width: cq(6.4), height: cq(6.4), borderRadius: cq(1.8), background: `hsl(${c.hue + k * 52} 62% 50%)` }}>
              <Ic i={Icon} s={3.4} color="#fff" />
            </span>
            <T s={1.9} w={600}>
              {label}
            </T>
          </div>
        ))}
      </div>
    </div>
  );
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <T s={1.4} o={0.5}>
        {label}
      </T>
      <div className="bg-white/[0.07]" style={{ marginTop: cq(0.6), padding: `${cq(1)} ${cq(1.4)}`, borderRadius: cq(1) }}>
        <T s={1.7} mono>
          {value}
        </T>
      </div>
    </div>
  );
}
function Cta({ c, label }: { c: Ctx; label: string }) {
  return (
    <span className="grid place-items-center rounded-full" style={{ height: cq(4.4), background: c.a }}>
      <T s={1.7} w={700} color="#0c0c10">
        {label}
      </T>
    </span>
  );
}

/** أداة ويب مفردة: لوحة إدخال في جانب ونتيجة في الآخر، تختلف بحسب الأداة. */
const Tool: SceneFC = ({ c }) => {
  const ops = "÷×−+=";
  const panel = (a: [string, string], b: [string, string], cta: string) => (
    <>
      <Field label={a[0]} value={a[1]} />
      <Field label={b[0]} value={b[1]} />
      <Cta c={c} label={cta} />
    </>
  );
  const views: Record<string, [ReactNode, ReactNode]> = {
    qr: [
      panel(["URL", "https://ardev.dev"], [c.tx("Size", "المقاس"), "512 px"], c.tx("Generate", "ولّد")),
      <div key="r" className="grid aspect-square h-[78%] grid-cols-9 bg-white" style={{ gap: cq(0.5), padding: cq(1.6), borderRadius: cq(1.6) }}>
        {Array.from({ length: 81 }, (_, k) => {
          const corner = [0, 1, 2, 9, 11, 18, 19, 20, 6, 7, 8, 15, 17, 24, 25, 26, 54, 55, 56, 63, 65, 72, 73, 74].includes(k);
          return <i key={k} className="block" style={{ borderRadius: 1, background: corner || (k * 7 + ((k / 9) | 0) * 5) % 3 === 0 ? "#0c0c10" : "transparent" }} />;
        })}
      </div>,
    ],
    colorcraft: [
      panel([c.tx("Base colour", "اللون الأساس"), `hsl(${c.hue} 70% 55%)`], [c.tx("Harmony", "التناسق"), c.tx("Analogous", "متجاورة")], c.tx("Copy palette", "انسخ اللوحة")),
      <div key="r" className="flex h-[80%] w-full overflow-hidden" style={{ borderRadius: cq(1.6) }} dir="ltr">
        {[0, 1, 2, 3, 4].map((k) => (
          <div key={k} className="flex flex-1 items-end" style={{ background: `hsl(${c.hue + (k - 2) * 22} 68% ${34 + k * 8}%)`, padding: cq(1) }}>
            <T s={1.3} mono o={0.9}>
              {`H${(c.hue + (k - 2) * 22 + 360) % 360}`}
            </T>
          </div>
        ))}
      </div>,
    ],
    typeblaze: [
      panel(["WPM", "62"], [c.tx("Accuracy", "الدقّة"), "97%"], c.tx("Restart", "أعد")),
      <div key="r" className="flex h-full w-full flex-col justify-center" style={{ gap: cq(2) }} dir="ltr">
        <p className="font-mono" style={{ fontSize: cq(2), lineHeight: 1.7 }}>
          <span style={{ color: c.a }}>the quick brown fox jumps </span>
          <span className="text-white/35">over the lazy dog and keeps running</span>
        </p>
        <div className="flex flex-col items-center" style={{ gap: cq(0.7) }}>
          {[10, 9, 7].map((count, r) => (
            <div key={r} className="flex" style={{ gap: cq(0.7) }}>
              {Array.from({ length: count }, (_, k) => (
                <i key={k} className="block" style={{ width: cq(3.2), height: cq(3.2), borderRadius: cq(0.7), background: r === 1 && k === 3 ? c.a : "rgba(255,255,255,0.09)" }} />
              ))}
            </div>
          ))}
        </div>
      </div>,
    ],
    calcpro: [
      panel([c.tx("Mode", "النمط"), c.tx("Standard", "عادي")], [c.tx("History", "السجلّ"), "1,250 × 4"], "="),
      <div key="r" className="flex h-full w-[62%] flex-col" style={{ gap: cq(1.2) }} dir="ltr">
        <div className="bg-white/[0.07]" style={{ padding: cq(1.6), borderRadius: cq(1.2) }}>
          <T s={3.4} w={700} mono className="text-right">
            5,000
          </T>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-4" style={{ gap: cq(1) }}>
          {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+"].map((k) => (
            <span key={k} className="grid place-items-center" style={{ borderRadius: cq(1), background: ops.includes(k) ? c.a : "rgba(255,255,255,0.07)" }}>
              <T s={2} w={700} mono color={ops.includes(k) ? "#0c0c10" : undefined}>
                {k}
              </T>
            </span>
          ))}
        </div>
      </div>,
    ],
    brainquiz: [
      panel([c.tx("Category", "الفئة"), c.tx("Geography", "جغرافيا")], [c.tx("Score", "النتيجة"), "7 / 10"], c.tx("Next", "التالي")),
      <div key="r" className="flex h-full w-full flex-col justify-center" style={{ gap: cq(1.3) }}>
        <T s={2.3} w={700}>
          {c.tx("What is the capital of Yemen?", "ما عاصمة اليمن؟")}
        </T>
        {[c.tx("Sana'a", "صنعاء"), c.tx("Aden", "عدن"), c.tx("Taiz", "تعز"), c.tx("Ibb", "إب")].map((x, k) => (
          <div key={x} className="flex items-center" style={{ padding: `${cq(1)} ${cq(1.6)}`, borderRadius: cq(1.2), gap: cq(1.2), background: k === 0 ? c.soft : "rgba(255,255,255,0.06)", outline: k === 0 ? `1.5px solid ${c.a}` : undefined }}>
            <T s={1.8} w={600} className="flex-1" color={k === 0 ? c.a : undefined}>
              {x}
            </T>
            {k === 0 && <Ic i={Check} s={2.2} color={c.a} />}
          </div>
        ))}
      </div>,
    ],
    resumeforge: [
      panel([c.tx("Template", "القالب"), c.tx("Classic", "كلاسيكي")], [c.tx("Section", "القسم"), c.tx("Experience", "الخبرة")], c.tx("Export PDF", "صدّر PDF")),
      <div key="r" className="flex aspect-[1/1.3] h-[92%] flex-col bg-white" style={{ padding: cq(2), gap: cq(1), borderRadius: cq(0.8) }}>
        <T s={2} w={700} color="#111">
          {c.tx("Full name", "الاسم الكامل")}
        </T>
        <i className="block shrink-0" style={{ height: cq(0.4), background: c.a }} />
        {[c.tx("Experience", "الخبرة"), c.tx("Education", "التعليم"), c.tx("Skills", "المهارات")].map((h) => (
          <div key={h}>
            <T s={1.4} w={700} color="#333">
              {h}
            </T>
            <i className="block rounded-full bg-black/15" style={{ marginTop: cq(0.5), height: cq(0.6), width: "88%" }} />
            <i className="block rounded-full bg-black/10" style={{ marginTop: cq(0.5), height: cq(0.6), width: "60%" }} />
          </div>
        ))}
      </div>,
    ],
    timer: [
      panel([c.tx("Preset", "الإعداد"), "Pomodoro"], [c.tx("Rounds", "الجولات"), "2 / 4"], c.tx("Start", "ابدأ")),
      <div key="r" className="relative grid aspect-square h-[82%] place-items-center">
        <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.4" />
          <circle cx="20" cy="20" r="17" fill="none" stroke={c.a} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="72 107" transform="rotate(-90 20 20)" />
        </svg>
        <T s={5} w={700} mono>
          16:42
        </T>
      </div>,
    ],
    passgen: [
      panel([c.tx("Length", "الطول"), "16"], [c.tx("Symbols", "الرموز"), c.tx("On", "مفعّلة")], c.tx("Generate", "ولّد")),
      <div key="r" className="flex w-full flex-col" style={{ gap: cq(1.6) }} dir="ltr">
        <div className="bg-white/[0.07]" style={{ padding: cq(2), borderRadius: cq(1.4) }}>
          <T s={2.8} w={700} mono color={c.a}>
            x7#Kp2!mQ9$vLr4z
          </T>
        </div>
        <div className="flex" style={{ gap: cq(0.8) }}>
          {[0, 1, 2, 3].map((k) => (
            <i key={k} className="block flex-1 rounded-full" style={{ height: cq(1), background: c.a }} />
          ))}
        </div>
        <T s={1.6} w={600} color={c.a}>
          {c.tx("Strong", "قوية")}
        </T>
      </div>,
    ],
    numwords: [
      panel([c.tx("Number", "الرقم"), "1,250"], [c.tx("Language", "اللغة"), c.tx("Arabic", "العربية")], c.tx("Convert", "حوّل")),
      <div key="r" className="flex w-full flex-col" style={{ gap: cq(1.4) }}>
        <T s={4.6} w={700} mono color={c.a}>
          1,250
        </T>
        <T s={2.4} w={600} className="font-arabic">
          ألف ومئتان وخمسون
        </T>
        <T s={1.8} o={0.6}>
          one thousand two hundred and fifty
        </T>
      </div>,
    ],
    codesnap: [
      panel([c.tx("Theme", "السمة"), "Midnight"], [c.tx("Padding", "الحشو"), "32 px"], c.tx("Export PNG", "صدّر PNG")),
      <div key="r" className="grid h-[86%] w-full place-items-center" style={{ borderRadius: cq(1.6), background: grad(c.hue) }} dir="ltr">
        <div className="bg-black/70" style={{ padding: cq(2), borderRadius: cq(1.2), width: "80%" }}>
          <p className="font-mono text-white/85" style={{ fontSize: cq(1.7), lineHeight: 1.7 }}>
            <span style={{ color: c.a }}>const</span> sum = (a, b) =&gt; a + b;
            <br />
            <span style={{ color: c.a }}>export default</span> sum;
          </p>
        </div>
      </div>,
    ],
    markflow: [
      <div key="l" className="font-mono" style={{ fontSize: cq(1.7), lineHeight: 1.8 }} dir="ltr">
        <span style={{ color: c.a }}># Title</span>
        <br />
        <span className="text-white/70">Some **bold** text.</span>
        <br />
        <span className="text-white/70">- first item</span>
        <br />
        <span className="text-white/70">- second item</span>
      </div>,
      <div key="r" className="flex w-full flex-col" style={{ gap: cq(1.2) }} dir="ltr">
        <T s={3.2} w={700}>
          Title
        </T>
        <T s={1.9} o={0.8}>
          Some <b>bold</b> text.
        </T>
        {["first item", "second item"].map((x) => (
          <div key={x} className="flex items-center" style={{ gap: cq(1.2) }}>
            <i className="block rounded-full" style={{ width: cq(1), height: cq(1), background: c.a }} />
            <T s={1.9} o={0.8}>
              {x}
            </T>
          </div>
        ))}
      </div>,
    ],
    units: [
      panel([c.tx("Category", "الفئة"), c.tx("Length", "الطول")], [c.tx("Precision", "الدقّة"), "2"], c.tx("Swap", "بدّل")),
      <div key="r" className="flex w-full items-center" style={{ gap: cq(1.6) }} dir="ltr">
        <div className="flex flex-1 flex-col bg-white/[0.07]" style={{ padding: cq(2), borderRadius: cq(1.4) }}>
          <T s={3.6} w={700} mono>
            100
          </T>
          <T s={1.7} o={0.6} mono>
            km
          </T>
        </div>
        <Ic i={ArrowLeftRight} s={3.4} color={c.a} />
        <div className="flex flex-1 flex-col bg-white/[0.07]" style={{ padding: cq(2), borderRadius: cq(1.4) }}>
          <T s={3.6} w={700} mono color={c.a}>
            62.14
          </T>
          <T s={1.7} o={0.6} mono>
            mi
          </T>
        </div>
      </div>,
    ],
    age: [
      panel([c.tx("Birth date", "تاريخ الميلاد"), "1998-05-12"], [c.tx("As of", "حتى تاريخ"), c.tx("Today", "اليوم")], c.tx("Calculate", "احسب")),
      <div key="r" className="grid w-full grid-cols-3" style={{ gap: cq(1.4) }}>
        {[["28", c.tx("years", "سنة")], ["6", c.tx("months", "أشهر")], ["2", c.tx("days", "يومان")]].map(([v, u], k) => (
          <div key={u} className="flex flex-col items-center bg-white/[0.07]" style={{ padding: cq(2), borderRadius: cq(1.4) }}>
            <T s={4.4} w={700} mono color={k === 0 ? c.a : undefined}>
              {v}
            </T>
            <T s={1.6} o={0.6}>
              {u}
            </T>
          </div>
        ))}
      </div>,
    ],
  };
  const [left, right] = views[c.work.name] ?? views.qr!;
  return (
    <div className="flex h-full flex-col">
      <WebNav c={c} links={[c.tx("Tool", "الأداة"), c.tx("About", "عن الأداة")]} />
      <div className="flex min-h-0 flex-1" style={{ padding: cq(2.6), gap: cq(2.4) }}>
        <div className="flex shrink-0 flex-col justify-center bg-white/[0.04]" style={{ width: "34%", padding: cq(2), borderRadius: cq(1.6), gap: cq(1.6) }}>
          {left}
        </div>
        <div className="grid min-w-0 flex-1 place-items-center" style={{ padding: cq(1) }}>
          {right}
        </div>
      </div>
    </div>
  );
};

/** نافذة كود: سطر الأمر الحقيقي، ثم الحزمة في pubspec أو ملفّ README كما يصف المشروعَ فهرسُه. */
const Code: SceneFC = ({ c }) => {
  const href = c.work.href ?? "";
  const pub = href.includes("pub.dev/packages/") ? href.split("/packages/")[1]! : null;
  const cmd = pub ? `flutter pub add ${pub}` : href.includes("github.com/") ? `git clone ${href.replace(/^https?:\/\//, "")}` : c.work.stack.includes("Python") ? "python main.py" : "flutter run";
  return (
    <div className="flex h-full flex-col" style={{ padding: cq(2.8), gap: cq(1.6) }} dir="ltr">
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
};

function Node({ c, label, lit = false, w = 15 }: { c: Ctx; label: string; lit?: boolean; w?: number }) {
  return (
    <div className="grid shrink-0 place-items-center text-center" style={{ width: cq(w), height: cq(8), borderRadius: cq(1.6), background: lit ? c.a : "rgba(255,255,255,0.06)", outline: lit ? undefined : "1px solid rgba(255,255,255,0.1)" }}>
      <T s={1.6} mono w={lit ? 700 : 400} color={lit ? "#101014" : undefined} o={0.8} className="max-w-[92%]">
        {label}
      </T>
    </div>
  );
}
const Arrow = () => <i className="block shrink-0 bg-white/25" style={{ width: cq(2.2), height: 1.5 }} />;

const Pipeline: SceneFC = ({ c }) => {
  // مراحل كل خطّ كما وردت في وصفه بالفهرس.
  const known: Record<string, string[]> = {
    FactForge: ["idea", "script", "fact-check", "voice", "render", "publish"],
    "Etimad Tenders": ["track", "booklet", "study", "proposal", "review"],
    "TruckGo AI": ["request", "pricing", "matching", "offer"],
  };
  const stages = known[c.work.name] ?? [...c.work.stack, "output"];
  const w = stages.length > 5 ? 12.4 : stages.length > 4 ? 14.6 : 17;
  return (
    <div className="flex h-full flex-col justify-center" style={{ padding: cq(3), gap: cq(3) }} dir="ltr">
      <div className="flex items-center justify-center">
        {stages.map((s, k) => (
          <div key={s} className="flex items-center">
            {k > 0 && <Arrow />}
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
};

/** «عدّة خدمات Django خلف NGINX، قاعدة بيانات لكل خدمة» — كما في الفهرس. */
const Services: SceneFC = ({ c }) => (
  <div className="flex h-full flex-col items-center justify-center" style={{ gap: cq(2.4), padding: cq(3) }} dir="ltr">
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

const Timeline: SceneFC = ({ c }) => (
  <div className="flex h-full flex-col" style={{ padding: cq(2.8), gap: cq(1.8) }} dir="ltr">
    <div className="flex min-h-0 flex-1" style={{ gap: cq(2) }}>
      <div className="relative grid flex-1 place-items-center" style={{ borderRadius: cq(1.6), background: grad(c.hue) }}>
        <span className="grid place-items-center rounded-full bg-black/40" style={{ width: cq(8), height: cq(8) }}>
          <Ic i={Play} s={4} o={0.95} />
        </span>
        <span className="absolute" style={{ bottom: cq(1.4), left: cq(1.8) }}>
          <T s={1.5} mono o={0.85}>
            00:12:08
          </T>
        </span>
      </div>
      <div className="flex flex-col justify-center bg-white/[0.04]" style={{ width: "30%", borderRadius: cq(1.6), padding: cq(1.8), gap: cq(1.1) }}>
        {["Cut silence", "Normalize audio", "Add captions", "Export"].map((x, k) => (
          <div key={x} className="flex items-center" style={{ gap: cq(1) }}>
            <Ic i={k === 3 ? Download : Check} s={1.9} color={k < 2 ? c.a : undefined} o={0.4} />
            <T s={1.5} o={k < 2 ? 0.9 : 0.5}>
              {x}
            </T>
          </div>
        ))}
      </div>
    </div>
    {["V1", "V2", "A1"].map((label, t) => (
      <div key={label} className="flex shrink-0 items-center" style={{ height: cq(5), gap: cq(1.2) }}>
        <T s={1.4} mono o={0.5} className="w-[3cqw] shrink-0">
          {label}
        </T>
        <div className="flex h-full min-w-0 flex-1 items-center" style={{ gap: cq(0.7) }}>
          {t < 2
            ? [18, 26, 12, 22, 14].map((w, k) => <i key={k} className="block h-full" style={{ width: `${w}%`, borderRadius: cq(0.9), background: (k + t) % 2 ? `hsl(${c.hue + 40 * t} 55% 42%)` : c.a, opacity: k === 3 ? 0.45 : 1 }} />)
            : Array.from({ length: 60 }, (_, k) => <i key={k} className="block flex-1 rounded-full bg-white/30" style={{ height: `${22 + ((k * 37) % 70)}%` }} />)}
        </div>
      </div>
    ))}
  </div>
);

const Menubar: SceneFC = ({ c }) => {
  const clips = ["https://ardev.dev", "flutter pub get", "#171539", "git status", "Order 1024", "const sum = (a, b)"];
  return (
    <div className="flex h-full flex-col" dir="ltr">
      <div className="flex shrink-0 items-center justify-end bg-white/[0.06]" style={{ gap: cq(2), padding: `${cq(1.1)} ${cq(2.6)}` }}>
        <i className="block" style={{ width: cq(2.6), height: cq(2.6), borderRadius: cq(0.7), background: c.a }} />
        <T s={1.5} o={0.7}>
          Tue 10:09
        </T>
      </div>
      <div className="flex min-h-0 flex-1 flex-col bg-white/[0.07]" style={{ width: "48%", margin: `${cq(1.2)} ${cq(4)} ${cq(2.6)} auto`, borderRadius: cq(1.8), padding: cq(1.6), gap: cq(0.6), outline: "1px solid rgba(255,255,255,0.12)" }}>
        <div className="flex items-center" style={{ gap: cq(1), padding: `${cq(0.4)} ${cq(0.8)} ${cq(1)}` }}>
          <Ic i={Search} s={1.9} o={0.5} />
          <T s={1.5} o={0.45}>
            Search clipboard
          </T>
        </div>
        {clips.map((x, k) => (
          <div key={x} className="flex items-center" style={{ gap: cq(1.2), padding: `${cq(0.8)} ${cq(1.2)}`, borderRadius: cq(1), background: k === 0 ? c.soft : undefined }}>
            <T s={1.6} mono className="flex-1" color={k === 0 ? c.a : undefined} o={0.75}>
              {x}
            </T>
            <T s={1.4} mono o={0.4}>
              ⌘{k + 1}
            </T>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── التركيب ─────────────────────────────────────────────────────────── */

const PHONE: Partial<Record<Brand["scene"], SceneFC>> = {
  listings: Listings, map: MapScene, ledger: Ledger, admin: Admin, checkout: Checkout, feed: Feed, articles: Articles,
  links: Links, stickers: Stickers, lessons: Lessons, match3: Match3, ttt: TicTacToe, words: Words, colors: Colors,
  messages: Messages,
};
const WINDOW: Partial<Record<Brand["scene"], SceneFC>> = {
  shop: Shop, site: Site, dashboard: ({ c }) => <Dashboard c={c} />, table: ({ c }) => <Dashboard c={c} table />,
  filetools: FileTools, tool: Tool, code: Code, pipeline: Pipeline, services: Services, timeline: Timeline, menubar: Menubar,
};

export function Mockup({ work, brand, name, ar }: { work: Work; brand: Brand; name: string; ar: boolean }) {
  const c: Ctx = {
    hue: brand.hue,
    a: `hsl(${brand.hue} 78% 62%)`,
    soft: `hsl(${brand.hue} 70% 60% / 0.18)`,
    name,
    work,
    ar,
    tx: (en, arText) => (ar ? arText : en),
  };

  if (brand.device === "watch") return <WatchScene c={c} />;

  if (brand.device === "phone") {
    const Main = PHONE[brand.scene] ?? Listings;
    return (
      <div className="flex h-full items-center justify-center" dir="ltr">
        <Phone c={c} className="-me-12 h-[80%] -rotate-[5deg] opacity-85 sm:-me-9">
          <SideSettings c={c} />
        </Phone>
        <Phone c={c} className="z-10 h-full">
          <Main c={c} />
        </Phone>
        <Phone c={c} className="-ms-12 h-[80%] rotate-[5deg] opacity-85 sm:-ms-9">
          <SideDetail c={c} />
        </Phone>
      </div>
    );
  }

  const Scene = WINDOW[brand.scene] ?? WINDOW.dashboard!;
  const isCode = brand.device === "code";
  return (
    <div className="grid h-full place-items-center">
      <Win c={c} host={isCode ? undefined : work.href?.replace(/^https?:\/\//, "") ?? name} dark={isCode} rtl={ar && !isCode}>
        <Scene c={c} />
      </Win>
    </div>
  );
}
