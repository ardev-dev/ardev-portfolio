import { Reveal } from "@/components/Reveal";

/** ترويسة قسم تحريرية: رقم بلون التمييز + عنوان + خطّ. */
export function Head({ num, title }: { num: string; title: string }) {
  return (
    <Reveal>
      <div className="mb-9 flex items-center gap-4">
        <span className="font-mono text-sm text-accent">{num}</span>
        <h2 className="whitespace-nowrap font-display text-h2 text-heading">{title}</h2>
        <span className="h-px flex-1 bg-line" />
      </div>
    </Reveal>
  );
}
