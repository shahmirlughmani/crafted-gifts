"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/format";

export function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[];
  name: string;
  badge?: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div>
      <div
        className={cx(
          "relative aspect-square rounded-[1.5rem] overflow-hidden bg-cream-200 shadow-[0_30px_60px_-40px_rgba(31,51,36,.5)]",
          images.length > 1 || zoom ? "cursor-zoom-in" : ""
        )}
        onClick={() => setZoom((z) => !z)}
      >
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(min-width:1024px) 55vw, 100vw"
          className={cx(
            "object-cover transition-transform duration-700 ease-out",
            zoom ? "scale-[1.6]" : "scale-100"
          )}
        />
        {badge && (
          <span className="absolute top-4 left-4 rounded-full bg-cream-50/95 backdrop-blur-sm px-3.5 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-gold-700 shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => {
                setActive(i);
                setZoom(false);
              }}
              aria-label={`View image ${i + 1} of ${name}`}
              className={cx(
                "relative w-20 h-20 rounded-xl overflow-hidden bg-cream-200 ring-2 transition-all",
                i === active
                  ? "ring-forest-700"
                  : "ring-transparent hover:ring-gold-300"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
