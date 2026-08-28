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
  role: { en: "Senior Software Engineer", ar: "مهندس برمجيات خبير" } as L,
  tagline: {
    en: "I engineer from first principles — and enter any software domain on demand.",
    ar: "أُهندس من المبادئ الأولى — وأدخل أي مجال برمجي عند الطلب.",
  } as L,
  positioning: {
    en: "An engineer who owns systems end-to-end — not an entry-level coder.",
    ar: "مهندس يملك الأنظمة من الفكرة إلى التشغيل — لا مبرمج مبتدئ.",
  } as L,
  about: {
    en: "I'm a software engineer defined by method, not by any language or framework — I work from first principles: analysis, system design, and problem-solving — an engineer who owns systems end-to-end, not an entry-level coder bound to one tool. That lets me enter any software-engineering domain on demand, including ones I've never used before, and ship production-grade systems. Today I lead engineering at Somow, building and operating products used by 21,000+ people. My track record proves it transfers — Java → Flutter → Django → Next.js → multi-agent AI — accelerated by AI-assisted workflows. Technologies are evidence of range; engineering is the discipline.",
    ar: "مهندس برمجيات يُعرَّف بالمنهج لا بلغة أو إطار — أعمل من المبادئ الأولى: التحليل وتصميم الأنظمة وحلّ المشكلات — مهندس يملك الأنظمة من الفكرة إلى التشغيل، لا مبرمج مبتدئ محصور بأداة. هذا يمكّنني من دخول أي مجال في هندسة البرمجيات عند الطلب — حتى ما لم أستخدمه من قبل — وشحن أنظمة جاهزة للإنتاج. أقود اليوم الهندسة في Somow، وأبني وأُشغّل منتجات يستخدمها 21,000+ مستخدم. وسجلّي يُثبت أن المنهج ينتقل — Java ← Flutter ← Django ← Next.js ← أنظمة وكلاء AI — مدعوماً بأدوات الذكاء الاصطناعي. التقنيات دليل اتساع؛ والهندسة هي التخصّص.",
  } as L,
  location: { en: "Buraydah, Saudi Arabia", ar: "بريدة، السعودية" } as L,
  status: {
    en: "Open to senior software engineering & technical leadership roles",
    ar: "متاح لأدوار هندسية خبيرة وقيادة تقنية",
  } as L,
  email: "me@ardev.dev",
};

export const socials = {
  github: "https://github.com/ardev-dev",
  githubHandle: "github.com/ardev-dev",
  pubdev: "https://pub.dev/publishers/ardev.dev/packages",
  pubdevHandle: "pub.dev/ardev.dev",
  linkedin: "https://www.linkedin.com/in/ardev-dev",
  linkedinHandle: "linkedin.com/in/ardev-dev",
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
    title: { en: "Method first — the stack is just evidence", ar: "المنهج أولاً — والتقنيات مجرّد دليل" } as L,
    subtitle: {
      en: "I engineer from first principles — analysis, design, and problem-solving — then reach for whatever a problem needs. Technologies are evidence of range, not identity; these are the tools I've reached for so far.",
      ar: "أُهندس من المبادئ الأولى — تحليلٌ وتصميمٌ وحلّ مشكلات — ثم أستخدم ما يتطلّبه الحل. التقنيات دليل اتساعٍ لا هويّة؛ وهذه هي الأدوات التي استخدمتها حتى الآن.",
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
    title: { en: "Backend & Distributed Systems", ar: "الخلفية والأنظمة الموزّعة" },
    items: ["Python", "Java", "Node.js", "Django", "Django REST", "Celery", "Redis", "PostgreSQL", "Docker", "AWS S3", "Microservices", "Distributed Systems", "Scalability"].map(same),
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
  {
    title: { en: "AI & Automation", ar: "الذكاء الاصطناعي والأتمتة" },
    items: [
      { en: "AI-Assisted Development", ar: "تطوير مدعوم بالذكاء الاصطناعي" },
      same("Claude Code"), same("Cursor"), same("GitHub Copilot"), same("Codex"), same("Gemini"), same("Claude"),
      { en: "LLM Tooling", ar: "أدوات النماذج اللغوية" },
      { en: "Multi-Agent Systems", ar: "أنظمة الوكلاء المتعددة" },
      { en: "Automation", ar: "الأتمتة" },
    ],
  },
];

/** شريط التقنيات المتحرّك (أسماء تقنيات — لا تُترجم). */
export const marquee = [
  "Django", "Flutter", "Next.js", "TypeScript", "Python", "Java", "Node.js", "PostgreSQL", "WebRTC",
  "Docker", "Redis", "Celery", "Swift", "Kotlin", "React", "WebSocket", "AWS S3", "Firebase",
  "Claude Code", "Cursor", "Copilot", "Codex", "Gemini", "AI-Assisted",
];

export type Project = {
  slug: string;
  name: string;
  nameAr?: string;
  kind: L;
  blurb: L;
  /** ما أثبتَه المشروع فعليّاً — أرقام لا صفات. */
  metrics?: { value: string; label: L }[];
  tags: string[];
  links: { label: L; href: string }[];
  /** صور حقيقيّة: لقطات المتجر للتطبيقات، ولقطات الموقع الحيّ للويب. */
  shots?: string[];
  cover?: string;
  icon?: string;
  featured?: boolean;
  year: string;
};

const appStore: L = { en: "App Store", ar: "App Store" };
const googlePlay: L = { en: "Google Play", ar: "Google Play" };
const website: L = { en: "Website", ar: "الموقع" };
const source: L = { en: "Source", ar: "المصدر" };

export const projects: Project[] = [
  {
    slug: "abber",
    name: "Abber",
    nameAr: "عبر",
    year: "2022 — Now",
    kind: { en: "Dream & Vision Interpretation Marketplace", ar: "سوق تفسير الأحلام والرؤى" },
    blurb: {
      en: "A production marketplace connecting people with vetted interpreters — orders, live sessions, wallet, store, and a Django backend spanning ~30 business domains. I own its design, engineering, and day-to-day operation.",
      ar: "سوق إنتاجي يربط الناس بمعبّرين موثوقين — طلبات وجلسات مباشرة ومحفظة ومتجر، وخلفية Django تغطّي نحو ٣٠ مجالاً. أملك تصميمه وهندسته وتشغيله اليومي.",
    },
    metrics: [
      { value: "21K+", label: { en: "users", ar: "مستخدم" } },
      { value: "40K+", label: { en: "orders", ar: "طلب" } },
      { value: "600K+", label: { en: "live messages", ar: "رسالة لحظية" } },
      { value: "4.7★", label: { en: "App Store", ar: "App Store" } },
    ],
    tags: ["Flutter", "Django", "WebRTC", "Payments", "Real-time"],
    links: [
      { label: appStore, href: "https://apps.apple.com/app/id6461119454" },
      { label: googlePlay, href: "https://play.google.com/store/apps/details?id=co.abber_dev.abber_app" },
      { label: website, href: "https://abber.co" },
    ],
    shots: ["/apps/abber-1.png", "/apps/abber-2.png", "/apps/abber-3.png", "/apps/abber-4.png"],
    cover: "/apps/abber-web.png",
    icon: "/apps/abber-icon.png",
    featured: true,
  },
  {
    slug: "maskani",
    name: "Maskani",
    nameAr: "مسكني",
    year: "2024 — Now",
    kind: { en: "Social Real-Estate Platform", ar: "منصّة عقارية اجتماعية" },
    blurb: {
      en: "Owners reach clients directly — listings, services, jobs, a social feed, property requests, and real-time chat. Delivered across three stacks at once: a Flutter app, an internal admin app, and a Next.js web app on a Dockerized Django backend.",
      ar: "الملّاك يصلون إلى العملاء مباشرةً — إعلانات وخدمات ووظائف وموجز اجتماعي وطلبات عقار ومحادثة لحظية. مبنيّة على ثلاث تقنيات معاً: تطبيق Flutter، وتطبيق إدارة، وواجهة Next.js على خلفية Django بحاويات.",
    },
    metrics: [
      { value: "3", label: { en: "client stacks", ar: "واجهات" } },
      { value: "6", label: { en: "countries", ar: "دول" } },
      { value: "24/7", label: { en: "real-time chat", ar: "محادثة لحظية" } },
    ],
    tags: ["Next.js", "TypeScript", "Flutter", "Django", "Docker"],
    links: [{ label: website, href: "https://maskani.homes" }],
    cover: "/apps/maskani-web.png",
    featured: true,
  },
  {
    slug: "wisal",
    name: "Wisal",
    nameAr: "وصال",
    year: "2024 — Now",
    kind: { en: "Consultation Marketplace", ar: "سوق استشارات" },
    blurb: {
      en: "Paid consultations with verified vendors over chat and VoIP, settled through a wallet on a real double-entry accounting engine — the kind of correctness you cannot retrofit later.",
      ar: "استشارات مدفوعة مع مزوّدين موثّقين عبر المحادثة والمكالمات، تُسوّى بمحفظة على محرّك محاسبة بالقيد المزدوج — دقّةٌ لا يمكن إضافتها لاحقاً.",
    },
    metrics: [
      { value: "2×", label: { en: "entry ledger", ar: "قيد مزدوج" } },
      { value: "VoIP", label: { en: "in-app calls", ar: "مكالمات" } },
    ],
    tags: ["Flutter", "Django", "VoIP", "Double-Entry"],
    links: [
      { label: appStore, href: "https://apps.apple.com/app/id6755353238" },
      { label: googlePlay, href: "https://play.google.com/store/apps/details?id=io.somow.wisalapp" },
      { label: website, href: "https://wisalapp.com" },
    ],
    shots: ["/apps/wisal-1.png", "/apps/wisal-2.png", "/apps/wisal-3.png"],
    cover: "/apps/wisal-web.png",
    icon: "/apps/wisal-icon.png",
  },
  {
    slug: "azbah",
    name: "Azbah",
    nameAr: "عزبة",
    year: "2025 — Now",
    kind: { en: "Group Expenses & Settle-Up", ar: "مشاركة المصاريف والتسوية" },
    blurb: {
      en: "Members share expenses and settle claims by wallet or cash on a strict double-entry ledger, with an operations panel behind it. Money apps forgive nothing — every edge case is an accounting rule, not a UI state.",
      ar: "أعضاء يتقاسمون المصاريف ويسوّون مطالباتهم بالمحفظة أو نقداً على دفتر بالقيد المزدوج، خلفه لوحة تشغيل. تطبيقات المال لا تسامح: كل حالة طرفيّة قاعدة محاسبية لا حالة واجهة.",
    },
    metrics: [
      { value: "PostgreSQL", label: { en: "ledger store", ar: "دفتر الحسابات" } },
      { value: "Django REST", label: { en: "backend", ar: "الخلفية" } },
    ],
    tags: ["Flutter", "Django REST", "PostgreSQL", "Accounting"],
    links: [
      { label: appStore, href: "https://apps.apple.com/app/id6761391341" },
      { label: googlePlay, href: "https://play.google.com/store/apps/details?id=io.somow.azbah" },
      { label: website, href: "https://azbah.somow.sa" },
    ],
    shots: ["/apps/azbah-1.png", "/apps/azbah-2.png", "/apps/azbah-3.png"],
    cover: "/apps/azbah-web.png",
    icon: "/apps/azbah-icon.png",
  },
  {
    slug: "wasselak",
    name: "Wasselak",
    nameAr: "وصّلك",
    year: "2023",
    kind: { en: "Express-Delivery Platform", ar: "منصّة توصيل سريع" },
    blurb: {
      en: "Five apps and a dashboard on one Django backend — customer, captain, business, employee, admin — with live GPS tracking over WebSocket. One domain model had to satisfy five very different jobs.",
      ar: "خمسة تطبيقات ولوحة على خلفية Django واحدة — العميل والمندوب والمنشأة والموظّف والإدارة — مع تتبّع GPS لحظي عبر WebSocket. نموذج مجال واحد يخدم خمس وظائف مختلفة.",
    },
    metrics: [
      { value: "5", label: { en: "apps, one core", ar: "تطبيقات بنواة واحدة" } },
      { value: "GPS", label: { en: "live tracking", ar: "تتبّع لحظي" } },
    ],
    tags: ["Flutter", "Django", "WebSocket", "Maps"],
    links: [{ label: source, href: "https://github.com/wasselak-com" }],
  },
  {
    slug: "factforge",
    name: "FactForge",
    year: "2025",
    kind: { en: "Multi-Agent AI System", ar: "نظام وكلاء ذكاء اصطناعي" },
    blurb: {
      en: "A Python pipeline of autonomous agents that takes an idea to a published video — script, fact-check, TTS, render, publish — with no human in the loop. Agents are only as good as the contracts between them.",
      ar: "خطّ إنتاج بايثون من وكلاء مستقلّين يأخذ الفكرة إلى فيديو منشور — نصّ، تدقيق حقائق، تحويل صوتي، إخراج، نشر — بلا تدخّل بشري. جودة الوكلاء من جودة العقود بينهم.",
    },
    metrics: [
      { value: "6", label: { en: "agent stages", ar: "مراحل وكلاء" } },
      { value: "0", label: { en: "human steps", ar: "خطوات بشرية" } },
    ],
    tags: ["Python", "Multi-Agent", "LLM Tooling", "Automation"],
    links: [],
  },
];

/** أعمال أخرى — تُعرض كقائمة مقتضبة. */
export const moreProjects: { name: string; kind: L }[] = [
  { name: "Somow Platform", kind: { en: "Company platform & ops", ar: "منصّة الشركة والتشغيل" } },
  { name: "Manam", kind: { en: "Interpreter workspace", ar: "مساحة عمل المعبّرين" } },
  { name: "MT Admin Pro", kind: { en: "Operations dashboard", ar: "لوحة تشغيل" } },
  { name: "Sweetra", kind: { en: "Commerce app", ar: "تطبيق تجاري" } },
  { name: "Moqawlat", kind: { en: "Contracting platform", ar: "منصّة مقاولات" } },
  { name: "AppProof", kind: { en: "Release QA tooling", ar: "أدوات فحص الإصدارات" } },
  { name: "CutReact", kind: { en: "Video tooling", ar: "أدوات فيديو" } },
  { name: "shared_utils", kind: { en: "Internal Flutter framework", ar: "إطار داخلي لـ Flutter" } },
];

export type Pkg = {
  name: string;
  blurb: L;
  points: string;
  href: string;
  note?: L;
};

export const packages: Pkg[] = [
  {
    name: "solar_community_icons",
    blurb: {
      en: "2,500+ icons packaged for Flutter — founder and maintainer.",
      ar: "أكثر من ٢٥٠٠ أيقونة مهيّأة لـ Flutter — المؤسّس والمشرف.",
    },
    points: "160 / 160",
    href: "https://pub.dev/packages/solar_community_icons",
  },
  {
    name: "flutter_websocket_manager",
    blurb: {
      en: "Production WebSocket lifecycle — reconnection, backoff, typed events.",
      ar: "إدارة دورة حياة WebSocket للإنتاج — إعادة اتصال وتراجع تدريجي وأحداث مُصنّفة.",
    },
    points: "155 / 160",
    href: "https://pub.dev/packages/flutter_websocket_manager",
  },
  {
    name: "video_compressor_plus",
    blurb: {
      en: "Native-encoder compression — no FFmpeg, no app-size bloat. Revived an abandoned package.",
      ar: "ضغط بالمشفّر الأصلي — بلا FFmpeg وبلا تضخيم حجم التطبيق. إحياء لحزمة مهجورة.",
    },
    points: "pub.dev",
    href: "https://pub.dev/packages/video_compressor_plus",
    note: { en: "Adds Swift Package Manager support", ar: "أضافت دعم Swift Package Manager" },
  },
];

export type Role = {
  company: string;
  title: L;
  period: L;
  href?: string;
  points: L[];
};

export const roles: Role[] = [
  {
    company: "Somow",
    href: "https://somow.sa",
    title: { en: "Senior Software Engineer & Technical Lead", ar: "مهندس برمجيات خبير وقائد تقني" },
    period: { en: "May 2022 — Present · Buraydah", ar: "مايو ٢٠٢٢ — الآن · بريدة" },
    points: [
      {
        en: "Promoted from Flutter Developer; now own Abber, Wisal and Azbah end-to-end — analysis through production support.",
        ar: "تُرقّيت من مطوّر Flutter؛ أملك اليوم عبر ووصال وعزبة من التحليل إلى الدعم الإنتاجي.",
      },
      {
        en: "Cut QA-reported defects by 50% by introducing engineering standards, code review and production monitoring.",
        ar: "خفضتُ العيوب المُبلَّغة من الجودة ٥٠٪ عبر معايير هندسية ومراجعة كود ومراقبة إنتاج.",
      },
      {
        en: "Led weekly architecture reviews for 4–6 engineers and wrote the Clean Architecture handbook the team works from.",
        ar: "قدتُ مراجعات معمارية أسبوعية لفريق ٤–٦ مهندسين، وكتبتُ دليل المعمارية النظيفة المعتمد لدى الفريق.",
      },
      {
        en: "Technical point of contact for external providers — Tamara, Meta, Huawei and payment gateways.",
        ar: "نقطة الاتصال التقنية مع المزوّدين الخارجيين — تمارا وMeta وهواوي وبوّابات الدفع.",
      },
    ],
  },
  {
    company: "Independent",
    title: { en: "Flutter & Android Developer", ar: "مطوّر Flutter وأندرويد" },
    period: { en: "2019 — 2022 · Remote", ar: "٢٠١٩ — ٢٠٢٢ · عن بُعد" },
    points: [
      {
        en: "Shipped cross-platform apps with REST integrations to the App Store and Google Play.",
        ar: "أطلقتُ تطبيقات متعدّدة المنصّات بتكاملات REST إلى App Store وGoogle Play.",
      },
      {
        en: "Built production Android apps in Java for clients — requirements through Play Store release.",
        ar: "بنيتُ تطبيقات أندرويد إنتاجية بلغة Java للعملاء — من المتطلبات إلى النشر.",
      },
    ],
  },
];
