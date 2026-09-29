"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { CONFIG } from "@/lib/config";
import { money, cx } from "@/lib/format";
import { IconBag, IconHeart, IconShare, IconCheck } from "./Icons";
import { IgOrderButton } from "./IgOrderButton";

export function ProductBuy({ p }: { p: Product }) {
  const { add, saved, toggleSaved, say } = useCart();
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);
  const isSaved = saved.includes(p.slug);

  const share = async () => {
    const url = `${CONFIG.brand.url}/product/${p.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: p.name, text: p.summary, url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      say("Could not copy the link");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-stretch gap-3">
        <div className="inline-flex items-center rounded-full border border-gold-300 bg-cream-50">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-11 h-12 grid place-items-center text-forest-800 hover:text-gold-700 text-xl leading-none"
          >
            −
          </button>
          <span
            aria-live="polite"
            className="w-9 text-center tabular-nums font-medium"
          >
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
            className="w-11 h-12 grid place-items-center text-forest-800 hover:text-gold-700 text-xl leading-none"
          >
            +
          </button>
        </div>

        <button
          onClick={() => {
            add(
              {
                key: `p:${p.slug}`,
                kind: "product",
                name: p.name,
                price: p.price,
                image: p.image,
                slug: p.slug,
              },
              qty
            );
            say(`${p.name} × ${qty} added`);
          }}
          className="u-press u-sheen flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 text-cream-50 px-6 h-12 font-medium hover:bg-forest-700 transition-colors"
        >
          <IconBag className="w-[1.1rem] h-[1.1rem]" />
          Add to basket · {money(p.price * qty)}
        </button>
      </div>

      <IgOrderButton
        text={`Hi! I'd like to order the ${p.name} (${money(p.price)}) × ${qty}.`}
        label="Order on Instagram instead"
      />

      <div className="flex items-center gap-5 pt-1">
        <button
          onClick={() => {
            toggleSaved(p.slug);
            say(isSaved ? "Removed from saved" : "Saved for later");
          }}
          aria-pressed={isSaved}
          className={cx(
            "inline-flex items-center gap-2 text-sm transition-colors",
            isSaved ? "text-rose-500" : "text-muted hover:text-forest-800"
          )}
        >
          <IconHeart className="w-[1.05rem] h-[1.05rem]" filled={isSaved} />
          {isSaved ? "Saved" : "Save for later"}
        </button>
        <button
          onClick={share}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-forest-800 transition-colors"
        >
          {copied ? (
            <>
              <IconCheck className="w-[1.05rem] h-[1.05rem]" /> Link copied
            </>
          ) : (
            <>
              <IconShare className="w-[1.05rem] h-[1.05rem]" /> Share
            </>
          )}
        </button>
      </div>
    </div>
  );
}
