import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name.en} — ${profile.role.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * صورة المشاركة تُولَّد من البيانات نفسها، فلا تتقادم حين تتغيّر المسمّيات.
 * بلا خطوط خارجيّة: الخطّ الافتراضي يكفي هنا ويُبقي التوليد سريعاً وموثوقاً.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(150deg, #101010 0%, #0a0a0a 55%, #050505 100%)",
          padding: 72,
          color: "#f5f4f2",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#7a7873", letterSpacing: 2 }}>ARDEV.DEV</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, letterSpacing: -3, lineHeight: 1.05 }}>{profile.name.en}</div>
          <div style={{ marginTop: 14, fontSize: 40, color: "#a8a6a2" }}>{profile.role.en}</div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 24, color: "#7a7873" }}>
          <span>21,000+ users</span>
          <span>·</span>
          <span>6+ years</span>
          <span>·</span>
          <span>Buraydah, Saudi Arabia</span>
        </div>
      </div>
    ),
    size
  );
}
