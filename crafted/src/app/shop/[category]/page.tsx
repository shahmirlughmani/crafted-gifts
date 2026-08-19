import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  getCategory,
  productsIn,
  type CategoryId,
} from "@/data/products";
import { ShopBrowser } from "@/components/ShopBrowser";
import { IconChevron } from "@/components/Icons";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.tagline}`,
    description: c.blurb,
    openGraph: {
      title: `${c.name} · Crafted Gifts by S`,
      description: c.blurb,
      images: c.image ? [c.image] : undefined,
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const items = productsIn(c.id);

  return (
    <div>
      {/* banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          {c.image && (
            <Image
              src={c.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/65 to-forest-950/30" />
        </div>
        <div className="u-wrap relative py-16 lg:py-24 text-cream-50">
          <nav className="flex items-center gap-1.5 text-[0.75rem] text-cream-200/65">
            <Link href="/" className="hover:text-gold-200">
              Home
            </Link>
            <IconChevron className="w-3 h-3" />
            <Link href="/shop" className="hover:text-gold-200">
              Shop
            </Link>
            <IconChevron className="w-3 h-3" />
            <span className="text-cream-100">{c.name}</span>
          </nav>
          <p className="u-eyebrow text-gold-300 mt-5">{c.tagline}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-cream-50">
            {c.name}
          </h1>
          <p className="mt-4 max-w-xl text-cream-200/80 leading-relaxed">
            {c.blurb}
          </p>
          <p className="mt-5 text-[0.8rem] text-cream-200/60">
            {items.length} {items.length === 1 ? "piece" : "pieces"} available
          </p>
        </div>
      </div>

      <div className="u-wrap pt-6 pb-20">
        <Suspense fallback={<div className="h-32" />}>
          <ShopBrowser fixedCategory={c.id as CategoryId} />
        </Suspense>

        {/* other categories */}
        <div className="mt-20 pt-10 border-t border-gold-200">
          <p className="u-eyebrow">Keep looking</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {CATEGORIES.filter((o) => o.id !== c.id).map((o) => (
              <Link
                key={o.id}
                href={`/shop/${o.id}`}
                className="group inline-flex items-center gap-2 rounded-full border border-gold-300 bg-cream-50 pl-2 pr-5 py-2 hover:border-forest-600 transition-colors"
              >
                <span className="relative w-9 h-9 rounded-full overflow-hidden bg-cream-200">
                  {o.image && (
                    <Image
                      src={o.image}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  )}
                </span>
                <span className="text-sm font-medium text-forest-900">
                  {o.name}
                </span>
                <IconChevron className="w-3.5 h-3.5 text-muted transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
