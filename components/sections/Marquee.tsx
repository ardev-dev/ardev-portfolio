import { marquee } from "@/lib/data";

/** شريط تقنيات لا نهائي (تكرار المصفوفة مرّتين للحركة السلسة). */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative border-y border-line/70 bg-ink-900/40 py-5">
      <div className="mask-fade-x overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee gap-3">
          {items.map((tech, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-line bg-white/[0.03] px-4 py-2 font-mono text-sm text-fg-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
