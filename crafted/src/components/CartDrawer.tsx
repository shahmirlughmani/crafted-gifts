"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { CONFIG } from "@/lib/config";
import { money, cx } from "@/lib/format";
import { IconBag, IconGift, IconTruck, IconX } from "./Icons";

export function CartDrawer() {
  const {
    lines,
    isOpen,
    close,
    setQty,
    remove,
    subtotal,
    delivery,
    total,
    count,
  } = useCart();

  return (
    <div
      className={cx(
        "fixed inset-0 z-[110] transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-forest-950/45 backdrop-blur-[2px]"
        onClick={close}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={cx(
          "absolute right-0 top-0 h-full w-full sm:w-[27rem] bg-cream-50 shadow-2xl flex flex-col transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-gold-200">
          <h2 className="font-display text-xl flex items-center gap-2.5">
            <IconBag className="w-5 h-5 text-gold-600" />
            Your Basket
            {count > 0 && (
              <span className="text-sm font-body font-normal text-muted">
                ({count})
              </span>
            )}
          </h2>
          <button
            onClick={close}
            aria-label="Close cart"
            className="grid place-items-center w-9 h-9 rounded-full text-forest-800 hover:bg-forest-100"
          >
            <IconX className="w-5 h-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex-1 grid place-content-center text-center px-8 gap-4">
            <IconGift className="w-14 h-14 mx-auto text-gold-400" />
            <div>
              <p className="font-display text-xl text-forest-900">
                Your basket is empty
              </p>
              <p className="text-sm text-muted mt-1.5">
                Pick a ready-made box, or build one from scratch.
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <Link
                href="/shop"
                onClick={close}
                className="rounded-full bg-forest-800 text-cream-50 px-6 py-3 text-sm font-medium hover:bg-forest-700 transition-colors"
              >
                Browse gifts
              </Link>
              <Link
                href="/customize"
                onClick={close}
                className="rounded-full border border-forest-800 text-forest-900 px-6 py-3 text-sm font-medium hover:bg-forest-100 transition-colors"
              >
                Build your own
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="px-5 pt-4 pb-3 border-b border-gold-200/70">
              <p className="text-[0.78rem] text-muted flex items-start gap-2">
                <IconTruck className="w-4 h-4 mt-0.5 shrink-0 text-gold-600" />
                {CONFIG.delivery.localLine}. Heavier out-of-city orders are
                quoted after you order.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto u-scroll px-5 py-4 space-y-4">
              {lines.map((l) => (
                <article key={l.key} className="flex gap-3.5">
                  <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-cream-200">
                    {l.image ? (
                      <Image
                        src={l.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <IconGift className="w-8 h-8 absolute inset-0 m-auto text-gold-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-[0.9rem] leading-snug text-forest-900">
                        {l.slug ? (
                          <Link
                            href={`/product/${l.slug}`}
                            onClick={close}
                            className="hover:underline decoration-gold-400 underline-offset-2"
                          >
                            {l.name}
                          </Link>
                        ) : (
                          l.name
                        )}
                      </h3>
                      <button
                        onClick={() => remove(l.key)}
                        aria-label={`Remove ${l.name}`}
                        className="text-muted hover:text-forest-900 shrink-0 -mt-0.5"
                      >
                        <IconX className="w-4 h-4" />
                      </button>
                    </div>

                    {l.details && l.details.length > 0 && (
                      <p className="text-[0.7rem] text-muted mt-0.5 line-clamp-2">
                        {l.details.join(" · ")}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center rounded-full border border-gold-300 bg-cream-50">
                        <button
                          onClick={() => setQty(l.key, l.qty - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 grid place-items-center text-forest-800 hover:text-gold-700 text-lg leading-none"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => setQty(l.key, l.qty + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 grid place-items-center text-forest-800 hover:text-gold-700 text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                      <b className="text-[0.9rem] text-forest-900 tabular-nums">
                        {money(l.price * l.qty)}
                      </b>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="border-t border-gold-200 px-5 py-4 space-y-2 bg-cream-100">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span className="tabular-nums">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Delivery</span>
                <span className="tabular-nums">{money(delivery)}</span>
              </div>
              <div className="flex justify-between font-display text-lg text-forest-900 pt-1.5 border-t border-gold-200/70">
                <span>Total</span>
                <span className="tabular-nums">{money(total)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-2 flex items-center justify-center rounded-full bg-forest-800 text-cream-50 py-3.5 text-sm font-medium hover:bg-forest-700 transition-colors"
              >
                Checkout · {money(total)}
              </Link>
              <p className="text-[0.68rem] text-muted text-center pt-0.5">
                {CONFIG.fulfilment.pickupLine} {CONFIG.fulfilment.urgentLine}
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
