import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { CONFIG } from "@/lib/config";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import {
  IconChevron,
  IconGift,
  IconInstagram,
  IconLeaf,
  IconPin,
  IconSparkle,
  IconTruck,
  IconClock,
} from "@/components/Icons";

export default function Home() {
  return (
    <>
      {/* ============================= HERO ============================= */}
      <section className="relative overflow-hidden u-paper">
        <div className="u-wrap pt-5 lg:pt-8 pb-10 lg:pb-14">
          <div className="grid lg:grid-cols-[1.55fr_1fr] gap-4 lg:gap-5">
            {/* main banner */}
            <Reveal
              variant="fade"
              className="relative min-h-[27rem] sm:min-h-[30rem] lg:min-h-[34rem] rounded-[1.75rem] overflow-hidden bg-forest-900 shadow-[0_40px_80px_-50px_rgba(31,51,36,.6)]"
            >
              <Image
                src="/baskets/bunny-pamper-basket-full.webp"
                alt="A white wicker basket packed with pink pamper treats and a crochet bunny"
                fill
                priority
                sizes="(min-width:1024px) 62vw, 100vw"
                className="object-cover object-[60%_45%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/45 to-forest-950/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 flex flex-col justify-end lg:justify-center p-6 sm:p-10 lg:p-14">
                <p className="u-eyebrow text-gold-300 u-enter u-enter-1">
                  Handmade in Islamabad
                </p>
                <h1 className="mt-3 font-display text-[2.5rem] sm:text-5xl lg:text-[3.8rem] leading-[1.02] text-cream-50 max-w-xl u-enter u-enter-2">
                  Thoughtful gifts,
                  <span className="font-script text-gold-300 text-[1.15em] leading-[1.25] block -mt-1">
                    made with love
                  </span>
                </h1>
                <p className="mt-4 text-[0.98rem] text-cream-100/85 max-w-md leading-relaxed u-enter u-enter-3">
                  Baskets, boxes, plushies and cakes, each one packed by hand
                  and sent anywhere in Pakistan.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 u-enter u-enter-4">
                  <Link
                    href="/shop"
                    className="u-press u-sheen group inline-flex items-center gap-2 rounded-full bg-gold-500 text-forest-950 px-6 py-3 font-semibold hover:bg-gold-400 transition-colors"
                  >
                    Shop all gifts
                    <IconChevron className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/customize"
                    className="inline-flex items-center gap-2 rounded-full border border-cream-50/70 text-cream-50 px-6 py-3 font-medium hover:bg-cream-50 hover:text-forest-900 transition-colors"
                  >
                    <IconGift className="w-[1.1rem] h-[1.1rem]" />
                    Build your own
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* side tiles */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 lg:gap-5">
              <Reveal delay={120} variant="scale" className="h-full">
                <Link
                  href="/shop/plushies"
                  className="group relative block h-full min-h-[15rem] rounded-[1.75rem] overflow-hidden bg-cream-200"
                >
                  <Image
                    src="/crochet/crochet-kitty-strawberry-hat-full.webp"
                    alt="Crochet kitty in a strawberry hat"
                    fill
                    sizes="(min-width:1024px) 36vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover object-[center_38%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 text-cream-50">
                    <p className="u-eyebrow text-gold-300 text-[0.58rem]">New in</p>
                    <h2 className="font-display text-2xl text-cream-50 mt-1 flex items-center gap-1.5">
                      Chunky crochet plushies
                      <IconChevron className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h2>
                    <p className="text-[0.82rem] text-cream-100/80 mt-1">
                      10.5 inches of squish, from Rs. 4,000
                    </p>
                  </div>
                </Link>
              </Reveal>
              <Reveal delay={200} variant="scale" className="h-full">
                <Link
                  href="/customize"
                  className="group relative block h-full min-h-[15rem] rounded-[1.75rem] overflow-hidden bg-cream-200"
                >
                  <Image
                    src="/vessels/gift-basket.webp"
                    alt="Build your own gift basket"
                    fill
                    sizes="(min-width:1024px) 36vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover object-[center_60%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 text-cream-50">
                    <p className="u-eyebrow text-gold-300 text-[0.58rem]">
                      Build your own
                    </p>
                    <h2 className="font-display text-2xl text-cream-50 mt-1 flex items-center gap-1.5">
                      Customise a gift basket
                      <IconChevron className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h2>
                    <p className="text-[0.82rem] text-cream-100/80 mt-1">
                      Pick the basket, the size and every item inside
                    </p>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[0.8rem] text-muted">
            <li className="flex items-center gap-2">
              <IconPin className="w-4 h-4 text-gold-600" />
              Pickup in {CONFIG.fulfilment.pickupArea}
            </li>
            <li className="flex items-center gap-2">
              <IconTruck className="w-4 h-4 text-gold-600" />
              Nationwide delivery
            </li>
            <li className="flex items-center gap-2">
              <IconClock className="w-4 h-4 text-gold-600" />
              {CONFIG.fulfilment.readyIn}
            </li>
          </ul>
        </div>

        {/* scrolling ribbon */}
        <div className="border-y border-gold-200 bg-cream-50/70 overflow-hidden">
          <div className="flex w-max u-marquee">
            {[0, 1].map((k) => (
              <ul
                key={k}
                className="flex items-center gap-10 px-5 py-3 text-[0.72rem] tracking-[0.2em] uppercase text-forest-700/70"
                aria-hidden={k === 1}
              >
                {[
                  "Crochet Flowers",
                  "Plushies",
                  "Gift Hampers",
                  "Custom Baskets",
                  "Keepsakes",
                  "Handmade to Order",
                  "Islamabad in 3 Days",
                  "Nationwide in 6–7 Days",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-10">
                    {t}
                    <IconSparkle className="w-3 h-3 text-gold-500" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== NEW IN STORE ======================== */}
      <section className="u-wrap pt-14 lg:pt-20">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="u-eyebrow">Just added</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              New in store
            </h2>
          </div>
          <Link
            href="/shop"
            className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-forest-800 border-b border-gold-400 pb-0.5 hover:text-gold-700 transition-colors"
          >
            Shop all products
            <IconChevron className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <div className="u-stagger mt-10 grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
          {PRODUCTS.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} p={p} priority={i < 4} />
          ))}
        </div>
        <Link
          href="/shop"
          className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-forest-800 border-b border-gold-400 pb-0.5"
        >
          Shop all products
          <IconChevron className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* =========================== CATEGORIES ========================== */}
      <section className="u-wrap py-16 lg:py-24">
        <Reveal className="text-center max-w-xl mx-auto">
          <p className="u-eyebrow">Shop by category</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Find the right kind of gift
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <Link href={`/shop/${c.id}`} className="group block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(min-width:1024px) 230px, 45vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/55 to-forest-950/10" />
                  <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5 text-cream-50">
                    <p className="u-eyebrow text-gold-300 text-[0.55rem]">
                      {c.tagline}
                    </p>
                    <h3 className="font-display text-xl lg:text-2xl text-cream-50 mt-1 flex items-center gap-1.5">
                      {c.name}
                      <IconChevron className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================== BUILD YOUR OWN ======================= */}
      <section className="relative overflow-hidden bg-forest-900 text-cream-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/crochet/mini-doll-basket.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="u-wrap relative py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="u-eyebrow text-gold-300">Made exactly your way</p>
            <h2 className="mt-3 font-display text-3xl sm:text-[2.6rem] text-cream-50 leading-tight">
              Build your own basket,
              <br />
              piece by piece
            </h2>
            <p className="mt-5 text-cream-200/80 max-w-lg leading-relaxed">
              Choose the box, tray or basket, pick the size, then tap exactly
              what goes inside: chocolates, snacks, dry fruit, skincare, a
              crochet keychain. The price updates as you go, so there are no
              surprises.
            </p>
            <Link
              href="/customize"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 text-forest-950 px-7 py-3.5 font-semibold hover:bg-gold-400 transition-colors"
            >
              Start building
              <IconChevron className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <ol className="space-y-5">
              {[
                ["Pick your vessel", "Box, tray, basket or mini bucket, with a photo of each."],
                ["Choose a size", "Small, medium or large. We guide the item count."],
                ["Fill it", "Tap items from the picture cards and watch the total."],
                ["Add a card", "Choose a card and we'll handwrite your message."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full border border-gold-400/50 text-gold-300 font-display text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <b className="block text-cream-50 font-medium">{t}</b>
                    <span className="text-sm text-cream-200/65">{d}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ============================== STORY ============================ */}
      <section className="u-wrap pb-16 lg:pb-24">
        <div className="rounded-[2rem] bg-cream-50 border border-gold-200 overflow-hidden grid lg:grid-cols-2">
          <Reveal className="relative min-h-[20rem] lg:min-h-[26rem]">
            <Image
              src="/crochet/rose-tulip-bouquet.webp"
              alt="Hand-crocheted rose and tulip bouquet"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={120} className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <LogoMark className="w-14 h-14 text-forest-700" />
            <p className="u-eyebrow mt-6">Our story</p>
            <h2 className="mt-3 font-display text-3xl">
              Slow gifts in a fast world
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Every crochet piece is worked stitch by stitch by hand — a bouquet
              takes a full day, a shadow box takes two. The hampers are packed
              the same way: nothing pre-assembled, nothing thrown together.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              We&apos;re a small studio in Islamabad. If you want something
              changed — a colour, a stem count, an item swapped — just ask.
              That&apos;s the whole point.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-800 border-b border-gold-400 pb-0.5 hover:text-gold-700 transition-colors"
              >
                More about the studio
                <IconChevron className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== TRUST ============================ */}
      <section className="border-y border-gold-200 bg-cream-50">
        <div className="u-wrap py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            [IconLeaf, "Genuinely handmade", "No factory pieces. Every stitch is ours."],
            [IconPin, "Pickup in E-11", "Collect from us, or we deliver nationwide."],
            [IconSparkle, "Urgent orders", "Depends on the queue and your city — just ask."],
            [IconGift, "Wrapped to gift", "Arrives ready to hand over."],
          ].map(([Icon, t, d], i) => {
            const I = Icon as React.ElementType;
            return (
              <Reveal key={t as string} delay={i * 70} className="text-center sm:text-left">
                <I className="w-7 h-7 text-gold-600 mx-auto sm:mx-0" />
                <b className="block mt-3 font-display text-lg text-forest-900">
                  {t as string}
                </b>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  {d as string}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================ INSTAGRAM ========================== */}
      <section className="u-wrap py-16 lg:py-24 text-center">
        <Reveal>
          <p className="u-eyebrow">Follow along</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            <a
              href={CONFIG.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest-700 transition-colors"
            >
              @{CONFIG.contact.instagramHandle}
            </a>
          </h2>
          <p className="mt-3 text-muted text-sm">
            New pieces, behind the scenes, and every box before it ships.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {PRODUCTS.filter((p) => p.handmade)
            .slice(0, 6)
            .map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <a
                  href={CONFIG.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square rounded-xl overflow-hidden bg-cream-200"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width:640px) 16vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-forest-950/45 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconInstagram className="w-6 h-6 text-cream-50" />
                  </span>
                </a>
              </Reveal>
            ))}
        </div>
      </section>
    </>
  );
}
