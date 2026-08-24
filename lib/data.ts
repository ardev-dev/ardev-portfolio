/**
 * ─── مصدر المحتوى الموحّد لموقع ardev.dev ───────────────────────────────
 * كل حقيقة تُكتب هنا مرّة واحدة. عدّل هذا الملف لتحديث الموقع كاملاً.
 * كل الأرقام والمسمّيات مطابقة للسيرة الذاتية الرسمية (مُتحقَّق منها).
 */

export const profile = {
  brand: "AR Dev",
  name: "Abdulrahman Morshed",
  firstName: "Abdulrahman",
  role: "Senior Software Engineer",
  // نبرة الهوية: مهندس يملك دورة الحياة كاملة — التقنيات دليل لا هوية.
  tagline:
    "I design, build, and operate production software end-to-end — from requirements and architecture to deployment and production support.",
  // موطن + مقرّ العمل الحالي.
  location: "Buraydah, Saudi Arabia",
  origin: "Yemen",
  yearsExperience: "5+",
  status: "Open to senior software engineering & technical leadership roles",
  email: "me@ardev.dev",
  resumeUrl: "", // (اختياري) رابط PDF للسيرة إن رغبت لاحقاً
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

/** أرقام تظهر كعدّادات متحرّكة في الهيرو/الإحصاءات. */
export const stats = [
  { value: 5, suffix: "+", label: "Years engineering" },
  { value: 14, suffix: "+", label: "Apps & services shipped" },
  { value: 5, suffix: "+", label: "Live on App Store & Play" },
  { value: 1, suffix: "M+", label: "Lines of code authored" },
];

export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Lifecycle",
    items: [
      "Requirements & Analysis",
      "Architecture & Design",
      "Integration",
      "Testing / QA",
      "Deployment",
      "Production Support",
    ],
  },
  {
    title: "Backend & Data",
    items: ["Python", "Django", "Django REST", "Channels / Daphne", "Celery", "Redis", "PostgreSQL", "Docker", "AWS S3"],
  },
  {
    title: "Web & Mobile",
    items: ["Next.js", "TypeScript", "React", "Flutter", "Dart", "Swift", "Kotlin", "Clean Architecture", "BLoC"],
  },
  {
    title: "Real-Time & Platforms",
    items: ["WebRTC (Agora)", "WebSocket", "Firebase", "CI/CD", "Sentry", "Payments (HyperPay · Tamara · STC Pay)"],
  },
];

/** شريط التقنيات المتحرّك (marquee). */
export const marquee = [
  "Django", "Flutter", "Next.js", "TypeScript", "Python", "PostgreSQL", "WebRTC",
  "Docker", "Redis", "Celery", "Swift", "Kotlin", "React", "WebSocket", "AWS S3", "Firebase",
];

export type Project = {
  name: string;
  kind: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
  accent?: "violet" | "cyan" | "pink";
};

export const projects: Project[] = [
  {
    name: "Abber",
    kind: "Consultation Platform",
    blurb:
      "Flagship consultation marketplace that has processed tens of thousands of requests — native VoIP calling (CallKit + WebRTC), offline-first realtime chat, native payments, and a Django backend spanning ~30 business domains.",
    tags: ["Flutter", "Swift VoIP", "WebRTC", "Django", "Payments"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/id6461119454" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=co.abber_dev.abber_app" },
    ],
    featured: true,
    accent: "violet",
  },
  {
    name: "Maskani",
    kind: "Real-Estate Platform",
    blurb:
      "A full platform across three stacks — Flutter mobile, a Next.js / TypeScript web app, and a Dockerized Django backend — plus a Python multi-agent automation system running autonomously in production.",
    tags: ["Next.js", "Flutter", "Django", "Automation"],
    links: [{ label: "maskani.homes", href: "https://maskani.homes" }],
    featured: true,
    accent: "cyan",
  },
  {
    name: "Wisal",
    kind: "Service Marketplace",
    blurb:
      "Booking and consultation marketplace with multiple payment methods, ledger-style reconciliation, and realtime communication on a Django backend.",
    tags: ["Flutter", "Django", "5 Payment Methods"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/id6755353238" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=io.somow.wisalapp" },
    ],
    accent: "violet",
  },
  {
    name: "Azbah",
    kind: "Group Wallet",
    blurb:
      "A group-wallet system with double-entry accounting — chart of accounts and statement entries — on a Django REST / PostgreSQL backend with an operations admin panel.",
    tags: ["Flutter", "Django REST", "Double-Entry Accounting"],
    links: [],
    accent: "pink",
  },
  {
    name: "Manam",
    kind: "Consultation App",
    blurb:
      "Audio consultation with recording, waveform, and resumable playback; RSA-encrypted payments (OTP + JWT) and tiered in-app subscriptions with server-side receipt validation.",
    tags: ["Flutter", "RSA Payments", "Subscriptions"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/id6743326831" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=co.manams.manam" },
    ],
    accent: "cyan",
  },
  {
    name: "Wasselak",
    kind: "Delivery Platform",
    blurb:
      "A multi-app express-delivery platform on a Django backend with real-time GPS tracking over WebSocket and optimized REST APIs across customer, captain, business, and admin apps.",
    tags: ["Flutter", "Django", "Realtime GPS"],
    links: [],
    accent: "violet",
  },
];

export type Package = {
  name: string;
  blurb: string;
  meta: string;
  href: string;
  tags: string[];
};

export const packages: Package[] = [
  {
    name: "video_compressor_plus",
    blurb:
      "Compress, trim, and mute videos and extract thumbnails using the platform's own encoders — no FFmpeg binaries, nothing added to app size. A maintained continuation of the unmaintained video_compress, adding the Swift Package Manager support four upstream PRs never got merged.",
    meta: "Dart · Swift · Kotlin · SPM",
    href: "https://pub.dev/packages/video_compressor_plus",
    tags: ["Flutter", "Native Codecs"],
  },
  {
    name: "solar_community_icons",
    blurb:
      "Founder & maintainer. 2,500+ Solar community icons for Flutter in bold and linear styles — a perfect 160/160 pub score, used in production.",
    meta: "160 / 160 pub points · 2,500+ icons",
    href: "https://pub.dev/packages/solar_community_icons",
    tags: ["Flutter", "Icons"],
  },
  {
    name: "flutter_websocket_manager",
    blurb:
      "Production WebSocket connection manager for Flutter with auto-reconnection, lifecycle-aware state, and exponential backoff. Cross-platform: Android, iOS, macOS, Linux, Windows.",
    meta: "155 / 160 pub points · cross-platform",
    href: "https://pub.dev/packages/flutter_websocket_manager",
    tags: ["Flutter", "Realtime"],
  },
];

export type Job = {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    role: "Senior Software Engineer & Technical Lead",
    org: "Sumou Agency",
    period: "May 2022 — Present",
    summary:
      "Own the full software-development lifecycle across 8 production codebases (5 mobile apps + 3 web dashboards), leading a team of 4–6 engineers.",
    highlights: [
      "Reduced QA-reported defects by 50% via engineering standards, code review, and production monitoring.",
      "Improved the operating model and cut cost by SAR 200,000 by bringing outsourced work in-house.",
      "Primary technical liaison with external providers — payment gateways, Tamara, Meta, Huawei — owning SDK integration and account management.",
      "Led weekly architecture reviews and authored the internal Clean Architecture handbook.",
    ],
  },
  {
    role: "Software Engineer",
    org: "Wasselak — Express Delivery Platform",
    period: "Apr 2023 — Mar 2024 · Contract",
    summary:
      "Delivered a multi-app delivery platform on a Django backend — requirements, design, build, and integration.",
    highlights: [
      "Real-time GPS tracking over WebSocket with optimized REST APIs across apps, backend, and dashboards.",
    ],
  },
  {
    role: "Independent Software Engineer & Product Developer",
    org: "Self-Published · Open Source",
    period: "2021 — Present",
    summary:
      "Design, build, publish, and operate my own products and open-source packages end-to-end.",
    highlights: [
      "Maintain published Dart packages on pub.dev under the ardev.dev publisher.",
      "Built a Python multi-agent automation system running autonomously in production.",
    ],
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Open Source", href: "#open-source" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
