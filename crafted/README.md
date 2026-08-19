# Crafted Gifts by S — storefront

Next.js 16 (App Router) + Tailwind v4. Everything is statically generated, so it
runs on Vercel's free tier with no server costs.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy to Vercel

```bash
npx vercel --prod
```

First run asks you to log in and link a project — accept the defaults, it
auto-detects Next.js. No environment variables are needed.

## Where to change things

| What                                  | File                        |
| ------------------------------------- | --------------------------- |
| Payment details, WhatsApp, Instagram  | `src/lib/config.ts`         |
| Pickup / urgent-order wording         | `src/lib/config.ts`         |
| Delivery fee & free-delivery threshold| `src/lib/config.ts`         |
| Google Sheet (Apps Script) URL        | `src/lib/config.ts`         |
| Products, prices, contents, categories| `src/data/products.ts`      |
| Gift customizer options and prices    | `src/data/customizer.ts`    |
| Product photos                        | `public/products`, `public/crochet` |

### Adding a product

Add an object to `PRODUCTS` in `src/data/products.ts`:

```ts
{
  id: "h16",
  slug: "bunny-plushie",          // becomes /product/bunny-plushie
  name: "Bunny Plushie",
  price: 2200,
  categories: ["plushies", "for-her"],   // one or more of the four
  image: "/crochet/bunny-plushie.webp",
  summary: "One line that shows on the card.",
  contents: ["What's included", "One line each"],
  occasions: ["Birthday"],
  handmade: true,                 // shows the "Handmade to order" tag
  featured: true,                 // shows on the homepage
}
```

Drop a square photo (1000×1000 works well) into `public/crochet/` with a
matching filename. Product pages, the sitemap and the category pages pick it up
automatically — no other file needs editing.

### Prices still to confirm

Every handmade item currently carries `pricePending: true`, which shows a
"Price to be confirmed" tag on its page. Delete that line once the real price is
set.

## Orders

Checkout posts the order to the Google Apps Script URL in `config.ts`, exactly
as the old site did, so your existing Orders sheet, Drive folder and email alert
keep working. Customers can also send the whole order to WhatsApp instead of
paying first.
