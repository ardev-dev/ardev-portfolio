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
    en: "I build software products and run them in production.",
    ar: "أبني منتجات برمجية وأُشغّلها في الإنتاج.",
  } as L,
  positioning: {
    en: "Senior Software Engineer & Technical Lead at Somow.",
    ar: "مهندس برمجيات خبير وقائد تقني في سُمو.",
  } as L,
  about: {
    en: "I start with the problem, not the framework. Requirements, system design, implementation, testing, deployment — then production support, which is where most of the real decisions show up. That has taken me across mobile apps, Django backends, real-time systems, payment integrations and AI tooling. I've moved between stacks when the product required it: Java, then Flutter, then Django, then Next.js, then multi-agent systems. The tools changed; the process didn't.",
    ar: "أبدأ من المشكلة لا من الإطار. تحليل المتطلبات، تصميم النظام، التنفيذ، الاختبار، النشر — ثم الدعم في الإنتاج، وهناك تظهر أغلب القرارات الحقيقية. هذا نقلني بين تطبيقات الجوّال وخلفيات Django والأنظمة اللحظية وتكاملات الدفع وأدوات الذكاء الاصطناعي. وانتقلتُ بين التقنيات حين تطلّب المنتج ذلك: Java ثم Flutter ثم Django ثم Next.js ثم أنظمة الوكلاء. تغيّرت الأدوات، ولم تتغيّر الطريقة.",
  } as L,
  /** نبذة البطل — مكتوبة كما أتحدّث، لا كما تُكتب السير الذاتية. */
  intro: [
    {
      en: "I'm Abdulrahman, a software engineer based in Buraydah. For six years I've built products and stayed with them after launch — Flutter apps, Django backends, Next.js web, payment integrations and real-time systems.",
      ar: "أنا عبدالرحمن، مهندس برمجيات مقيم في بريدة. منذ ستّ سنوات أبني منتجات وأبقى معها بعد الإطلاق — تطبيقات Flutter، وخلفيات Django، وواجهات Next.js، وتكاملات الدفع والأنظمة اللحظية.",
    },
    {
      en: "Today I lead engineering at Somow and I'm responsible for Abber, Wisal and Azbah — from architecture and the backend through payments, releases and whatever breaks in production.",
      ar: "أقود اليوم الهندسة في سُمو، وأنا المسؤول عن عبر ووصال وعزبة — من المعمارية والخلفية إلى المدفوعات والإصدارات وما يتعطّل في الإنتاج.",
    },
    {
      en: "The part I care about is what happens after launch: architecture the team can work in, review that catches things early, and monitoring that tells you before a user does. On my team that took QA-reported defects down by half.",
      ar: "وما يعنيني حقّاً هو ما بعد الإطلاق: معمارية يعمل الفريق داخلها، ومراجعة تلتقط الخلل مبكّراً، ومراقبة تُخبرك قبل أن يُخبرك المستخدم. هذا خفّض العيوب المُبلَّغة من الجودة إلى النصف في فريقي.",
    },
  ] as L[],
  facts: [
    { label: { en: "Role", ar: "الدور" } as L, value: { en: "Senior Software Engineer & Technical Lead", ar: "مهندس برمجيات خبير وقائد تقني" } as L },
    { label: { en: "Company", ar: "الجهة" } as L, value: { en: "Somow", ar: "سُمو" } as L },
    { label: { en: "Based in", ar: "مقيم في" } as L, value: { en: "Buraydah, Saudi Arabia", ar: "بريدة، السعودية" } as L },
    { label: { en: "Works on", ar: "يعمل على" } as L, value: { en: "Mobile · Backend · Web · Payments", ar: "جوّال · خلفية · ويب · مدفوعات" } as L },
    { label: { en: "Languages", ar: "اللغات" } as L, value: { en: "Arabic (native) · English (working)", ar: "العربية (أمّ) · الإنجليزية (عمل)" } as L },
  ],
  location: { en: "Buraydah, Saudi Arabia", ar: "بريدة، السعودية" } as L,
  status: {
    en: "Open to senior engineering and technical leadership roles",
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
    title: { en: "Products I build and operate", ar: "منتجات أبنيها وأُشغّلها" } as L,
    subtitle: {
      en: "Systems I designed, built and still operate — mobile, web and backend.",
      ar: "أنظمة صمّمتُها وبنيتُها وما زلتُ أُشغّلها — جوّال وويب وخلفية.",
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
    title: { en: "How I work", ar: "طريقتي في العمل" } as L,
    subtitle: {
      en: "The tools change; the engineering process stays the same. These are the ones I've used in production so far.",
      ar: "تتغيّر الأدوات وتبقى الطريقة. وهذه ما استخدمتُه منها في الإنتاج حتى الآن.",
    } as L,
  },
  experience: {
    eyebrow: { en: "Experience", ar: "الخبرة" } as L,
    title: { en: "Where I've worked", ar: "أين عملت" } as L,
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
      en: "A marketplace where someone sends a dream and gets it interpreted by a vetted interpreter. I built and run it end-to-end: a Django backend covering ~30 business domains, the Flutter app, payments, wallet, store, live sessions — and the production operation behind all of it.",
      ar: "سوق يُرسل فيه المستخدم حلمه فيصله تفسيره من معبّر موثّق. بنيتُه وأُشغّله بكامله: خلفية Django تغطّي نحو ٣٠ مجالاً، وتطبيق Flutter، والمدفوعات والمحفظة والمتجر والجلسات المباشرة — والتشغيل الإنتاجي وراء ذلك كلّه.",
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
      en: "A real-estate platform where owners deal with clients directly — listings, services, jobs, property requests and real-time chat. I built three client applications against one Django platform in Docker: the Flutter app, an internal operations app, and the Next.js web app. It runs across six countries.",
      ar: "منصّة عقارية يتعامل فيها الملّاك مع العملاء مباشرةً — إعلانات وخدمات ووظائف وطلبات عقار ومحادثة لحظية. بنيتُ ثلاث واجهات على منصّة Django واحدة بحاويات: تطبيق Flutter، وتطبيق تشغيل داخلي، وواجهة الويب بـ Next.js. تعمل في ستّ دول.",
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
      en: "Paid consultations with verified vendors over chat and VoIP calls, settled through a wallet. I designed the money flows around double-entry accounting rules instead of treating the wallet as a running balance, so refunds, holds and payouts reconcile.",
      ar: "استشارات مدفوعة مع مزوّدين موثّقين عبر المحادثة والمكالمات، تُسوّى بمحفظة. صمّمتُ التدفّقات المالية على قواعد القيد المزدوج بدل التعامل مع المحفظة كرصيد يزيد وينقص، فتتطابق الاستردادات والحجوزات والتحويلات.",
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
      en: "Group members split expenses and settle claims between each other by wallet or cash, on a strict double-entry ledger with an operations panel behind it. Financial edge cases are resolved in the ledger rather than patched in the interface.",
      ar: "أعضاء المجموعة يتقاسمون المصاريف ويسوّون مطالباتهم بينهم بالمحفظة أو نقداً، على دفتر بالقيد المزدوج خلفه لوحة تشغيل. الحالات المالية الطرفية تُحسم في الدفتر لا تُرقَّع في الواجهة.",
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
      en: "Customer, captain, business, employee and admin apps plus a web dashboard, all on one Django backend and one domain model, with live GPS tracking over WebSocket and REST APIs tuned for mobile networks.",
      ar: "تطبيقات العميل والمندوب والمنشأة والموظّف والإدارة، ولوحة ويب معها، على خلفية Django واحدة ونموذج مجال واحد، مع تتبّع GPS لحظي عبر WebSocket وواجهات REST مضبوطة لشبكات الجوّال.",
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
      en: "A Python pipeline of agents that takes an idea to a published video — script, fact-check, text-to-speech, render, publish — with no human step in between. Each stage hands the next a validated contract.",
      ar: "خطّ إنتاج بايثون من وكلاء يأخذ الفكرة إلى فيديو منشور — نصّ، تدقيق حقائق، تحويل صوتي، إخراج، نشر — بلا خطوة بشرية بينها. كل مرحلة تُسلّم التالية عقداً مُتحقَّقاً منه.",
    },
    metrics: [
      { value: "6", label: { en: "agent stages", ar: "مراحل وكلاء" } },
      { value: "0", label: { en: "human steps", ar: "خطوات بشرية" } },
    ],
    tags: ["Python", "Multi-Agent", "LLM Tooling", "Automation"],
    links: [],
  },
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
        en: "Promoted from Flutter Developer to Senior Software Engineer & Technical Lead. Responsible for Abber, Wisal and Azbah from architecture through production support.",
        ar: "تُرقّيت من مطوّر Flutter إلى مهندس برمجيات خبير وقائد تقني. مسؤول عن عبر ووصال وعزبة من المعمارية إلى الدعم في الإنتاج.",
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

/* ————————————————————————————————————————————————————————————
   الفهرس الكامل: كل ما بُني فعلاً، مجموعاً بحسب المجال.
   المصدر: مستودعات GitHub الحقيقية عبر ١٢ مؤسّسة — لا تجميل.
   ———————————————————————————————————————————————————————————— */

export type Work = {
  name: string;
  nameAr?: string;
  kind: L;
  stack: string[];
  year: string;
  href?: string;
};

export type WorkGroup = {
  id: string;
  title: L;
  desc: L;
  items: Work[];
};

export const catalog: WorkGroup[] = [
  {
    id: "platforms",
    title: { en: "Platforms", ar: "منصّات" },
    desc: {
      en: "Systems where several apps share one backend and one domain model.",
      ar: "أنظمة تتشارك فيها عدّة تطبيقات خلفيةً واحدة ونموذج مجال واحد.",
    },
    items: [
      {
        name: "Abber",
        nameAr: "عبر",
        kind: { en: "Marketplace · app, admin, blog, backend, site", ar: "سوق · تطبيق ولوحة ومدوّنة وخلفية وموقع" },
        stack: ["Flutter", "Django", "WebRTC"],
        year: "2022 — Now",
        href: "https://abber.co",
      },
      {
        name: "Maskani",
        nameAr: "مسكني",
        kind: { en: "Real estate · app, admin, web, backend", ar: "عقارات · تطبيق ولوحة وويب وخلفية" },
        stack: ["Flutter", "Django", "Next.js"],
        year: "2025 — Now",
        href: "https://maskani-ye.com",
      },
      {
        name: "Azbah",
        nameAr: "عزبة",
        kind: { en: "Rest-house booking · app, admin, backend", ar: "حجز استراحات · تطبيق ولوحة وخلفية" },
        stack: ["Flutter", "Django"],
        year: "2024 — Now",
      },
      {
        name: "Wisal",
        nameAr: "وصال",
        kind: { en: "Consultations · app, admin, backend, site", ar: "استشارات · تطبيق ولوحة وخلفية وموقع" },
        stack: ["Flutter", "Django", "Agora"],
        year: "2023 — Now",
        href: "https://wisalapp.com",
      },
      {
        name: "Wasselak",
        nameAr: "وصّلك",
        kind: { en: "Delivery · five apps on one core", ar: "توصيل · خمسة تطبيقات بنواة واحدة" },
        stack: ["Flutter", "Django", "WebSocket"],
        year: "2023",
      },
      {
        name: "TruckGo",
        nameAr: "ترك جو",
        kind: { en: "Freight · shipper app, driver app, web, ML service", ar: "شحن · تطبيق عميل وسائق وويب وخدمة تعلّم آلي" },
        stack: ["Flutter", "Python"],
        year: "2023",
      },
      {
        name: "Purete",
        nameAr: "بيوريتي",
        kind: { en: "Multi-service Django behind NGINX, a database per service", ar: "عدّة خدمات Django خلف NGINX، قاعدة بيانات لكل خدمة" },
        stack: ["Django", "Docker", "NGINX", "Postgres"],
        year: "2024",
      },
      {
        name: "Somow",
        nameAr: "سُمو",
        kind: { en: "Company platform and internal operations", ar: "منصّة الشركة وتشغيلها الداخلي" },
        stack: ["JavaScript", "Node"],
        year: "2024 — Now",
        href: "https://somow.sa",
      },
    ],
  },
  {
    id: "products",
    title: { en: "Products", ar: "منتجات" },
    desc: {
      en: "Single applications taken from an idea to a store listing.",
      ar: "تطبيقات مفردة أُخذت من الفكرة إلى المتجر.",
    },
    items: [
      { name: "Manam", nameAr: "منام", kind: { en: "Interpreter workspace for Abber", ar: "مساحة عمل المعبّرين في عبر" }, stack: ["Swift", "Objective-C"], year: "2026" },
      { name: "Wasla", nameAr: "وصلة", kind: { en: "Group and channel directory, chat and challenges", ar: "دليل مجموعات وقنوات، مع دردشة وتحدّيات" }, stack: ["Flutter", "Firebase", "BLoC"], year: "2026" },
      { name: "AppProof", kind: { en: "Beta-testing platform — app, web, backend", ar: "منصّة اختبار إصدارات — تطبيق وويب وخلفية" }, stack: ["Flutter", "Django", "Next.js"], year: "2026" },
      { name: "MT Admin Pro", kind: { en: "MikroTik router management", ar: "إدارة موجّهات MikroTik" }, stack: ["Flutter"], year: "2026" },
      { name: "Lumi", nameAr: "لومي", kind: { en: "Arabic learning assistant for children", ar: "مساعد تعليمي ذكي للأطفال العرب" }, stack: ["Flutter"], year: "2026" },
      { name: "Sweetra", nameAr: "سويترا", kind: { en: "Commerce app, live on the stores", ar: "تطبيق تجاري منشور في المتاجر" }, stack: ["Flutter"], year: "2026" },
      { name: "Moqawlat", nameAr: "مقاولات", kind: { en: "Contracting platform", ar: "منصّة مقاولات" }, stack: ["Flutter"], year: "2026" },
      { name: "WhatsApp Notification Saver", kind: { en: "Recovers deleted messages from the notification log", ar: "يستعيد الرسائل المحذوفة من سجلّ الإشعارات" }, stack: ["Flutter", "Android"], year: "2026" },
      { name: "CopyPaste", kind: { en: "macOS menu-bar clipboard manager", ar: "مدير حافظة في شريط قوائم macOS" }, stack: ["SwiftUI"], year: "2026" },
      { name: "Kushak", nameAr: "كشك", kind: { en: "Retail app", ar: "تطبيق بيع" }, stack: ["Flutter"], year: "2026" },
    ],
  },
  {
    id: "finance",
    title: { en: "Accounting & finance", ar: "أنظمة محاسبية ومالية" },
    desc: {
      en: "Ledgers, wallets and payment flows — where a rounding error is a real loss.",
      ar: "دفاتر ومحافظ ومسارات دفع — حيث خطأ التقريب خسارة حقيقية.",
    },
    items: [
      { name: "Alminshar", nameAr: "المنشار", kind: { en: "Accounting system for a sawmill business", ar: "نظام محاسبي لمنشرة" }, stack: ["Flutter"], year: "2024" },
      { name: "Ezbh", nameAr: "عزبة (الأولى)", kind: { en: "Group management with its own financial system", ar: "إدارة مجموعات بنظام مالي خاص" }, stack: ["Flutter"], year: "2025" },
      { name: "Aleuhda", nameAr: "الوحدة", kind: { en: "Wallet with top-ups and payment verification", ar: "محفظة بشحن رصيد وتحقّق من الدفع" }, stack: ["Flutter"], year: "2022" },
      { name: "Abber Wallet", nameAr: "محفظة عبر", kind: { en: "Wallet, payouts and subscriptions inside Abber", ar: "محفظة ومستحقّات واشتراكات داخل عبر" }, stack: ["Django", "Payments"], year: "2023 — Now" },
      { name: "HyperPay integration", nameAr: "تكامل HyperPay", kind: { en: "Card gateway wired into production apps", ar: "بوّابة بطاقات موصولة بتطبيقات إنتاج" }, stack: ["Dart", "Kotlin"], year: "2023" },
      { name: "Tamara integration", nameAr: "تكامل تمارا", kind: { en: "Buy-now-pay-later checkout", ar: "دفع مؤجّل عند الشراء" }, stack: ["Flutter", "Django"], year: "2024" },
    ],
  },
  {
    id: "games",
    title: { en: "Games", ar: "ألعاب" },
    desc: {
      en: "Built for the parts engineering rarely asks for — timing, feel and state.",
      ar: "بُنيت لأجزاء نادراً ما تطلبها الهندسة — التوقيت والإحساس والحالة.",
    },
    items: [
      { name: "Jumal", nameAr: "جُمل", kind: { en: "Arabic word-search with a saved progression system", ar: "بحث عن الكلمات العربية بنظام تقدّم محفوظ" }, stack: ["Flutter", "Hive"], year: "2026", href: "https://github.com/ardev-dev/jumal" },
      { name: "TicTacTonz", nameAr: "اتحداك", kind: { en: "Two-player match game", ar: "لعبة تحدٍّ بين لاعبين" }, stack: ["Flutter"], year: "2022", href: "https://github.com/ardev-dev/tictactonz" },
      { name: "Crush Game", kind: { en: "Match-three puzzle", ar: "لعبة مطابقة ثلاثية" }, stack: ["Flutter"], year: "2023", href: "https://github.com/ardev-dev/crush-game" },
      { name: "Hue Mixer", kind: { en: "Colour-mixing puzzle with a native engine", ar: "لغز خلط ألوان بمحرّك أصلي" }, stack: ["C++", "Flutter"], year: "2025", href: "https://github.com/ardev-dev/hue_mixer" },
    ],
  },
  {
    id: "oss",
    title: { en: "Open source", ar: "مفتوح المصدر" },
    desc: {
      en: "Packages other teams depend on — published, versioned, maintained.",
      ar: "حزم تعتمد عليها فرق أخرى — منشورة ومُصدّرة ومصانة.",
    },
    items: [
      { name: "solar_community_icons", kind: { en: "2,500+ Flutter icons · 160/160 on pub.dev", ar: "أكثر من ٢٥٠٠ أيقونة لـ Flutter · ١٦٠/١٦٠ على pub.dev" }, stack: ["Dart"], year: "2026", href: "https://pub.dev/packages/solar_community_icons" },
      { name: "flutter_websocket_manager", kind: { en: "WebSocket lifecycle — reconnect, backoff, typed events", ar: "دورة حياة WebSocket — إعادة اتصال وتراجع تدريجي وأحداث مُصنّفة" }, stack: ["Dart"], year: "2026", href: "https://pub.dev/packages/flutter_websocket_manager" },
      { name: "video_compressor_plus", kind: { en: "Native-encoder compression, no FFmpeg — revived an abandoned package", ar: "ضغط بالمشفّر الأصلي بلا FFmpeg — إحياء لحزمة مهجورة" }, stack: ["Swift", "Kotlin"], year: "2026", href: "https://pub.dev/packages/video_compressor_plus" },
      { name: "shared_utils", kind: { en: "The internal Flutter framework the team builds on", ar: "الإطار الداخلي لـ Flutter الذي يبني عليه الفريق" }, stack: ["Dart"], year: "2026", href: "https://github.com/AbberApp/shared_utils" },
      { name: "voice_call_core", kind: { en: "Voice-call plugin behind Abber's calls", ar: "إضافة المكالمات الصوتية خلف مكالمات عبر" }, stack: ["Dart", "Swift"], year: "2025", href: "https://github.com/AbberApp/voice_call_core" },
      { name: "hyperpay_flutter_plugin", kind: { en: "HyperPay gateway binding for Flutter", ar: "ربط بوّابة HyperPay بـ Flutter" }, stack: ["Dart", "Kotlin"], year: "2023", href: "https://github.com/ardev-dev/hyperpay_flutte_plugin" },
      { name: "intl_phone_utils", kind: { en: "Phone-number parsing and formatting", ar: "تحليل أرقام الهواتف وتنسيقها" }, stack: ["Dart"], year: "2023", href: "https://github.com/ardev-dev/intl_phone_utils" },
    ],
  },
  {
    id: "ai",
    title: { en: "AI & automation", ar: "ذكاء وأتمتة" },
    desc: {
      en: "Pipelines that run without a human in the loop.",
      ar: "خطوط إنتاج تعمل بلا تدخّل بشري.",
    },
    items: [
      { name: "FactForge", kind: { en: "Idea to published video across six agent stages", ar: "من الفكرة إلى فيديو منشور عبر ست مراحل وكلاء" }, stack: ["Python", "LLM"], year: "2026", href: "https://github.com/ardev-dev/FactForge" },
      { name: "CutReact", kind: { en: "Automated video editing and audio engineering", ar: "مونتاج فيديو وهندسة صوت آليّان" }, stack: ["Python", "FFmpeg"], year: "2026" },
      { name: "TruckGo AI", kind: { en: "Pricing and matching service for freight", ar: "خدمة تسعير ومطابقة للشحن" }, stack: ["Python"], year: "2023" },
    ],
  },
  {
    id: "tools",
    title: { en: "Web tools", ar: "أدوات ويب" },
    desc: {
      en: "Thirteen single-purpose tools, one Next.js template, built in a week.",
      ar: "ثلاث عشرة أداة أحاديّة الغرض، بقالب Next.js واحد، بُنيت في أسبوع.",
    },
    items: [
      { name: "qr · colorcraft · typeblaze · calcpro", kind: { en: "QR codes, palettes, typing practice, calculators", ar: "أكواد QR، ولوحات ألوان، وتدريب كتابة، وحاسبات" }, stack: ["Next.js", "TypeScript"], year: "2026" },
      { name: "brainquiz · resumeforge · timer · passgen", kind: { en: "Quizzes, résumé builder, timers, password generation", ar: "اختبارات، ومنشئ سيرة، ومؤقّتات، وتوليد كلمات مرور" }, stack: ["Next.js", "TypeScript"], year: "2026" },
      { name: "numwords · codesnap · markflow · units · age", kind: { en: "Numbers to words, code images, Markdown, conversion, dates", ar: "أرقام إلى كلمات، وصور كود، وماركداون، وتحويل وحدات، وتواريخ" }, stack: ["Next.js", "TypeScript"], year: "2026" },
    ],
  },
];

/** أعمال ٢٠٢٠–٢٠٢٢ — تُعرض كأسماء فقط، فهي مرحلة تعلّم وتسليم مبكّر. */
export const earlyWork = [
  "E-commerce Pro", "Mateam", "Mawsil", "DBCargo", "Shipperit", "KingLink",
  "Dalal", "Story", "Social Network", "Linkati", "Mogamo3aty", "Blogstory",
  "Minasa", "Library System", "Mapbox App", "Clean Architecture",
];

/** أرقام الفهرس — محسوبة من GitHub، لا مقدّرة. */
export const catalogStats = [
  { value: "133", label: { en: "repositories", ar: "مستودعاً" } },
  { value: "12", label: { en: "organisations", ar: "مؤسّسة" } },
  { value: "7", label: { en: "published packages", ar: "حزمة منشورة" } },
  { value: "2019", label: { en: "shipping since", ar: "أُطلق منذ" } },
];
