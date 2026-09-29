"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";
import { IG_GRADIENT, IconInstagram } from "./Icons";
import { cx } from "@/lib/format";

/** Floating "DM us on Instagram" button — opens a direct message thread. */
export function InstagramFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <a
      href={CONFIG.contact.instagramDm}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Send us a DM on Instagram"
      className={cx(
        "group fixed z-[100] bottom-5 right-5 flex items-center gap-0 overflow-hidden rounded-full text-white shadow-[0_10px_30px_-8px_rgba(193,53,132,.65)] transition-all duration-300 hover:scale-[1.03]",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
      style={{
        background:
          IG_GRADIENT,
      }}
    >
      <span className="grid place-items-center w-14 h-14 shrink-0">
        <IconInstagram className="w-7 h-7" />
      </span>
      <span className="max-w-0 group-hover:max-w-[9rem] group-focus-visible:max-w-[9rem] transition-[max-width] duration-400 ease-out whitespace-nowrap text-sm font-medium">
        <span className="pr-5">DM us on Instagram</span>
      </span>
    </a>
  );
}
