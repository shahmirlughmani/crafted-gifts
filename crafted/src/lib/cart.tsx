"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS } from "@/data/products";

export type CartLine = {
  key: string;
  kind: "product" | "custom";
  name: string;
  price: number;
  qty: number;
  image: string | null;
  slug?: string;
  /** For custom baskets: the human-readable build. */
  details?: string[];
};

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** null = charged separately, quoted on WhatsApp once the order is confirmed. */
  delivery: number | null;
  total: number;
  ready: boolean;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  addProduct: (slug: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** wishlist */
  saved: string[];
  toggleSaved: (slug: string) => void;
  toast: string | null;
  say: (msg: string) => void;
};

const Ctx = createContext<CartState | null>(null);
const KEY = "cgb.cart.v2";
const SAVED_KEY = "cgb.saved.v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
      const s = localStorage.getItem(SAVED_KEY);
      if (s) setSaved(JSON.parse(s));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {}
  }, [saved, ready]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const say = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 2600);
  }, []);

  const add: CartState["add"] = useCallback(
    (line, qty = 1) => {
      setLines((prev) => {
        const i = prev.findIndex((l) => l.key === line.key);
        if (i > -1) {
          const next = [...prev];
          next[i] = { ...next[i], qty: Math.min(99, next[i].qty + qty) };
          return next;
        }
        return [...prev, { ...line, qty }];
      });
      setOpen(true);
    },
    []
  );

  const addProduct: CartState["addProduct"] = useCallback(
    (slug, qty = 1) => {
      const p = PRODUCTS.find((x) => x.slug === slug);
      if (!p) return;
      add(
        {
          key: `p:${p.slug}`,
          kind: "product",
          name: p.name,
          price: p.price,
          image: p.image,
          slug: p.slug,
        },
        qty
      );
    },
    [add]
  );

  const setQty: CartState["setQty"] = useCallback((key, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(99, qty) } : l))
    );
  }, []);

  const remove: CartState["remove"] = useCallback(
    (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
    []
  );

  const clear = useCallback(() => setLines([]), []);

  const toggleSaved = useCallback((slug: string) => {
    setSaved((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const value = useMemo<CartState>(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    // Delivery is no longer a flat fee — it depends on the address and is
    // quoted on WhatsApp after confirmation, so it never enters the total.
    const delivery = null;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      delivery,
      total: subtotal,
      ready,
      add,
      addProduct,
      setQty,
      remove,
      clear,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      saved,
      toggleSaved,
      toast,
      say,
    };
  }, [
    lines,
    ready,
    add,
    addProduct,
    setQty,
    remove,
    clear,
    isOpen,
    saved,
    toggleSaved,
    toast,
    say,
  ]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
