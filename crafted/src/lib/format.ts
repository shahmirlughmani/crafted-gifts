import { CONFIG } from "./config";

export const money = (n: number) =>
  `${CONFIG.currency} ${Math.round(n).toLocaleString("en-PK")}`;

export const moneyShort = (n: number) =>
  n >= 1000 ? `${CONFIG.currency} ${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : money(n);

export const orderId = () =>
  "CGB-" +
  Date.now().toString(36).toUpperCase().slice(-6) +
  "-" +
  Math.random().toString(36).slice(2, 5).toUpperCase();

export const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
