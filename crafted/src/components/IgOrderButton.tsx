"use client";

import { CONFIG } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { IconInstagram } from "./Icons";
import { cx } from "@/lib/format";

const IG_GRADIENT =
  "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)";

/**
 * Instagram can't pre-fill a DM from a link, so this copies the order text to
 * the clipboard first, then opens the thread for the customer to paste.
 */
export function IgOrderButton({
  text,
  label = "Order on Instagram",
  variant = "outline",
  className,
}: {
  text: string;
  label?: string;
  variant?: "outline" | "gradient";
  className?: string;
}) {
  const { say } = useCart();

  const go = async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      /* clipboard blocked — the customer can still type in the DM */
    }
    say(
      copied
        ? "Order copied — paste it in the DM"
        : "Opening Instagram — tell us what you'd like"
    );
    window.open(CONFIG.contact.instagramDm, "_blank", "noopener,noreferrer");
  };

  const gradient = variant === "gradient";

  return (
    <button
      onClick={go}
      className={cx(
        // px-6 matters: without it the label runs into the rounded edge.
        "u-press group w-full inline-flex items-center justify-center gap-2.5",
        "rounded-full h-12 px-6 font-medium whitespace-nowrap",
        gradient
          ? "u-sheen text-white hover:brightness-110"
          : "border border-forest-800 text-forest-900 hover:bg-forest-100 hover:border-forest-700",
        className
      )}
      style={gradient ? { background: IG_GRADIENT } : undefined}
    >
      {gradient ? (
        <IconInstagram className="w-[1.1rem] h-[1.1rem] shrink-0" />
      ) : (
        <span
          aria-hidden
          className="grid place-items-center w-[1.4rem] h-[1.4rem] rounded-[0.45rem] text-white shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ background: IG_GRADIENT }}
        >
          <IconInstagram className="w-[0.85rem] h-[0.85rem]" />
        </span>
      )}
      <span className="truncate">{label}</span>
    </button>
  );
}
