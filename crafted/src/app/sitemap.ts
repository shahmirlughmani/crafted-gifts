import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { CONFIG } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CONFIG.brand.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/shop`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/customize`, lastModified: now, priority: 0.9 },
    { url: `${base}/about`, lastModified: now, priority: 0.5 },
    { url: `${base}/faq`, lastModified: now, priority: 0.5 },
    ...CATEGORIES.map((c) => ({
      url: `${base}/shop/${c.id}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${base}/product/${p.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
