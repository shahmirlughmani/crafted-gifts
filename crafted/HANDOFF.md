# Project handoff — Crafted Gifts by S

Read this first. It's the state of the project as of the last commit
(refreshed 9 Nov 2026).

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
| All 77 products | `src/data/products.ts` |
| Gift builder vessels, items and prices | `src/data/customizer.ts` |
| Product photos | `public/baskets`, `public/crochet`, `public/products`, `public/cakes` |

`src/data/products.ts` has four arrays that merge into `PRODUCTS`:

- `LATEST` — 42 products from the owner's own studio photography (`n1`–`n42`)
- `BASKETS` — 10 baskets and boxes (`b2`–`b5`, `b11`, `b15`, `b17`–`b20`)
- `LEGACY` — 10 boxes from the original site (`l5`–`l13`, `l15`)
- `HANDMADE` — 15 crochet and plushie pieces (`h1`–`h15`)

> **The `b` and `l` sequences have deliberate gaps.** `b1`, `b6`–`b10`,
> `b12`–`b14` and `b16` were retired by the owner — ten products whose
> photography was old phone shots he no longer wanted on the site. `l1`–`l4`
> and `l14` were deleted at his request in commit `cb38660` (the Blue Snack Box
> later came back under a new `n` id). Don't "restore" any of them. Anything
> else missing from `n`/`h` or from the `b`/`l` numbers still listed above *is*
> an accident: `b10` and `b13` once vanished in commit `37c8a8a` and were only
> caught because their photos sat unreferenced in `public/baskets`. Before
> committing a products change, check the id sequence and check that every
> `.webp` on disk is still referenced.

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

Payment is **bank transfer only — MCB, SABA KHAN, 1729288611004257**. The
customer transfers, then uploads a screenshot at checkout. **Cash on delivery
was removed by the owner on 2 Oct 2026** (commit `b976659`) — don't add it back,
and don't let it creep back into copy (the FAQ had kept the old wording until
9 Nov). Product pages have a "send this order to WhatsApp" path; checkout has
an "Order on Instagram instead" button that copies the written-out order.

> **Order backend, as of 9 Nov 2026 (working).** The original June script
> was never in the owner's account (Extensions → Apps Script opened an empty
> project, and the old URL answered 403). The replacement is
> `apps-script/Code.gs`: it accepts the exact payload `Checkout.tsx` sends,
> appends a row to an `Orders` tab and saves the screenshot to a Drive folder
> called "Crafted Gifts - Payment Screenshots". It was pasted into a project
> bound to her Sheet, authorised under saba38018@gmail.com, and deployed as a
> Web app (Execute as: Me, Who has access: Anyone). A plain GET on
> `CONFIG.scriptUrl` answers `{"ok":true,"service":"crafted-gifts-orders"}`
> and a test POST got `{"ok":true,"orderId":...}` back.
>
> Checkout reads that reply and only shows "order placed" on `{"ok":true}`;
> anything else sends the customer to "Order on Instagram instead" with their
> basket kept. If the URL ever changes (a *new deployment* rather than a *new
> version*), update `CONFIG.scriptUrl`.
>
> To test from a shell, POST without following redirects and then GET the
> `Location` header: Apps Script runs the function on the first hop and
> redirects to an echo URL for the reply, so `curl -L` re-POSTs to the echo
> endpoint and shows a Google error page even though the row was written.

Prices come from the client, so they can be tampered with. Acceptable for now
given every order is confirmed manually on WhatsApp before it's made, but
worth flagging if the business grows.

## Delivery

Charged by destination, computed at checkout from a city dropdown. All of it
lives in `src/data/delivery.ts`:

- **Islamabad & Rawalpindi** — flat Rs. 1,000, own rider.
- **Everywhere else** — TCS from Islamabad, priced by zone: major / secondary /
  remote. `CITY_ZONES` maps ~90 cities to a zone; `ZONE_FEES` holds the three
  figures.
- **"Other city"** — not in the list; the charge is quoted on WhatsApp.
- **Cakes** only deliver to Islamabad & Rawalpindi (`CAKE_CITIES`). Checkout
  refuses to place an order that has a cake going anywhere else.

The cart drawer can't know the city, so `useCart().delivery` stays `null`
there and it says "worked out at checkout"; `Checkout.tsx` derives the real
`delivery` and `total` from `f.city`.

> **The zone figures are estimates.** Neither TCS nor Leopards publishes a
> per-city rate card — TCS's online "rate calculator" is a contact form. The
> numbers came from third-party rate guides for a ~3 kg parcel. The owner should
> correct `ZONE_FEES` from his own bookings; nothing else needs touching.

## Pricing history

Every product is priced — `pricePending` is no longer set on anything, and the
six builder vessels are priced per size in `customizer.ts`. For Him / For Her
boxes went **+20 %** (1 Oct, `f902291`) and then **−10 % rounded to the nearest
Rs. 100** (3 Oct, `70ae175`), so they sit about 8 % above where they started.
Crochet, plushies and cakes were untouched by both moves.

When prices change, the owner's phone tends to show a cached shop grid next to
fresh product pages and he reports a "mismatch". It has never been a real one —
check with a crawl, then tell him to hard-refresh.

## Still outstanding

1. **The Google Apps Script deployment** — see *Orders* above. This is the one
   thing stopping real orders.
2. **Two products need a decision.** The owner's list named both `l6`
   (now Rs. 25,400) and `l12` (now Rs. 22,100) "Gentleman's Essentials Box".
   `l12` kept its old name, *Birthday Box*, to avoid the collision — ask him
   which is which.
3. **TCS zone fees are estimates** (`ZONE_FEES` in `delivery.ts`: major 1,600 /
   secondary 1,900 / remote 2,300 for ~3 kg). The owner was asked for his real
   TCS charges and typical box weight and hasn't answered.
4. **Contents lists for the older baskets were written from the photos**, not
   from the owner. Some items are guesses (the Gym Essentials Box especially).
   Everything covered by his price list is now his own wording.
5. **The Vercel project is named `crafted-giftss`** — double S, likely a typo.
   Renaming it changes the public URL, so `CONFIG.brand.url` would need
   updating too.
6. Product pages still route orders through WhatsApp, but the floating contact
   button was changed to an Instagram DM. The owner hasn't said whether the
   rest should move to Instagram too.
7. **A stale `Update` branch sits on GitHub.** It is just the 19 Aug "new
   storefront" commit, an ancestor of `main`. Nothing on it is newer; it can
   be deleted.
8. **Photo resolution.** Every product photo taken from his Word document was
   extracted from an embedded image (~500–1100 px), so the cards are upscaled to
   the 1000×1000 house size and are softer than the older studio shots. Ask for
   the originals when he has them.

## Photos must not have baked-in borders

The owner does not want any photo with a frame in it. A batch of square cards
had been made by **padding** the photo out to 1000x1000 instead of cropping it,
which left cream bars (up to 27% a side) or black letterbox bars in the file.
31 of those were deleted and the product now points at its clean `-full` shot;
two more (`mini-mens-box`, `wooden-essentials-tray`) had no clean copy and were
cropped in place.

When adding a photo, **crop to square — never pad.** The detector that found
these checks each edge for a run of near-uniform lines; re-run it after a photo
drop. Cards and galleries both go through `object-cover`, so a non-square source
is fine and a padded one is never necessary.

## Before deleting a photo, check the whole of `src/`

Photo paths are **not only** in `products.ts`. The homepage hero and the About
page hardcode a few. Deleting photos by checking `products.ts` alone broke the
homepage hero once. The check that matters is:

```bash
for f in $(grep -rhoE '"/(baskets|crochet|products|cakes)/[a-z0-9-]+\.webp"'     src --include=*.tsx --include=*.ts | tr -d '"' | sort -u); do
  [ -f "public$f" ] || echo "MISSING $f"
done
```

Then crawl the built site and fetch every image it references — a missing file
is a silent broken image, not a build error.

## Photo naming

- `<slug>.webp` — 1000×1000 card image
- `<slug>-full.webp` — the same shot uncropped, first thumbnail in the gallery
- `<slug>-catalogue.webp` / `-catalogue-full.webp` — the shot from the owner's
  *Choose Your Vessel* document. On the 14 products that already existed he asked
  for these to lead, so they are the `image` and the older studio photo drops
  into the gallery behind them.

## Motion

All of it is CSS in `globals.css` — no animation library. Three ways in:

- **`.u-enter` + `.u-enter-1…5`** — above-the-fold entrance. Pure CSS, runs on
  load, needs no observer. Use for page headers.
- **`.u-stagger`** on a grid — children cascade in by `nth-child` delay. Put a
  `key` on the grid if you want it to replay when the contents change.
- **`<Reveal>`** — IntersectionObserver, for anything below the fold.
  `variant` takes `up` (default), `fade`, `scale`, `left`, `right`, `blur`.

Micro-states: `.u-lift` (card hover), `.u-press` (tap feedback), `.u-sheen`
(light sweep on primary buttons), `.u-pop` (cart badge), `.u-beat` (saved
heart), `.u-float`, `.u-img-skeleton` (shimmer under a loading photo).

`prefers-reduced-motion` neutralises every one of them at the bottom of the
file. **Add any new animation class to that block as well.**

## Working with the owner

He communicates in a mix of English, Urdu and Pashto, often in short bursts,
sometimes forwarding requirements from his partner. Two things that help:

- **Confirm before destructive changes.** "I need only these 15, remove rest"
  meant replace, and 15 products got deleted that he wanted back. Ask.
- **Check uploads actually landed on disk** before saying you have them. His
  iCloud storage is full, so images frequently appear in the chat while the
  files never arrive. `ls` the upload directory and count.
