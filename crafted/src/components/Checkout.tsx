"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { CONFIG } from "@/lib/config";
import { money, orderId as newOrderId, cx } from "@/lib/format";
import {
  IconCheck,
  IconCopy,
  IconGift,
  IconUpload,
  IconInstagram,
  IconX,
  IconPin,
} from "./Icons";
import { IgOrderButton } from "./IgOrderButton";

type Fields = {
  name: string;
  phone: string;
  city: string;
  address: string;
  note: string;
};

const EMPTY: Fields = { name: "", phone: "", city: "", address: "", note: "" };
const MAX_MB = 5;

export function Checkout() {
  const { lines, subtotal, delivery, total, clear, say, count } = useCart();

  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "shot", string>>>({});
  const [shot, setShot] = useState<{ data: string; name: string } | null>(null);
  const [method, setMethod] = useState<"transfer" | "cod">("transfer");
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Fields) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((e) => ({ ...e, shot: "That file isn't an image" }));
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, shot: `Image is over ${MAX_MB} MB` }));
      return;
    }
    const r = new FileReader();
    r.onload = () => {
      setShot({ data: String(r.result), name: file.name });
      setErrors((e) => ({ ...e, shot: undefined }));
    };
    r.readAsDataURL(file);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!f.name.trim()) e.name = "We need a name for the order";
    if (!/^0?3\d{2}[-\s]?\d{7}$/.test(f.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Pakistani mobile number";
    if (!f.city.trim()) e.city = "Which city?";
    if (!f.address.trim()) e.address = "We need a delivery address";
    if (method === "transfer" && !shot)
      e.shot = "Upload your payment screenshot";
    setErrors(e);
    if (Object.keys(e).length) {
      document
        .querySelector("[data-invalid='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const orderText = (id: string) =>
    [
      `Order ${id}`,
      "",
      ...lines.map(
        (l) =>
          `• ${l.name} ×${l.qty} — ${money(l.price * l.qty)}${
            l.details ? `\n   (${l.details.join(" · ")})` : ""
          }`
      ),
      "",
      `Subtotal: ${money(subtotal)}`,
      `Delivery: ${
        delivery === null ? CONFIG.delivery.quotedLabel : money(delivery)
      }`,
      `Total: ${money(total)}`,
      "",
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `City: ${f.city}`,
      `Address: ${f.address}`,
      f.note ? `Note: ${f.note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const place = async () => {
    if (!validate()) return;
    const id = newOrderId();
    setBusy(true);

    const payload = {
      orderId: id,
      timestamp: new Date().toISOString(),
      customer: { ...f },
      items: lines.map((l) => ({
        name: l.name,
        price: l.price,
        qty: l.qty,
        details: l.details ?? [],
      })),
      itemsText: lines
        .map(
          (l) =>
            `${l.name} x${l.qty}${
              l.details?.length ? ` [${l.details.join(" | ")}]` : ""
            }`
        )
        .join(", "),
      subtotal,
      delivery,
      total,
      paymentMethod:
        method === "transfer" ? CONFIG.payment.method : "Cash on delivery",
      screenshot: shot?.data ?? "",
      screenshotName: shot?.name ?? "",
      status: method === "transfer" ? "Pending Verification" : "COD — Unpaid",
    };

    try {
      await fetch(CONFIG.scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setPlaced(id);
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setBusy(false);
      say("Couldn't reach us — try Instagram instead");
    }
  };

  /* ------------------------------ success ------------------------------ */
  if (placed) {
    return (
      <div className="max-w-lg mx-auto text-center py-10">
        <span className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-forest-700 text-cream-50">
          <IconCheck className="w-8 h-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl">Thank you — order placed</h1>
        <p className="mt-3 text-muted">
          We&apos;ve got everything. Your order number is
        </p>
        <p className="mt-3 inline-block rounded-full border border-gold-300 bg-cream-50 px-5 py-2 font-mono text-sm tracking-wider text-forest-900">
          {placed}
        </p>
        <p className="mt-5 text-sm text-muted leading-relaxed">
          {method === "transfer"
            ? `We'll verify your ${CONFIG.payment.method} payment and confirm with you shortly.`
            : "We'll confirm your order with you shortly."}{" "}
          {CONFIG.fulfilment.readyIn}.
        </p>

        <a
          href={CONFIG.contact.instagramDm}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full text-white px-7 py-3.5 font-medium transition hover:brightness-110"
          style={{
            background:
              "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
          }}
        >
          <IconInstagram className="w-5 h-5" />
          Message us on Instagram
        </a>

        <div className="mt-8 pt-8 border-t border-gold-200">
          <Link
            href="/shop"
            className="text-sm text-forest-800 border-b border-gold-400 pb-0.5 hover:text-gold-700"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------- empty ------------------------------- */
  if (count === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <IconGift className="w-16 h-16 mx-auto text-gold-400" />
        <h1 className="mt-6 font-display text-3xl">Your basket is empty</h1>
        <p className="mt-3 text-muted">
          Add something you love, then come back here.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-forest-800 text-cream-50 px-7 py-3.5 font-medium hover:bg-forest-700 transition-colors"
          >
            Browse gifts
          </Link>
          <Link
            href="/customize"
            className="rounded-full border border-forest-800 px-7 py-3.5 font-medium hover:bg-forest-100 transition-colors"
          >
            Build your own
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------- form -------------------------------- */
  return (
    <>
      <header className="max-w-2xl">
        <p className="u-eyebrow">Almost there</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Checkout</h1>
      </header>

      <div className="mt-10 grid lg:grid-cols-[1fr_22rem] gap-10 lg:gap-14 items-start">
        <div className="space-y-10">
          {/* details */}
          <section>
            <h2 className="font-display text-2xl">Delivery details</h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Field
                label="Full name"
                value={f.name}
                onChange={set("name")}
                error={errors.name}
                placeholder="Ayesha Khan"
                autoComplete="name"
              />
              <Field
                label="Phone / WhatsApp"
                value={f.phone}
                onChange={set("phone")}
                error={errors.phone}
                placeholder="03XX-XXXXXXX"
                autoComplete="tel"
                inputMode="tel"
              />
              <Field
                label="City"
                value={f.city}
                onChange={set("city")}
                error={errors.city}
                placeholder="Islamabad"
                autoComplete="address-level2"
              />
              <Field
                label="Address"
                value={f.address}
                onChange={set("address")}
                error={errors.address}
                placeholder="House #, street, sector"
                autoComplete="street-address"
                className="sm:col-span-2"
                textarea
              />
              <Field
                label="Gift message or instructions (optional)"
                value={f.note}
                onChange={set("note")}
                placeholder="Please don't include the receipt — it's a gift."
                className="sm:col-span-2"
                textarea
              />
            </div>
            <p className="mt-4 flex items-start gap-2 text-[0.8rem] text-muted">
              <IconPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-600" />
              Collecting instead? Put &ldquo;Pickup&rdquo; as the address —{" "}
              {CONFIG.fulfilment.pickupLine.toLowerCase()}
            </p>
          </section>

          {/* payment */}
          <section>
            <h2 className="font-display text-2xl">Payment</h2>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => setMethod("transfer")}
                aria-pressed={method === "transfer"}
                className={cx(
                  "rounded-2xl border p-4 text-left transition-all",
                  method === "transfer"
                    ? "border-forest-700 bg-forest-100"
                    : "border-gold-200 bg-cream-50 hover:border-gold-400"
                )}
              >
                <b className="block text-[0.94rem] text-forest-900">
                  {CONFIG.payment.method} transfer
                </b>
                <span className="block text-[0.76rem] text-muted mt-0.5">
                  Send now, upload the screenshot
                </span>
              </button>
              <button
                onClick={() => setMethod("cod")}
                aria-pressed={method === "cod"}
                className={cx(
                  "rounded-2xl border p-4 text-left transition-all",
                  method === "cod"
                    ? "border-forest-700 bg-forest-100"
                    : "border-gold-200 bg-cream-50 hover:border-gold-400"
                )}
              >
                <b className="block text-[0.94rem] text-forest-900">
                  Cash on delivery
                </b>
                <span className="block text-[0.76rem] text-muted mt-0.5">
                  We&apos;ll confirm on WhatsApp first
                </span>
              </button>
            </div>

            {method === "transfer" && (
              <div className="mt-5 rounded-2xl border border-gold-300 bg-cream-50 p-5">
                <p className="u-eyebrow">Send exactly</p>
                <p className="font-display text-3xl text-forest-900 mt-1.5 tabular-nums">
                  {money(total)}
                </p>

                <dl className="mt-5 space-y-2.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Account title</dt>
                    <dd className="font-medium text-forest-900">
                      {CONFIG.payment.name}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <dt className="text-muted">
                      {CONFIG.payment.method} number
                    </dt>
                    <dd>
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              CONFIG.payment.number
                            );
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          } catch {
                            say("Copy failed — long-press to copy");
                          }
                        }}
                        className="inline-flex items-center gap-2 font-medium text-forest-900 hover:text-gold-700 transition-colors"
                      >
                        {CONFIG.payment.number}
                        {copied ? (
                          <IconCheck className="w-4 h-4 text-forest-600" />
                        ) : (
                          <IconCopy className="w-4 h-4 text-gold-600" />
                        )}
                      </button>
                    </dd>
                  </div>
                </dl>

                {/* upload */}
                <div className="mt-5" data-invalid={!!errors.shot}>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                  {shot ? (
                    <div className="relative rounded-xl overflow-hidden border border-gold-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot.data}
                        alt="Payment screenshot preview"
                        className="w-full max-h-64 object-contain bg-cream-200"
                      />
                      <button
                        onClick={() => {
                          setShot(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        aria-label="Remove screenshot"
                        className="absolute top-2 right-2 grid place-items-center w-8 h-8 rounded-full bg-forest-950/70 text-cream-50 hover:bg-forest-950"
                      >
                        <IconX className="w-4 h-4" />
                      </button>
                      <p className="px-3 py-2 text-[0.74rem] text-muted bg-cream-50 flex items-center gap-1.5">
                        <IconCheck className="w-3.5 h-3.5 text-forest-600" />
                        {shot.name}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      className={cx(
                        "w-full rounded-xl border-2 border-dashed px-5 py-8 text-center transition-colors",
                        errors.shot
                          ? "border-red-400 bg-red-50/50"
                          : "border-gold-300 hover:border-forest-600 hover:bg-cream-100"
                      )}
                    >
                      <IconUpload className="w-7 h-7 mx-auto text-gold-600" />
                      <b className="block mt-2.5 text-[0.9rem] text-forest-900">
                        Upload payment screenshot
                      </b>
                      <span className="block text-[0.74rem] text-muted mt-0.5">
                        PNG or JPG, up to {MAX_MB} MB
                      </span>
                    </button>
                  )}
                  {errors.shot && (
                    <p className="mt-2 text-[0.78rem] text-red-600">
                      {errors.shot}
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-gold-200 bg-cream-50 overflow-hidden">
            <h2 className="font-display text-xl px-5 py-4 border-b border-gold-200">
              Order summary
            </h2>

            <ul className="px-5 py-4 space-y-4 max-h-80 overflow-y-auto u-scroll">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3">
                  <span className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-cream-200">
                    {l.image ? (
                      <Image
                        src={l.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <IconGift className="w-6 h-6 absolute inset-0 m-auto text-gold-500" />
                    )}
                    <span className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] px-1 grid place-items-center rounded-full bg-forest-800 text-cream-50 text-[0.6rem] font-semibold">
                      {l.qty}
                    </span>
                  </span>
                  <span className="flex-1 min-w-0">
                    <b className="block text-[0.85rem] font-medium text-forest-900 leading-snug">
                      {l.name}
                    </b>
                    {l.details && (
                      <span className="block text-[0.7rem] text-muted line-clamp-2">
                        {l.details.join(" · ")}
                      </span>
                    )}
                  </span>
                  <span className="text-[0.85rem] tabular-nums text-forest-900">
                    {money(l.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="px-5 py-4 border-t border-gold-200 space-y-2 bg-cream-100">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span className="tabular-nums">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Delivery</span>
                <span>
                  {delivery === null
                    ? CONFIG.delivery.quotedLabel
                    : money(delivery)}
                </span>
              </div>
              <div className="flex justify-between font-display text-xl text-forest-900 pt-2 border-t border-gold-200/70">
                <span>Total</span>
                <span className="tabular-nums">{money(total)}</span>
              </div>

              <button
                onClick={place}
                disabled={busy}
                className="mt-3 w-full rounded-full bg-forest-800 text-cream-50 py-3.5 font-medium hover:bg-forest-700 transition-colors disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
              >
                {busy && (
                  <span className="w-4 h-4 rounded-full border-2 border-cream-50/40 border-t-cream-50 animate-spin" />
                )}
                {busy ? "Placing your order…" : `Place order · ${money(total)}`}
              </button>

              <IgOrderButton
                className="w-full text-sm"
                label="Order on Instagram instead"
                text={orderText("(new)")}
              />

              <p className="text-[0.68rem] text-muted text-center pt-1 leading-relaxed">
                {CONFIG.delivery.localLine} · {CONFIG.delivery.outsideLine}.{" "}
                {CONFIG.delivery.chargeLine} {CONFIG.fulfilment.advanceLine}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  className,
  textarea,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  textarea?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email";
}) {
  const cls = cx(
    "mt-2 w-full rounded-xl border bg-cream-50 px-4 py-3 text-sm outline-none transition-colors",
    error
      ? "border-red-400 focus:border-red-500"
      : "border-gold-300 focus:border-forest-600"
  );
  return (
    <label className={cx("block", className)} data-invalid={!!error}>
      <span className="text-sm font-medium text-forest-900">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cx(cls, "resize-none")}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={cls}
        />
      )}
      {error && <span className="block mt-1.5 text-[0.78rem] text-red-600">{error}</span>}
    </label>
  );
}
