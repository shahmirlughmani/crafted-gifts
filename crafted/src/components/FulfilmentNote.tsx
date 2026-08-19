import { CONFIG } from "@/lib/config";
import { IconCheck, IconClock, IconSparkle } from "./Icons";

/**
 * The pickup / urgent-order notice that sits under every product.
 */
export function FulfilmentNote({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "rounded-xl border border-gold-200 bg-cream-50 p-4"
          : "rounded-2xl border border-gold-200 bg-cream-50 p-5"
      }
    >
      <p className="flex items-start gap-2.5 text-sm text-forest-900 font-medium">
        <span className="grid place-items-center w-5 h-5 rounded-full bg-forest-700 text-cream-50 shrink-0 mt-0.5">
          <IconCheck className="w-3 h-3" />
        </span>
        {CONFIG.fulfilment.pickupLine}
      </p>
      <p className="mt-1 pl-[1.9rem] text-[0.78rem] text-muted flex items-center gap-1.5">
        <IconClock className="w-3.5 h-3.5" />
        {CONFIG.fulfilment.readyIn}
      </p>
      <p className="mt-3 pl-[1.9rem] text-[0.8rem] text-gold-700 flex items-start gap-1.5">
        <IconSparkle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        {CONFIG.fulfilment.urgentLine}
      </p>
    </div>
  );
}
