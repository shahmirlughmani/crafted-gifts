import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import { CONFIG } from "@/lib/config";
import { LogoMark, Wordmark } from "./Logo";
import {
  IconInstagram,
  IconPin,
  IconClock,
} from "./Icons";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="mt-20 bg-forest-900 text-cream-200">
      <div className="u-wrap py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="w-12 h-12 text-cream-200" />
            <Wordmark className="text-cream-50 text-2xl" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream-200/75 max-w-xs">
            Handmade crochet, plushies and curated gift boxes — put together by
            hand in Islamabad, wrapped so the unboxing is part of the gift.
          </p>
          <div className="flex gap-2 mt-5">
            <a
              href={CONFIG.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid place-items-center w-10 h-10 rounded-full border border-cream-200/25 hover:border-gold-400 hover:text-gold-300 transition-colors"
            >
              <IconInstagram className="w-[1.05rem] h-[1.05rem]" />
            </a>

          </div>
        </div>

        <nav aria-label="Shop">
          <h3 className="u-eyebrow text-gold-300 mb-4">Shop</h3>
          <ul className="space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/shop/${c.id}`}
                  className="text-cream-200/75 hover:text-gold-200 transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop"
                className="text-cream-200/75 hover:text-gold-200 transition-colors"
              >
                All Gifts
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="u-eyebrow text-gold-300 mb-4">Studio</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/customize", "Build Your Own"],
              ["/about", "Our Story"],
              ["/faq", "FAQ & Delivery"],
              ["/checkout", "Checkout"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-cream-200/75 hover:text-gold-200 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="u-eyebrow text-gold-300 mb-4">Visit &amp; Contact</h3>
          <ul className="space-y-3 text-sm text-cream-200/75">
            <li className="flex gap-2.5">
              <IconPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" />
              <span>
                {CONFIG.fulfilment.pickupLine}
                <br />
                <span className="text-cream-200/55 text-[0.78rem]">
                  {CONFIG.fulfilment.urgentLine}
                </span>
              </span>
            </li>
            <li className="flex gap-2.5">
              <IconClock className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" />
              <span>{CONFIG.fulfilment.readyIn}</span>
            </li>
            <li className="flex gap-2.5">
              <IconInstagram className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" />
              <a
                href={CONFIG.contact.instagramDm}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-200 transition-colors"
              >
                DM @{CONFIG.contact.instagramHandle}
              </a>
            </li>
          </ul>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-cream-200/12">
        <div className="u-wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.72rem] text-cream-200/50">
          <p>
            © {new Date().getFullYear()} {CONFIG.brand.name}. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5">
            {CONFIG.brand.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
