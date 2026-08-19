import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout"] },
    sitemap: `${CONFIG.brand.url}/sitemap.xml`,
  };
}
