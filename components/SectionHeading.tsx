import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/** ترويسة قسم بأسلوب المنتجات: شارة صغيرة + عنوان كبير + وصف — بمحاذاة وسطية. */
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-fg">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(129,140,248,0.9)]" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-h2 text-ink text-balance">{title}</h2>
      {children && <p className="mx-auto mt-4 max-w-xl leading-relaxed text-fg">{children}</p>}
    </Reveal>
  );
}
