"use client";

import { useCart } from "@/lib/cart";
import { IconCheck } from "./Icons";
import { cx } from "@/lib/format";

export function Toast() {
  const { toast } = useCart();
  return (
    <div
      aria-live="polite"
      className={cx(
        "fixed left-1/2 -translate-x-1/2 z-[120] transition-all duration-300",
        toast
          ? "bottom-24 sm:bottom-8 opacity-100 translate-y-0"
          : "bottom-16 sm:bottom-4 opacity-0 pointer-events-none translate-y-2"
      )}
    >
      {toast && (
        <div className="flex items-center gap-2.5 rounded-full bg-forest-900 text-cream-50 pl-4 pr-5 py-2.5 shadow-xl text-sm">
          <IconCheck className="w-4 h-4 text-gold-300 shrink-0" />
          {toast}
        </div>
      )}
    </div>
  );
}
