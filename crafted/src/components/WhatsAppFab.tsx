"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/config";
import { IconWhatsApp } from "./Icons";
import { cx } from "@/lib/format";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <a
      href={waLink("Hi! I'd like to ask about a gift 🎁")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cx(
        "fixed z-[100] bottom-5 right-5 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,.6)] transition-all duration-300 hover:scale-105",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <IconWhatsApp className="w-7 h-7" />
    </a>
  );
}
