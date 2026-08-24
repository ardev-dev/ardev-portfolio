import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/** ترويسة قسم موحّدة: رقم + عنوان + وصف اختياري. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 font-mono text-xs text-violet">
        <span>{index}</span>
        <span className="h-px w-8 bg-violet/40" />
        <span className="uppercase tracking-[0.18em] text-fg-faint">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-h2 text-fg">{title}</h2>
      {children && <p className="mt-3 max-w-2xl text-fg-muted">{children}</p>}
    </Reveal>
  );
}
