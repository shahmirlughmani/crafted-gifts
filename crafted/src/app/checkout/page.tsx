import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order — pay by bank transfer and upload your receipt.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="u-wrap pt-10 pb-24">
      <Checkout />
    </div>
  );
}
