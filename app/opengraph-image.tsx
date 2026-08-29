import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, stats } from "@/lib/data";

export const alt = `${profile.name.en} — ${profile.role.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (p: string) => readFileSync(join(process.cwd(), "public", p));

/** العلامة نفسها المستخدمة في الشريط العلوي، مضمّنة كي يعمل التوليد بلا شبكة. */
const mark = `data:image/png;base64,${asset("logo-mark.png").toString("base64")}`;

/**
 * صورة المشاركة تعيد بناء واجهة الموقع نفسها: نافذة متصفّح زجاجيّة على أرضيّة
 * داكنة، بخطوط الموقع ذاتها — Inter Tight للنصّ وInstrument Serif المائل للتوكيد.
 * satori لا يدعم backdrop-filter، فالزجاج مُحاكى بطبقات تدرّج وحافّة مضيئة،
 * والأرقام تُقرأ من lib/data.ts فلا تتقادم.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: 46,
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(1100px 620px at 78% -12%, rgba(255,255,255,0.09), transparent 62%)," +
            "radial-gradient(760px 460px at 6% 108%, rgba(255,255,255,0.05), transparent 60%)",
          color: "#f7f6f4",
          fontFamily: "Inter Tight",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 26,
            border: "1px solid rgba(255,255,255,0.13)",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.045) 46%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {/* شريط النافذة — نفس عنصر الواجهة في الصفحة الأولى */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "13px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
            }}
          >
            <div style={{ width: 11, height: 11, borderRadius: 999, background: "#ff5f57" }} />
            <div style={{ width: 11, height: 11, borderRadius: 999, background: "#febc2e" }} />
            <div style={{ width: 11, height: 11, borderRadius: 999, background: "#28c840" }} />
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 19,
                letterSpacing: 1,
                color: "#7e7a73",
              }}
            >
              ardev.dev
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "36px 50px 42px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  fontSize: 22,
                  color: "#c2bfb9",
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: 999, background: "#5ad07a" }} />
                {profile.status.en}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mark} alt="" height={54} style={{ opacity: 0.92 }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{ display: "flex", fontSize: 88, fontWeight: 600, letterSpacing: -3.6, lineHeight: 1.02 }}
              >
                {profile.name.en}
              </div>
              <div style={{ display: "flex", fontSize: 74, fontFamily: "Instrument Serif", color: "#c2bfb9" }}>
                {profile.role.en}
              </div>
            </div>

            <div style={{ display: "flex", gap: 52 }}>
              {stats.map((s) => (
                <div key={s.label.en} style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", fontSize: 44, fontWeight: 600, letterSpacing: -1.5 }}>
                    {`${s.value}${s.suffix}`}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 19, color: "#7e7a73" }}>{s.label.en}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: asset("fonts/InterTight-400.woff"), weight: 400, style: "normal" },
        { name: "Inter Tight", data: asset("fonts/InterTight-600.woff"), weight: 600, style: "normal" },
        { name: "Instrument Serif", data: asset("fonts/InstrumentSerif-Italic.woff"), weight: 400, style: "italic" },
      ],
    }
  );
}
