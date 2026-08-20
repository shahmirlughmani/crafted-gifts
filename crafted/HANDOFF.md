# Project handoff — Crafted Gifts by S

Read this first. It's the state of the project as of the last commit.

## What this is

The storefront for Crafted Gifts by S — a handmade gift studio in E-11,
Islamabad run by Shahmir. Sells crochet pieces, plushies, and curated gift
baskets. Replaces an older single-file HTML site.

**Live:** https://crafted-giftss.vercel.app
**Repo:** github.com/shahmirlughmani/crafted-gifts (the app is in the
`crafted/` subfolder — Vercel's Root Directory is set to `crafted`)

## Stack

Next.js 16 (App Router) + Tailwind v4 + TypeScript. Fully statically
generated — no database, no server. Deploys on `git push` to `main`.

Fonts are self-hosted in `src/fonts/` (Playfair Display, Manrope, Parisienne)
rather than pulled from Google Fonts.

## Brand

Taken from the studio's real logo — a forest-green script wordmark with a gold
botanical wreath on warm cream. Palette tokens are in `src/app/globals.css`:
`--color-forest-*`, `--color-gold-*`, `--color-cream-*`.

> The original site used navy and gold. That was off-brand and was deliberately
> replaced. Don't reintroduce navy.

**One gotcha:** base element styles (`h1`–`h4` etc.) live inside `@layer base`
in `globals.css`. They must stay there — unlayered CSS outranks every Tailwind
utility, which silently breaks `text-cream-50` on dark sections.

## Where things live

| What | File |
|---|---|
| Payment, WhatsApp, Instagram, pickup wording, delivery rules | `src/lib/config.ts` |
| All 49 products | `src/data/products.ts` |
| Gift customizer options and prices | `src/data/customizer.ts` |
| Product photos | `public/baskets`, `public/crochet`, `public/products` |

`src/data/products.ts` has three arrays that merge into `PRODUCTS`:

- `BASKETS` — 19 current baskets and boxes (`b1`–`b19`)
- `LEGACY` — 15 boxes from the original site (`l1`–`l15`)
- `HANDMADE` — 15 crochet and plushie pieces (`h1`–`h15`)

## Categories

Five: `for-him`, `for-her`, `crochet`, `plushies`, `cakes`.

A product can belong to more than one. Plushies and Cakes are intentionally
empty and render a "coming soon" state driven by the `comingSoon` field on the
category — the owner will add products later.

There are deliberately **no occasion or price-band filters**. The owner asked
for these to be removed: the baskets aren't fixed products, so grouping them
that way misrepresents the business. Don't add them back.

## Orders

Checkout POSTs to a Google Apps Script Web App (URL in `config.ts`), which
writes a row to the owner's Google Sheet and saves the payment screenshot to
Drive. Same backend as the old site — deliberately unchanged.

Payment is **NayaPay — Saba Khan, 0327-5023235**. The customer transfers, then
uploads a screenshot at checkout. Cash on delivery is also offered, and a
"send this order to WhatsApp" path exists on product pages and at checkout.

Prices come from the client, so they can be tampered with. Acceptable for now
given every order is confirmed manually on WhatsApp before it's made, but
worth flagging if the business grows.

## Still outstanding

1. **31 products have placeholder prices.** Everything with
   `pricePending: true` shows a "Price to be confirmed" badge — all 19 baskets
   and all 15 crochet pieces except where noted. The 15 `LEGACY` boxes have
   real prices. Getting real numbers from the owner is the last thing blocking
   real sales.
2. **3 basket photos never uploaded** — a black box with a burnt-paper letter,
   a pink anniversary basket with a penguin plushie, and a Dove Eid basket in
   dark wicker. The owner wants these added to For Her.
3. **Contents lists were written from the photos**, not from the owner. Some
   items are guesses (the Gym Essentials Box especially). Worth a review pass.
4. **The Vercel project is named `crafted-giftss`** — double S, likely a typo.
   Renaming it changes the public URL, so `CONFIG.brand.url` would need
   updating too.
5. Product pages still route orders through WhatsApp, but the floating contact
   button was changed to an Instagram DM. The owner hasn't said whether the
   rest should move to Instagram too.

## Working with the owner

He communicates in a mix of English, Urdu and Pashto, often in short bursts,
sometimes forwarding requirements from his partner. Two things that help:

- **Confirm before destructive changes.** "I need only these 15, remove rest"
  meant replace, and 15 products got deleted that he wanted back. Ask.
- **Check uploads actually landed on disk** before saying you have them. His
  iCloud storage is full, so images frequently appear in the chat while the
  files never arrive. `ls` the upload directory and count.
