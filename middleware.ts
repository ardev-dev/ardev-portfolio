import { NextResponse, type NextRequest } from "next/server";

/**
 * ─── مسارات القنوات والمالك ────────────────────────────────────────────────
 *
 * ⚠️ **لا معاملات استعلام بعد النطاق — قرار صاحب الموقع.** البديل المعتاد
 * (`?utm_source=linkedin`) يجعل الرابط المنشور يبدو دعائياً، ويُربك من يراه،
 * وبعض التطبيقات تقصّه أو تُعيد ترتيبه. فالقناة تُحمَل في **مسارٍ قصير**:
 * `ardev.dev/in` بدل `ardev.dev/?utm_source=linkedin`.
 *
 * والمسار يُعاد كتابته إلى الصفحة الرئيسية (`rewrite` لا `redirect`): الزائر
 * يرى المحتوى فوراً بلا قفزة، والعنوان يبقى قصيراً نظيفاً.
 *
 * ⚠️ **والقناة تُحفظ في كعكة قصيرة العمر لا في العنوان**: الزائر قد يتنقّل
 * داخل الصفحة أو يعود لاحقاً، والقناة تخصّ **الزيارة** لا الصفحة.
 */

/** المسار القصير → اسم القناة كما يُخزَّن ويُعرض. */
const CHANNELS: Record<string, string> = {
  in: "linkedin",
  wa: "whatsapp",
  gh: "github",
  x: "x",
  pub: "pubdev",
  cv: "cv",
  mail: "email",
  ig: "instagram",
  fb: "facebook",
};

const CH_COOKIE = "ardev_ch";
const OWNER_COOKIE = "ardev_owner";

/** عمر كعكة القناة: تكفي الجلسة الواحدة ولا تُلوّث زيارةً بعد أيّام. */
const CH_MAX_AGE = 60 * 30;
const OWNER_MAX_AGE = 60 * 60 * 24 * 400;

export function middleware(req: NextRequest) {
  const seg = req.nextUrl.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();

  // ── علامة المالك: تُضبط بزيارة `/me` وتُلغى بـ`/me-off` ──
  //
  // ⚠️ كعكة لا `localStorage`: الخادم يقرؤها فيتوقّف التتبّع **قبل** أيّ
  // كتابة، بينما `localStorage` لا يصل الخادم فتُكتب الجلسة ثم تُخفى لاحقاً.
  if (seg === "me" || seg === "me-off") {
    const res = NextResponse.rewrite(new URL("/", req.url));
    if (seg === "me") {
      res.cookies.set(OWNER_COOKIE, "1", {
        maxAge: OWNER_MAX_AGE, path: "/", sameSite: "lax", httpOnly: false,
      });
    } else {
      res.cookies.delete(OWNER_COOKIE);
    }
    return res;
  }

  const channel = CHANNELS[seg];
  if (channel) {
    const res = NextResponse.rewrite(new URL("/", req.url));
    res.cookies.set(CH_COOKIE, channel, {
      maxAge: CH_MAX_AGE, path: "/", sameSite: "lax", httpOnly: false,
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // المسارات القصيرة وحدها — لا تُشغَّل الوسيطة على الأصول ولا على الـAPI.
  matcher: ["/in", "/wa", "/gh", "/x", "/pub", "/cv", "/mail", "/ig", "/fb", "/me", "/me-off"],
};
