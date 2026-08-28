"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * هيكل الصفحة الواحدة: يملأ الشاشة، ويوسّط محتواه، ويسمح بتمرير داخلي على
 * الشاشات القصيرة (data-scroll يخبر السطح ألّا يخطف العجلة حينها).
 */
export function Shell({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      data-scroll
      className="h-full w-full overflow-y-auto overscroll-contain px-5 pb-24 pt-24 sm:px-8 sm:pt-28 lg:pb-20"
    >
      <div className={cn("mx-auto flex min-h-full flex-col justify-center", wide ? "max-w-[1320px]" : "max-w-[1180px]", className)}>
        {children}
      </div>
    </div>
  );
}

/** ترويسة قسم موحّدة: رقم + عنوان + سطر شرح. */
export function PageHead({ title, desc }: { title: ReactNode; desc?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/[0.07] pb-6">
      <div>
        <h2 className="font-display text-display text-ink">{title}</h2>
      </div>
      {desc && <p className="max-w-sm text-[13px] leading-relaxed text-fg-muted">{desc}</p>}
    </div>
  );
}
