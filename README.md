# ardev.dev

Personal portfolio for **Abdulrahman Morshed (AR Dev)** — [ardev.dev](https://ardev.dev).

Built with **Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion**.

## Design

سطح شرائح بملء الشاشة (`components/site/Deck.tsx`): كل قسم صفحة تُقلَب بالعجلة
أو اللمس أو الأسهم. كل الصفحات تبقى في DOM — فالمحتوى كامل لمحرّكات البحث
وقارئات الشاشة، والانتقال إزاحة حتمية لا تنتظر اكتمال حركة سابقة. قبل أن
يُركّب React تُعرض الصفحات مكدّسة وقابلة للتمرير، فالموقع يُقرأ حتى بلا JS.

الثيم أحادي دافئ (`Editorial Dark`): التباين والطباعة يحملان التصميم، واللمسة
اللونية الوحيدة تدرّج معدني. الإنجليزية تستعمل `Instrument Serif` المائل للتوكيد،
والعربية لا — لا مائل في الطباعة العربية، والخطّ اللاتيني بلا حروف عربية أصلاً
(`components/site/Em.tsx`).

صور المشاريع حقيقيّة: لقطات App Store عبر واجهة iTunes lookup، ولقطات المواقع
الحيّة بـ Chrome headless — في `public/apps/`.

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

**الموافقة والخصوصية**

لا يبدأ أي قياس ولا تُضبط أي كوكي قبل ضغط الزائر «موافق» في لافتة `components/Consent.tsx`
(الاختيار يُحفظ في `localStorage`). الرفض يعني ألّا يُرسَل شيء إطلاقاً.

**الحصّة المجانيّة**

الجلسة الواحدة تكلّف 3 كتابات عند البداية و3 عند الإغلاق. النبضات كل 60 ثانية،
ولا تُرسَل إلا إن تغيّر شيء فعليّاً وكان التبويب ظاهراً، والأحداث تُجمَّع داخل وثيقة
الجلسة بدل وثيقة لكل حدث، مع سقف 12 كتابة للجلسة الواحدة. أي: ~6 كتابات لزيارة
عاديّة → أكثر من 3,000 زيارة يوميّاً ضمن حدّ Spark المجاني (20,000 كتابة/يوم).

## Dashboard

`/dashboard` — لوحة قراءة فقط، دخول Google مقصور على `ar.dev5311@gmail.com`
(القيد الحقيقي في `firestore.rules`، لا في الواجهة). تعرض مؤشّرات الأسبوع،
أعمدة الزيارات اليوميّة، تفصيل الدول والمدن والمصادر والأجهزة والمتصفحات،
وجدول آخر 60 جلسة بتفاصيل كاملة عند الضغط على أي صفّ. استعلامان محدودان لكل
تحديث، فالقراءات تبقى ضمن الحصّة المجانيّة.

الإعداد في Firebase Console: فعّل **Google** في Authentication → Sign-in method،
وأضف `ardev.dev` إلى Authorized domains.
