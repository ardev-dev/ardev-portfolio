/**
 * ─── تحليل User-Agent (بلا اعتماديّات) ──────────────────────────────────────
 * يغطّي المتصفحات والأنظمة الشائعة؛ الترتيب مهمّ (Edge قبل Chrome، Chrome قبل Safari).
 */

export type UaInfo = {
  browser: string;
  browserVersion: string | null;
  os: string;
  osVersion: string | null;
  deviceType: "mobile" | "tablet" | "desktop" | "bot";
  engine: string;
  isBot: boolean;
};

const BROWSERS: [string, RegExp][] = [
  ["Edge", /Edg(?:e|A|iOS)?\/([\d.]+)/],
  ["Opera", /(?:OPR|Opera)\/([\d.]+)/],
  ["Samsung Internet", /SamsungBrowser\/([\d.]+)/],
  ["Firefox", /(?:Firefox|FxiOS)\/([\d.]+)/],
  ["Chrome", /(?:Chrome|CriOS)\/([\d.]+)/],
  ["Safari", /Version\/([\d.]+).*Safari/],
];

const OSES: [string, RegExp][] = [
  ["iPadOS", /iPad;.*CPU OS ([\d_]+)/],
  ["iOS", /(?:iPhone|iPod).*OS ([\d_]+)/],
  ["Android", /Android ([\d.]+)/],
  ["macOS", /Mac OS X ([\d_.]+)/],
  ["Windows", /Windows NT ([\d.]+)/],
  ["Chrome OS", /CrOS \S+ ([\d.]+)/],
  ["Linux", /Linux/],
];

const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview|headless|lighthouse|pagespeed|monitor|curl|wget|python-requests|axios|node-fetch|vercel-screenshot/i;

export function parseUa(ua: string): UaInfo {
  const isBot = BOT.test(ua);

  let browser = "Unknown";
  let browserVersion: string | null = null;
  for (const [name, re] of BROWSERS) {
    const m = ua.match(re);
    if (m) {
      browser = name;
      browserVersion = m[1] ?? null;
      break;
    }
  }

  let os = "Unknown";
  let osVersion: string | null = null;
  for (const [name, re] of OSES) {
    const m = ua.match(re);
    if (m) {
      os = name;
      osVersion = m[1] ? m[1].replace(/_/g, ".") : null;
      break;
    }
  }

  const engine = /Gecko\/|Firefox/.test(ua)
    ? "Gecko"
    : /AppleWebKit/.test(ua)
      ? /Chrome|Edg|OPR/.test(ua)
        ? "Blink"
        : "WebKit"
      : "Unknown";

  const deviceType: UaInfo["deviceType"] = isBot
    ? "bot"
    : /iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/.test(ua)
      ? "tablet"
      : /Mobi|iPhone|iPod|Android|Windows Phone/.test(ua)
        ? "mobile"
        : "desktop";

  return { browser, browserVersion, os, osVersion, deviceType, engine, isBot };
}
