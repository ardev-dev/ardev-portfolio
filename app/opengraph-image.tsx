import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, stats } from "@/lib/data";

export const alt = `${profile.name.en} — ${profile.role.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * صورة المشاركة تتبع ثيم الموقع نفسه — لوح زجاجي على أرضيّة داكنة.
 * satori لا يدعم backdrop-filter، فالزجاج مُحاكى بطبقات تدرّج وحافّة مضيئة.
 * المحتوى مشتقّ من البيانات، فلا يتقادم حين تتغيّر المسمّيات أو الأرقام.
 */
/** العلامة نفسها المستخدمة في الشريط العلوي، مضمّنة كي يعمل التوليد بلا شبكة. */
const mark = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/logo-mark.png")).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: 56,
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(1100px 620px at 78% -12%, rgba(255,255,255,0.09), transparent 62%)," +
            "radial-gradient(760px 460px at 6% 108%, rgba(255,255,255,0.05), transparent 60%)",
          color: "#f7f6f4",
        }}
      >
        {/* اللوح الزجاجي */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 34,
            padding: 56,
            border: "1px solid rgba(255,255,255,0.13)",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.045) 46%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "9px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 21,
                color: "#c2bfb9",
              }}
            >
              <div style={{ width: 9, height: 9, borderRadius: 999, background: "#5ad07a" }} />
              {profile.status.en}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mark} alt="" height={54} style={{ opacity: 0.92 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 88, letterSpacing: -3.5, lineHeight: 1.04 }}>{profile.name.en}</div>
            <div style={{ marginTop: 12, fontSize: 38, color: "#9b9891", letterSpacing: -0.8 }}>
              {profile.role.en}
            </div>
          </div>

          <div style={{ display: "flex", gap: 56 }}>
            {stats.map((s) => (
              <div key={s.label.en} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 40, letterSpacing: -1.5 }}>
                  {`${s.value}${s.suffix}`}
                </div>
                <div style={{ marginTop: 4, fontSize: 19, color: "#7e7a73" }}>{s.label.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
