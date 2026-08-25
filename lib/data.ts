/**
 * ─── مصدر المحتوى الموحّد (ثنائي اللغة) لموقع ardev.dev ─────────────────────
 * كل نصّ قابل للترجمة يُكتب كـ { en, ar }. أسماء التقنيات تبقى كما هي في اللغتين.
 * الأرقام والمسمّيات مطابقة للسيرة الذاتية الرسمية (مُتحقَّق منها).
 */

export type L = { en: string; ar: string };
const same = (s: string): L => ({ en: s, ar: s });

export const profile = {
  brand: "AR Dev",
  name: { en: "Abdulrahman Morshed", ar: "عبدالرحمن مرشد" } as L,
  firstName: { en: "Abdulrahman", ar: "عبدالرحمن" } as L,
  role: { en: "Senior Software Engineer", ar: "مهندس برمجيات أول" } as L,
  tagline: {
    en: "I build systems end-to-end — from requirements to production.",
    ar: "أبني الأنظمة من الفكرة إلى التشغيل — من المتطلبات إلى الإنتاج.",
  } as L,
  about: {
    en: "I'm a software engineer who owns systems end-to-end — turning business requirements into production software across mobile, web, and backend. Today I lead engineering at Somow, where I build and operate products used by tens of thousands and coordinate the third-party services behind them. I care about clean architecture, reliability, and shipping things that hold up in production.",
    ar: "مهندس برمجيات أتولّى الأنظمة من الفكرة إلى التشغيل — أُحوّل متطلبات العمل إلى برمجيات إنتاجية عبر الموبايل والويب والخلفية. أقود اليوم الهندسة في Somow، حيث أبني وأُشغّل منتجات يستخدمها عشرات الآلاف، وأُنسّق خدمات الطرف الثالث خلفها. يهمّني نظافة المعمارية، والموثوقية، وأن يصمد ما أشحنه في الإنتاج.",
  } as L,
  location: { en: "Buraydah, Saudi Arabia", ar: "بريدة، السعودية" } as L,
  status: {
    en: "Open to senior software engineering & technical leadership roles",
    ar: "متاح لأدوار هندسة برمجيات أولى وقيادة تقنية",
  } as L,
  email: "me@ardev.dev",
};

export const socials = {
  github: "https://github.com/ardev-dev",
  githubHandle: "github.com/ardev-dev",
  pubdev: "https://pub.dev/publishers/ardev.dev/packages",
  pubdevHandle: "pub.dev/ardev.dev",
  linkedin: "https://www.linkedin.com/in/abdulrahman-m-420715227/",
  linkedinHandle: "linkedin.com/in/abdulrahman-m",
  email: "mailto:me@ardev.dev",
};

/** نصوص الواجهة العامّة. */
export const ui = {
  viewWork: { en: "View my work", ar: "شاهد أعمالي" } as L,
  getInTouch: { en: "Get in touch", ar: "تواصل معي" } as L,
  basedIn: { en: "based in", ar: "مقيم في" } as L,
  flagship: { en: "Flagship", ar: "الأبرز" } as L,
  letsBuild: { en: "Let's build", ar: "لنبنِ معاً" } as L,
  ctaTitleA: { en: "Have a system worth building right?", ar: "لديك نظام يستحق أن يُبنى بإتقان؟" } as L,
  ctaTitleB: { en: "Let's talk.", ar: "لنتحدّث." } as L,
  builtWith: { en: "Built with Next.js & Framer Motion.", ar: "بُني بـ Next.js وFramer Motion." } as L,
  emailLabel: { en: "Email", ar: "البريد" } as L,
  langLabel: { en: "العربية", ar: "EN" } as L, // نصّ زرّ التبديل: يعرض اللغة الأخرى
  moreWork: { en: "More products & systems", ar: "منتجات وأنظمة أخرى" } as L,
};

/** عناوين الأقسام. */
export const sections = {
  work: {
    eyebrow: { en: "Selected Work", ar: "أعمال مختارة" } as L,
    title: { en: "Products I build & operate", ar: "منتجات أبنيها وأُشغّلها" } as L,
    subtitle: {
      en: "Production systems shipped end-to-end — mobile, web, and backend — across consultation, real-estate, delivery, and financial domains.",
      ar: "أنظمة إنتاجية أُنجزها من الفكرة إلى التشغيل — موبايل وويب وخلفية — عبر مجالات الاستشارات والعقار والتوصيل والأنظمة المالية.",
    } as L,
  },
  openSource: {
    eyebrow: { en: "Open Source", ar: "مفتوح المصدر" } as L,
    title: { en: "Published packages", ar: "حزم منشورة" } as L,
    subA: { en: "Maintained Dart packages on pub.dev under the", ar: "حزم Dart مُصانة على pub.dev تحت الناشر" } as L,
    subB: { en: "publisher — solving real gaps the community was stuck on.", ar: "— تحلّ ثغرات حقيقية عَلِق عندها المجتمع." } as L,
  },
  skills: {
    eyebrow: { en: "Capabilities", ar: "القدرات" } as L,
    title: { en: "The full lifecycle — and the stack behind it", ar: "دورة الحياة الكاملة — والتقنيات خلفها" } as L,
    subtitle: {
      en: "Technologies are evidence, not identity. I own the system from requirements to production support; these are the tools I reach for.",
      ar: "التقنيات دليل لا هويّة. أتولّى النظام من المتطلبات إلى الدعم الإنتاجي؛ وهذه أدواتي.",
    } as L,
  },
  experience: {
    eyebrow: { en: "Experience", ar: "الخبرة" } as L,
    title: { en: "Where I've owned systems", ar: "حيث تولّيتُ أنظمة كاملة" } as L,
  },
};

/** أرقام تظهر كعدّادات متحرّكة. */
export const stats: { value: number; suffix: string; label: L }[] = [
  { value: 6, suffix: "+", label: { en: "Years engineering", ar: "سنوات في الهندسة" } },
  { value: 14, suffix: "+", label: { en: "Apps & services shipped", ar: "تطبيقات وخدمات مُنجَزة" } },
  { value: 5, suffix: "+", label: { en: "Live on App Store & Play", ar: "منشورة على المتاجر" } },
  { value: 1, suffix: "M+", label: { en: "Lines of code authored", ar: "أسطر برمجية مؤلَّفة" } },
];

export type SkillGroup = { title: L; items: L[] };

export const skillGroups: SkillGroup[] = [
  {
    title: { en: "Lifecycle", ar: "دورة الحياة" },
    items: [
      { en: "Requirements & Analysis", ar: "تحليل المتطلبات" },
      { en: "Architecture & Design", ar: "المعمارية والتصميم" },
      { en: "Integration", ar: "التكامل" },
      { en: "Testing / QA", ar: "الاختبار / الجودة" },
      { en: "Deployment", ar: "النشر" },
      { en: "Production Support", ar: "الدعم الإنتاجي" },
    ],
  },
  {
    title: { en: "Backend & Data", ar: "الخلفية والبيانات" },
    items: ["Python", "Django", "Django REST", "Channels / Daphne", "Celery", "Redis", "PostgreSQL", "Docker", "AWS S3"].map(same),
  },
  {
    title: { en: "Web & Mobile", ar: "الويب والموبايل" },
    items: ["Next.js", "TypeScript", "React", "Flutter", "Dart", "Swift", "Kotlin", "Clean Architecture", "BLoC"].map(same),
  },
  {
    title: { en: "Real-Time & Platforms", ar: "الزمن الحقيقي والمنصّات" },
    items: [same("WebRTC (Agora)"), same("WebSocket"), same("Firebase"), same("CI/CD"), same("Sentry")],
  },
  {
    title: { en: "Payments & Fintech", ar: "المدفوعات والدفع الرقمي" },
    items: [
      "HyperPay", "Tap", "Tamara", "Mada", "STC Pay", "Apple Pay",
      "Google Pay", "PayPal", "Visa", "Mastercard", "Stripe", "3D Secure",
    ].map(same),
  },
];

/** شريط التقنيات المتحرّك (أسماء تقنيات — لا تُترجم). */
export const marquee = [
  "Django", "Flutter", "Next.js", "TypeScript", "Python", "PostgreSQL", "WebRTC",
  "Docker", "Redis", "Celery", "Swift", "Kotlin", "React", "WebSocket", "AWS S3", "Firebase",
];

export type Project = {
  name: string;
  kind: L;
  blurb: L;
  tags: string[];
  links: { label: L; href: string }[];
  featured?: boolean;
  accent?: "violet" | "cyan" | "pink";
};

const appStore: L = { en: "App Store", ar: "App Store" };
const googlePlay: L = { en: "Google Play", ar: "Google Play" };

export const projects: Project[] = [
  {
    name: "Abber",
    kind: { en: "Consultation Platform", ar: "منصّة استشارات" },
    blurb: {
      en: "Flagship consultation marketplace serving 21,000+ users with 40,000+ orders and 600K+ real-time messages — native VoIP calling (CallKit + WebRTC), offline-first realtime chat, native payments, and a Django backend spanning ~30 business domains.",
      ar: "سوق استشارات رئيسي يخدم 21,000+ مستخدم بـ 40,000+ طلب و600K+ رسالة لحظية — مكالمات صوتية أصلية (CallKit + WebRTC)، ومحادثة لحظية تعمل دون اتصال، ومدفوعات أصلية، وخلفية Django تغطّي نحو 30 مجالاً.",
    },
    tags: ["Flutter", "Swift VoIP", "WebRTC", "Django", "Payments"],
    links: [
      { label: appStore, href: "https://apps.apple.com/app/id6461119454" },
      { label: googlePlay, href: "https://play.google.com/store/apps/details?id=co.abber_dev.abber_app" },
    ],
    featured: true,
    accent: "violet",
  },
  {
    name: "Maskani",
    kind: { en: "Real-Estate Platform", ar: "منصّة عقارية" },
    blurb: {
      en: "A full platform across three stacks — Flutter mobile, a Next.js / TypeScript web app, and a Dockerized Django backend — plus a Python multi-agent automation system running autonomously in production.",
      ar: "منصّة كاملة عبر ثلاث تقنيات — تطبيق Flutter، وواجهة ويب Next.js / TypeScript، وخلفية Django بحاويات Docker — مع نظام أتمتة متعدّد الوكلاء بلغة Python يعمل ذاتياً في الإنتاج.",
    },
    tags: ["Next.js", "Flutter", "Django", "Automation"],
    links: [{ label: same("maskani.homes"), href: "https://maskani.homes" }],
    featured: true,
    accent: "cyan",
  },
  {
    name: "Wisal",
    kind: { en: "Service Marketplace", ar: "سوق خدمات" },
    blurb: {
      en: "Booking and consultation marketplace with multiple payment methods, ledger-style reconciliation, and realtime communication on a Django backend.",
      ar: "سوق حجز واستشارات بوسائل دفع متعددة، وتسوية دفترية، وتواصل لحظي على خلفية Django.",
    },
    tags: ["Flutter", "Django", "5 Payment Methods"],
    links: [
      { label: appStore, href: "https://apps.apple.com/app/id6755353238" },
      { label: googlePlay, href: "https://play.google.com/store/apps/details?id=io.somow.wisalapp" },
    ],
    accent: "violet",
  },
  {
    name: "Azbah",
    kind: { en: "Group Wallet", ar: "محفظة جماعية" },
    blurb: {
      en: "A group-wallet system with double-entry accounting — chart of accounts and statement entries — on a Django REST / PostgreSQL backend with an operations admin panel.",
      ar: "نظام محفظة جماعية بمحاسبة القيد المزدوج — دليل حسابات وقيود كشوف — على خلفية Django REST / PostgreSQL مع لوحة تشغيل إدارية.",
    },
    tags: ["Flutter", "Django REST", "Double-Entry Accounting"],
    links: [],
    accent: "pink",
  },
  {
    name: "Manam",
    kind: { en: "Consultation App", ar: "تطبيق استشارات" },
    blurb: {
      en: "Audio consultation with recording, waveform, and resumable playback; RSA-encrypted payments (OTP + JWT) and tiered in-app subscriptions with server-side receipt validation.",
      ar: "استشارات صوتية بتسجيل وموجة صوتية وتشغيل قابل للاستئناف؛ مدفوعات مشفّرة بـ RSA (OTP + JWT) واشتراكات داخل التطبيق بمستويات مع تحقّق خادمي من الإيصالات.",
    },
    tags: ["Flutter", "RSA Payments", "Subscriptions"],
    links: [
      { label: appStore, href: "https://apps.apple.com/us/app/id6743326831" },
      { label: googlePlay, href: "https://play.google.com/store/apps/details?id=co.manams.manam" },
    ],
    accent: "cyan",
  },
  {
    name: "Wasselak",
    kind: { en: "Delivery Platform", ar: "منصّة توصيل" },
    blurb: {
      en: "A multi-app express-delivery platform on a Django backend with real-time GPS tracking over WebSocket and optimized REST APIs across customer, captain, business, and admin apps.",
      ar: "منصّة توصيل سريع متعددة التطبيقات على خلفية Django مع تتبّع GPS لحظي عبر WebSocket وواجهات REST مُحسّنة عبر تطبيقات العميل والكابتن والأعمال والإدارة.",
    },
    tags: ["Flutter", "Django", "Realtime GPS"],
    links: [],
    accent: "violet",
  },
  {
    name: "Moqawlat",
    kind: { en: "Contracting ERP", ar: "نظام مقاولات" },
    blurb: {
      en: "A 14-module construction-contracting ERP designed for white-label deployment — projects, contracts, accounting, and field operations.",
      ar: "نظام تخطيط موارد للمقاولات من 14 وحدة مُصمّم للنشر بعلامة بيضاء — مشاريع وعقود ومحاسبة وعمليات ميدانية.",
    },
    tags: ["Flutter", "Multi-Module", "Accounting"],
    links: [],
    accent: "cyan",
  },
  {
    name: "Truck-go",
    kind: { en: "Logistics Platform", ar: "منصّة لوجستية" },
    blurb: {
      en: "A logistics platform — customer and driver apps, a web dashboard, and a Python service layer for routing and operations.",
      ar: "منصّة لوجستية — تطبيقا العميل والسائق، ولوحة ويب، وطبقة خدمات Python للتوجيه والعمليات.",
    },
    tags: ["Flutter", "Django", "Python"],
    links: [],
    accent: "violet",
  },
  {
    name: "Sweetra",
    kind: { en: "Mobile Game", ar: "لعبة موبايل" },
    blurb: {
      en: "A published Flutter + Flame game shipped end-to-end through full CI/CD with automated tests.",
      ar: "لعبة Flutter + Flame منشورة، أُنجزت من الألف إلى الياء عبر CI/CD كامل مع اختبارات آلية.",
    },
    tags: ["Flutter", "Flame", "CI/CD"],
    links: [{ label: googlePlay, href: "https://play.google.com/store/apps/details?id=io.ar.sweetra" }],
    accent: "pink",
  },
];

/** مشاريع إضافية (بطاقات مُدمجة) — من جرد المشاريع المحلية + GitHub، أوصاف مُتحقَّقة. */
export type MiniProject = { name: string; kind: L; tags: string[] };

export const moreProjects: MiniProject[] = [
  { name: "AppProof", kind: { en: "Beta Testing Platform", ar: "منصّة اختبار تجريبي" }, tags: ["Flutter", "Django", "Web"] },
  { name: "Wasla", kind: { en: "Community App", ar: "تطبيق مجتمعي" }, tags: ["Flutter", "Firebase", "Web"] },
  { name: "Lumi", kind: { en: "AI Learning for Kids", ar: "تعلّم ذكي للأطفال" }, tags: ["Flutter", "AI"] },
  { name: "FactForge", kind: { en: "AI Media Automation", ar: "أتمتة محتوى بالذكاء" }, tags: ["Python", "Multi-Agent AI"] },
  { name: "MikroTik Manager", kind: { en: "Router Management", ar: "إدارة راوترات" }, tags: ["Flutter", "Networking"] },
  { name: "Aleuhda", kind: { en: "Wallet App", ar: "تطبيق محفظة" }, tags: ["Flutter", "BLoC"] },
  { name: "Alminshar", kind: { en: "Accounting System", ar: "نظام محاسبة" }, tags: ["Flutter", "Accounting"] },
  { name: "CopyPaste", kind: { en: "macOS Utility", ar: "أداة macOS" }, tags: ["Swift", "macOS"] },
  { name: "Somow", kind: { en: "Company Website", ar: "موقع الشركة" }, tags: ["React", "JSX"] },
];

/** أرقام المقياس الحقيقية (جرد المشاريع + GitHub، 2026-08). */
export const scale: { value: L; label: L }[] = [
  { value: { en: "1M+", ar: "+مليون" }, label: { en: "Lines authored", ar: "سطر مؤلَّف" } },
  { value: same("72"), label: { en: "Repositories", ar: "مستودعاً" } },
  { value: same("12"), label: { en: "Product ventures", ar: "مشروعاً منتَجاً" } },
  { value: same("30+"), label: { en: "Apps, panels & services", ar: "تطبيقاً ولوحةً وخدمة" } },
];

export type Package = { name: string; blurb: L; meta: L; href?: string };

export const packages: Package[] = [
  {
    name: "video_compressor_plus",
    blurb: {
      en: "Compress, trim, and mute videos and extract thumbnails using the platform's own encoders — no FFmpeg binaries, nothing added to app size. A maintained continuation of the unmaintained video_compress, adding the Swift Package Manager support four upstream PRs never got merged.",
      ar: "ضغط الفيديوهات وقصّها وكتم صوتها واستخراج المصغّرات باستخدام مُرمِّزات النظام نفسها — دون ثنائيات FFmpeg، فلا يزيد حجم التطبيق. استمرارٌ مُصان لحزمة video_compress المهجورة، مع إضافة دعم Swift Package Manager الذي لم تُدمَج له أربعة طلبات سحب.",
    },
    meta: same("Dart · Swift · Kotlin · SPM"),
    href: "https://pub.dev/packages/video_compressor_plus",
  },
  {
    name: "solar_community_icons",
    blurb: {
      en: "Founder & maintainer. 2,500+ Solar community icons for Flutter in bold and linear styles — a perfect 160/160 pub score, used in production.",
      ar: "المؤسِّس والمشرف. أكثر من 2,500 أيقونة Solar لـ Flutter بنمطي bold وlinear — بتقييم كامل 160/160، ومستخدمة في الإنتاج.",
    },
    meta: { en: "160 / 160 pub points · 2,500+ icons", ar: "‏160/160 نقطة · أكثر من 2,500 أيقونة" },
    href: "https://pub.dev/packages/solar_community_icons",
  },
  {
    name: "flutter_websocket_manager",
    blurb: {
      en: "Production WebSocket connection manager for Flutter with auto-reconnection, lifecycle-aware state, and exponential backoff. Cross-platform: Android, iOS, macOS, Linux, Windows.",
      ar: "مدير اتصال WebSocket إنتاجي لـ Flutter مع إعادة اتصال تلقائية، وحالة واعية بدورة الحياة، وتراجع أُسّي. متعدّد المنصّات: Android وiOS وmacOS وLinux وWindows.",
    },
    meta: { en: "155 / 160 pub points · cross-platform", ar: "‏155/160 نقطة · متعدّد المنصّات" },
    href: "https://pub.dev/packages/flutter_websocket_manager",
  },
  {
    name: "shared_utils",
    blurb: {
      en: "Internal Flutter framework reused across all production apps — typed networking, WebSocket/SSE managers (auto-reconnect, token refresh), persistent device identity, formatters, and media pickers.",
      ar: "إطار Flutter داخلي مُعاد استخدامه عبر كل التطبيقات الإنتاجية — شبكات مُنمّطة، ومديرو WebSocket/SSE (إعادة اتصال وتجديد رمز)، وهويّة جهاز دائمة، ومنسّقات، ومنتقيات وسائط.",
    },
    meta: { en: "~13K LOC · reused across all apps", ar: "‏~13 ألف سطر · مُعاد عبر كل التطبيقات" },
    // إطار داخلي خاصّ — بلا صفحة pub.dev عامّة
  },
];

export type Job = { role: L; org: L; period: L; summary: L; highlights: L[] };

export const experience: Job[] = [
  {
    role: { en: "Senior Software Engineer & Technical Lead", ar: "مهندس برمجيات أول وقائد تقني" },
    org: same("Somow"),
    period: { en: "May 2022 — Present", ar: "مايو 2022 — حتى الآن" },
    summary: {
      en: "Own the full software-development lifecycle across 8 production codebases (5 mobile apps + 3 web dashboards), leading a team of 4–6 engineers.",
      ar: "أتولّى دورة تطوير البرمجيات كاملة عبر 8 قواعد أكواد إنتاجية (5 تطبيقات موبايل + 3 لوحات ويب)، وأقود فريقاً من 4–6 مهندسين.",
    },
    highlights: [
      {
        en: "Reduced QA-reported defects by 50% via engineering standards, code review, and production monitoring.",
        ar: "خفّضتُ الأعطال المُبلَّغة من الجودة بنسبة 50% عبر معايير هندسية ومراجعة أكواد ومراقبة إنتاجية.",
      },
      {
        en: "Improved the operating model and delivery efficiency by bringing outsourced engineering work in-house.",
        ar: "حسّنتُ نموذج التشغيل وكفاءة التسليم بجلب العمل الهندسي المُسنَد خارجياً إلى الداخل.",
      },
      {
        en: "Primary technical liaison with external providers — payment gateways, Tamara, Meta, Huawei — owning SDK integration and account management.",
        ar: "نقطة الاتصال التقنية الأساسية مع المزوّدين الخارجيين — بوابات الدفع، Tamara، Meta، Huawei — أتولّى تكامل الـ SDK وإدارة الحسابات.",
      },
      {
        en: "Led weekly architecture reviews and authored the internal Clean Architecture handbook.",
        ar: "قُدتُ مراجعات معمارية أسبوعية وألّفتُ الدليل الداخلي للمعمارية النظيفة.",
      },
    ],
  },
  {
    role: { en: "Flutter Developer", ar: "مطوّر Flutter" },
    org: { en: "Independent · Freelance", ar: "مستقل · عمل حرّ" },
    period: { en: "2021 — 2022", ar: "2021 — 2022" },
    summary: {
      en: "Adopted Flutter and delivered cross-platform apps end-to-end, publishing production apps to the App Store and Google Play.",
      ar: "تبنّيت Flutter وسلّمت تطبيقات متعددة المنصّات من الألف إلى الياء، ونشرت تطبيقات إنتاجية على App Store وGoogle Play.",
    },
    highlights: [
      {
        en: "Built REST-integrated apps with clean architecture and shipped them to the stores.",
        ar: "بنيت تطبيقات مدمجة مع REST بمعمارية نظيفة ونشرتها على المتاجر.",
      },
    ],
  },
  {
    role: { en: "Android Developer", ar: "مطوّر Android" },
    org: { en: "Independent · Freelance", ar: "مستقل · عمل حرّ" },
    period: { en: "2019 — 2020", ar: "2019 — 2020" },
    summary: {
      en: "Built and published production Android apps (Java) for clients — from requirements to Play Store release.",
      ar: "بنيت ونشرت تطبيقات Android إنتاجية (Java) لعملاء — من المتطلبات إلى النشر على Play Store.",
    },
    highlights: [],
  },
];

export const nav: { label: L; href: string }[] = [
  { label: { en: "About", ar: "نبذة" }, href: "#about" },
  { label: { en: "Experience", ar: "الخبرة" }, href: "#experience" },
  { label: { en: "Work", ar: "الأعمال" }, href: "#work" },
  { label: { en: "Open Source", ar: "مفتوح المصدر" }, href: "#open-source" },
];

/** عناوين الأقسام القصيرة (النمط التحريري). */
export const heads = {
  about: { en: "About", ar: "نبذة" } as L,
  experience: { en: "Experience", ar: "الخبرة" } as L,
  work: { en: "Selected Work", ar: "أعمال مختارة" } as L,
  more: { en: "More", ar: "المزيد" } as L,
  openSource: { en: "Open Source", ar: "مفتوح المصدر" } as L,
  contact: { en: "Get in touch", ar: "لنتواصل" } as L,
  currently: { en: "Currently working with", ar: "أعمل حالياً بـ" } as L,
  viewGithub: { en: "All projects on GitHub", ar: "كل المشاريع على GitHub" } as L,
};
