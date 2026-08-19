import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG, waLink } from "@/lib/config";
import { money } from "@/lib/format";
import { Accordion } from "@/components/Accordion";
import { FulfilmentNote } from "@/components/FulfilmentNote";
import { IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "FAQ, Delivery & Returns",
  description:
    "Delivery charges, pickup in E-11 Islamabad, urgent orders, payment by NayaPay, customisation and care instructions.",
};

const FAQS = [
  {
    q: "Where are you based, and can I collect?",
    a: `${CONFIG.fulfilment.pickupLine} ${CONFIG.fulfilment.readyIn} — we'll message you on WhatsApp when your order is ready and share the exact address then.`,
  },
  {
    q: "How much is delivery?",
    a: `Delivery is ${money(CONFIG.deliveryFee)} anywhere in Pakistan, and free on orders over ${money(CONFIG.freeDeliveryOver)}. Islamabad and Rawalpindi are usually next-day; other cities take 2–4 working days via courier.`,
  },
  {
    q: "I need it today — is that possible?",
    a: `${CONFIG.fulfilment.urgentLine} Message us on WhatsApp with what you need and when, and we'll tell you straight away whether we can make it and what the rush charge would be. Handmade crochet pieces need the most notice.`,
  },
  {
    q: "How do I pay?",
    a: `${CONFIG.payment.method} transfer to ${CONFIG.payment.name} (${CONFIG.payment.number}), or cash on delivery. For transfers, send the amount and upload a screenshot at checkout — we verify it and confirm on WhatsApp before anything is made.`,
  },
  {
    q: "Can I change what's inside a box?",
    a: "Yes. Swap an item, change a colour, add a plushie — message us before ordering and we'll confirm what's possible and any price difference. If you'd rather start from nothing, use the Build Your Own page and pick every item yourself.",
  },
  {
    q: "How long do crochet pieces take?",
    a: "Small pieces like keyrings and scrunchies are usually in stock or made same-day. A bouquet takes a full day, a shadow box takes about two. We'll always tell you the honest timeline before you pay.",
  },
  {
    q: "How do I look after crochet?",
    a: "Spot clean with a damp cloth and mild soap, reshape while damp, and air dry flat. Keep it out of direct sunlight so the colours stay true. Don't machine wash or tumble dry.",
  },
  {
    q: "Do you ship chocolates and candles?",
    a: "Within Rawalpindi and Islamabad, yes. Outside those cities during hot months we don't dispatch meltable items — they don't survive transit. We'll suggest a swap that travels well.",
  },
  {
    q: "Something's wrong with my order.",
    a: "Message us on WhatsApp with your order number and a photo within 48 hours of receiving it. If we got something wrong, we'll remake it or refund you.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="u-wrap pt-12 pb-20 grid lg:grid-cols-[1fr_20rem] gap-12 items-start">
        <div>
          <p className="u-eyebrow">Good to know</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            FAQ, delivery &amp; returns
          </h1>
          <p className="mt-4 text-muted max-w-xl leading-relaxed">
            Everything people ask us most. If your question isn&apos;t here,
            WhatsApp is the fastest way to get a real answer.
          </p>
          <div className="mt-9">
            <Accordion items={FAQS} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 space-y-4">
          <FulfilmentNote />
          <a
            href={waLink("Hi! I have a question about an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white py-3.5 font-medium hover:brightness-105 transition"
          >
            <IconWhatsApp className="w-5 h-5" />
            Ask on WhatsApp
          </a>
          <Link
            href="/shop"
            className="flex items-center justify-center rounded-full border border-forest-800 text-forest-900 py-3.5 font-medium hover:bg-forest-100 transition-colors"
          >
            Browse gifts
          </Link>
        </aside>
      </div>
    </>
  );
}
