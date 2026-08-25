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
| Payment, WhatsApp, Instagram, pickup wording, delivery rules, cake lead time | `src/lib/config.ts` |
| All 72 products | `src/data/products.ts` |
| Gift builder vessels, items and prices | `src/data/customizer.ts` |
| Product photos | `public/baskets`, `public/crochet`, `public/products`, `public/cakes` |

`src/data/products.ts` has four arrays that merge into `PRODUCTS`:

- `LATEST` — 22 products added from the owner's own studio photography (`n1`–`n22`)
- `BASKETS` — 20 baskets and boxes (`b1`–`b20`)
- `LEGACY` — 15 boxes from the original site (`l1`–`l15`)
- `HANDMADE` — 15 crochet and plushie pieces (`h1`–`h15`)

> **The `b`/`l`/`n` ids are the safety net.** A gap in the sequence means a
> product was deleted. `b10` and `b13` went missing in commit `37c8a8a` and were
> only caught because their photos were still sitting unreferenced in
> `public/baskets`. Before committing a products change, check the id sequence
> and check that every `.webp` on disk is referenced.

## Categories

Five: `for-him`, `for-her`, `crochet`, `plushies`, `cakes`.

A product can belong to more than one. Every category now has products —
`comingSoon` on a category is the empty state and is currently unused. Cakes
carries a `note` (lead time and coverage area) that renders on the category
header and on every cake product page.

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

## Delivery

There is **no flat delivery fee**. Per the owner's *Choose Your Vessel* brief:

- Islamabad — within 3 days; outside Islamabad — within 6–7 days.
- Orders are confirmed only after full advance payment.
- The charge depends on the address and is quoted on WhatsApp after confirmation.

So `useCart().delivery` is `null` and `total === subtotal`. The cart and
checkout render "Quoted on WhatsApp" where the figure used to be. If a flat fee
ever comes back, that's the one place to change.

## Still outstanding

1. **45 products still have placeholder prices** (`pricePending: true` shows a
   "Price to be confirmed" badge). The owner's price list covered For Him, the
   four For Her baskets, the cakes and the plushies; the remaining baskets and
   most crochet pieces are still waiting on real numbers.
2. **Two products need a decision.** The owner's list names both `l6`
   (Rs. 23,500) and `l12` (Rs. 20,500) "Gentleman's Essentials Box". `l12` kept
   its old name, *Birthday Box*, to avoid the collision — ask him which is which.
   And the Pink Anniversary Basket (`n3`) is the one product in his list with no
   price against it.
3. **Vessel prices are missing.** The builder offers the six vessels and their
   sizes but prices none of them — the list gives sizes only. Right now the
   vessel shows as "Included" and the builder totals the contents and card. Get
   vessel prices and they slot straight into `VESSELS` in `customizer.ts`.
4. **Contents lists for the older baskets were written from the photos**, not
   from the owner. Some items are guesses (the Gym Essentials Box especially).
   Everything covered by his price list is now his own wording.
5. **The Vercel project is named `crafted-giftss`** — double S, likely a typo.
   Renaming it changes the public URL, so `CONFIG.brand.url` would need
   updating too.
6. Product pages still route orders through WhatsApp, but the floating contact
   button was changed to an Instagram DM. The owner hasn't said whether the
   rest should move to Instagram too.
7. **Photo resolution.** Every product photo taken from his Word document was
   extracted from an embedded image (~500–1100 px), so the cards are upscaled to
   the 1000×1000 house size and are softer than the older studio shots. Ask for
   the originals when he has them.

## Photo naming

- `<slug>.webp` — 1000×1000 card image
- `<slug>-full.webp` — the same shot uncropped, first thumbnail in the gallery
- `<slug>-catalogue.webp` / `-catalogue-full.webp` — the shot from the owner's
  *Choose Your Vessel* document. On the 14 products that already existed he asked
  for these to lead, so they are the `image` and the older studio photo drops
  into the gallery behind them.

## Working with the owner

He communicates in a mix of English, Urdu and Pashto, often in short bursts,
sometimes forwarding requirements from his partner. Two things that help:

- **Confirm before destructive changes.** "I need only these 15, remove rest"
  meant replace, and 15 products got deleted that he wanted back. Ask.
- **Check uploads actually landed on disk** before saying you have them. His
  iCloud storage is full, so images frequently appear in the chat while the
  files never arrive. `ls` the upload directory and count.
