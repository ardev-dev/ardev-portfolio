/**
 * ─── تهيئة Firebase (عميل فقط) ──────────────────────────────────────────────
 * قيم الإعداد هذه معرّفات عامّة بطبيعتها (تُشحن ضمن حزمة المتصفح)، وحمايتها
 * تكون بقواعد Firebase وقيود النطاق — لا بإخفائها. لذلك تُكتب مباشرةً هنا.
 */
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1YaNDggQ7qUxuRMXcbdaKiTpbQPd4fB8",
  authDomain: "ardev-portfolio.firebaseapp.com",
  projectId: "ardev-portfolio",
  storageBucket: "ardev-portfolio.firebasestorage.app",
  messagingSenderId: "244543208168",
  appId: "1:244543208168:web:f0d7744f2a92f4af89e75d",
  measurementId: "G-9C4GMC6V12",
};

/** تهيئة كسولة وآمنة من التكرار (Fast Refresh قد يُعيد تنفيذ الوحدة). */
export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

/**
 * ‏Analytics غير مدعوم في SSR ولا في بعض المتصفحات/أوضاع التصفّح الخاص،
 * لذا نتحقّق عبر isSupported() ونُرجِع null بدل أن نرمي استثناءً.
 */
export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  try {
    if (!(await isSupported())) return null;
    return getAnalytics(getFirebaseApp());
  } catch {
    return null;
  }
}

/** مصادقة العميل — تُستخدم في لوحة التحكّم فقط (دخول Google). */
export function getClientAuth(): Auth {
  return getAuth(getFirebaseApp());
}

/**
 * قراءة Firestore من المتصفح — مسموحة لبريد المالك وحده عبر firestore.rules،
 * فلا حاجة لمسار خادمي وسيط للوحة.
 */
export function getClientDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

/** البريد الوحيد المسموح له بفتح لوحة التحكّم (مطابق لما في firestore.rules). */
export const OWNER_EMAIL = "ar.dev5311@gmail.com";
