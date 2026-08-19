"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { money, cx } from "@/lib/format";
import { IconBag, IconHeart } from "./Icons";

export function ProductCard({
  p,
  priority = false,
}: {
  p: Product;
  priority?: boolean;
}) {
  const { addProduct, saved, toggleSaved, say } = useCart();
  const isSaved = saved.includes(p.slug);

  return (
    <article className="group relative">
      <Link
        href={`/product/${p.slug}`}
        className="block relative aspect-square overflow-hidden rounded-2xl bg-cream-200"
      >
        <Image
          src={p.image}
          alt={p.name}
          fill
          priority={priority}
          sizes="(min-width:1280px) 300px, (min-width:768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {p.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-cream-50/95 backdrop-blur-sm px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-700 shadow-sm">
            {p.badge}
          </span>
        )}
      </Link>

      <button
        onClick={() => {
          toggleSaved(p.slug);
          say(isSaved ? "Removed from saved" : "Saved for later");
        }}
        aria-label={isSaved ? `Unsave ${p.name}` : `Save ${p.name}`}
        aria-pressed={isSaved}
        className={cx(
          "absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-cream-50/92 backdrop-blur-sm shadow-sm transition-colors",
          isSaved
            ? "text-rose-500"
            : "text-forest-800 hover:text-rose-500"
        )}
      >
        <IconHeart className="w-[1.05rem] h-[1.05rem]" filled={isSaved} />
      </button>

      <div className="pt-3.5">
        <h3 className="font-display text-[1.02rem] leading-snug text-forest-900">
          <Link
            href={`/product/${p.slug}`}
            className="hover:text-forest-700 transition-colors"
          >
            {p.name}
          </Link>
        </h3>
        <p className="mt-1 text-[0.78rem] text-muted line-clamp-2 leading-relaxed">
          {p.summary}
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <b className="font-display text-lg text-forest-900 tabular-nums">
            {money(p.price)}
          </b>
          <button
            onClick={() => {
              addProduct(p.slug);
              say(`${p.name} added`);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-forest-800 px-3.5 py-1.5 text-[0.74rem] font-medium text-forest-900 hover:bg-forest-800 hover:text-cream-50 transition-colors"
          >
            <IconBag className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
