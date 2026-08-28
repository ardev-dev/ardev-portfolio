/**
 * ─── متتبّع الجلسة (متصفح فقط) ──────────────────────────────────────────────
 * يقيس مدّة الجلسة من الفتح حتى الإغلاق، يفصل الزمن النشط عن الخامل، يرصد
 * الأقسام المقروءة والنقرات المهمّة، ويرسل نبضات مضغوطة إلى /api/track.
 *
 * قرارات مقصودة:
 *  · الإرسال عبر sendBeacon عند الإغلاق — fetch يُلغى عند تفريغ الصفحة.
 *  · العدّ يتوقّف عند إخفاء التبويب، فـ"مدّة الجلسة" تعني انتباهاً حقيقيّاً.
 *  · معرّف الجلسة في sessionStorage (تبويب واحد)، وهويّة الزائر في كوكي خادمي.
 */

const ENDPOINT = "/api/track";
// نبضة كل دقيقة بدل كل 15 ثانية: أربع مرّات أقلّ كتابةً في Firestore،
// والدقّة المفقودة (≤60 ثانية في الجلسات المقطوعة فجأةً) لا تُغيّر أي قرار.
const HEARTBEAT_MS = 60_000;
const IDLE_AFTER_MS = 60_000; // بلا تفاعل → يُحتسب خاملاً
// سقف صلب يمنع أي جلسة شاذّة من التهام حصّة الكتابة اليوميّة.
const MAX_WRITES_PER_SESSION = 12;
const MAX_EVENTS_PER_SESSION = 40;

type Payload = Record<string, unknown>;

function sessionId(): string {
  const KEY = "ardev_sid";
  try {
    const found = sessionStorage.getItem(KEY);
    if (found) return found;
    const id = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/[^A-Za-z0-9_-]/g, "");
    sessionStorage.setItem(KEY, id);
    return id;
  } catch {
    return (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/[^A-Za-z0-9_-]/g, "");
  }
}

let writes = 0;

function send(payload: Payload, beacon = false): void {
  if (writes++ >= MAX_WRITES_PER_SESSION) return;
  const body = JSON.stringify(payload);
  // sendBeacon يبقى في الطابور بعد إغلاق الصفحة؛ fetch لا يضمن ذلك.
  if (beacon && navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "application/json" }))) return;
  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => {});
}

function environment() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean };
  };
  const c = nav.connection;
  const q = new URLSearchParams(location.search);
  const nt = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

  let referrerHost: string | undefined;
  try {
    if (document.referrer) referrerHost = new URL(document.referrer).hostname;
  } catch {}
  // إحالة من نفس الموقع ليست مصدر زيارة.
  if (referrerHost === location.hostname) referrerHost = undefined;

  return {
    screen: `${screen.width}x${screen.height}`,
    viewport: `${innerWidth}x${innerHeight}`,
    dpr: devicePixelRatio,
    colorDepth: screen.colorDepth,
    cpuCores: nav.hardwareConcurrency,
    deviceMemoryGb: nav.deviceMemory,
    connection: c?.effectiveType,
    downlinkMbps: c?.downlink,
    rttMs: c?.rtt,
    saveData: c?.saveData,
    touch: matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0,
    prefersDark: matchMedia("(prefers-color-scheme: dark)").matches,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    browserLanguages: navigator.languages?.join(",") ?? navigator.language,
    browserTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    path: location.pathname + location.search,
    referrer: document.referrer || undefined,
    referrerHost: referrerHost ?? "direct",
    utmSource: q.get("utm_source") ?? undefined,
    utmMedium: q.get("utm_medium") ?? undefined,
    utmCampaign: q.get("utm_campaign") ?? undefined,
    utmTerm: q.get("utm_term") ?? undefined,
    utmContent: q.get("utm_content") ?? undefined,
    ttfbMs: nt ? Math.round(nt.responseStart) : undefined,
    domReadyMs: nt ? Math.round(nt.domContentLoadedEventEnd) : undefined,
    loadMs: nt ? Math.round(nt.loadEventEnd || nt.duration) : undefined,
  };
}

export type Tracker = { event: (name: string, label?: string, value?: number) => void };

/**
 * يبدأ التتبّع ويُرجع دالة إيقاف + مُرسِل أحداث.
 * onEvent يُمرَّر إليه كل حدث مسمّى ليُعكَس أيضاً على Firebase Analytics.
 */
export function startTracking(onEvent?: (name: string, params: Record<string, unknown>) => void): {
  stop: () => void;
  tracker: Tracker;
} {
  const sid = sessionId();
  const started = Date.now();

  let activeMs = 0;
  let lastTick = Date.now();
  let lastInteraction = Date.now();
  let visible = document.visibilityState === "visible";
  let finished = false;

  const counts = { clicks: 0, outboundClicks: 0, copies: 0, langSwitches: 0, blurCount: 0 };
  // نبضة بلا جديد = كتابة مهدورة؛ نرسل فقط عند تغيّر فعلي.
  let dirty = false;
  let maxScrollPct = 0;
  const sectionTimeMs: Record<string, number> = {};
  const sectionsSeen = new Set<string>();
  let currentSection: string | null = null;
  let sectionSince = Date.now();

  /** يراكم الزمن النشط: مرئي + تفاعل خلال آخر دقيقة. */
  const accrue = () => {
    const now = Date.now();
    const engaged = visible && now - lastInteraction < IDLE_AFTER_MS;
    if (engaged) activeMs += now - lastTick;
    lastTick = now;
    if (currentSection && engaged) {
      sectionTimeMs[currentSection] = (sectionTimeMs[currentSection] ?? 0) + (now - sectionSince);
    }
    sectionSince = now;
  };

  const metrics = () => {
    accrue();
    const events = queue.splice(0, queue.length);
    dirty = false;
    return {
      events,
      sessionId: sid,
      durationMs: Date.now() - started,
      activeMs,
      idleMs: Math.max(0, Date.now() - started - activeMs),
      pageViews: 1,
      maxScrollPct,
      ...counts,
      sectionsSeen: [...sectionsSeen],
      sectionTimeMs,
      siteLang: document.documentElement.lang || "en",
    };
  };

  // ── البداية ──
  send({ action: "start", ...metrics(), ...environment() });

  // الأحداث تُجمَّع وتُرسَل ملحقةً بالنبضة التالية بدل كتابة وثيقة لكل حدث —
  // جلسة فيها 12 حدثاً كانت تكلّف 12 كتابة، والآن صفراً إضافيّاً.
  const queue: Payload[] = [];

  const tracker: Tracker = {
    event: (name, label, value) => {
      if (queue.length < MAX_EVENTS_PER_SESSION) {
        queue.push({ name, label, value, atMs: Date.now() - started });
        dirty = true;
      }
      onEvent?.(name, { label, value, session_id: sid, at_ms: Date.now() - started });
    },
  };

  // ── النبضات ──
  const beat = setInterval(() => {
    if (!visible || !dirty) return; // تبويب مخفيّ أو بلا جديد → لا كتابة
    send({ action: "beat", ...metrics() });
  }, HEARTBEAT_MS);

  // ── الإشارات ──
  const onInteract = () => {
    lastInteraction = Date.now();
    dirty = true;
  };

  const onScroll = () => {
    onInteract();
    const h = document.documentElement.scrollHeight - innerHeight;
    const pct = h > 0 ? Math.round(((scrollY + innerHeight) / document.documentElement.scrollHeight) * 100) : 100;
    if (pct > maxScrollPct) maxScrollPct = Math.min(pct, 100);
  };

  const onClick = (e: MouseEvent) => {
    onInteract();
    counts.clicks++;
    const a = (e.target as Element | null)?.closest?.("a");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) tracker.event("contact_email", href.slice(7, 80));
    else if (/^https?:/i.test(href) && !href.includes(location.hostname)) {
      counts.outboundClicks++;
      let host = href;
      try {
        host = new URL(href).hostname;
      } catch {}
      tracker.event("outbound_click", host);
    } else if (href.startsWith("#")) tracker.event("nav_click", href.slice(1, 40));
  };

  const onCopy = () => {
    counts.copies++;
    tracker.event("copy", String(getSelection?.() ?? "").slice(0, 60) || undefined);
  };

  const onVisibility = () => {
    accrue();
    const nowVisible = document.visibilityState === "visible";
    if (!nowVisible) {
      counts.blurCount++;
      // نحفظ التقدّم قبل احتمال عدم العودة — لكن فقط إن كان هناك ما يُحفظ.
      if (dirty) send({ action: "beat", ...metrics() });
    } else {
      lastInteraction = Date.now();
    }
    visible = nowVisible;
    lastTick = Date.now();
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    const m = metrics();
    send({ action: "end", ...m }, true);
    onEvent?.("session_end", { active_ms: m.activeMs, duration_ms: m.durationMs, max_scroll_pct: maxScrollPct });
  };

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("click", onClick, true);
  addEventListener("copy", onCopy);
  addEventListener("keydown", onInteract, { passive: true });
  addEventListener("pointerdown", onInteract, { passive: true });
  addEventListener("mousemove", onInteract, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  // pagehide أوثق من beforeunload على iOS/Safari.
  addEventListener("pagehide", finish);
  addEventListener("beforeunload", finish);

  // ── الأقسام المقروءة ──
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const id = (en.target as HTMLElement).id;
        if (!id) continue;
        if (en.isIntersecting) {
          accrue();
          sectionsSeen.add(id);
          currentSection = id;
          sectionSince = Date.now();
          tracker.event("section_view", id);
        } else if (currentSection === id) {
          accrue();
          currentSection = null;
        }
      }
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("section[id], footer[id]").forEach((el) => io.observe(el));

  const stop = () => {
    clearInterval(beat);
    io.disconnect();
    removeEventListener("scroll", onScroll);
    removeEventListener("click", onClick, true);
    removeEventListener("copy", onCopy);
    removeEventListener("keydown", onInteract);
    removeEventListener("pointerdown", onInteract);
    removeEventListener("mousemove", onInteract);
    document.removeEventListener("visibilitychange", onVisibility);
    removeEventListener("pagehide", finish);
    removeEventListener("beforeunload", finish);
    finish();
  };

  return { stop, tracker };
}
