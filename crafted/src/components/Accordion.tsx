"use client";

import { useState } from "react";
import { cx } from "@/lib/format";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gold-200 border-y border-gold-200">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-4 text-left group"
            >
              <span className="font-medium text-[0.94rem] text-forest-900 group-hover:text-forest-700 transition-colors">
                {it.q}
              </span>
              <span className="relative w-4 h-4 shrink-0 text-gold-600">
                <span className="absolute inset-x-0 top-1/2 h-px bg-current -translate-y-1/2" />
                <span
                  className={cx(
                    "absolute inset-y-0 left-1/2 w-px bg-current -translate-x-1/2 transition-transform duration-300",
                    isOpen ? "scale-y-0" : "scale-y-100"
                  )}
                />
              </span>
            </button>
            <div
              className={cx(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-8 text-[0.88rem] text-muted leading-relaxed">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
