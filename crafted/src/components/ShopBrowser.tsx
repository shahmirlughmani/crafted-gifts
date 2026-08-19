"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { IconSearch, IconX } from "./Icons";
import { cx, money } from "@/lib/format";

type Sort = "featured" | "low" | "high" | "az";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
  { id: "az", label: "A – Z" },
];

const ALL_OCCASIONS = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.occasions ?? []))
).sort();

export function ShopBrowser({ fixedCategory }: { fixedCategory?: CategoryId }) {
  const sp = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">(fixedCategory ?? "all");
  const [occasion, setOccasion] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const o = sp.get("occasion");
    if (o) setOccasion(o);
    const c = sp.get("category");
    if (!fixedCategory && c) setCat(c as CategoryId);
  }, [sp, fixedCategory]);

  const results = useMemo(() => {
    let list = [...PRODUCTS];
    if (cat !== "all") list = list.filter((p) => p.categories.includes(cat));
    if (occasion)
      list = list.filter((p) => (p.occasions ?? []).includes(occasion));
    if (maxPrice) list = list.filter((p) => p.price <= maxPrice);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.summary.toLowerCase().includes(needle) ||
          p.contents.some((c) => c.toLowerCase().includes(needle))
      );
    }
    switch (sort) {
      case "low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "az":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort(
          (a, b) => Number(!!b.featured) - Number(!!a.featured)
        );
    }
    return list;
  }, [cat, occasion, q, sort, maxPrice]);

  const hasFilters =
    q.trim() !== "" ||
    occasion !== null ||
    maxPrice !== null ||
    (!fixedCategory && cat !== "all");

  const reset = () => {
    setQ("");
    setOccasion(null);
    setMaxPrice(null);
    if (!fixedCategory) setCat("all");
  };

  return (
    <>
      {/* controls */}
      <div className="sticky top-[3.9rem] z-30 -mx-5 px-5 md:-mx-8 md:px-8 py-3 bg-cream-100/92 backdrop-blur-md border-b border-gold-200/70">
        <div className="flex flex-wrap items-center gap-2.5">
          <label className="relative flex-1 min-w-[12rem]">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <span className="sr-only">Search gifts</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search gifts, or what's inside…"
              className="w-full rounded-full border border-gold-300 bg-cream-50 pl-10 pr-9 py-2.5 text-sm outline-none focus:border-forest-600 transition-colors"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-forest-800"
              >
                <IconX className="w-4 h-4" />
              </button>
            )}
          </label>

          <label className="relative">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="appearance-none rounded-full border border-gold-300 bg-cream-50 pl-4 pr-9 py-2.5 text-sm outline-none focus:border-forest-600 cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>
        </div>

        {/* chips */}
        <div className="mt-2.5 flex gap-2 overflow-x-auto u-scroll pb-1 -mb-1">
          {!fixedCategory && (
            <>
              <Chip active={cat === "all"} onClick={() => setCat("all")}>
                All
              </Chip>
              {CATEGORIES.map((c) => (
                <Chip
                  key={c.id}
                  active={cat === c.id}
                  onClick={() => setCat(c.id)}
                >
                  {c.name}
                </Chip>
              ))}
              <span className="w-px bg-gold-200 shrink-0 mx-1" />
            </>
          )}
          {[5000, 10000, 20000].map((p) => (
            <Chip
              key={p}
              active={maxPrice === p}
              onClick={() => setMaxPrice(maxPrice === p ? null : p)}
            >
              Under {money(p)}
            </Chip>
          ))}
          {ALL_OCCASIONS.map((o) => (
            <Chip
              key={o}
              active={occasion === o}
              onClick={() => setOccasion(occasion === o ? null : o)}
            >
              {o}
            </Chip>
          ))}
        </div>
      </div>

      {/* meta row */}
      <div className="flex items-center justify-between gap-4 pt-6 pb-1">
        <p className="text-sm text-muted">
          <b className="text-forest-900">{results.length}</b>{" "}
          {results.length === 1 ? "gift" : "gifts"}
          {occasion && <> for {occasion}</>}
        </p>
        {hasFilters && (
          <button
            onClick={reset}
            className="text-sm text-muted hover:text-forest-800 underline underline-offset-4 decoration-gold-400"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl text-forest-900">
            Nothing matches that
          </p>
          <p className="mt-2 text-muted text-sm">
            Try a different search — or we can make it for you.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={reset}
              className="rounded-full border border-forest-800 px-6 py-3 text-sm font-medium hover:bg-forest-100 transition-colors"
            >
              Clear filters
            </button>
            <Link
              href="/customize"
              className="rounded-full bg-forest-800 text-cream-50 px-6 py-3 text-sm font-medium hover:bg-forest-700 transition-colors"
            >
              Build your own
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-x-7">
          {results.map((p, i) => (
            <ProductCard key={p.id} p={p} priority={i < 4} />
          ))}
        </div>
      )}
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "shrink-0 rounded-full border px-4 py-1.5 text-[0.78rem] whitespace-nowrap transition-colors",
        active
          ? "bg-forest-800 border-forest-800 text-cream-50"
          : "bg-cream-50 border-gold-300 text-forest-800 hover:border-forest-600"
      )}
    >
      {children}
    </button>
  );
}
