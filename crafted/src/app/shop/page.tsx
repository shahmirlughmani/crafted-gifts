import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopBrowser } from "@/components/ShopBrowser";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Gifts",
  description:
    "Browse every gift — handmade crochet, baskets, hampers and boxes for him and for her. Search by name or by what's inside.",
};

export default function ShopPage() {
  return (
    <div className="u-wrap pt-10 pb-20">
      <header className="max-w-2xl">
        <p className="u-eyebrow u-enter u-enter-1">The full collection</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl u-enter u-enter-2">
          All Gifts
        </h1>
        <p className="mt-4 text-muted leading-relaxed u-enter u-enter-3">
          {PRODUCTS.length} pieces, all made or packed by hand. Search by name
          or by what&apos;s inside — the search looks through every item list.
        </p>
      </header>

      <div className="mt-8">
        <Suspense fallback={<div className="h-32" />}>
          <ShopBrowser />
        </Suspense>
      </div>
    </div>
  );
}
