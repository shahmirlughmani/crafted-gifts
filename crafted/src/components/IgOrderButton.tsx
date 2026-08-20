"use client";

import { CONFIG } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { IconInstagram } from "./Icons";
import { cx } from "@/lib/format";

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

  return (
    <button
      onClick={go}
      className={cx(
        "flex items-center justify-center gap-2 rounded-full h-12 font-medium transition",
        variant === "gradient"
          ? "text-white hover:brightness-110"
          : "border border-forest-800 text-forest-900 hover:bg-forest-100",
        className
      )}
      style={
        variant === "gradient"
          ? {
              background:
                "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            }
          : undefined
      }
    >
      <IconInstagram className="w-[1.1rem] h-[1.1rem]" />
      {label}
    </button>
  );
}
