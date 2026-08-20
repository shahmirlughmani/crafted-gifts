import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { money } from "@/lib/format";
import { Accordion } from "@/components/Accordion";
import { FulfilmentNote } from "@/components/FulfilmentNote";
import { IconInstagram } from "@/components/Icons";

export const metadata: Metadata = {
  title: "FAQ, Delivery & Returns",
  description:
    "Delivery charges, pickup in E-11 Islamabad, urgent orders, payment by NayaPay and customisation.",
};

const FAQS = [
  {
    q: "Where are you based, and can I collect?",
    a: `${CONFIG.fulfilment.pickupLine} ${CONFIG.fulfilment.readyIn} — we'll message you when your order is ready and share the exact address then.`,
  },
  {
    q: "How much is delivery?",
    a: `${money(CONFIG.delivery.localFee)} flat within ${CONFIG.delivery.localAreas}, sent by inDrive. ${CONFIG.delivery.outsideLine}`,
  },
  {
    q: "I need it sooner — is that possible?",
    a: "Sometimes. It depends on how many orders are already in the queue and which city you're in, so there's no fixed answer — message us with your date and we'll tell you straight away whether we can make it and what it would cost. Handmade crochet pieces need the most notice.",
  },
  {
    q: "How do I pay?",
    a: `${CONFIG.payment.method} transfer to ${CONFIG.payment.name} (${CONFIG.payment.number}), or cash on delivery. For transfers, send the amount and upload a screenshot at checkout — we verify it and confirm before anything is made.`,
  },
  {
    q: "Can I change what's inside a box?",
    a: "Yes. Swap an item, change a colour, add a plushie — message us before ordering and we'll confirm what's possible and any price difference. If you'd rather start from nothing, use the Build Your Own page and pick every item yourself.",
  },
  {
    q: "How long do crochet pieces take?",
    a: `Everything is made to order — ${CONFIG.fulfilment.readyIn.toLowerCase()}. Larger pieces like bouquets and shadow boxes sit at the longer end of that. We'll always tell you the honest timeline before you pay.`,
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
            Everything people ask us most. If your question isn&apos;t here, our
            Instagram DMs are the fastest way to get a real answer.
          </p>
          <div className="mt-9">
            <Accordion items={FAQS} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 space-y-4">
          <FulfilmentNote />
          <a
            href={CONFIG.contact.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full py-3.5 font-medium text-white transition hover:brightness-110"
            style={{
              background:
                "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            }}
          >
            <IconInstagram className="w-5 h-5" />
            Ask on Instagram
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
