/**
 * ─── Firebase Admin (خادم فقط) ──────────────────────────────────────────────
 * يُستخدم من مسار /api/track للكتابة في Firestore بصلاحيات الخادم، ما يسمح
 * بإبقاء قواعد Firestore مغلقة تماماً أمام العميل (لا كتابة مباشرة من المتصفح).
 */
import "server-only";
import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/** يقبل JSON خاماً أو مُرمَّزاً بـ base64 (أسهل في متغيّرات البيئة). */
function readServiceAccount(): Record<string, string> | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  try {
    const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const sa = JSON.parse(json) as Record<string, string>;
    // المفاتيح المنسوخة من لوحة التحكّم تحمل \n حرفيّة بدل أسطر جديدة.
    if (sa.private_key) sa.private_key = sa.private_key.replace(/\\n/g, "\n");
    return sa;
  } catch {
    return null;
  }
}

let cached: Firestore | null | undefined;

/** يُرجع null بدل أن يرمي إن لم تُضبط بيانات الاعتماد — التتبّع لا يُسقط الطلب أبداً. */
export function getDb(): Firestore | null {
  if (cached !== undefined) return cached;

  const sa = readServiceAccount();
  if (!sa) {
    console.warn("[track] FIREBASE_SERVICE_ACCOUNT غير مضبوط — التتبّع مُعطّل.");
    cached = null;
    return cached;
  }

  const app: App = getApps().length
    ? getApp()
    : initializeApp({ credential: cert(sa as never), projectId: sa.project_id });

  const db = getFirestore(app);
  try {
    db.settings({ ignoreUndefinedProperties: true });
  } catch {
    // settings() ترمي إن سبق استدعاؤها — غير ضارّ.
  }
  cached = db;
  return cached;
}
