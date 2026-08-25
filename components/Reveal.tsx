import type { CSSProperties, ReactNode } from "react";

/**
 * كشف بحركة CSS خالصة تعمل عند التحميل (fill-mode: both) — تنتهي دائماً مرئية،
 * دون الاعتماد على JS/IO (أكثر موثوقية، ولا يختفي المحتوى إن تأخّر الترطيب).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className ?? ""}`} style={{ animationDelay: `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
