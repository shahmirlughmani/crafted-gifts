"use client";

import { useState } from "react";
import { IconCheck } from "./Icons";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) return;
        setDone(true);
      }}
      className="mt-6"
    >
      <label
        htmlFor="nl"
        className="block text-[0.72rem] text-cream-200/60 mb-2"
      >
        New drops &amp; seasonal boxes — no spam.
      </label>
      {done ? (
        <p className="flex items-center gap-2 text-sm text-gold-200">
          <IconCheck className="w-4 h-4" /> You&apos;re on the list.
        </p>
      ) : (
        <div className="flex rounded-full border border-cream-200/25 overflow-hidden focus-within:border-gold-400 transition-colors">
          <input
            id="nl"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 bg-transparent px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-200/35 outline-none"
          />
          <button
            type="submit"
            className="px-4 text-[0.72rem] font-semibold uppercase tracking-wider text-gold-300 hover:text-gold-200 transition-colors"
          >
            Join
          </button>
        </div>
      )}
    </form>
  );
}
