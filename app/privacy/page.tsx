import type { Metadata } from "next";
import { Backdrop } from "@/components/site/Backdrop";

/* سياسة خصوصية لتطبيق OAuth الشخصيّ (Gmail) — شرطٌ من Google لنشر التطبيق. */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for AR Dev's personal tools that access Google user data.",
  // بلا languages: الصفحة بنسخة إنجليزية واحدة، وإلا ورثت hreflang الرئيسية.
  alternates: { canonical: "/privacy" },
};

const UPDATED = "November 1, 2026";
const CONTACT = "ar.dev5311@gmail.com";

const H2 = "pt-6 text-h2 text-ink";
const LINK = "text-ink underline underline-offset-4 transition-colors hover:text-accent-warm";
const CODE = "font-mono text-[0.9em] text-accent-warm";

export default function PrivacyPage() {
  // ⚠️ **`lang` و`dir` والخطّ تُفرَض هنا.** LanguageProvider يضبط جذر المستند من
  // تفضيل الزائر المحفوظ، فمن اختار العربية سابقاً كان سيرى هذا النصّ الإنجليزيّ
  // بـCairo ومن اليمين. والخطّ خاصيّةٌ مباشرة لا `font-sans`، لأنّ قاعدة العربية
  // في `globals.css` تستهدف ذلك الصنف نفسه.
  return (
    <>
      <Backdrop />
      <main
        lang="en"
        dir="ltr"
        // الحشوة السفلية تُبقي آخر سطر (بريد التواصل) فوق لافتة الموافقة الثابتة.
        className="mx-auto max-w-2xl px-4 pb-60 pt-16 text-left text-fg [font-family:var(--font-sans)] sm:pb-36 sm:pt-24"
      >
        <a href="/" className="font-mono text-xs text-fg-muted transition-colors hover:text-ink">
          ardev.dev
        </a>
        <h1 className="mt-8 text-display text-ink">Privacy Policy</h1>
        <p className="mt-3 text-sm text-fg-muted">Last updated: {UPDATED}</p>

        <section className="mt-10 space-y-4 leading-relaxed">
          <p>
            This policy covers the personal tools operated by Abdulrahman Morshed (AR Dev, ardev.dev),
            including the mail assistant that connects to Gmail through Google OAuth. These tools are
            for the owner&apos;s own accounts only and are not offered to the public.
          </p>

          <h2 className={H2}>Data accessed</h2>
          <p>
            With your consent, the tool may read, label and organise messages in your Gmail account
            and manage basic mail settings such as filters, using the scopes{" "}
            <code className={CODE}>gmail.modify</code> and{" "}
            <code className={CODE}>gmail.settings.basic</code>.
          </p>

          <h2 className={H2}>How data is used and stored</h2>
          <p>
            Data is handled by an AI assistant (Claude, by Anthropic) running on the owner&apos;s own
            computer, only to carry out actions the owner requests. Message content the assistant
            reads is sent to Anthropic&apos;s API to produce its responses. OAuth tokens are stored
            locally on that computer. No Gmail data is sold, used for advertising, or shared with
            anyone else.
          </p>

          <h2 className={H2}>Google API Services User Data Policy</h2>
          <p>
            Use of information received from Google APIs adheres to the{" "}
            <a className={LINK} href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>

          <h2 className={H2}>Revoking access</h2>
          <p>
            You can revoke access at any time from{" "}
            <a className={LINK} href="https://myaccount.google.com/permissions">
              myaccount.google.com/permissions
            </a>
            . Deleting the local token file also ends access.
          </p>

          <h2 className={H2}>Contact</h2>
          <p>
            Questions about this policy:{" "}
            <a className={LINK} href={`mailto:${CONTACT}`}>
              {CONTACT}
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
