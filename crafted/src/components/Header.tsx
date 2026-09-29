"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/products";
import { CONFIG } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { LogoMark, Wordmark } from "./Logo";
import {
  IconBag,
  IconInstagram,
  IconMenu,
  IconPin,
  IconSparkle,
  IconTruck,
  IconX,
} from "./Icons";
import { cx } from "@/lib/format";

const NAV = [
  { href: "/shop", label: "Shop All" },
  ...CATEGORIES.map((c) => ({ href: `/shop/${c.id}`, label: c.name })),
  { href: "/customize", label: "Build Your Own" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", on, { passive: true });
    // Covers a reload that restores a scrolled position, without seeding
    // state synchronously inside the effect body.
    const id = window.requestAnimationFrame(on);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("scroll", on);
    };
  }, []);

  // Closing the drawer on navigation is an adjustment to a prop change, not a
  // synchronisation with anything outside React, so it belongs in render.
  const [menuPath, setMenuPath] = useState(path);
  if (menuPath !== path) {
    setMenuPath(path);
    if (menu) setMenu(false);
  }

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      {/* announcement */}
      <div className="bg-forest-900 text-cream-100 text-[0.68rem] sm:text-[0.72rem] tracking-wide">
        <div className="u-wrap flex items-center justify-center gap-5 sm:gap-8 py-2 overflow-hidden whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5">
            <IconPin className="w-3.5 h-3.5 text-gold-300" />
            Pickup in {CONFIG.fulfilment.pickupArea}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <IconTruck className="w-3.5 h-3.5 text-gold-300" />
            {CONFIG.delivery.localLine}
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <IconSparkle className="w-3.5 h-3.5 text-gold-300" />
            {CONFIG.delivery.outsideLine}
          </span>
        </div>
      </div>

      <header
        className={cx(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-cream-50/92 backdrop-blur-md shadow-[0_10px_30px_-24px_rgba(31,51,36,.7)] border-b border-gold-200/70"
            : "bg-cream-100 border-b border-transparent"
        )}
      >
        <div className="u-wrap flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <LogoMark
              className={cx(
                "text-forest-800 transition-all duration-300",
                scrolled ? "w-10 h-10" : "w-11 h-11 sm:w-12 sm:h-12"
              )}
            />
            <span className="leading-tight">
              <Wordmark className="block text-forest-900 text-xl sm:text-[1.6rem] group-hover:text-forest-700 transition-colors" />
              <span className="hidden sm:block u-eyebrow text-[0.55rem] mt-0.5">
                {CONFIG.brand.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = path === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cx(
                    "relative px-3.5 py-2 text-[0.82rem] font-medium rounded-full transition-colors",
                    active
                      ? "text-forest-900"
                      : "text-muted hover:text-forest-800"
                  )}
                >
                  {n.label}
                  <span
                    className={cx(
                      "absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-gold-500 origin-left transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <a
              href={CONFIG.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden sm:grid place-items-center w-10 h-10 rounded-full text-forest-800 hover:bg-forest-100 transition-colors"
            >
              <IconInstagram className="w-[1.15rem] h-[1.15rem]" />
            </a>
            <button
              onClick={open}
              aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
              className="u-press relative grid place-items-center w-10 h-10 rounded-full text-forest-800 hover:bg-forest-100"
            >
              <IconBag className="w-[1.2rem] h-[1.2rem]" />
              {count > 0 && (
                <span
                  // Re-keyed on the count so the pop replays on every add.
                  key={count}
                  className="u-pop absolute -top-0.5 -right-0.5 min-w-[1.15rem] h-[1.15rem] px-1 grid place-items-center rounded-full bg-forest-800 text-cream-50 text-[0.62rem] font-semibold tabular-nums"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full text-forest-800 hover:bg-forest-100 transition-colors"
            >
              <IconMenu className="w-[1.3rem] h-[1.3rem]" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={cx(
          "fixed inset-0 z-[90] lg:hidden transition-opacity duration-300",
          menu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-forest-950/45 backdrop-blur-[2px]"
          onClick={() => setMenu(false)}
        />
        <div
          className={cx(
            "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-cream-50 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] flex flex-col",
            menu ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold-200">
            <Wordmark className="text-forest-900 text-2xl" />
            <button
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              className="grid place-items-center w-9 h-9 rounded-full text-forest-800 hover:bg-forest-100"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                style={{ transitionDelay: menu ? `${60 + i * 35}ms` : "0ms" }}
                className={cx(
                  "block px-4 py-3.5 rounded-xl font-display text-lg text-forest-900 hover:bg-forest-100 transition-all duration-300",
                  menu ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="px-5 py-5 border-t border-gold-200 space-y-3">
            <a
              href={CONFIG.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-muted hover:text-forest-800"
            >
              <IconInstagram className="w-4 h-4" /> @{CONFIG.contact.instagramHandle}
            </a>
            <p className="text-xs text-muted leading-relaxed">
              {CONFIG.fulfilment.pickupLine}
              <br />
              {CONFIG.fulfilment.urgentLine}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
