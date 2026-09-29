import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { FulfilmentNote } from "@/components/FulfilmentNote";
import {
  IconChevron,
  IconInstagram,
  IconLeaf,
  IconGift,
  IconSparkle,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "A small handmade gift studio in Islamabad. Crochet flowers, plushies and gift boxes made one at a time.",
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="u-wrap pt-12 pb-16 text-center max-w-3xl mx-auto">
        <Reveal>
          <LogoMark className="w-20 h-20 mx-auto text-forest-700" />
          <p className="u-eyebrow mt-7">Our story</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            Slow gifts, made
            <span className="font-script text-gold-600"> by hand</span>
          </h1>
          <p className="mt-6 text-[1.05rem] text-muted leading-relaxed">
            Crafted Gifts by S started with a crochet hook and a lot of yarn.
            What began as flowers for friends turned into bouquets that never
            wilt, plushies with real character, and gift boxes packed one at a
            time from a small studio in Islamabad.
          </p>
        </Reveal>
      </section>

      <section className="u-wrap">
        <Reveal className="relative aspect-[16/9] sm:aspect-[21/9] rounded-[2rem] overflow-hidden">
          <Image
            src="/crochet/mini-doll-basket.webp"
            alt="A basket of hand-crocheted mini dolls"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <section className="u-wrap py-16 lg:py-24 grid lg:grid-cols-3 gap-10">
        {[
          [
            IconLeaf,
            "Everything is handmade",
            "No factory pieces, no drop-shipping. A bouquet takes a full day, a shadow box takes two. If it's on this site, it was made or packed here.",
          ],
          [
            IconGift,
            "Nothing is pre-assembled",
            "Boxes are packed after you order, so what's inside is fresh and nothing sits on a shelf. It also means we can change things.",
          ],
          [
            IconSparkle,
            "Just ask",
            "A different colour, a longer stem, an item swapped out, a theme to follow — message us before ordering. Most changes cost nothing.",
          ],
        ].map(([Icon, t, d], i) => {
          const I = Icon as React.ElementType;
          return (
            <Reveal key={t as string} delay={i * 90}>
              <I className="w-8 h-8 text-gold-600" />
              <h2 className="mt-4 font-display text-2xl">{t as string}</h2>
              <p className="mt-3 text-muted leading-relaxed">{d as string}</p>
            </Reveal>
          );
        })}
      </section>

      <section className="u-wrap">
        <div className="rounded-[2rem] bg-forest-900 text-cream-100 p-8 sm:p-12 lg:p-16 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <p className="u-eyebrow text-gold-300">Visit or message</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-cream-50">
              We&apos;re easy to reach
            </h2>
            <p className="mt-4 text-cream-200/75 leading-relaxed">
              Questions about a piece, a custom idea, or an urgent order — our
              Instagram DMs are fastest, and it&apos;s a real person on the
              other end.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={CONFIG.contact.instagramDm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 text-forest-950 px-6 py-3.5 font-semibold hover:bg-gold-400 transition-colors"
              >
                <IconInstagram className="w-[1.1rem] h-[1.1rem]" />
                Send us a DM
              </a>
              <a
                href={CONFIG.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream-200/30 px-6 py-3.5 font-medium hover:border-gold-400 hover:text-gold-200 transition-colors"
              >
                <IconInstagram className="w-[1.1rem] h-[1.1rem]" />@
                {CONFIG.contact.instagramHandle}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl bg-cream-50 p-1">
              <FulfilmentNote />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="u-wrap pt-16 text-center">
        <Reveal>
          <h2 className="font-display text-3xl">Ready to pick something?</h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="u-press u-sheen group inline-flex items-center gap-2 rounded-full bg-forest-800 text-cream-50 px-7 py-3.5 font-medium hover:bg-forest-700 transition-colors"
            >
              Browse all gifts
              <IconChevron className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/customize"
              className="inline-flex items-center gap-2 rounded-full border border-forest-800 px-7 py-3.5 font-medium hover:bg-forest-100 transition-colors"
            >
              <IconGift className="w-[1.1rem] h-[1.1rem]" />
              Build your own
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
