import type { Metadata } from "next";
import { Customizer } from "@/components/Customizer";

export const metadata: Metadata = {
  title: "Build Your Own Gift Basket",
  description:
    "Design a gift basket from scratch — choose the vessel, size and every item inside, add a card and a message. Live pricing, no surprises.",
};

export default function CustomizePage() {
  return (
    <div className="u-wrap pt-10 pb-24">
      <header className="max-w-2xl">
        <p className="u-eyebrow">Made exactly your way</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.05]">
          Build your own
          <span className="font-script text-gold-600 block text-[1.1em] leading-[1.25] mt-1">
            gift basket
          </span>
        </h1>
        <p className="mt-5 text-muted leading-relaxed">
          Pick the vessel, choose a size, then tick exactly what goes inside.
          The total updates as you go, so you always know what the contents cost — only delivery is quoted afterwards. Add a card and
          we&apos;ll handwrite your message.
        </p>
      </header>

      <div className="mt-12">
        <Customizer />
      </div>
    </div>
  );
}
