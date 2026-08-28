# ardev.dev

Personal portfolio for **Abdulrahman Morshed (AR Dev)** — [ardev.dev](https://ardev.dev).

Built with **Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion** (same stack as maskani_web).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Content

All copy, projects, packages, and links live in **`lib/data.ts`** — edit that one file to update the whole site.

## Deploy

Deploys to Vercel on every push to `main` via `.github/workflows/deploy.yml`
(`vercel build` auto-detects Next.js; `framework: "nextjs"` is pinned in `vercel.json`).

## Analytics

طبقتان تعملان معاً من `components/Analytics.tsx` (تُشغَّل بعد الترطيب، بلا أثر على الرسم):

| الطبقة | الملف | الغرض |
| --- | --- | --- |
| Firebase Analytics (GA4) | `lib/firebase.ts` | تقارير جاهزة واتجاهات عامّة |
| متتبّع Firestore خاص | `lib/tracker.ts` → `app/api/track/route.ts` | تفاصيل خام لكل جلسة |

**مجموعات Firestore**

- `visits/{sessionId}` — IP، الموقع الجغرافي، الجهاز/المتصفح/النظام، الشاشة، الشبكة،
  المصدر و`utm_*`، أزمنة الأداء، مدّة الجلسة (كلّية/نشطة/خاملة)، عمق التمرير، الأقسام المقروءة وزمن كلٍّ منها.
- `visits/{sessionId}/events/*` — أحداث مسمّاة: `contact_email` · `outbound_click` · `nav_click` · `section_view` · `copy`.
- `visitors/{visitorId}` — ملفّ تراكمي عبر الجلسات (كوكي `ardev_vid` بـ httpOnly لمدّة ~13 شهراً).
- `stats/daily_{YYYY-MM-DD}` — عدّادات يوميّة جاهزة (زيارات، جدد/عائدون، حسب الدولة والمدينة والجهاز والمتصفح والمصدر).

**الإعداد المطلوب**

1. Firebase Console → Project settings → Service accounts → **Generate new private key**.
2. أضِف الملف كمتغيّر بيئة (JSON خام أو base64):

   ```bash
   vercel env add FIREBASE_SERVICE_ACCOUNT production
   # للتطوير المحلّي:
   echo "FIREBASE_SERVICE_ACCOUNT='$(cat service-account.json)'" >> .env.local
   ```

3. انشر قواعد `firestore.rules` — كل الكتابة تمرّ عبر الخادم، فلا وصول مباشر من المتصفح.

بدون المتغيّر يُعطَّل التتبّع بصمت (يُرجع المسار `204`) ولا ينكسر الموقع.
