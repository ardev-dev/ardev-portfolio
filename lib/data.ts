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
      en: "I also prepare and submit Somow's bids for government tenders on Etimad, from reading the RFP booklet to the technical and financial proposals.",
      ar: "وأُعدّ عروض سُمو في المنافسات الحكومية على منصة اعتماد وأقدّمها، من قراءة كراسة الشروط إلى العرضين الفني والمالي.",
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
    { label: { en: "Works on", ar: "يعمل على" } as L, value: { en: "Mobile · Backend · Web · Payments · Etimad tenders", ar: "جوّال · خلفية · ويب · مدفوعات · منافسات اعتماد" } as L },
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
  { value: 98, suffix: "", label: { en: "Apps & services shipped", ar: "تطبيقات وخدمات مُنجَزة" } },
  { value: 20, suffix: "", label: { en: "Live on Apple, Google & Huawei", ar: "منشورة الآن على المتاجر" } },
  { value: 7.6, suffix: "M+", label: { en: "Lines of code authored", ar: "أسطر برمجية مؤلَّفة" } },
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
      "Google Pay", "PayPal", "Visa", "Mastercard", "Stripe", "Network International",
      "Samsung Pay", "3D Secure",
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
  {
    title: { en: "Government Tenders", ar: "المنافسات الحكومية" },
    items: [
      { en: "Etimad Platform", ar: "منصة اعتماد" },
      { en: "RFP Booklet Analysis", ar: "دراسة كراسات الشروط" },
      { en: "Compliance Matrices", ar: "مصفوفات الامتثال" },
      { en: "Technical Proposals", ar: "العروض الفنية" },
      { en: "Financial Proposals & Pricing", ar: "العروض المالية والتسعير" },
      { en: "Cost Models", ar: "نماذج التكلفة" },
      { en: "Bid Qualification", ar: "تقييم مناسبة المنافسة" },
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
      { value: "23K+", label: { en: "users", ar: "مستخدم" } },
      { value: "47K+", label: { en: "orders", ar: "طلب" } },
      { value: "680K+", label: { en: "live messages", ar: "رسالة لحظية" } },
      { value: "4.7★", label: { en: "App Store", ar: "App Store" } },
    ],
    tags: ["Flutter", "Django", "WebRTC", "Payments", "Real-time"],
    links: [
      { label: appStore, href: "https://apps.apple.com/app/id6461119454" },
      { label: googlePlay, href: "https://play.google.com/store/apps/details?id=co.abber_dev.abber_app" },
      { label: website, href: "https://abber.co" },
    ],
    shots: ["/apps/abber-1.webp", "/apps/abber-2.webp", "/apps/abber-3.webp", "/apps/abber-4.webp"],
    cover: "/apps/abber-web.webp",
    icon: "/apps/abber-icon.webp",
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
    cover: "/apps/maskani-web.webp",
    icon: "/apps/maskani-icon.webp",
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
    shots: ["/apps/wisal-1.webp", "/apps/wisal-2.webp", "/apps/wisal-3.webp"],
    cover: "/apps/wisal-web.webp",
    icon: "/apps/wisal-icon.webp",
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
    shots: ["/apps/azbah-1.webp", "/apps/azbah-2.webp", "/apps/azbah-3.webp"],
    cover: "/apps/azbah-web.webp",
    icon: "/apps/azbah-icon.webp",
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
      en: "WebSocket connection manager: headers and query params, text or JSON sending, connection state and event callbacks.",
      ar: "مدير اتصال WebSocket: ترويسات ومعاملات استعلام، وإرسال نص أو JSON، وحالة الاتصال واستدعاءات للأحداث.",
    },
    points: "160 / 160",
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
      {
        en: "Prepare and submit Somow's bids for government tenders on Etimad: qualifying the tender against the company's licensed activities, studying the RFP booklet, building the compliance matrix, and writing the technical and financial proposals with their pricing.",
        ar: "أُعدّ عروض سُمو في المنافسات الحكومية على منصة اعتماد وأقدّمها: تقييم مناسبة المنافسة لأنشطة الشركة المرخّصة، ودراسة كراسة الشروط، وبناء مصفوفة الامتثال، وكتابة العرضين الفني والمالي بتسعيرهما.",
      },
      {
        en: "Built an AI multi-agent pipeline that tracks new IT tenders on Etimad, pulls their booklets and drafts the technical proposal, financial proposal, cost model and compliance matrix for final review.",
        ar: "بنيتُ خطّاً من وكلاء الذكاء الاصطناعي يرصد منافسات تقنية المعلومات الجديدة على اعتماد، ويسحب كراساتها، ويُعدّ مسودة العرض الفني والمالي ونموذج التكلفة ومصفوفة الامتثال للمراجعة النهائية.",
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
  /**
   * وصف المشروع في الشريحة: فقرة من **215 إلى 238 حرفاً** بكل لغة، وهو الطول الذي يملأ
   * أربعة أسطر تماماً في صندوق الوصف (448px بخطّ 15px). توحيد الطول هو ما يوحّد شكل الشرائح،
   * فلا تُكتب أقصر ولا أطول. المصدر كود المشروع نفسه لا التخمين.
   */
  about?: L;
  stack: string[];
  year: string;
  href?: string;
  /** تصاميم حقيقية فقط: لقطات المتجر أو لقطات من التطبيق نفسه. بلا لقطات → ملصق البنية. */
  shots?: string[];
  /** لقطة الموقع الحيّ، للمشاريع التي واجهتها ويب. */
  cover?: string;
  icon?: string;
  /** لقطات بمقاس ساعة لا هاتف: شاشتها أعرض من ارتفاعها تقريباً، فتُعرض أصغر كي لا تخرج عن النافذة. */
  device?: "watch";
};

export type WorkGroup = {
  id: string;
  title: L;
  desc: L;
  items: Work[];
};

export const catalog: WorkGroup[] = [
  {
    id: "marketplaces",
    title: { en: "Consultations", ar: "استشارات" },
    desc: {
      en: "Two-sided products: a request goes in, a vetted professional answers, money moves.",
      ar: "منتجات ذات طرفين: يدخل الطلب، فيردّ مختصّ موثّق، وينتقل المال.",
    },
    items: [
      { name: "Abber", nameAr: "عبر", kind: { en: "Dream interpretation · app, admin, blog, backend, site", ar: "تفسير الأحلام · تطبيق ولوحة ومدوّنة وخلفية وموقع" }, about: { en: "Marketplace where a user submits a dream and a vetted interpreter answers by text, voice or video. The Flutter app covers orders, chat, Agora calls, live sessions, stories, a store and a wallet, on a Django, Channels and Celery backend.", ar: "سوق لتفسير الأحلام والرؤى يُرسل فيه المستخدم حلمه إلى معبّر موثّق فيجيبه نصاً أو صوتاً أو بالفيديو. يضمّ تطبيق Flutter الطلبات والمحادثة ومكالمات Agora والبثّ المباشر والقصص والمتجر والمحفظة، على خلفية Django مع Channels و Celery." }, stack: ["Flutter", "Django", "WebRTC"], year: "2022 — Now", href: "https://abber.co", shots: ["/apps/abber-1.webp", "/apps/abber-2.webp", "/apps/abber-3.webp"], icon: "/apps/abber-icon.webp" },
      { name: "Wisal", nameAr: "وصال", kind: { en: "Consultations with VoIP, wallet and double-entry ledger", ar: "استشارات بمكالمات ومحفظة وقيد مزدوج" }, about: { en: "Consultation marketplace linking clients to verified vendors by specialty. Orders run over chat and Agora calls and settle through a wallet. Flutter with BLoC on a Django backend that posts money movements to a double-entry ledger.", ar: "سوق استشارات يربط العملاء بمزوّدين موثّقين بحسب التخصّص. تُنفَّذ الطلبات عبر المحادثة ومكالمات Agora الصوتية وتُسوّى بالمحفظة. تطبيق Flutter مبنيّ بـ BLoC على خلفية Django تسجّل كل حركة مالية قيداً محاسبياً بنظام القيد المزدوج." }, stack: ["Flutter", "Django", "Agora"], year: "2023 — Now", href: "https://wisalapp.com", shots: ["/apps/wisal-1.webp", "/apps/wisal-2.webp", "/apps/wisal-3.webp"], icon: "/apps/wisal-icon.webp" },
      { name: "Manam", nameAr: "منام", kind: { en: "A vertical of Abber on the same backend", ar: "امتداد رأسي لعبر على الخلفية نفسها" }, about: { en: "Dream interpretation app built as a vertical of Abber. Its own Flutter codebase and Arabic-only design carry the same orders, chat, calls, live sessions and wallet. An app header lets the shared Django backend tell the two clients apart.", ar: "تطبيق لتفسير الأحلام مبنيّ امتداداً رأسياً لعبر. شيفرة Flutter مستقلّة بتصميمها الخاص وواجهة عربية فقط، تحمل الخصائص نفسها: الطلبات والمحادثة والمكالمات والبثّ والمحفظة. يرسل ترويسة باسم التطبيق لتميّزه خلفية Django المشتركة عن عبر." }, stack: ["Flutter"], year: "2026", shots: ["/work/manam-1.webp", "/work/manam-2.webp", "/work/manam-3.webp"], icon: "/work/manam-icon.webp" },
      { name: "Abber Web", nameAr: "موقع عبر", kind: { en: "The marketplace's public website", ar: "الموقع العام للمنصّة" }, about: { en: "Public website of the dream interpretation marketplace. Visitors browse interpreters, order and pay, chat, manage a wallet and read the blog. Server-rendered Nuxt frontend on the Django API the mobile apps use, hosted beside it.", ar: "الموقع العام لسوق تفسير الأحلام. يتصفّح الزائر المعبّرين ويُنشئ طلبه ويدفع ويحادث المعبّر ويدير محفظته ويقرأ المدوّنة. واجهة Nuxt تُعرَض من الخادم وتستهلك واجهة Django نفسها التي تخدم تطبيقات الجوّال، وتُستضاف بجوارها." }, stack: ["Web"], year: "2022 — Now", href: "https://abber.co", cover: "/apps/abber-web.webp", icon: "/apps/abber-icon.webp" },
      { name: "Abber Admin", nameAr: "إدارة عبر", kind: { en: "Admin app for the Abber team", ar: "تطبيق الإدارة لفريق عبر" }, about: { en: "Internal phone app the Abber team runs the marketplace with. It handles orders, users, interpreter wallets, support, WhatsApp chats, stories and statistics, plus accounting screens such as journals and trial balance. Flutter and BLoC.", ar: "تطبيق جوّال داخلي يدير به فريق عبر تشغيل السوق. يتابع الطلبات والمستخدمين ومحافظ المعبّرين وتذاكر الدعم ومحادثات WhatsApp والقصص والإحصاءات، وفيه شاشات محاسبية مثل قيود اليومية وميزان المراجعة. مبنيّ بـ Flutter و BLoC." }, stack: ["Flutter"], year: "2025", icon: "/work/abber-admin-icon.webp", shots: ["/work/abber-admin-2.webp", "/work/abber-admin-1.webp", "/work/abber-admin-3.webp"] },
      { name: "Abber Blog", nameAr: "مدوّنة عبر", kind: { en: "Standalone app for reading the Abber blog", ar: "تطبيق مستقل لقراءة مقالات مدوّنة عبر" }, about: { en: "Standalone Arabic reader for the Abber blog. It lists posts by category with search, renders HTML articles with a progress bar and saves them in Hive for offline reading. Reminders run locally; a backend flag can switch the app off.", ar: "قارئ مستقلّ لمقالات مدوّنة عبر بالعربية. يعرض المقالات بحسب التصنيف مع البحث، ويقدّم المقال بصيغة HTML مع شريط لتقدّم القراءة، ويحفظ المقالات في Hive لقراءتها دون اتصال. التذكيرات تُجدوَل محلياً، ويمكن إيقاف التطبيق بمفتاح من الخلفية." }, stack: ["Flutter"], year: "2026", icon: "/work/abber-blog-icon.webp", shots: ["/work/abber-blog-2.webp", "/work/abber-blog-1.webp", "/work/abber-blog-3.webp"] },
      { name: "Abber Watch", nameAr: "عبر للساعة", kind: { en: "Apple Watch companion for interpreters: requests, availability and wallet", ar: "رفيق المعبّر على Apple Watch: الطلبات والتوفّر والمحفظة" }, about: { en: "Apple Watch companion for Abber interpreters. SwiftUI pages show availability, wallet, orders to accept or reject, notifications and settings. Data comes from the phone app over WatchConnectivity and a Flutter channel. Not released yet.", ar: "رفيق المعبّر في عبر على Apple Watch. صفحاته بـ SwiftUI تعرض حالة التوفّر والمحفظة، والطلبات المعلّقة لقبولها أو رفضها، والإشعارات والإعدادات. تصله البيانات من تطبيق الهاتف عبر WatchConnectivity وقناة Flutter، ولم يُنشر بعد." }, stack: ["Swift", "watchOS"], year: "2025", icon: "/apps/abber-icon.webp", shots: ["/work/abber-watch-2.webp", "/work/abber-watch-1.webp", "/work/abber-watch-3.webp"], device: "watch" },
      { name: "Wisal Web", nameAr: "موقع وصال", kind: { en: "The product's public website", ar: "الموقع العام للمنتج" }, about: { en: "Marketing site for the Wisal consultation app, with a blog, legal pages and a download link routing each device to its store. Qwik City builds it fully static; a plain JavaScript page lets a guest join a call over WebSocket and Agora.", ar: "الموقع التسويقي لتطبيق الاستشارات وصال، وفيه مدوّنة وصفحات قانونية ورابط تحميل يوجّه كل جهاز إلى متجره. يبنيه Qwik City موقعاً ثابتاً بالكامل، ومعه صفحة JavaScript مستقلّة ينضمّ منها الضيف إلى المكالمة عبر WebSocket و Agora." }, stack: ["Web"], year: "2025 — Now", href: "https://wisalapp.com", cover: "/apps/wisal-web.webp", icon: "/apps/wisal-icon.webp" },
      { name: "Wisal Admin", nameAr: "إدارة وصال", kind: { en: "Admin app for the Wisal team", ar: "تطبيق الإدارة لفريق وصال" }, about: { en: "Phone app for the team operating Wisal. Staff review orders, vendors, users, wallets, invoices and support chats, and work on the ledger: chart of accounts, journals, fiscal periods, reconciliation, trial balance. Flutter, BLoC and Hive.", ar: "تطبيق جوّال للفريق الذي يشغّل وصال. يراجع الموظفون الطلبات والمزوّدين والمستخدمين والمحافظ والفواتير ومحادثات الدعم، ويعملون على الدفاتر: دليل الحسابات وقيود اليومية والفترات المالية والتسوية وميزان المراجعة. Flutter مع BLoC و Hive." }, stack: ["Flutter"], year: "2026", icon: "/work/wisal-admin-icon.webp", shots: ["/work/wisal-admin-2.webp", "/work/wisal-admin-1.webp", "/work/wisal-admin-3.webp"] },
    ],
  },
  {
    id: "realestate",
    title: { en: "Real estate", ar: "العقار" },
    desc: { en: "Listings, ownership and the people around a property.", ar: "العروض والملكية ومن يدور حول العقار." },
    items: [
      { name: "Maskani", nameAr: "مسكني", kind: { en: "Social real estate · app, admin, web, backend", ar: "عقارات اجتماعية · تطبيق ولوحة وويب وخلفية" }, about: { en: "Social real estate platform where owners and clients deal directly, without payments. Users post listings, services, jobs and property requests, follow others and chat live. Django with Channels serves the Flutter app and Next.js site.", ar: "منصّة عقارية اجتماعية يتعامل فيها المالك مع العميل مباشرةً دون مدفوعات. ينشر المستخدمون الإعلانات والخدمات والوظائف وطلبات العقار ويتابع بعضهم بعضاً ويتحادثون لحظياً. خلفية Django واحدة مع Channels تخدم تطبيق Flutter وموقع Next.js." }, stack: ["Flutter", "Django", "Next.js"], year: "2025 — Now", href: "https://maskani.homes", cover: "/apps/maskani-web.webp", icon: "/apps/maskani-icon.webp" },
      { name: "Maskani Admin", nameAr: "إدارة مسكني", kind: { en: "Internal operations app for the platform", ar: "تطبيق التشغيل الداخلي للمنصّة" }, about: { en: "Operations app for Maskani moderators, limited to admins signed in with Google. It covers users, listings, services, requests, reports, verification, chats, help desk flows and analytics. Flutter and BLoC on the backend admin routes.", ar: "تطبيق تشغيل لمشرفي مسكني، لا يدخله إلا حساب إداري عبر Google. يغطّي المستخدمين والإعلانات والخدمات والطلبات والبلاغات والتوثيق والمحادثات ومسارات مركز المساعدة ورسوم التحليلات. مبنيّ بـ Flutter و BLoC على مسارات الإدارة في الخلفية." }, stack: ["Flutter"], year: "2026", icon: "/apps/maskani-icon.webp", shots: ["/work/maskani-admin-2.webp", "/work/maskani-admin-1.webp", "/work/maskani-admin-3.webp"] },
      { name: "Dalal", nameAr: "دلال", kind: { en: "Early prototype: a Flutter sign-in screen on a token-auth Django API", ar: "نموذج أوّلي: شاشة دخول بـ Flutter على واجهة Django بمصادقة الرموز" }, about: { en: "Early prototype of a real estate market app for Yemen. Only sign-in exists: a Flutter form posts to a Django REST Framework token endpoint, stores the token and opens a placeholder page. The backend adds a users route and a test view.", ar: "نموذج أوّلي لتطبيق سوق عقارات في اليمن. لم يُنجَز منه سوى الدخول: نموذج Flutter يرسل بيانات الدخول إلى مسار الرموز في Django REST Framework ويحفظ الرمز ثم يفتح صفحة رئيسية مؤقّتة. الخلفية تعرض المستخدمين ومساراً تجريبياً محمياً." }, stack: ["Flutter", "Django"], year: "2023" },
    ],
  },
  {
    id: "logistics",
    title: { en: "Delivery & logistics", ar: "التوصيل واللوجستيات" },
    desc: { en: "Fleets, drivers and live position — where a late update is a lost order.", ar: "أساطيل وسائقون وموقع لحظي — حيث التأخّر في التحديث طلبٌ ضائع." },
    items: [
      { name: "Wasselak", nameAr: "وصّلك", kind: { en: "Five apps on one core: customer, captain, business, staff, admin", ar: "خمسة تطبيقات بنواة واحدة: عميل ومندوب ومنشأة وموظّف وإدارة" }, about: { en: "Customer app of a five-app delivery platform. Shoppers browse nearby businesses by section, build a cart with product options, order to a saved address and follow each status live. Flutter with BLoC, Dio, Hive and WebSocket updates.", ar: "تطبيق العميل في منصّة توصيل من خمسة تطبيقات. يتصفّح المستخدم المتاجر القريبة بحسب القسم، ويبني سلّته مع خيارات المنتج، ويطلب إلى عنوان محفوظ، ثم يتابع حالة الطلب لحظيّاً. مبنيّ بـ Flutter و BLoC و Dio و Hive مع تحديثات WebSocket." }, stack: ["Flutter", "Django", "WebSocket"], year: "2023", icon: "/work/wasselak-icon.webp", shots: ["/work/wasselak-2.webp", "/work/wasselak-1.webp", "/work/wasselak-3.webp"] },
      { name: "Wasselak Captain", nameAr: "وصّلك — المندوب", kind: { en: "The delivery captain's app", ar: "تطبيق مندوب التوصيل" }, about: { en: "Courier side of the Wasselak platform. A captain turns work status on, gets order offers over a WebSocket with a sound alert, accepts one, opens the route in Google Maps and advances the delivery steps. Earnings show in a wallet.", ar: "تطبيق المندوب في منصّة وصّلك. يفعّل المندوب حالة العمل فتصله عروض الطلبات عبر WebSocket مع تنبيه صوتي، فيقبل أحدها ويفتح المسار في خرائط Google ويحدّث مراحل التوصيل. تظهر مستحقّاته في محفظة داخل التطبيق، وهو مبنيّ بـ Flutter و BLoC." }, stack: ["Flutter"], year: "2023", icon: "/work/wasselak-icon.webp", shots: ["/work/wasselak-captain-2.webp", "/work/wasselak-captain-1.webp", "/work/wasselak-captain-3.webp"] },
      { name: "Wasselak Business", nameAr: "وصّلك — المنشآت", kind: { en: "App for the businesses that send orders", ar: "تطبيق المنشآت التي ترسل الطلبات" }, about: { en: "Merchant app for stores that sell through Wasselak. New orders arrive live with a sound alert and are accepted, rejected or marked ready. The owner manages products, categories, discounts and working hours, and reads order statistics.", ar: "تطبيق التاجر للمتاجر التي تبيع عبر وصّلك. تصل الطلبات لحظيّاً مع تنبيه صوتي، فيقبلها التاجر أو يرفضها أو يعلن جاهزيتها. ويدير منه المنتجات والأصناف والخصومات وساعات العمل، ويطّلع على إحصاءات الطلبات والدخل. مبنيّ بـ Flutter و BLoC." }, stack: ["Flutter"], year: "2023", icon: "/work/wasselak-icon.webp", shots: ["/work/wasselak-business-2.webp", "/work/wasselak-business-1.webp", "/work/wasselak-business-3.webp"] },
      { name: "Wasselak Employee", nameAr: "وصّلك — الموظفون", kind: { en: "Staff app", ar: "تطبيق الموظفين" }, about: { en: "Operations app for Wasselak branch staff. Employees watch the city order queue over a WebSocket, move each order to its next status or reject it, and chat with or call the customer, shop and driver. Built with Flutter and BLoC.", ar: "تطبيق التشغيل لموظّفي فروع وصّلك. يراقب الموظّف قائمة طلبات المدينة عبر WebSocket، وينقل كل طلب إلى حالته التالية أو يرفضه، ويحادث العميل والمتجر والمندوب أو يتصل بهم من شاشة الطلب نفسها. مبنيّ بـ Flutter و BLoC مع إشعارات Firebase." }, stack: ["Flutter"], year: "2024", icon: "/work/wasselak-icon.webp", shots: ["/work/wasselak-employee-2.webp", "/work/wasselak-employee-1.webp", "/work/wasselak-employee-3.webp"] },
      { name: "Wasselak Admin", nameAr: "وصّلك — الإدارة", kind: { en: "Administration app", ar: "تطبيق الإدارة" }, about: { en: "Management app for Wasselak branch managers. One hub opens shops and their sections, drivers, employees, offers and every user wallet, plus branch settings such as platform fee and delivery range. A Flutter phone app, not a web panel.", ar: "تطبيق الإدارة لمديري فروع وصّلك. شاشة واحدة تقود إلى المتاجر وأقسامها والمندوبين والموظّفين والعروض ومحافظ جميع المستخدمين، وإلى إعدادات الفرع مثل عمولة المنصّة ونطاق التوصيل. تطبيق جوال بـ Flutter و BLoC، لا لوحة ويب." }, stack: ["Flutter"], year: "2024", icon: "/work/wasselak-icon.webp", shots: ["/work/wasselak-admin-2.webp", "/work/wasselak-admin-1.webp", "/work/wasselak-admin-3.webp"] },
      { name: "Wasselak Core", nameAr: "وصّلك — النواة", kind: { en: "Django core: orders, drivers, coupons, chat, reviews and notifications", ar: "نواة Django: طلبات وسائقون وكوبونات ومحادثة وتقييمات وإشعارات" }, about: { en: "Backend of the five Wasselak apps. Django REST Framework serves orders, businesses, drivers, coupons, wallets, reviews and support, and Channels consumers push order and chat events over WebSocket. PostGIS, Firebase push, S3 media.", ar: "خادم تطبيقات وصّلك الخمسة. يقدّم Django REST Framework واجهات الطلبات والمتاجر والمندوبين والكوبونات والمحافظ والتقييمات والدعم، وتدفع Channels أحداث الطلبات والمحادثة عبر WebSocket. المواقع على PostGIS والإشعارات عبر Firebase." }, stack: ["Django"], year: "2023", icon: "/work/wasselak-icon.webp", cover: "/work/wasselak-core-web.webp" },
      { name: "TruckGo", nameAr: "ترك جو", kind: { en: "Freight · shipper app, driver app, web, ML service", ar: "شحن · تطبيق عميل وسائق وويب وخدمة تعلّم آلي" }, about: { en: "Shipper app of a freight marketplace. The customer sets origin and destination on the map, books directly or opens the request to bargaining, compares driver offers and tracks the order. Flutter, BLoC, Google Maps; unfinished in places.", ar: "تطبيق صاحب الشحنة في سوق لنقل البضائع. يحدّد العميل نقطتي التحميل والتسليم على الخريطة، ثم يحجز مباشرة أو يفتح الطلب للمفاوضة على السعر، ويقارن عروض السائقين ويتتبّع الطلب. مبنيّ بـ Flutter و BLoC وخرائط Google، وفيه أجزاء لم تكتمل." }, stack: ["Flutter", "Python"], year: "2023", icon: "/work/truckgo-icon.webp", shots: ["/work/truckgo-1.webp", "/work/truckgo-2.webp", "/work/truckgo-3.webp"] },
      { name: "TruckGo Driver", nameAr: "ترك جو — السائق", kind: { en: "The driver's app", ar: "تطبيق السائق" }, about: { en: "Driver app of the TruckGo marketplace. Open freight requests appear as pins on a map; the driver sends a price offer, follows accepted orders and registers the truck. Flutter with BLoC, Google Maps, background location and OTP sign-in.", ar: "تطبيق السائق في سوق ترك جو لنقل البضائع. تظهر طلبات النقل المفتوحة دبابيس على الخريطة، فيرسل السائق عرض سعر ويتابع الطلبات المقبولة ويسجّل شاحنته. مبنيّ بـ Flutter و BLoC وخرائط Google، مع تتبّع الموقع في الخلفية والدخول برمز الجوال." }, stack: ["Flutter"], year: "2022", icon: "/work/truckgo-icon.webp", shots: ["/work/truckgo-driver-2.webp", "/work/truckgo-driver-1.webp", "/work/truckgo-driver-3.webp"] },
      { name: "TruckGo Web", nameAr: "ترك جو — الويب", kind: { en: "Django platform: dashboard, drivers, services, wallet, chat and notifications", ar: "منصّة Django: لوحة تحكّم وسائقون وخدمات ومحفظة ومحادثة وإشعارات" }, about: { en: "Django backend and web layer of TruckGo. REST APIs cover accounts, drivers and trucks, requests with offers and orders, wallets and notifications; Channels handles chat and online status. It also serves a landing page and admin pages.", ar: "خادم ترك جو وواجهته على الويب، مبنيّ بـ Django. تغطّي واجهات REST الحسابات والسائقين والشاحنات وطلبات النقل بعروضها وأوامرها والمحافظ والإشعارات، وتتولّى Channels المحادثة وحالة الاتصال. ويقدّم كذلك صفحة تعريفية وصفحات إدارية." }, stack: ["Django"], year: "2022", icon: "/work/truckgo-icon.webp", cover: "/work/truckgo-web-web.webp" },
      { name: "Mapbox App", kind: { en: "Ride-booking demo: place search, route and fare review", ar: "تجربة حجز رحلات: بحث أماكن ومسار ومراجعة الأجرة" }, about: { en: "Ride-booking demo, not a product. The user sees the current location on a map, searches pickup and drop-off places, then reviews the route with distance and arrival time. Flutter, mapbox_gl and Dio calls to Mapbox search and directions.", ar: "تجربة لحجز الرحلات وليست منتجاً. يرى المستخدم موقعه الحالي على الخريطة، ويبحث عن نقطتي الانطلاق والوصول، ثم يراجع المسار المرسوم مع المسافة ووقت الوصول. مبنيّة بـ Flutter ومكتبة mapbox_gl، مع طلبات Dio إلى خدمات Mapbox للبحث والاتجاهات." }, stack: ["Flutter", "Mapbox"], year: "2023", href: "https://github.com/ardev-dev/mapbox_app", shots: ["/work/mapbox-2.webp", "/work/mapbox-1.webp", "/work/mapbox-3.webp"] },
      { name: "Mawsil", nameAr: "موصل", kind: { en: "Food delivery: a Flutter app on a Django backend", ar: "توصيل طعام: تطبيق Flutter على خلفية Django" }, about: { en: "Food delivery app in an early form. Its home lists popular and recommended dishes from a REST API, each with a detail page, quantity and add to cart; the cart is stored on the device. Flutter with GetX, fed by a Django REST backend.", ar: "تطبيق توصيل طعام في صورته الأولى. تعرض الشاشة الرئيسية الأطباق الرائجة والمقترحة من واجهة REST، ولكل طبق صفحة تفاصيل فيها الكمية والإضافة إلى السلّة، وتُحفظ السلّة على الجهاز. مبنيّ بـ Flutter و GetX، وتغذّيه خلفية Django REST مستقلة." }, stack: ["Flutter", "Django"], year: "2022", href: "https://github.com/ardev-dev/mawsil", shots: ["/work/mawsil-2.webp", "/work/mawsil-1.webp", "/work/mawsil-3.webp"] },
      { name: "DBCargo", nameAr: "دي بي كارجو", kind: { en: "Cargo shipping app", ar: "تطبيق شحن بضائع" }, about: { en: "Prototype of a travel and cargo app. It has a home with package tracking, a flight search with a ticket list, and a stepped cargo shipment flow with items and a wishlist. Flutter with GetX; content is hard-coded, with no backend.", ar: "نموذج أوّلي لتطبيق سفر وشحن بضائع. فيه شاشة رئيسية لتتبّع الطرود، وبحث عن الرحلات الجوية مع قائمة تذاكر، ومسار شحن على مراحل يضمّ الأصناف وقائمة المفضّلة. مبنيّ بـ Flutter و GetX، ومحتواه ثابت في الشيفرة دون خادم، فهو عمل واجهات فقط." }, stack: ["Flutter"], year: "2022", href: "https://github.com/ardev-dev/DBCargo", shots: ["/work/dbcargo-2.webp", "/work/dbcargo-1.webp", "/work/dbcargo-3.webp"] },
      { name: "Shipperit", nameAr: "شيبرت", kind: { en: "Shipping app, with a Flutter web build", ar: "تطبيق شحن، مع نسخة ويب بـ Flutter" }, about: { en: "Shipping and flight booking prototype, sharing its code with DBCargo under another brand. Screens cover a service grid, a flight search form with dates, passengers and class, and a cargo item form. Flutter and GetX, plus a web build.", ar: "نموذج أوّلي للشحن وحجز الرحلات، يشترك في شيفرته مع DBCargo بعلامة مختلفة. تشمل شاشاته شبكة الخدمات، ونموذج البحث عن رحلة بالتاريخ وعدد المسافرين والدرجة، ونموذج إضافة أصناف الشحنة. مبنيّ بـ Flutter و GetX، وله نسخة ويب مبنيّة بـ Flutter." }, stack: ["Flutter"], year: "2022", href: "https://github.com/ardev-dev/shipperit-flutter", shots: ["/work/shipperit-2.webp", "/work/shipperit-1.webp", "/work/shipperit-3.webp"] },
    ],
  },
  {
    id: "finance",
    title: { en: "Accounting & payments", ar: "المحاسبة والمدفوعات" },
    desc: { en: "Ledgers, wallets and gateways — where a rounding error is a real loss.", ar: "دفاتر ومحافظ وبوّابات — حيث خطأ التقريب خسارة حقيقية." },
    items: [
      { name: "Kushak", nameAr: "كشك", kind: { en: "Accounting for kiosks and shops: branches, settlements, invoices, staff, stock", ar: "محاسبة الأكشاك والمحلات: فروع وتسويات وفواتير وموظّفون ومخزون" }, about: { en: "Accounting app for kiosk and small-shop owners with several branches. It records point-of-sale invoices, stock, staff work days and settlements between branches, and exports PDF reports. Flutter and BLoC on Firestore with a Hive cache.", ar: "تطبيق محاسبة لأصحاب الأكشاك والمحلات الصغيرة متعدّدة الفروع. يسجّل فواتير البيع من شاشة نقطة بيع، والمخزون وأيام عمل الموظّفين والتسويات بين الفروع، ويصدّر التقارير بصيغة PDF. مبنيّ بـ Flutter و BLoC على Firestore مع تخزين محلّي عبر Hive." }, stack: ["Flutter", "Firebase"], year: "2026", icon: "/work/kushak-icon.webp", shots: ["/work/kushak-1.webp", "/work/kushak-2.webp", "/work/kushak-3.webp"] },
      { name: "Alminshar", nameAr: "المنشار", kind: { en: "Accounting system for a sawmill business", ar: "نظام محاسبي لمنشرة" }, about: { en: "Bookkeeping for a sawmill business. A chart-of-accounts tree feeds statements, sales and purchase invoices, vouchers, warehouses and an income statement, with per-user permissions. Flutter and BLoC on Firestore, with Google Drive backup.", ar: "نظام محاسبي أُعدّ لمنشرة. شجرة دليل الحسابات تغذّي كشوف الحساب وفواتير البيع والشراء والسندات والمستودعات وقائمة الدخل، مع صلاحيات لكل مستخدم. مبنيّ بـ Flutter و BLoC على Firestore، ومعه نسخ احتياطي للبيانات إلى Google Drive واستعادة منه." }, stack: ["Flutter"], year: "2024", shots: ["/work/alminshar-1.webp", "/work/alminshar-2.webp", "/work/alminshar-3.webp"] },
      { name: "Azbah", nameAr: "عزبة", kind: { en: "Expense splitting and settle-up on a double-entry ledger", ar: "تقسيم المصاريف والتسوية على قيد مزدوج" }, about: { en: "Group members split shared expenses, raise claims and settle them by wallet or cash. Every movement posts to a double-entry ledger in a Django REST backend on PostgreSQL, and WebSocket events refresh the Flutter app. Live on both stores.", ar: "أعضاء المجموعة يتقاسمون المصاريف المشتركة ويرفعون المطالبات بينهم ويسوّونها بالمحفظة أو نقداً. كل حركة تُقيَّد في دفتر بالقيد المزدوج على خلفية Django REST و PostgreSQL، وأحداث WebSocket تحدّث تطبيق Flutter. التطبيق منشور على المتجرين." }, stack: ["Flutter", "Django"], year: "2024 — Now", href: "https://azbah.somow.sa", shots: ["/apps/azbah-1.webp", "/apps/azbah-2.webp", "/apps/azbah-3.webp"], icon: "/apps/azbah-icon.webp" },
      { name: "Azbah Admin", nameAr: "إدارة عزبة", kind: { en: "The operations panel behind the ledger", ar: "لوحة التشغيل خلف الدفتر" }, about: { en: "Internal operations app for the Azbah team. Staff review groups, claims, payments, wallets and withdrawals, and read the chart of accounts, journal entries and trial balance. Flutter and BLoC on the same Django API; not on the stores.", ar: "تطبيق تشغيل داخلي لفريق عزبة. يراجع الموظّفون المجموعات والمطالبات والمدفوعات والمحافظ وطلبات السحب، ويطّلعون على دليل الحسابات وقيود اليومية وميزان المراجعة. مبنيّ بـ Flutter و BLoC على واجهة Django نفسها، وغير منشور في المتاجر." }, stack: ["Flutter"], year: "2026", icon: "/work/azbah-admin-icon.webp", shots: ["/work/azbah-admin-2.webp", "/work/azbah-admin-1.webp", "/work/azbah-admin-3.webp"] },
      { name: "Azbah Web", nameAr: "موقع عزبة", kind: { en: "The product's public website", ar: "الموقع العام للمنتج" }, about: { en: "Public site of the Azbah app, rendered as Django templates by the backend that serves the API. It holds an Arabic landing page, legal pages, a payment-status page and invite links that open the app or lead to the right store.", ar: "الموقع العام لتطبيق عزبة، ويُقدَّم بقوالب Django من الخلفية نفسها التي تخدم الواجهة البرمجية. فيه صفحة تعريفية بالعربية وصفحات قانونية وصفحة حالة الدفع، وروابط دعوة تفتح التطبيق إن كان مثبّتاً أو تحيل الزائر إلى المتجر المناسب لجهازه." }, stack: ["Web"], year: "2025 — Now", href: "https://azbah.somow.sa", cover: "/apps/azbah-web.webp", icon: "/apps/azbah-icon.webp" },
      { name: "Ezbh", nameAr: "عزبة (الأولى)", kind: { en: "Group management with its own financial system", ar: "إدارة مجموعات بنظام مالي خاص" }, about: { en: "First generation of Azbah, for running a shared group. Members create or join groups, record bills and who has paid, vote in polls and share locations on a map. Flutter, Clean Architecture and Cubit on Firebase; chat is a placeholder.", ar: "الجيل الأول من عزبة: تطبيق لإدارة مجموعة. ينشئ الأعضاء المجموعات أو ينضمّون إليها، ويسجّلون الفواتير ومن سدّدها، ويصوّتون في الاستطلاعات ويشاركون المواقع على الخريطة. مبنيّ بـ Flutter و Cubit على Firebase، والدردشة فيه لم تكتمل بعد." }, stack: ["Flutter"], year: "2025", shots: ["/work/ezbh-1.webp", "/work/ezbh-2.webp", "/work/ezbh-3.webp"] },
      { name: "Aleuhda", nameAr: "عهدة", kind: { en: "Payments: payment requests, wallet and verification, on its own organisation", ar: "مدفوعات: طلبات دفع ومحفظة وتحقّق، بمؤسّسة مستقلّة" }, about: { en: "Custody wallet app from early Flutter work. An owner sets a budget on each wallet and shares it with contacts; a holder withdraws within a set limit or sends a payment request the owner accepts or rejects. Cubit on Firebase and Firestore.", ar: "تطبيق محافظ عهدة من أعمال Flutter المبكّرة. يحدّد المالك لكل محفظة ميزانية ويشاركها مع جهات اتصاله، ويسحب حاملها منها ضمن صلاحيته أو يرسل طلب دفع يقبله المالك أو يرفضه. مبنيّ بـ Cubit على Firebase Auth و Firestore، بواجهة عربية وإنجليزية." }, stack: ["Flutter"], year: "2022", shots: ["/work/aleuhda-1.webp", "/work/aleuhda-2.webp", "/work/aleuhda-3.webp"] },
      { name: "Payment gateways", nameAr: "بوّابات الدفع", kind: { en: "HyperPay, Apple Pay, STC Pay and Tamara in production apps", ar: "HyperPay و Apple Pay و STC Pay وتمارا في تطبيقات الإنتاج" }, about: { en: "Payments in the Abber and Wisal production apps. Abber bridges the native HyperPay SDK over Kotlin and Swift for cards, Apple Pay and STC Pay with 3-D Secure; Tamara uses a web checkout. Django adapters verify webhooks before settling.", ar: "تكاملات الدفع في تطبيقَي الإنتاج عبر ووصال. تطبيق عبر يربط حزمة HyperPay الأصلية بقنوات Kotlin و Swift للبطاقات و Apple Pay و STC Pay مع 3-D Secure، وتمارا تُفتح بصفحة دفع على الويب. محوّلات Django تتحقّق من إشعارات البوّابة قبل التسوية." }, stack: ["3D Secure", "Dart", "Kotlin"], year: "2023 — Now", shots: ["/work/payments-2.webp", "/work/payments-1.webp", "/work/payments-3.webp"] },
      { name: "HyperPay Flutter", kind: { en: "HyperPay checkout demo built on the hyperpay plugin", ar: "تجربة دفع HyperPay مبنيّة على حزمة hyperpay" }, about: { en: "Small integration demo for HyperPay in Flutter. Its one checkout screen takes card details, opens a payment session and pays through the hyperpay plugin; the vendor's Kotlin demo activities sit in the Android module. Endpoints are empty.", ar: "نموذج تجريبي لربط HyperPay في Flutter. شاشته الوحيدة تأخذ بيانات البطاقة وتفتح جلسة دفع وتدفع عبر إضافة hyperpay، وفي وحدة Android أنشطة Kotlin التجريبية المرفقة مع حزمة المزوّد. نقاط الاتصال متروكة فارغة، فهو مرجع للربط لا تطبيق يعمل." }, stack: ["Flutter", "Kotlin"], year: "2023", href: "https://github.com/ardev-dev/hyperpay-flutter", shots: ["/work/hyperpay-2.webp", "/work/hyperpay-3.webp"] },
    ],
  },
  {
    id: "social",
    title: { en: "Social & content", ar: "المنصّات الاجتماعية والمحتوى" },
    desc: { en: "Feeds, chat and communities — products whose value is other people.", ar: "خلاصات ودردشة ومجتمعات — منتجات قيمتها في الناس أنفسهم." },
    items: [
      { name: "Wasla", nameAr: "وصلة", kind: { en: "Interim name of the Linkati rebuild: chat, questions and challenges", ar: "الاسم المؤقّت لإعادة بناء Linkati: دردشة وتساؤلات وتحدّيات" }, about: { en: "Interim name carried by the rebuild of a WhatsApp group and Telegram channel directory, since renamed Linkati. Around the listings it adds chat, a questions community and quiz challenges with a points ranking. Flutter, Firebase, BLoC.", ar: "الاسم المؤقّت الذي حملته إعادة بناء دليل مجموعات واتساب وقنوات تيليجرام. تضيف هذه النسخة حول قوائم الروابط غرف دردشة ومجتمع تساؤلات وتحدّيات أسئلة بترتيب للنقاط. مبني بـ Flutter على Firebase وتُدار حالته عبر BLoC، ثم عاد إلى اسم لينكاتي." }, stack: ["Flutter", "Firebase", "BLoC"], year: "2026", shots: ["/work/wasla-2.webp", "/work/wasla-1.webp", "/work/wasla-3.webp"] },
      { name: "Social Network", kind: { en: "Starter scaffold for a Firebase social app: Google sign-in and page skeletons", ar: "هيكل أوّلي لتطبيق اجتماعي على Firebase: دخول عبر Google وهياكل الصفحات" }, about: { en: "Starter scaffold for a Firebase social app, left from an early learning stage. Only the signed-out splash exists: a title and a Google sign-in button that is not wired up. Timeline, profile, search and upload pages are placeholders.", ar: "هيكل أوّلي لتطبيق اجتماعي على Firebase، باقٍ من مرحلة التعلّم الأولى. الموجود فعلاً شاشة الدخول فقط: عنوان وزرّ دخول عبر Google لم يُربط بعد بأيّ منطق. أمّا صفحات الخلاصة والملف الشخصي والبحث والرفع فمجرّد عناصر نائبة بلا محتوى." }, stack: ["Flutter", "Firebase"], year: "2023", href: "https://github.com/ardev-dev/social-network" },
      { name: "KingLink", nameAr: "كينج لينك", kind: { en: "WhatsApp group-link directory", ar: "دليل روابط مجموعات واتساب" }, about: { en: "Directory of WhatsApp group links for Arabic-speaking users. Visitors browse groups by section, open a link, comment, report a group or post their own, and views are counted. A Flutter client over a Django REST API hosted on Heroku.", ar: "دليل لروابط مجموعات واتساب موجّه إلى المستخدم العربي. يتصفّح الزائر المجموعات بحسب القسم ويفتح الرابط ويعلّق ويبلّغ عن مجموعة أو ينشر رابطه، وتُحتسب المشاهدات لكل مجموعة. واجهة Flutter تتصل بواجهة Django REST مستضافة على Heroku." }, stack: ["Flutter"], year: "2022", shots: ["/work/kinglink-1.webp", "/work/kinglink-3.webp"] },
      { name: "Linkati", nameAr: "لينكاتي", kind: { en: "Link directory and sharing", ar: "دليل روابط ومشاركتها" }, about: { en: "Directory app for finding and sharing links to WhatsApp groups, Telegram channels and similar communities. New links pass a banned-word filter and admin activation before they appear. Firestore, push alerts, ads and an ad-free purchase.", ar: "تطبيق دليل للعثور على روابط الانضمام إلى مجموعات واتساب وقنوات تيليجرام وما يشبهها ومشاركتها. يمرّ الرابط المُضاف على قائمة كلمات محظورة ثم يفعّله المشرف قبل ظهوره. يعمل على Firestore مع إشعارات فورية وإعلانات واشتراك يزيلها." }, stack: ["Flutter", "Firebase"], year: "2023", shots: ["/work/linkati-1.webp", "/work/linkati-2.webp", "/work/linkati-3.webp"], icon: "/work/linkati-icon.webp" },
      { name: "Story", nameAr: "ستوري", kind: { en: "Photo-sharing app: feed, profiles and comments", ar: "تطبيق مشاركة صور: خلاصة وملفّات وتعليقات" }, about: { en: "Photo-sharing app modelled on Instagram, written as early Flutter practice. Users sign up, crop and upload photos, follow others and browse a feed, profile grids and comment threads. Firebase Auth, Firestore and Storage, with Provider.", ar: "تطبيق لمشاركة الصور على نمط Instagram، كُتب تمريناً مبكّراً على Flutter. يسجّل المستخدم ويقصّ الصورة ويرفعها ويتابع غيره، ويتصفّح الخلاصة وشبكة منشورات الملف الشخصي والتعليقات. يعتمد على Firebase Auth و Firestore و Storage مع Provider." }, stack: ["Flutter"], year: "2023", href: "https://github.com/ardev-dev/story-flutter", shots: ["/work/story-2.webp", "/work/story-1.webp", "/work/story-3.webp"] },
      { name: "Blogstory", nameAr: "بلوق ستوري", kind: { en: "Content app for study opportunities", ar: "تطبيق محتوى للفرص الدراسية" }, about: { en: "Community app for students looking for study opportunities. Members ask questions, answer and vote, and read articles below a home banner slideshow. Flutter with BLoC and get_it on Firestore, Google sign-in, push alerts and ads.", ar: "تطبيق مجتمعي للطلاب الباحثين عن فرص دراسية. يطرح الأعضاء أسئلتهم ويجيبون ويصوّتون، ويقرؤون المقالات تحت شريط عروض في الصفحة الرئيسية. مبني بـ Flutter مع BLoC و get_it على Firestore، بدخول عبر Google وإشعارات فورية وإعلانات." }, stack: ["Flutter", "Firebase"], year: "2024", icon: "/work/blogstory-icon.webp", shots: ["/work/blogstory-2.webp", "/work/blogstory-1.webp", "/work/blogstory-3.webp"] },
      { name: "Mogamo3aty", nameAr: "مجموعاتي", kind: { en: "Group-link directory: newest, most viewed and adding links", ar: "دليل روابط مجموعات: الأحدث والأكثر مشاهدة وإضافة روابط" }, about: { en: "Directory of group links for WhatsApp, Facebook and Twitter. Home lists the newest, oldest and most viewed links, each section opens a full list, and anyone can submit a link checked against banned words. Flutter on Firestore with ads.", ar: "دليل لروابط المجموعات على واتساب وفيسبوك وتويتر. تعرض الصفحة الرئيسية الأحدث والأقدم والأكثر مشاهدة، ويفتح كل قسم قائمته الكاملة، ويضيف أيّ زائر رابطاً يُفحص مقابل كلمات محظورة. مبني بـ Flutter على Firestore مع إعلانات." }, stack: ["Flutter"], year: "2023", icon: "/work/mogamo3aty-icon.webp", shots: ["/work/mogamo3aty-2.webp", "/work/mogamo3aty-1.webp", "/work/mogamo3aty-3.webp"] },
      { name: "WhatsApp Stickers", nameAr: "ملصقات واتساب", kind: { en: "Sticker-pack app for WhatsApp", ar: "تطبيق حِزم ملصقات لواتساب" }, about: { en: "Sticker app shipping Arabic packs for WhatsApp. It lists the bundled packs, previews the stickers in each and adds a pack to WhatsApp, then marks it as added. Flutter, with packs kept as WebP files and a JSON manifest, plus an ad banner.", ar: "تطبيق ملصقات يحمل حِزماً عربية جاهزة لواتساب. يعرض الحِزم المضمّنة فيه ويستعرض ملصقات كل حزمة ثم يضيفها إلى واتساب ويُظهر أنها أُضيفت. مبني بـ Flutter، والحِزم محفوظة داخله صوراً بصيغة WebP مع ملف JSON يصفها، وفيه شريط إعلاني." }, stack: ["Flutter"], year: "2021", href: "https://github.com/ardev-dev/whatsApp_stickers-flutter_app", icon: "/work/stickers-icon.webp", shots: ["/work/stickers-3.webp"] },
    ],
  },
  {
    id: "commerce",
    title: { en: "Commerce & retail", ar: "التجارة والتجزئة" },
    desc: { en: "Catalogue, cart, checkout — and the back office behind them.", ar: "كتالوج وسلّة ودفع — وما خلفها من إدارة." },
    items: [
      { name: "Khashkhash", nameAr: "خشخاش", kind: { en: "Produce catalogue on Django with WhatsApp inquiries, Docker and CI", ar: "كتالوج خضار وفواكه بـ Django مع استفسار واتساب، Docker وتكامل مستمرّ" }, about: { en: "Online catalogue for a fruit and vegetable seller. Shoppers browse products by category with discount prices and send a WhatsApp inquiry from the product page. Django with Docker Compose, PostgreSQL, Nginx and a GitHub Actions deploy.", ar: "كتالوج إلكتروني لبائع فواكه وخضروات. يتصفّح الزائر المنتجات بحسب التصنيف مع أسعار الخصم ويرسل استفساره عبر واتساب من صفحة المنتج. مبني بـ Django ويُنشر عبر Docker Compose مع PostgreSQL و Nginx ومسار نشر آلي على GitHub Actions." }, stack: ["Django", "Docker"], year: "2025", cover: "/work/khashkhash-web.webp" },
      { name: "Danya", nameAr: "دانيا", kind: { en: "Django store with accounts and product catalogue", ar: "متجر Django بحسابات وكتالوج منتجات" }, about: { en: "Small Django shop built as practice. It has a product list, a product page and a form for adding products, next to sign-up, login and logout. Server-rendered Bootstrap templates on SQLite; the code has no cart or checkout.", ar: "متجر صغير بـ Django أُنجز على سبيل التمرين. فيه قائمة منتجات وصفحة للمنتج ونموذج لإضافة منتج جديد، إلى جانب إنشاء الحساب وتسجيل الدخول والخروج. قوالب Bootstrap تُولَّد على الخادم فوق SQLite، ولا يتضمّن الكود سلّة ولا إتمام شراء." }, stack: ["Django"], year: "2023", cover: "/work/danya-web.webp" },
      { name: "E-commerce", kind: { en: "Django storefront with cart, checkout and an orders dashboard", ar: "متجر Django بسلّة ودفع ولوحة طلبات" }, about: { en: "First Django storefront from the learning period. Shoppers browse products, fill a cart that works for guests through a cookie, and check out with a shipping address and a PayPal button. It adds accounts and a simple orders dashboard.", ar: "أوّل متجر بـ Django من مرحلة التعلّم المبكّرة. يتصفّح المشتري المنتجات ويملأ سلّة تعمل للزائر أيضاً عبر ملف تعريف الارتباط، ثم يُتمّ الطلب بعنوان شحن وزرّ PayPal. وفيه حسابات للمستخدمين ولوحة بسيطة تعرض الطلبات بحسب العميل." }, stack: ["Django"], year: "2021", href: "https://github.com/ardev-dev/E-commerce", cover: "/work/ecommerce-web.webp" },
      { name: "E-commerce Pro", kind: { en: "Full storefront and admin", ar: "متجر كامل بلوحة إدارة" }, about: { en: "Second iteration of the Django storefront, split into store and dashboard apps. It keeps the cart, guest checkout and order processing, and adds an admin dashboard with order tables on a Bootstrap theme. Set up for Heroku with Gunicorn.", ar: "الإصدار الثاني من متجر Django بعد إعادة تنظيمه إلى تطبيقين: المتجر ولوحة التحكّم. يحتفظ بالسلّة وإتمام الطلب للزائر ومعالجة الطلبات، ويضيف لوحة إدارة بجداول الطلبات على قالب Bootstrap. مُهيّأ للنشر على Heroku عبر Gunicorn." }, stack: ["JavaScript", "CSS"], year: "2021", href: "https://github.com/ardev-dev/E-commerce-Pro", cover: "/work/ecommerce-pro-web.webp" },
      { name: "Mateam", nameAr: "مطعمي", kind: { en: "Restaurant management site and app", ar: "موقع وتطبيق لإدارة المطاعم" }, about: { en: "Restaurant ordering site with a thin companion app. The Django site covers the menu, cart, checkout, order tracking, customer chat and dashboards for orders, kitchen and delivery. Its REST API feeds a Flutter app that only lists dishes.", ar: "موقع طلبات لمطعم ومعه تطبيق مرافق بسيط. يغطّي موقع Django قائمة الأطباق والسلّة وإتمام الطلب وتتبّعه ومحادثة العميل، ولوحات للطلبات والمطبخ والتوصيل. وتغذّي واجهته البرمجية تطبيق Flutter صغيراً يكتفي بعرض الأطباق وتفاصيلها." }, stack: ["JavaScript", "Flutter"], year: "2021", href: "https://github.com/ardev-dev/Mateam", shots: ["/work/mateam-app-1.webp", "/work/mateam-app-2.webp"] },
      { name: "WiseBuy", nameAr: "وايز باي", kind: { en: "Price-comparison research: product and review scrapers", ar: "بحث لمقارنة الأسعار: جامعات بيانات للمنتجات والتقييمات" }, about: { en: "Research scripts for a price-comparison idea, not a finished product. Python scrapers collect product listings, prices and ratings from marketplaces, compare one product across two of them and score review sentiment. Output goes to CSV.", ar: "سكربتات بحثية لفكرة مقارنة أسعار، وليست منتجاً مكتملاً. تجمع أدوات Python قوائم المنتجات وأسعارها وتقييماتها من متاجر إلكترونية، وتقارن سعر المنتج الواحد بين متجرين، وتقيس اتجاه آراء المشترين في المراجعات. تُحفظ النتائج في ملفات CSV." }, stack: ["Python"], year: "2023", cover: "/work/wisebuy-web.webp" },
    ],
  },
  {
    id: "business",
    title: { en: "Business & operations", ar: "الأعمال والتشغيل" },
    desc: { en: "The systems a company runs on rather than sells.", ar: "أنظمة تُدار بها الشركة لا تُباع." },
    items: [
      { name: "Somow", nameAr: "سُمو", kind: { en: "Company website with a design-system showcase", ar: "موقع الشركة مع عرض لنظام التصميم" }, about: { en: "Website of Somow IT, in Arabic and English with a dark mode. Pages cover services, products, case studies, careers and a contact form, beside a design-system showcase. React transpiled in the browser, no build step, served by NGINX.", ar: "موقع شركة سُمو لتقنية المعلومات بالعربية والإنجليزية مع وضع داكن. صفحاته تغطّي الخدمات والمنتجات ودراسات الحالة والوظائف ونموذج تواصل، ومعه عرض لنظام التصميم. مكتوب بـ React يُحوَّل في المتصفّح بلا خطوة بناء، ويقدّمه NGINX ملفات ثابتة." }, stack: ["React", "NGINX"], year: "2024 — Now", href: "https://somow.sa", cover: "/apps/somow-web.webp" },
      { name: "Moqawlat", nameAr: "مقاولات", kind: { en: "Contracting platform", ar: "منصّة مقاولات" }, about: { en: "Ledger app for a contracting business. It tracks contracts, customers, workers, merchants, debts and cash boxes as journal entries in several currencies. Flutter and Cubit on Firestore, offline drafts in Hive and a scheduled month close.", ar: "دفتر محاسبي لأعمال مقاولات. يتابع العقود والعملاء والعمّال والتجّار والديون والصناديق قيوداً يومية بعدّة عملات. مبنيّ بـ Flutter و Cubit على Firestore، مع مسوّدات تُحفظ بلا اتصال عبر Hive ثم تُرحَّل، وقفل شهري مجدول للفترات المحاسبية." }, stack: ["Flutter"], year: "2026", icon: "/work/moqawlat-icon.webp", shots: ["/work/moqawlat-1.webp", "/work/moqawlat-2.webp", "/work/moqawlat-3.webp"] },
      { name: "Purete", nameAr: "بيوريتي", kind: { en: "Multi-service Django behind NGINX, a database per service", ar: "عدّة خدمات Django خلف NGINX، قاعدة بيانات لكل خدمة" }, about: { en: "Backend of a services marketplace, split into Django services for accounts, vendors, orders, wallet, payments and chats. Each owns a PostgreSQL database, they talk over gRPC, and NGINX routes requests. Runs on Docker Compose with CI.", ar: "خلفية لمنصّة خدمات مقسّمة إلى خدمات Django مستقلّة للحسابات والمزوّدين والطلبات والمحفظة والمدفوعات والمحادثات وغيرها. لكل خدمة قاعدة PostgreSQL خاصّة، وتتخاطب الخدمات عبر gRPC، ويوجّه NGINX الطلبات. تعمل على Docker Compose مع فحوص CI." }, stack: ["Django", "Docker", "NGINX"], year: "2024", cover: "/work/purete-web.webp" },
      { name: "AppProof", kind: { en: "Beta-testing platform: app, web, backend", ar: "منصّة اختبار إصدارات: تطبيق وويب وخلفية" }, about: { en: "Beta-testing platform where developers order tests and real users try Android apps. The Flutter tester app lists assignments, reads daily usage from Android usage stats in the background and files bug and UX reports. Django REST backend.", ar: "منصّة اختبار يطلب فيها المطوّرون تجربة تطبيقاتهم على Android بمستخدمين حقيقيين. تطبيق المختبِرين بـ Flutter يعرض المهام ويقرأ مدّة الاستخدام اليومية من إحصاءات النظام بمهمّة خلفية، ويرفع تقارير الأعطال والتجربة. خلفيته Django REST." }, stack: ["Flutter", "Django", "Next.js"], year: "2026", shots: ["/work/appproof-app-2.webp", "/work/appproof-app-1.webp", "/work/appproof-app-3.webp"] },
      { name: "AppProof Web", kind: { en: "The platform's website: verified beta testers, usage data and QA reports", ar: "موقع المنصّة: مختبِرون موثَّقون وبيانات استخدام وتقارير جودة" }, about: { en: "Web dashboard of the AppProof platform, with views per role. Developers create test orders and read daily QA reports with usage, bugs and UX scores; testers follow assignments and earnings; admins manage pricing. Next.js and TypeScript.", ar: "لوحة الويب لمنصّة AppProof بواجهات حسب الدور. المطوّر ينشئ طلبات الاختبار ويقرأ تقارير الجودة اليومية بالاستخدام والأعطال وتقييم التجربة، والمختبِر يتابع مهامه وأرباحه، والمدير يدير الأسعار. مبنيّة بـ Next.js و TypeScript." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/appproof-web.webp" },
    ],
  },
  {
    id: "network",
    title: { en: "Networking & infrastructure", ar: "الشبكات والبنية التحتية" },
    desc: {
      en: "Talking to hardware and the protocols underneath, not to an API someone wrapped for you.",
      ar: "مخاطبة العتاد والبروتوكولات تحته، لا واجهة جاهزة لفّها لك غيرك.",
    },
    items: [
      { name: "MikroTik Manager Pro", nameAr: "مدير MikroTik", kind: { en: "Router administration: dashboard, users, cards, logs, approvals, code-gated licensing", ar: "إدارة موجّهات: لوحة ومستخدمون وبطاقات وسجلّات وموافقات وترخيص بأكواد تفعيل" }, about: { en: "Router admin app for hotspot operators. It talks to RouterOS over the MikroTik API socket, with no backend, to manage users and profiles, print voucher cards as PDF and read logs. Riverpod state; activation codes backed by Firestore.", ar: "تطبيق لإدارة الموجّهات لمشغّلي شبكات Hotspot. يتّصل بنظام RouterOS مباشرةً عبر مقبس MikroTik API دون خادم، فيدير المستخدمين وملفاتهم ويولّد الكروت بصيغة PDF للطباعة ويقرأ السجلّات. الحالة بـ Riverpod، والتفعيل بأكواد يدعمها Firestore." }, stack: ["Flutter", "MikroTik API", "Firebase"], year: "2026", shots: ["/work/mikrotik-1.webp", "/work/mikrotik-2.webp", "/work/mikrotik-3.webp"], icon: "/work/mikrotik-icon.webp" },
      { name: "Custom Socket Push", kind: { en: "Push delivery experiment: FCM messages as local notifications", ar: "تجربة إيصال إشعارات: رسائل FCM كإشعارات محلية" }, about: { en: "Early push delivery experiment in Flutter. The active code reads the Firebase Cloud Messaging token, posts a test message and shows foreground messages as local notifications. A WebSocket listener in a background task is commented out.", ar: "تجربة مبكّرة في إيصال الإشعارات داخل Flutter. الشيفرة العاملة تقرأ رمز Firebase Cloud Messaging وترسل رسالة اختبار، وتعرض الرسائل الواردة أثناء فتح التطبيق إشعارات محلية. أمّا مستمع WebSocket داخل مهمّة خلفية فباقٍ معطّلاً في التعليقات." }, stack: ["Flutter", "Firebase"], year: "2023", href: "https://github.com/ardev-dev/custom-socket-push-notifications-flutter", cover: "/work/socket-push-web.webp" },
    ],
  },
  {
    id: "education",
    title: { en: "Education & children", ar: "التعليم والأطفال" },
    desc: { en: "Arabic-first learning, where the language is the hard part.", ar: "تعلّم عربي أوّلاً، واللغة نفسها هي الجزء الصعب." },
    items: [
      { name: "Lumi", nameAr: "لومي", kind: { en: "Arabic learning assistant for children", ar: "مساعد تعليمي ذكي للأطفال العرب" }, about: { en: "Learning companion for Arabic-speaking children. A voice assistant listens, answers through Gemini and speaks back, beside letter and number games. A PIN guards the parent report. Flutter, Riverpod and local Drift storage. Early build.", ar: "رفيق تعليمي للأطفال الناطقين بالعربية. مساعد صوتي يستمع إلى الطفل ويجيبه عبر Gemini وينطق الردّ، ومعه ألعاب الحروف والأرقام. يفتح الوالدان تقرير التقدّم برمز سرّي. مبنيّ بـ Flutter و Riverpod مع قاعدة Drift محلية، وما زال نسخة مبكّرة." }, stack: ["Flutter"], year: "2026", shots: ["/work/lumi-2.webp", "/work/lumi-1.webp", "/work/lumi-3.webp"] },
      { name: "Faheem", nameAr: "فهيم", kind: { en: "Smart learning platform for organisations: its marketing site", ar: "منصّة تعليم ذكي للجهات: موقعها التسويقي" }, about: { en: "Bilingual marketing site for a learning platform for organisations. Arabic and English pages are written in JSX and prerendered to static HTML by a Node script, so browsers load no React, just a small script. Forms are not wired yet.", ar: "موقع تسويقي بلغتين لمنصّة تعليمية موجّهة إلى الجهات. تُكتب الصفحات العربية والإنجليزية بصيغة JSX ثم يحوّلها سكربت Node عند البناء إلى HTML ثابت، فلا يحمّل المتصفّح React بل سكربتاً صغيراً. النماذج شكلية ولم تُربط بخلفية بعد." }, stack: ["HTML", "Node"], year: "2026", href: "https://faheem.wisalapp.com", cover: "/work/faheem-web.webp" },
      { name: "Minasa", nameAr: "منصة", kind: { en: "Exam platform: teachers build exam rooms, students answer", ar: "منصّة اختبارات: المعلّم ينشئ غرف الاختبار والطالب يجيب" }, about: { en: "Exam platform from early Django work. A teacher opens an exam room per subject with multiple choice or true/false questions. Students enter with teacher and room ids, answer against a countdown, and the teacher reviews each submission.", ar: "منصّة اختبارات من أعمال Django المبكّرة. ينشئ المعلّم غرفة اختبار لكل مادة ويكتب أسئلة الاختيار من متعدّد أو الصواب والخطأ. يدخل الطالب برقم المعلّم ورقم الغرفة ويجيب أمام عدّاد تنازلي، ثم يراجع المعلّم إجابات كل طالب على حدة." }, stack: ["Django"], year: "2021", href: "https://github.com/ardev-dev/minasa", cover: "/work/minasa-web.webp" },
      { name: "Library System", nameAr: "نظام مكتبة", kind: { en: "Desktop app for cataloguing and lending", ar: "برنامج سطح مكتب للفهرسة والإعارة" }, about: { en: "Desktop library manager from early Python work. A PyQt window built in Qt Designer handles books, members, lending, branches, authors and publishers, with staff permissions and report export. It queries MySQL directly; login is a stub.", ar: "برنامج سطح مكتب لإدارة مكتبة من أعمال Python المبكّرة. نافذة PyQt مصمّمة في Qt Designer تدير الكتب والأعضاء وحركات الإعارة والفروع والمؤلّفين والناشرين، مع صلاحيات للموظفين وتصدير للتقارير. يستعلم من MySQL مباشرةً، وشاشة الدخول لم تكتمل." }, stack: ["Python"], year: "2021", href: "https://github.com/ardev-dev/system-Library", cover: "/work/library-web.webp" },
    ],
  },
  {
    id: "games",
    title: { en: "Games", ar: "ألعاب" },
    desc: { en: "Built for the parts engineering rarely asks for — timing, feel and state.", ar: "بُنيت لأجزاء نادراً ما تطلبها الهندسة — التوقيت والإحساس والحالة." },
    items: [
      { name: "Sweetra", nameAr: "سويترا", kind: { en: "Match-three candy game: Flame engine, economy, in-app purchases, ads", ar: "لعبة مطابقة حلوى: بمحرّك Flame واقتصاد داخلي ومشتريات وإعلانات" }, about: { en: "Match-three candy game in Arabic and English. Levels sit on a campaign map with boosters, blockers, an economy, purchases and rewarded ads. Its match engine is pure Dart, separate from the Flame rendering, and a solver checks levels.", ar: "لعبة مطابقة حلوى بالعربية والإنجليزية. تتوزّع المراحل على خريطة حملة فيها معزّزات وعوائق واقتصاد داخلي ومشتريات وإعلانات بمكافأة. محرّك المطابقة مكتوب بـ Dart خالصة ومفصول عن العرض بمحرّك Flame، ويتحقّق حلّال آلي من المراحل." }, stack: ["Flutter", "Flame", "Firebase"], year: "2026", shots: ["/work/sweetra-1.webp", "/work/sweetra-2.webp", "/work/sweetra-3.webp"], icon: "/work/sweetra-icon.webp" },
      { name: "Jumal", nameAr: "جُمل", kind: { en: "Arabic word-search with a saved progression system", ar: "بحث عن الكلمات العربية بنظام تقدّم محفوظ" }, about: { en: "Arabic word-search puzzle. Each level shows clues in a carousel and the player traces the answers across adjacent letters on a grid, earning points, timed stars and hints, plus a daily reward and a level map. Progress is saved in Hive.", ar: "لعبة ألغاز للبحث عن الكلمات العربية. تعرض كل مرحلة أسئلتها في شريط متحرّك، ويرسم اللاعب الإجابات بين حروف متجاورة على الشبكة فيكسب نقاطاً ونجوماً بحسب الوقت وتلميحات، مع مكافأة يومية وخريطة مراحل. يُحفظ التقدّم محلياً عبر Hive." }, stack: ["Flutter", "Hive"], year: "2026", href: "https://github.com/ardev-dev/jumal", shots: ["/work/jumal-1.webp", "/work/jumal-2.webp", "/work/jumal-3.webp"] },
      { name: "TicTacTonz", nameAr: "اتحداك", kind: { en: "Two-player match game", ar: "لعبة تحدٍّ بين لاعبين" }, about: { en: "Tic-tac-toe for two players sharing one phone. A single board screen alternates turns, detects a win or a draw, shows the result in a dialog and keeps a score for each player. Plain Flutter with setState; a small early game.", ar: "لعبة إكس أو للاعبَين على هاتف واحد. تتولّى شاشة لوحة واحدة تبديل الأدوار واكتشاف الفوز أو التعادل، ثم تعرض النتيجة في نافذة وتحتفظ برصيد كل لاعب. مكتوبة بـ Flutter وإدارة حالة عبر setState، وهي لعبة صغيرة من الأعمال المبكّرة." }, stack: ["Flutter"], year: "2022", href: "https://github.com/ardev-dev/tictactonz", icon: "/work/tictactonz-icon.webp", shots: ["/work/tictactonz-1.webp", "/work/tictactonz-2.webp", "/work/tictactonz-3.webp"] },
      { name: "Crush Game", kind: { en: "Project scaffold only: a sign-in screen stub, no game code yet", ar: "هيكل مشروع فقط: شاشة دخول مبدئية، بلا كود لعبة بعد" }, about: { en: "Empty project scaffold; the game its name suggests was never written. The repository holds only a Flutter app shell and a sign-in screen stub showing one line of text. The sign-up file is empty and there is no board, art or game logic.", ar: "هيكل مشروع فارغ، فاللعبة التي يوحي بها اسمه لم تُكتب قطّ. لا يضمّ المستودع سوى قالب تطبيق Flutter وشاشة دخول مبدئية تعرض سطراً نصّياً واحداً؛ أمّا ملف إنشاء الحساب ففارغ، ولا توجد لوحة لعب ولا رسوم ولا أيّ منطق للّعبة." }, stack: ["Flutter"], year: "2023", href: "https://github.com/ardev-dev/crush-game" },
      { name: "Hue Mixer", kind: { en: "RGB colour mixer with HEX, HSL, Flutter and CSS codes", ar: "خالط ألوان RGB يُخرج أكواد HEX و HSL و Flutter و CSS" }, about: { en: "Colour mixer for designers and developers. Three RGB sliders blend a colour in an animated preview, and a sheet lists its HEX, RGB, HSL, Flutter and CSS codes with tap to copy. A single-file Flutter app on setState, Arabic interface.", ar: "أداة لمزج الألوان للمصمّمين والمطوّرين. تمزج منزلقات RGB الثلاثة لوناً يظهر في معاينة متحرّكة، وتعرض ورقة سفلية أكواده بصيغ HEX و RGB و HSL و Flutter و CSS مع النسخ بنقرة. تطبيق Flutter في ملف واحد بواجهة عربية وحالة عبر setState." }, stack: ["Flutter"], year: "2025", href: "https://github.com/ardev-dev/hue_mixer", shots: ["/work/hue-mixer-1.webp", "/work/hue-mixer-2.webp", "/work/hue-mixer-3.webp"] },
    ],
  },
  {
    id: "ai",
    title: { en: "AI & automation", ar: "ذكاء وأتمتة" },
    desc: { en: "Pipelines that run without a human in the loop.", ar: "خطوط إنتاج تعمل بلا تدخّل بشري." },
    items: [
      { name: "FactForge", kind: { en: "Idea to published video across seven pipeline stages", ar: "من الفكرة إلى فيديو منشور عبر سبع مراحل" }, about: { en: "Autonomous video pipeline for an educational YouTube channel. Python agents pick an idea, write the script, check facts on the web, voice it with local Kokoro TTS, render in Remotion and publish through the YouTube API, stage by stage.", ar: "خطّ إنتاج آلي للفيديو لقناة تعليمية على YouTube. وكلاء Python يختارون الفكرة ويكتبون النصّ ويدقّقون الحقائق من مصادر الويب، ثم يُسجَّل الصوت محلياً بـ Kokoro TTS ويُخرَج الفيديو بـ Remotion ويُنشر عبر YouTube API، مرحلةً بعد مرحلة." }, stack: ["Python", "LLM"], year: "2026", href: "https://github.com/ardev-dev/FactForge", cover: "/work/factforge-web.webp" },
      { name: "CutReact", kind: { en: "Automated video editing and audio engineering", ar: "مونتاج فيديو وهندسة صوت آليّان" }, about: { en: "Automated pipeline for voiceover Shorts. Python scripts find a Creative Commons clip, narrate it with Kokoro TTS, time each word with faster-whisper, render captions in Remotion, merge with FFmpeg and upload to YouTube once audits pass.", ar: "خطّ إنتاج آلي لمقاطع قصيرة بتعليق صوتي. سكربتات Python تجد مقطعاً برخصة المشاع الإبداعي، وتولّد التعليق بـ Kokoro TTS، وتوقّت كل كلمة بـ faster-whisper، وتُخرج النصّ المتزامن بـ Remotion، ثم تدمج بـ FFmpeg وترفع إلى YouTube بعد التدقيق." }, stack: ["Python", "FFmpeg"], year: "2026", cover: "/work/cutreact-web.webp" },
      { name: "TruckGo AI", kind: { en: "Machine-learning experiment: cost estimate and pickup clustering", ar: "تجربة تعلّم آلة: تقدير التكلفة وتجميع نقاط التحميل" }, about: { en: "Early machine learning experiment for TruckGo. Its scikit-learn scripts work on an export of freight requests: a random forest that estimates shipment cost from origin and date, and k-means clustering of pickup points. Not deployed.", ar: "تجربة مبكّرة في تعلّم الآلة لمنصّة ترك جو. سكربتات scikit-learn تعمل على عيّنة مصدَّرة من طلبات النقل: نموذج غابة عشوائية يقدّر تكلفة الشحنة من نقطة الانطلاق والتاريخ، وتجميع k-means لمواقع التحميل. شيفرة استكشافية لم تُنشر كخدمة." }, stack: ["Python"], year: "2023", icon: "/work/truckgo-icon.webp", cover: "/work/truckgo-ai-web.webp" },
      { name: "Etimad Tenders", nameAr: "منافسات اعتماد", kind: { en: "Agents that track Etimad IT tenders, pull their booklets and draft the proposals", ar: "وكلاء يرصدون منافسات تقنية المعلومات على اعتماد، ويسحبون كراساتها، ويُعدّون مسودات العروض" }, about: { en: "Internal tooling for bidding on government IT tenders on Etimad. Python skills for Claude Code watch new tenders, pull their booklets and sort them by fit; a multi-agent workflow drafts the offer. A Django and Nuxt portal tracks stages.", ar: "أدوات داخلية للتقديم على منافسات تقنية المعلومات عبر منصّة اعتماد. مهارات Python داخل Claude Code ترصد المنافسات الجديدة وتسحب كراساتها وتفرزها بحسب الملاءمة، ثم يُعدّ خطّ وكلاء مسودة العرض، وتتابع بوابة Django و Nuxt مراحل كل منافسة." }, stack: ["Multi-Agent", "LLM"], year: "2026", cover: "/work/etimad-web.webp" },
    ],
  },
  {
    id: "oss",
    title: { en: "Open source", ar: "مفتوح المصدر" },
    desc: { en: "Packages other teams depend on — published, versioned, maintained.", ar: "حزم تعتمد عليها فرق أخرى — منشورة ومُصدّرة ومصانة." },
    items: [
      { name: "solar_community_icons", kind: { en: "2,500+ Flutter icons · 160/160 on pub.dev", ar: "أكثر من ٢٥٠٠ أيقونة لـ Flutter · ١٦٠/١٦٠ على pub.dev" }, about: { en: "Flutter icon package shipping the Solar community set as two icon fonts, bold and linear, with 2,500+ glyphs exposed as IconData constants. Custom icons are appended by script so existing code points stay fixed. Rated 160/160 on pub.dev.", ar: "حزمة أيقونات لـ Flutter تقدّم مجموعة Solar المجتمعية في خطَّي أيقونات، عريض وخطّي، بأكثر من ٢٥٠٠ رمز معرَّف كثوابت IconData. تُلحَق الأيقونات المخصّصة بآخر الخط عبر سكربت فلا يتغيّر أي رمز قائم. منشورة على pub.dev بتقييم ١٦٠/١٦٠." }, stack: ["Dart"], year: "2026", href: "https://pub.dev/packages/solar_community_icons", shots: ["/work/solar-1.webp"] },
      { name: "flutter_websocket_manager", kind: { en: "WebSocket manager: connection state, JSON sending and event callbacks", ar: "مدير WebSocket: حالة الاتصال وإرسال JSON واستدعاءات الأحداث" }, about: { en: "Dart package wrapping web_socket_channel in one manager class. It connects with headers and query parameters, sends text or JSON, tracks connection state and reports connect, message, close and error via callbacks. Published on pub.dev.", ar: "حزمة Dart صغيرة تغلّف web_socket_channel في صنف واحد لإدارة الاتصال. تفتح الاتصال بترويسات ومعاملات استعلام، وترسل نصاً أو JSON، وتتابع حالة الاتصال، وتبلّغ عن الاتصال والرسائل والإغلاق والأخطاء عبر دوالّ استدعاء. منشورة على pub.dev." }, stack: ["Dart"], year: "2026", href: "https://pub.dev/packages/flutter_websocket_manager", cover: "/work/websocket-manager-web.webp" },
      { name: "video_compressor_plus", kind: { en: "Native-encoder compression with no FFmpeg, continuing a stalled package", ar: "ضغط بالمشفّر الأصلي بلا FFmpeg، استكمالاً لحزمة متوقّفة" }, about: { en: "Flutter plugin that compresses and trims video, mutes audio and extracts thumbnails with platform encoders (AVAssetExportSession, MediaCodec) and no FFmpeg. It continues the stalled video_compress and adds Swift Package Manager support.", ar: "إضافة Flutter تضغط الفيديو وتقصّه وتحذف صوته وتستخرج صوره المصغّرة بمشفّرات النظام نفسها (AVAssetExportSession وMediaCodec) بلا FFmpeg. تُكمل حزمة video_compress المتوقّفة وتضيف دعم Swift Package Manager، وهي منشورة على pub.dev." }, stack: ["Swift", "Kotlin"], year: "2026", href: "https://pub.dev/packages/video_compressor_plus", shots: ["/work/video-compressor-1.webp", "/work/video-compressor-2.webp", "/work/video-compressor-3.webp"] },
      { name: "shared_utils", kind: { en: "The internal Flutter framework the team builds on", ar: "الإطار الداخلي لـ Flutter الذي يبني عليه الفريق" }, about: { en: "Internal Flutter library shared by the team's apps. It bundles a Dio API layer with failure mapping, WebSocket and SSE managers with reconnection, guarded BLoC classes, formatters, pickers, update checks and Sentry setup, used via git.", ar: "مكتبة Flutter داخلية تتشاركها تطبيقات الفريق تفادياً لتكرار الكود. تضمّ طبقة API على Dio مع توحيد الأخطاء، ومديرَي WebSocket وSSE بإعادة اتصال، وأصناف BLoC آمنة، ومنسّقات ومنتقيات وفحص التحديثات وتهيئة Sentry. تُستهلك كاعتمادية git." }, stack: ["Dart"], year: "2026", href: "https://github.com/AbberApp/shared_utils", cover: "/work/shared-utils-web.webp" },
      { name: "voice_call_core", kind: { en: "Non-UI core of Abber's voice calls: states, quality and recording", ar: "نواة مكالمات عبر الصوتية بلا واجهة: الحالات والجودة والتسجيل" }, about: { en: "Private Flutter plugin holding the non-UI core of Abber's voice calls. It defines call states, WebRTC quality settings and connection stats, records call audio and uploads it to Firebase Storage per order. Apps inject endpoints and keys.", ar: "إضافة Flutter خاصة تحمل النواة غير المرئية لمكالمات عبر الصوتية. تعرّف حالات المكالمة وإعدادات جودة WebRTC وإحصاءات الاتصال، وتسجّل صوت المكالمة وترفعه إلى Firebase Storage مرتبطاً بطلبه. يحقن التطبيق المضيف العناوين والمفاتيح." }, stack: ["Dart", "Swift"], year: "2025", href: "https://github.com/AbberApp/voice_call_core", cover: "/work/voice-call-core-web.webp" },
      { name: "hyperpay_flutter_plugin", kind: { en: "Early HyperPay SDK binding over a method channel", ar: "ربط مبكّر لحزمة HyperPay عبر قناة أصلية" }, about: { en: "Early Flutter plugin binding the HyperPay SDK over a method channel. The Dart side defines the ReadyUI checkout call, test and live modes, card brands and result mapping; the Android side bundles the SDK but its handler is unfinished.", ar: "إضافة Flutter مبكّرة تربط حزمة HyperPay للجوّال عبر method channel. يعرّف جانب Dart استدعاء واجهة الدفع ReadyUI ووضعَي الاختبار والإنتاج وأنواع البطاقات وتفسير النتيجة، أمّا جانب Android فيضمّ الحزمة الأصلية لكنّ معالجه لم يكتمل." }, stack: ["Dart", "Java"], year: "2023", href: "https://github.com/ardev-dev/hyperpay_flutte_plugin", cover: "/work/hyperpay-plugin-web.webp" },
      { name: "clean-architecture", kind: { en: "Clean Architecture skeleton: one feature across three layers", ar: "هيكل Clean Architecture: خاصية واحدة على ثلاث طبقات" }, about: { en: "Flutter skeleton laying out one feature in Clean Architecture layers. Domain holds the entity, repository contract and use case; data holds the model, two data sources and the repository; presentation holds a BLoC. Most bodies are stubs.", ar: "هيكل Flutter يوزّع ميزة واحدة على طبقات Clean Architecture. في domain الكيان وعقد المستودع وحالة الاستخدام، وفي data النموذج ومصدرا البيانات وتنفيذ المستودع، وفي طبقة العرض BLoC. تعود النتائج بـ Either من dartz، ومعظم الأجسام غير منفَّذ." }, stack: ["Dart"], year: "2023", href: "https://github.com/ardev-dev/clean-architecture", cover: "/work/clean-architecture-web.webp" },
      { name: "intl_phone_utils", kind: { en: "Dial-code lookup: country, flag and national number", ar: "استخراج الدولة والعلم والرقم المحلي من مفتاح الاتصال" }, about: { en: "Dart helper built on the intl_phone_field country table. From a full phone number it matches the dial code and returns the country code, flag or national number, plus a flag image widget. Early work; shared_utils has a class of that name.", ar: "أداة Dart مبنية على جدول الدول في intl_phone_field. تطابق مفتاح الاتصال في رقم هاتف كامل فتعيد رمز الدولة أو علمها أو الرقم المحلي بلا المفتاح، ومعها ودجت يعرض صورة العلم. عمل مبكّر، ويوجد اليوم صنف بالاسم نفسه داخل مكتبة shared_utils." }, stack: ["Dart"], year: "2023", href: "https://github.com/ardev-dev/intl_phone_utils", cover: "/work/intl-phone-web.webp" },
    ],
  },
  {
    id: "tools",
    title: { en: "Desktop & web tools", ar: "أدوات سطح المكتب والويب" },
    desc: { en: "Small, single-purpose things built to be used, not demoed.", ar: "أشياء صغيرة أحاديّة الغرض بُنيت لتُستخدم لا لتُعرض." },
    items: [
      { name: "CopyPaste", kind: { en: "macOS menu-bar clipboard manager", ar: "مدير حافظة في شريط قوائم macOS" }, about: { en: "Clipboard history for macOS that lives in the menu bar. It watches the pasteboard for text and images, keeps recent items searchable, pins the ones worth keeping and opens with a global shortcut. SwiftUI, with history kept as local JSON.", ar: "سجلّ للحافظة على macOS يعيش في شريط القوائم. يراقب ما يُنسخ من نصوص وصور، ويُبقي العناصر الأخيرة قابلة للبحث، ويثبّت المهمّ منها، ويُفتح باختصار عامّ من لوحة المفاتيح. مبنيّ بـ SwiftUI، ويُحفظ السجلّ في ملف JSON محلي دون أي اتصال بالشبكة." }, stack: ["SwiftUI"], year: "2026", cover: "/work/copypaste-web.webp" },
      { name: "WhatsApp Notification Saver", kind: { en: "Recovers deleted messages from the notification log", ar: "يستعيد الرسائل المحذوفة من سجلّ الإشعارات" }, about: { en: "Android app that keeps a copy of incoming WhatsApp and WhatsApp Business notifications, so a message stays readable after its sender deletes it. A Kotlin notification listener feeds a Flutter UI over platform channels, with Hive storage.", ar: "تطبيق Android يحتفظ بنسخة من إشعارات واتساب وواتساب للأعمال الواردة، فتبقى الرسالة مقروءة بعد أن يحذفها مرسلها. مستمع إشعارات وخدمة أمامية مكتوبان بلغة Kotlin يغذّيان واجهة Flutter عبر قنوات المنصّة، والتخزين محلّي في Hive." }, stack: ["Flutter", "Android"], year: "2026", shots: ["/work/wa-saver-2.webp", "/work/wa-saver-1.webp", "/work/wa-saver-3.webp"] },
      { name: "ardev.dev", kind: { en: "This portfolio: deck UI, bilingual, own analytics stack", ar: "هذا الملف: واجهة شرائح، ثنائي اللغة، بمنظومة تحليلات خاصة" }, about: { en: "The site this slideshow runs on: a portfolio in Arabic and English, laid out as full-screen pages flipped by wheel, touch or arrow keys. Built with Next.js and Framer Motion from one data file, with a consent-gated tracker on Firestore.", ar: "الموقع الذي تُعرض عليه هذه الشرائح: ملف أعمال بالعربية والإنجليزية على هيئة صفحات بملء الشاشة تُقلَّب بالعجلة أو اللمس أو الأسهم. مبني بـ Next.js و Framer Motion من ملف بيانات واحد، مع متتبّع زيارات يعمل بموافقة الزائر ويكتب في Firestore." }, stack: ["Next.js", "Firebase"], year: "2026", href: "https://ardev.dev", cover: "/work/ardev-web.webp" },
      { name: "Oxfile", kind: { en: "Free file tools for PDFs, images and documents, in nine languages, all in the browser", ar: "أدوات ملفات مجانية لـPDF والصور والمستندات، بتسع لغات، كلّها في المتصفّح" }, about: { en: "Free file-tools site for PDFs, images and document conversion, with interface and blog in nine languages. Files are processed in the browser with pdf-lib, pdf.js and canvas. Next.js with next-intl and MDX; some converters are pending.", ar: "موقع أدوات ملفات مجانية لملفات PDF والصور وتحويل المستندات، واجهته ومدوّنته بتسع لغات. تُعالَج الملفات داخل المتصفّح بمكتبتي pdf-lib و pdf.js وشيفرة canvas. مبني بـ Next.js مع next-intl و MDX، وبعض المحوّلات لم يكتمل بعد." }, stack: ["Next.js", "TypeScript", "MDX"], year: "2026", cover: "/work/oxfile-web.webp" },
      { name: "QR Generator", kind: { en: "QR codes for links, WhatsApp, Wi-Fi, email, phone, SMS and vCard, exported as PNG or SVG", ar: "أكواد QR للروابط وواتساب والواي فاي والبريد والهاتف والرسائل وبطاقات الاتصال، تُصدَّر PNG أو SVG" }, about: { en: "QR code maker for links, text, WhatsApp, Wi-Fi logins, email, phone, SMS and vCards. Each type has its own form, plus colour, size, margin and error-correction settings. The qrcode library draws it in the browser for PNG or SVG export.", ar: "صانع أكواد QR للروابط والنصوص وواتساب وشبكات Wi-Fi والبريد والهاتف والرسائل وبطاقات vCard. لكل نوع نموذجه، مع إعدادات للألوان والحجم والهامش ومستوى تصحيح الخطأ. تولّد مكتبة qrcode الكود داخل المتصفّح، ويُنزَّل بصيغة PNG أو SVG." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/qr-web.webp" },
      { name: "ColorCraft", kind: { en: "Colour tools: picker, palette generator, gradient builder and contrast checker", ar: "أدوات ألوان: منتقي ومولّد لوحات وباني تدرّجات وفاحص تباين" }, about: { en: "Colour tools for web design: a picker showing a colour in HEX, RGB, HSL, CMYK and LAB, a palette tool for scales, tints and shades, a builder for linear, radial and conic CSS gradients, and a WCAG contrast checker. Built on chroma-js.", ar: "أدوات ألوان لتصميم الويب: منتقٍ يعرض اللون بصيغ HEX و RGB و HSL و CMYK و LAB، ومولّد لوحات يبني سلالم ودرجات فاتحة وداكنة، وباني تدرّجات CSS خطّية ودائرية ومخروطية، وفاحص تباين وفق WCAG. مبنية على مكتبة chroma-js داخل Next.js." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/colorcraft-web.webp" },
      { name: "TypeBlaze", kind: { en: "Typing speed test in WPM with live accuracy, difficulty levels and personal bests", ar: "اختبار سرعة الكتابة بالكلمة في الدقيقة مع دقّة لحظية ومستويات صعوبة وأفضل النتائج" }, about: { en: "Typing speed test that measures words per minute and accuracy live. The player picks a difficulty and duration, then sees each character marked right or wrong. A client-side Next.js component; the best score is kept in localStorage.", ar: "اختبار لسرعة الكتابة يقيس الكلمات في الدقيقة ونسبة الدقّة أثناء الكتابة. يختار المستخدم مستوى الصعوبة والمدّة، ثم يُلوَّن كل حرف صحيحاً أو خاطئاً لحظة كتابته. مكوّن Next.js يعمل داخل المتصفّح، وأفضل نتيجة تُحفظ في localStorage." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/typeblaze-web.webp" },
      { name: "CalcPro", kind: { en: "Calculator suite: scientific, loan, BMI, percentage, age, units, tip and discount", ar: "مجموعة حاسبات: علمية وقروض وكتلة الجسم ونسب وعمر ووحدات وإكرامية وخصم" }, about: { en: "Everyday calculators on one tabbed page: scientific, loan instalments, BMI, percentages, age, unit conversion, tip per person and discount. Each is a small React component over plain formula functions, in Next.js with no backend.", ar: "حاسبات يومية في صفحة واحدة بتبويبات: علمية، وأقساط القروض، ومؤشّر كتلة الجسم، والنسب المئوية، والعمر، وتحويل الوحدات، والإكرامية لكل شخص، والخصم. كل حاسبة مكوّن React صغير، والمعادلات دوالّ بسيطة مستقلّة، ضمن تطبيق Next.js بلا خادم خلفي." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/calcpro-web.webp" },
      { name: "BrainQuiz", kind: { en: "Trivia quiz with 8 categories, 3 difficulty levels, timer, streaks and score tracking", ar: "اختبار معلومات بثماني فئات وثلاثة مستويات ومؤقّت وسلاسل إجابات وتتبّع للنتيجة" }, about: { en: "Trivia game with a built-in question bank across science, history, geography, technology and more. The player sets category, difficulty and length, answers against a timer, builds streaks, then reviews the answers. Client-side Next.js.", ar: "لعبة أسئلة معلومات ببنك أسئلة مضمَّن في مجالات كالعلوم والتاريخ والجغرافيا والتقنية. يحدّد اللاعب الفئة والصعوبة وعدد الأسئلة، ويجيب قبل انتهاء المؤقّت، وتُحتسب له سلاسل الإجابات الصحيحة، ثم يراجع إجاباته. تعمل في المتصفّح على Next.js." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/brainquiz-web.webp" },
      { name: "ResumeForge", kind: { en: "Résumé builder with live preview, exported to PDF", ar: "منشئ سيرة ذاتية بمعاينة حيّة، يُصدَّر PDF" }, about: { en: "Résumé builder with a form beside a live preview. Sections cover personal details, experience, education, skills, languages, projects and certifications. Drafts autosave to localStorage; PDF export uses the browser print dialog.", ar: "منشئ سيرة ذاتية يضع نموذج التحرير بجوار معاينة حيّة للصفحة. تشمل الأقسام البيانات الشخصية والخبرات والتعليم والمهارات واللغات والمشاريع والشهادات. تُحفظ المسوّدة تلقائياً في localStorage، ويتمّ تصدير PDF عبر نافذة الطباعة في المتصفّح." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/resumeforge-web.webp" },
      { name: "TimerPro", kind: { en: "Pomodoro timer, stopwatch with laps, countdown and world clock", ar: "مؤقّت بومودورو وساعة إيقاف بلفّات وعدّ تنازلي وساعة عالمية" }, about: { en: "Time tools on one page: a Pomodoro cycle with focus and break periods, a stopwatch with laps, marking the fastest and slowest, a countdown with presets, and a world clock searchable by city. React in Next.js, using Intl.DateTimeFormat.", ar: "أدوات وقت في صفحة واحدة: دورة بومودورو بفترات تركيز واستراحة، وساعة إيقاف تسجّل اللفّات وتميّز أسرعها وأبطأها، وعدّ تنازلي بمدد جاهزة، وساعة عالمية تبحث باسم المدينة. مكوّنات React في Next.js، والمناطق الزمنية عبر Intl.DateTimeFormat." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/timer-web.webp" },
      { name: "PassGen", kind: { en: "Password generator with strength checker, passphrases and bulk generation, all in the browser", ar: "مولّد كلمات مرور مع فاحص قوّة وعبارات مرور وتوليد بالجملة، كلّه في المتصفّح" }, about: { en: "Password tool with a generator offering length and character-set options, a strength checker estimating entropy and crack time, a passphrase builder and bulk generation. Randomness comes from crypto.getRandomValues, in the browser.", ar: "أداة كلمات مرور بعدّة أوضاع: مولّد بخيارات للطول وأنواع الأحرف، وفاحص قوّة يقدّر الإنتروبيا وزمن الكسر، ومنشئ عبارات مرور، وتوليد بالجملة. مصدر العشوائية crypto.getRandomValues، وكل شيء يُنفَّذ داخل المتصفّح ضمن صفحة Next.js." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/passgen-web.webp" },
      { name: "NumWords", kind: { en: "Numbers to words in nine languages, Arabic first", ar: "تحويل الأرقام إلى كلمات بتسع لغات، أوّلها العربية" }, about: { en: "Converter that spells a number out in words in nine languages, including Arabic, English, French, Turkish and Japanese. Modes cover plain numbers, currency amounts and ordinals. Each language has its own hand-written TypeScript routine.", ar: "محوّل يكتب الرقم بالكلمات بتسع لغات، منها العربية والإنجليزية والفرنسية والتركية واليابانية. أوضاعه تشمل الأرقام المجرّدة والمبالغ بالعملات والأعداد الترتيبية. لكل لغة دالّة TypeScript مكتوبة يدوياً، وتعمل في المتصفّح ضمن صفحة Next.js." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/numwords-web.webp" },
      { name: "CodeSnap", kind: { en: "Code turned into shareable images with themes, fonts and backgrounds, exported as PNG or SVG", ar: "تحويل الكود إلى صور قابلة للمشاركة بسمات وخطوط وخلفيات، تُصدَّر PNG أو SVG" }, about: { en: "Turns a code snippet into a styled image. The user picks language, theme, font, background, padding and a macOS or Windows window frame, then exports PNG or SVG. Prism does the highlighting; html-to-image renders it in the browser.", ar: "يحوّل مقطع الكود إلى صورة منسّقة للمشاركة. يختار المستخدم اللغة والسمة والخط والخلفية والهوامش وإطار نافذة على طراز macOS أو Windows، ثم يصدّر PNG أو SVG. التلوين بمكتبة Prism، والتحويل إلى صورة بمكتبة html-to-image داخل المتصفّح." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/codesnap-web.webp" },
      { name: "MarkFlow", kind: { en: "Markdown editor with live preview and export to HTML, PDF and Markdown", ar: "محرّر ماركداون بمعاينة حيّة وتصدير إلى HTML وPDF وماركداون" }, about: { en: "Markdown editor with source and rendered page side by side or alone. A toolbar inserts headings, lists, links and tasks; counters show words and reading time. Text autosaves locally and exports as Markdown, HTML or printed PDF.", ar: "محرّر Markdown يعرض المصدر بجوار المعاينة، أو أحدهما منفرداً. شريط أدوات يُدرج العناوين والقوائم والروابط والمهام، وعدّادات للكلمات وزمن القراءة. يُحفظ النص محلياً ويُصدَّر Markdown أو HTML أو PDF عبر الطباعة، والتحويل بمكتبة marked." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/markflow-web.webp" },
      { name: "Units Converter", kind: { en: "Unit converter for length, weight, temperature, area, speed, volume, time, energy, pressure and data", ar: "محوّل وحدات للطول والوزن والحرارة والمساحة والسرعة والحجم والزمن والطاقة والضغط والبيانات" }, about: { en: "Unit converter for length, weight, temperature, area, speed, volume, time, energy, pressure and data size. A value is shown in the chosen unit and in every other unit of its category. Conversion tables are plain TypeScript data.", ar: "محوّل وحدات يغطّي الطول والوزن والحرارة والمساحة والسرعة والحجم والزمن والطاقة والضغط وحجم البيانات. عند إدخال قيمة يظهر التحويل بين الوحدتين المختارتين ومعه الناتج بكل وحدات الفئة. جداول التحويل بيانات TypeScript بسيطة في صفحة Next.js." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/units-web.webp" },
      { name: "AgeBlaze", kind: { en: "Exact age in years down to seconds, with life stats and a birthday countdown", ar: "العمر بدقّة من السنوات إلى الثواني، مع إحصاءات حياة وعدّ تنازلي ليوم الميلاد" }, about: { en: "Age calculator that takes a birth date and shows the age in years, months and days, with totals down to seconds. It adds the weekday of birth, a countdown to the next birthday and estimated life statistics. Runs client-side on Next.js.", ar: "حاسبة عمر تأخذ تاريخ الميلاد وتعرض العمر بالسنوات والأشهر والأيام، مع إجماليات جارية حتى الثواني. تضيف اسم يوم الميلاد من الأسبوع، وعدّاً تنازلياً ليوم الميلاد القادم، وإحصاءات تقديرية كعدد نبضات القلب. تعمل في المتصفّح ضمن صفحة Next.js." }, stack: ["Next.js", "TypeScript"], year: "2026", cover: "/work/age-web.webp" },
    ],
  },
  {
    id: "early",
    title: { en: "Early work", ar: "البدايات" },
    desc: { en: "Where it started: Django and front-end projects from the first years.", ar: "من حيث بدأتُ: مشاريع Django وواجهات من السنوات الأولى." },
    items: [
      { name: "Discussion Boards", nameAr: "لوحات النقاش", kind: { en: "Django discussion boards with accounts", ar: "لوحات نقاش بـ Django مع حسابات" }, about: { en: "First Django project, a discussion forum built while learning the framework. Boards hold topics and topics hold Markdown posts; users sign up, log in, open topics, reply and edit their posts. It covers models, auth, forms and pagination.", ar: "أول مشروع Django، منتدى نقاش بُني أثناء تعلّم الإطار. الأقسام تضمّ مواضيع والمواضيع تضمّ ردوداً تُكتب بـ Markdown، والمستخدم يسجّل ويدخل ويفتح موضوعاً ويردّ ويعدّل ردوده. يغطّي النماذج والمصادقة والاستمارات وترقيم الصفحات." }, stack: ["Django"], year: "2021", href: "https://github.com/ardev-dev/frist_project-boards", cover: "/work/boards-web.webp" },
      { name: "Django Blog", nameAr: "مدوّنة Django", kind: { en: "Bookstore dashboard: customers, books and order tracking", ar: "لوحة مكتبة كتب: عملاء وكتب ومتابعة الطلبات" }, about: { en: "Learning project that, despite its name, is a bookstore back office in Django. A dashboard counts orders by status and lists customers; each customer page shows their orders, created through inline formsets, then edited or deleted.", ar: "مشروع تعليمي هو في حقيقته، خلافاً لاسمه، لوحة إدارة لمكتبة كتب بـ Django. تعرض اللوحة أعداد الطلبات حسب حالتها وقائمة العملاء، ولكل عميل صفحة بطلباته، وتُنشأ الطلبات عبر inline formsets ثم تُعدَّل أو تُحذف. يتمرّن على النماذج العلائقية." }, stack: ["Django"], year: "2021", href: "https://github.com/ardev-dev/second_project", cover: "/work/django-blog-web.webp" },
      { name: "HTML Templates", nameAr: "قوالب HTML", kind: { en: "Hand-written HTML and CSS: a courses landing page", ar: "HTML وCSS مكتوبة يدوياً: صفحة هبوط لدورات" }, about: { en: "Hand-written static page from the start of learning web development: a landing page for a courses site. It has a header menu, a courses section with video counts, learning paths for desktop, web and mobile, and a footer contact form.", ar: "صفحة ثابتة مكتوبة يدوياً من بدايات تعلّم الويب: صفحة هبوط لموقع دورات. فيها ترويسة بقائمة، وقسم للدورات بعدد المقاطع، ومسارات تعلّم لسطح المكتب والويب والجوّال، واستمارة تواصل في التذييل. التخطيط مبني على float في CSS، وبلا أي JavaScript." }, stack: ["HTML", "CSS"], year: "2021", href: "https://github.com/ardev-dev/html-templates", cover: "/work/html-templates-web.webp" },
      { name: "Services Platform", nameAr: "منصّة خدمات", kind: { en: "First TruckGo backend: cargo services, driver offers, orders and chat", ar: "أول خلفية لـ TruckGo: خدمات شحن وعروض سائقين وطلبات ومحادثة" }, about: { en: "First backend for TruckGo, a cargo transport service, built with Django REST Framework. Customers post cargo requests with images, drivers answer with offers, and an accepted offer becomes an order. It adds token auth and a Channels chat.", ar: "أول خلفية لـ TruckGo، خدمة نقل البضائع، مكتوبة بـ Django REST Framework. ينشر العميل طلب شحن مع صوره، ويردّ السائقون بعروض، ويتحوّل العرض المقبول إلى طلب. تشمل مصادقة بالرمز وترقية الحساب إلى عميل أو سائق ومحادثة WebSocket عبر Channels." }, stack: ["Django"], year: "2022", href: "https://github.com/ardev-dev/resarsh_project", cover: "/work/services-platform-web.webp" },
      { name: "To-do API", nameAr: "واجهة مهام", kind: { en: "Django REST API with accounts and to-dos", ar: "واجهة REST بـ Django للحسابات والمهام" }, about: { en: "REST API written to learn Django REST Framework: to-dos with accounts. Users register and log in by email to get a token, then list, create, update and delete their own tasks. It covers a custom user model, serializers and permissions.", ar: "واجهة REST كُتبت لتعلّم Django REST Framework: مهام مع حسابات. يسجّل المستخدم ويدخل ببريده فيحصل على رمز، ثم يعرض مهامه وحده وينشئها ويعدّلها ويحذفها. يغطّي نموذج مستخدم مخصّصاً والمصادقة بالرمز والمسلسِلات وأصناف الصلاحيات." }, stack: ["Django"], year: "2023", href: "https://github.com/ardev-dev/API-progict", cover: "/work/todo-api-web.webp" },
      { name: "Portfolio 2023", nameAr: "ملفّي في 2023", kind: { en: "Earlier personal site, adapted from an open-source template", ar: "موقعي الشخصي السابق، مُعدَّل عن قالب مفتوح المصدر" }, about: { en: "Earlier personal site adapted from an open-source portfolio template. One page covers about, skills, education, work and contact, with separate experience and projects pages; skills and projects load from JSON files. Runs on GitHub Pages.", ar: "موقع شخصي سابق مبني على قالب مفتوح المصدر بعد تكييفه. صفحة واحدة تعرض النبذة والمهارات والتعليم والأعمال والتواصل، مع صفحتين منفصلتين للخبرة والمشاريع، وتُحمَّل المهارات والمشاريع من ملفات JSON. يُنشر عبر GitHub Pages." }, stack: ["HTML", "CSS"], year: "2023", href: "https://github.com/ardev-dev/abdulrahman", cover: "/work/portfolio-2023-web.webp" },
      { name: "Al-Mashriqi Furniture", nameAr: "مؤسسة المشرقي للأثاث", kind: { en: "Multi-page website for a furniture and furnishings company", ar: "موقع متعدّد الصفحات لمؤسسة أثاث ومفروشات" }, about: { en: "Arabic RTL website for a furniture and hotel furnishings supplier. Static pages cover home, about, services, products, past work, team, testimonials and contact, where the form opens a prefilled WhatsApp message. Built with Bootstrap.", ar: "موقع عربي باتجاه من اليمين إلى اليسار لمؤسسة توريد أثاث ومفروشات فندقية. صفحات للرئيسية ومن نحن والخدمات وأقسام المنتجات والأعمال والفريق وآراء العملاء والتواصل، وفيها استمارة تفتح رسالة واتساب جاهزة. مبني بـ Bootstrap وشريط صور Swiper." }, stack: ["HTML", "CSS"], year: "2026", href: "https://github.com/ardev-dev/home-work", cover: "/work/almashriqi-web.webp" },
    ],
  },
];

/** أرقام الفهرس — محسوبة من GitHub، لا مقدّرة. */
export const catalogStats = [
  { value: "133", label: { en: "repositories", ar: "مستودعاً" } },
  { value: "12", label: { en: "organisations", ar: "مؤسّسة" } },
  { value: "7", label: { en: "published packages", ar: "حزمة منشورة" } },
  { value: "2019", label: { en: "shipping since", ar: "أُطلق منذ" } },
];

/** التطبيقات المنشورة في المتاجر — تُستخدم في بيانات schema.org المهيكلة. */
export const storeApps = [
  {
    name: "Abber",
    category: "LifestyleApplication",
    url: "https://abber.co",
    stores: [
      "https://apps.apple.com/app/id6461119454",
      "https://play.google.com/store/apps/details?id=co.abber_dev.abber_app",
    ],
  },
  {
    name: "Wisal",
    category: "BusinessApplication",
    url: "https://wisalapp.com",
    stores: [
      "https://apps.apple.com/app/id6755353238",
      "https://play.google.com/store/apps/details?id=io.somow.wisalapp",
    ],
  },
  {
    name: "Azbah",
    category: "FinanceApplication",
    url: "https://azbah.somow.sa",
    stores: [
      "https://apps.apple.com/app/id6761391341",
      "https://play.google.com/store/apps/details?id=io.somow.azbah",
    ],
  },
];
