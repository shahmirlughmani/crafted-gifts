import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PRODUCTS,
  getProduct,
  relatedTo,
  getCategory,
} from "@/data/products";
import { CONFIG } from "@/lib/config";
import { money } from "@/lib/format";
import { ProductBuy } from "@/components/ProductBuy";
import { ProductGallery } from "@/components/ProductGallery";
import { FulfilmentNote } from "@/components/FulfilmentNote";
import { ProductCard } from "@/components/ProductCard";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { IconChevron, IconCheck, IconLeaf, IconGift } from "@/components/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.summary} ${money(p.price)}. ${CONFIG.fulfilment.pickupLine}`,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      title: `${p.name} · ${CONFIG.brand.name}`,
      description: p.summary,
      images: [{ url: p.image, width: 1000, height: 1000, alt: p.name }],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const related = relatedTo(p);
  const primaryCat = getCategory(p.categories[0]);
  const images = [p.image, ...(p.gallery ?? [])];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.summary,
    image: images.map((i) => `${CONFIG.brand.url}${i}`),
    brand: { "@type": "Brand", name: CONFIG.brand.name },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `${CONFIG.brand.url}/product/${p.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="u-wrap pt-6 pb-20">
        <nav className="flex items-center gap-1.5 text-[0.75rem] text-muted flex-wrap">
          <Link href="/" className="hover:text-forest-800">
            Home
          </Link>
          <IconChevron className="w-3 h-3" />
          <Link href="/shop" className="hover:text-forest-800">
            Shop
          </Link>
          {primaryCat && (
            <>
              <IconChevron className="w-3 h-3" />
              <Link
                href={`/shop/${primaryCat.id}`}
                className="hover:text-forest-800"
              >
                {primaryCat.name}
              </Link>
            </>
          )}
          <IconChevron className="w-3 h-3" />
          <span className="text-forest-900">{p.name}</span>
        </nav>

        <div className="mt-6 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
          <ProductGallery images={images} name={p.name} badge={p.badge} />

          <div className="lg:sticky lg:top-28">
            {p.handmade && (
              <p className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 text-forest-800 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em]">
                <IconLeaf className="w-3.5 h-3.5" />
                Handmade to order
              </p>
            )}

            <h1 className="mt-3 font-display text-3xl sm:text-[2.6rem] leading-[1.08]">
              {p.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3 flex-wrap">
              <p className="font-display text-3xl text-forest-900 tabular-nums">
                {money(p.price)}
              </p>
              {p.pricePending && (
                <span className="rounded-full bg-gold-100 text-gold-700 px-2.5 py-1 text-[0.66rem] font-medium">
                  Price to be confirmed
                </span>
              )}
            </div>
            <p className="mt-1 text-[0.75rem] text-muted">
              {CONFIG.delivery.shortNote}
            </p>

            <p className="mt-5 text-[1.02rem] text-muted leading-relaxed">
              {p.summary}
            </p>

            <div className="mt-7">
              <ProductBuy p={p} />
            </div>

            {(p.note || p.categories.includes("cakes")) && (
              <p className="mt-7 rounded-2xl border border-gold-300 bg-gold-100 px-5 py-4 text-[0.85rem] text-gold-700 leading-relaxed">
                {p.note
                  ? `${p.note} ${CONFIG.cakes.areas}`
                  : CONFIG.cakes.note}
              </p>
            )}

            <div className="mt-7">
              <FulfilmentNote />
            </div>

            {/* what's included — the key block */}
            <section className="mt-8">
              <h2 className="u-eyebrow">What&apos;s inside this box</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {p.contents.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2.5 text-[0.9rem] text-forest-900/90"
                  >
                    <IconCheck className="w-4 h-4 mt-1 shrink-0 text-gold-600" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.78rem] text-muted">
                Want something swapped or a different colour? Message us before
                ordering — most changes are free.
              </p>
            </section>

            <div className="mt-8">
              <Accordion
                items={[
                  {
                    q: "Delivery & pickup",
                    a: `${CONFIG.fulfilment.pickupLine} ${CONFIG.delivery.localLine}. ${CONFIG.delivery.outsideLine}. ${CONFIG.delivery.chargeLine} ${CONFIG.fulfilment.advanceLine} ${CONFIG.fulfilment.urgentLine}`,
                  },
                  {
                    q: "Can I customise this?",
                    a: "Yes. Colours, stem counts, item swaps and add-ons are all possible — message us on Instagram before you order and we'll confirm what's doable and any price difference. You can also build a basket from scratch on the Build Your Own page.",
                  },
                  {
                    q: "How do I pay?",
                    a: `We accept ${CONFIG.payment.method} transfer. At checkout you'll see the account details, send the amount, then upload a screenshot of the payment. We confirm every order with you before it's made.`,
                  },
                  {
                    q: "Care instructions",
                    a: p.handmade
                      ? "Crochet pieces are made with cotton or acrylic yarn. Spot clean with a damp cloth and mild soap; reshape while damp and air dry flat. Keep out of direct sunlight to preserve the colours. Don't machine wash."
                      : "Store somewhere cool and dry. Edible items should be enjoyed within their printed dates. Skincare items are sealed and brand new.",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-24">
            <Reveal className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="u-eyebrow">You may also like</p>
                <h2 className="mt-2.5 font-display text-2xl sm:text-3xl">
                  Pairs well with this
                </h2>
              </div>
              <Link
                href="/customize"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-forest-800 border-b border-gold-400 pb-0.5 hover:text-gold-700 transition-colors"
              >
                <IconGift className="w-4 h-4" />
                Build a custom one
              </Link>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-x-7">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 70}>
                  <ProductCard p={r} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
