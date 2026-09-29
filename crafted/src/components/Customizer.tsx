"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CARDS,
  VESSELS,
  ITEM_GROUPS,
  ALL_ITEMS,
  sizesFor,
  type SizeId,
} from "@/data/customizer";
import { useCart } from "@/lib/cart";
import { CONFIG } from "@/lib/config";
import { money, cx } from "@/lib/format";
import {
  IconCheck,
  IconGift,
  IconSparkle,
  IconX,
} from "./Icons";
import { IgOrderButton } from "./IgOrderButton";
import { FulfilmentNote } from "./FulfilmentNote";

export function Customizer() {
  const { add, say } = useCart();

  const [vessel, setVessel] = useState(VESSELS[0].id);
  const [size, setSize] = useState<SizeId>("large");
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [card, setCard] = useState(CARDS[0].id);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [openGroup, setOpenGroup] = useState<string>(ITEM_GROUPS[0].id);

  const vesselOpt = VESSELS.find((v) => v.id === vessel)!;
  const vesselSizes = sizesFor(vessel);
  // Vessels aren't made in every size, so fall back to the largest they do come
  // in rather than leaving nothing selected.
  const sizeOpt =
    vesselSizes.find((s) => s.id === size) ?? vesselSizes[vesselSizes.length - 1];
  const cardOpt = CARDS.find((c) => c.id === card)!;

  const itemCount = useMemo(
    () => Object.values(picked).reduce((a, b) => a + b, 0),
    [picked]
  );

  const itemsTotal = useMemo(
    () =>
      Object.entries(picked).reduce(
        (sum, [id, qty]) => sum + (ALL_ITEMS[id]?.price ?? 0) * qty,
        0
      ),
    [picked]
  );

  // The vessel and its size are included — the owner's list prices them with the
  // final quote, so only the contents and the card are totalled here.
  const total = itemsTotal + cardOpt.price;
  const overCapacity = itemCount > sizeOpt.maxItems;

  const bump = (id: string, delta: number) =>
    setPicked((prev) => {
      const next = { ...prev };
      const v = (next[id] ?? 0) + delta;
      if (v <= 0) delete next[id];
      else next[id] = Math.min(20, v);
      return next;
    });

  const buildLines = () => {
    const lines = [
      `${vesselOpt.name} · ${sizeOpt.name}`,
      ...Object.entries(picked).map(
        ([id, qty]) => `${ALL_ITEMS[id].name}${qty > 1 ? ` ×${qty}` : ""}`
      ),
    ];
    if (cardOpt.price > 0 || cardOpt.id !== "none")
      lines.push(`Card: ${cardOpt.name}`);
    if (message.trim()) lines.push(`Message: "${message.trim()}"`);
    if (date) lines.push(`Deliver on: ${date}`);
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
    return lines;
  };

  const addToBasket = () => {
    if (itemCount === 0) {
      say("Add at least one item to your basket");
      setOpenGroup(ITEM_GROUPS[0].id);
      document
        .getElementById("fill-it")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    add({
      key: `custom:${Date.now()}`,
      kind: "custom",
      name: `Custom ${sizeOpt.name} ${vesselOpt.name}`,
      price: total,
      image: null,
      details: buildLines(),
    });
    say("Your custom basket was added");
  };

  const today = new Date();
  const minDate = new Date(today.getTime() + 86400000)
    .toISOString()
    .slice(0, 10);

  return (
    <div className="grid lg:grid-cols-[1fr_23rem] gap-10 lg:gap-14 items-start">
      <div className="space-y-12">
        {/* ---------------- step 1 ---------------- */}
        <Step n={1} title="Choose your vessel" hint="What it all sits in.">
          <div className="u-stagger grid grid-cols-2 sm:grid-cols-3 gap-3">
            {VESSELS.map((v) => (
              <Tile
                key={v.id}
                active={vessel === v.id}
                onClick={() => setVessel(v.id)}
                title={v.name}
                sub={v.note}
              />
            ))}
          </div>
        </Step>

        {/* ---------------- step 2 ---------------- */}
        <Step
          n={2}
          title="Pick a size"
          hint={`The ${vesselOpt.name} is made in ${
            vesselSizes.length === 1 ? "one size" : "these sizes"
          } — we'll tell you if you overfill.`}
        >
          <div
            // Replays the cascade when a different vessel changes the choices.
            key={vessel}
            className="u-stagger grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {vesselSizes.map((s) => (
              <Tile
                key={s.id}
                active={sizeOpt.id === s.id}
                onClick={() => setSize(s.id)}
                title={s.name}
                sub={s.guide}
              />
            ))}
          </div>
        </Step>

        {/* ---------------- step 3 ---------------- */}
        <Step
          n={3}
          id="fill-it"
          title="Fill it up"
          hint={`Tick what goes inside. ${sizeOpt.name} fits about ${sizeOpt.guide}.`}
        >
          {overCapacity && (
            <p className="mb-4 flex items-start gap-2 rounded-xl bg-gold-100 border border-gold-300 px-4 py-3 text-[0.82rem] text-gold-700">
              <IconSparkle className="w-4 h-4 mt-0.5 shrink-0" />
              You&apos;ve picked {itemCount} items — more than a {sizeOpt.name}{" "}
              usually holds. Either size up, or we&apos;ll arrange it as best we
              can and message you.
            </p>
          )}

          <div className="space-y-3">
            {ITEM_GROUPS.map((g) => {
              const open = openGroup === g.id;
              const inGroup = g.items.reduce(
                (n, i) => n + (picked[i.id] ?? 0),
                0
              );
              return (
                <div
                  key={g.id}
                  className="rounded-2xl border border-gold-200 bg-cream-50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenGroup(open ? "" : g.id)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span>
                      <b className="font-display text-lg text-forest-900">
                        {g.name}
                      </b>
                      {inGroup > 0 && (
                        <span className="u-press u-sheen ml-2.5 rounded-full bg-forest-800 text-cream-50 px-2 py-0.5 text-[0.66rem] font-semibold">
                          {inGroup}
                        </span>
                      )}
                      <span className="block text-[0.76rem] text-muted mt-0.5">
                        {g.hint}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className={cx(
                        "w-4 h-4 shrink-0 text-gold-600 transition-transform duration-300",
                        open && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    className={cx(
                      "grid transition-all duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="px-3 pb-3 grid sm:grid-cols-2 gap-1.5">
                        {g.items.map((i) => {
                          const qty = picked[i.id] ?? 0;
                          return (
                            <li
                              key={i.id}
                              className={cx(
                                "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors",
                                qty > 0 ? "bg-forest-100" : "hover:bg-cream-200"
                              )}
                            >
                              <button
                                onClick={() => bump(i.id, qty > 0 ? -qty : 1)}
                                className="flex items-center gap-2.5 text-left flex-1 min-w-0"
                              >
                                <span
                                  className={cx(
                                    "grid place-items-center w-5 h-5 rounded-md border shrink-0 transition-colors",
                                    qty > 0
                                      ? "bg-forest-700 border-forest-700 text-cream-50"
                                      : "border-gold-400"
                                  )}
                                >
                                  {qty > 0 && (
                                    <IconCheck className="w-3 h-3" />
                                  )}
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[0.86rem] text-forest-900 truncate">
                                    {i.name}
                                  </span>
                                  <span className="block text-[0.72rem] text-muted tabular-nums">
                                    {money(i.price)}
                                  </span>
                                </span>
                              </button>

                              {qty > 0 && (
                                <span className="inline-flex items-center rounded-full border border-gold-300 bg-cream-50 shrink-0">
                                  <button
                                    onClick={() => bump(i.id, -1)}
                                    aria-label={`One fewer ${i.name}`}
                                    className="w-7 h-7 grid place-items-center text-forest-800 hover:text-gold-700"
                                  >
                                    −
                                  </button>
                                  <span className="w-5 text-center text-[0.78rem] tabular-nums">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={() => bump(i.id, 1)}
                                    aria-label={`One more ${i.name}`}
                                    className="w-7 h-7 grid place-items-center text-forest-800 hover:text-gold-700"
                                  >
                                    +
                                  </button>
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Step>

        {/* ---------------- step 4 ---------------- */}
        <Step n={4} title="Add a card" hint="We'll handwrite your message.">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CARDS.map((c) => (
              <Tile
                key={c.id}
                active={card === c.id}
                onClick={() => setCard(c.id)}
                title={c.name}
                price={c.price}
              />
            ))}
          </div>
          {card !== "none" && (
            <label className="block mt-4">
              <span className="text-sm font-medium text-forest-900">
                Message on the card
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 220))}
                rows={3}
                placeholder="Happy birthday, Ayesha — hope this year is your best one yet."
                className="mt-2 w-full rounded-xl border border-gold-300 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-forest-600 transition-colors resize-none"
              />
              <span className="block text-right text-[0.7rem] text-muted mt-1 tabular-nums">
                {message.length}/220
              </span>
            </label>
          )}
        </Step>

        {/* ---------------- step 5 ---------------- */}
        <Step
          n={5}
          title="When & anything else"
          hint="Optional, but it helps us plan."
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-forest-900">
                Preferred delivery date
              </span>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gold-300 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-forest-600 transition-colors"
              />
            </label>
            <label className="block sm:row-span-2">
              <span className="text-sm font-medium text-forest-900">
                Special instructions
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 400))}
                rows={4}
                placeholder="Colour preferences, allergies, a theme to follow, surprise delivery…"
                className="mt-2 w-full rounded-xl border border-gold-300 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-forest-600 transition-colors resize-none"
              />
            </label>
          </div>
          <p className="mt-4 text-[0.78rem] text-muted">
            Note: we don&apos;t dispatch meltable items (chocolate, candles)
            outside Rawalpindi/Islamabad in peak summer — they don&apos;t
            survive transit. We&apos;ll suggest a swap if that affects your
            basket.
          </p>
        </Step>
      </div>

      {/* ---------------- summary ---------------- */}
      <aside className="lg:sticky lg:top-28">
        <div className="rounded-2xl border border-gold-200 bg-cream-50 overflow-hidden">
          <div className="px-5 py-4 border-b border-gold-200 bg-forest-900 text-cream-50">
            <h2 className="font-display text-xl text-cream-50 flex items-center gap-2">
              <IconGift className="w-5 h-5 text-gold-300" />
              Your basket
            </h2>
            <p className="text-[0.72rem] text-cream-200/65 mt-0.5">
              {itemCount} {itemCount === 1 ? "item" : "items"} ·{" "}
              {sizeOpt.name} {vesselOpt.name}
            </p>
          </div>

          <div className="px-5 py-4 space-y-2 max-h-[22rem] overflow-y-auto u-scroll">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[0.82rem] text-muted">
                {vesselOpt.name} · {sizeOpt.name}
              </span>
              <span className="text-[0.82rem] text-gold-700">Included</span>
            </div>

            {itemCount === 0 ? (
              <p className="py-4 text-center text-[0.82rem] text-muted">
                Nothing inside yet — pick a few items above.
              </p>
            ) : (
              <>
                <div className="pt-2 mt-2 border-t border-gold-200/70" />
                {Object.entries(picked).map(([id, qty]) => (
                  <div
                    key={id}
                    className="flex items-start justify-between gap-2 group"
                  >
                    <span className="text-[0.82rem] text-muted flex-1 min-w-0">
                      {ALL_ITEMS[id].name}
                      {qty > 1 && (
                        <b className="text-forest-800"> ×{qty}</b>
                      )}
                    </span>
                    <span className="text-[0.82rem] tabular-nums text-forest-900">
                      {money(ALL_ITEMS[id].price * qty)}
                    </span>
                    <button
                      onClick={() => bump(id, -qty)}
                      aria-label={`Remove ${ALL_ITEMS[id].name}`}
                      className="text-muted hover:text-forest-900 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    >
                      <IconX className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </>
            )}

            {cardOpt.id !== "none" && (
              <>
                <div className="pt-2 mt-2 border-t border-gold-200/70" />
                <Row label={`Card — ${cardOpt.name}`} value={cardOpt.price} />
              </>
            )}
          </div>

          <div className="px-5 py-4 border-t border-gold-200 bg-cream-100">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-2xl text-forest-900 tabular-nums">
                {money(total)}
              </span>
            </div>
            <p className="text-[0.7rem] text-muted mt-0.5">
              Vessel included · delivery {CONFIG.delivery.quotedLabel.toLowerCase()}
            </p>

            <button
              onClick={addToBasket}
              className="u-press u-sheen mt-4 w-full rounded-full bg-forest-800 text-cream-50 py-3.5 font-medium hover:bg-forest-700 transition-colors"
            >
              Add to basket
            </button>
            <IgOrderButton
              className="mt-2 w-full text-sm"
              label="Send to Instagram instead"
              text={`Hi! I built a custom basket:\n\n${buildLines().join(
                "\n"
              )}\n\nTotal: ${money(total)}`}
            />
            <p className="mt-3 text-center text-[0.7rem] text-muted">
              Not sure?{" "}
              <Link
                href="/shop"
                className="underline underline-offset-2 decoration-gold-400 hover:text-forest-800"
              >
                Browse ready-made boxes
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <FulfilmentNote compact />
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[0.82rem] text-muted">{label}</span>
      <span className="text-[0.82rem] tabular-nums text-forest-900">
        {money(value)}
      </span>
    </div>
  );
}

function Step({
  n,
  title,
  hint,
  children,
  id,
}: {
  n: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <header className="flex items-start gap-3.5 mb-5">
        <span className="u-press u-sheen grid place-items-center w-9 h-9 shrink-0 rounded-full bg-forest-800 text-cream-50 font-display text-sm">
          {n}
        </span>
        <div>
          <h2 className="font-display text-2xl leading-tight">{title}</h2>
          {hint && <p className="text-[0.82rem] text-muted mt-0.5">{hint}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Tile({
  active,
  onClick,
  title,
  sub,
  price,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub?: string;
  /** Omitted for vessels and sizes — those are included in the final quote. */
  price?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "u-press relative rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-forest-700 bg-forest-100 shadow-[0_0_0_1px_var(--color-forest-700)]"
          : "border-gold-200 bg-cream-50 hover:border-gold-400"
      )}
    >
      {active && (
        <span className="absolute top-3 right-3 grid place-items-center w-5 h-5 rounded-full bg-forest-700 text-cream-50">
          <IconCheck className="w-3 h-3" />
        </span>
      )}
      <b className="block text-[0.92rem] font-medium text-forest-900 pr-6">
        {title}
      </b>
      {sub && (
        <span className="block text-[0.72rem] text-muted mt-0.5">{sub}</span>
      )}
      {price !== undefined && (
        <span className="block text-[0.78rem] text-gold-700 mt-1.5 tabular-nums">
          {price === 0 ? "Free" : `+ ${money(price)}`}
        </span>
      )}
    </button>
  );
}
