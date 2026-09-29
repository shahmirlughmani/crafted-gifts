import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="u-wrap py-28 text-center">
      <LogoMark className="w-16 h-16 mx-auto text-forest-700" />
      <p className="u-eyebrow mt-6">404</p>
      <h1 className="mt-3 font-display text-4xl">We couldn&apos;t find that</h1>
      <p className="mt-3 text-muted">
        The page may have moved, or the gift may have sold out.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="u-press u-sheen rounded-full bg-forest-800 text-cream-50 px-7 py-3.5 font-medium hover:bg-forest-700 transition-colors">
          Browse all gifts
        </Link>
        <Link href="/" className="rounded-full border border-forest-800 px-7 py-3.5 font-medium hover:bg-forest-100 transition-colors">
          Back home
        </Link>
      </div>
    </div>
  );
}
