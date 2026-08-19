export type Option = {
  id: string;
  name: string;
  price: number;
  note?: string;
};

export type ItemGroup = {
  id: string;
  name: string;
  hint: string;
  items: Option[];
};

/** Step 1 — what the gift is presented in. */
export const CONTAINERS: Option[] = [
  { id: "basket", name: "Woven Basket", price: 1200, note: "Classic, holds the most" },
  { id: "hatbox", name: "Hatbox", price: 1800, note: "Round, ribboned lid" },
  { id: "crate", name: "Wooden Crate", price: 1500, note: "Rustic and sturdy" },
  { id: "bucket", name: "Signature Bucket", price: 1000, note: "Compact and modern" },
  { id: "tray", name: "Gift Tray", price: 900, note: "Flat, shows everything at once" },
];

/** Step 2 — size sets a base cost and a soft item guide. */
export const SIZES: (Option & { guide: string; maxItems: number })[] = [
  { id: "mini", name: "Mini", price: 800, guide: "3–5 items", maxItems: 5 },
  { id: "petit", name: "Petit", price: 1500, guide: "5–8 items", maxItems: 8 },
  { id: "bonne", name: "Bonne", price: 2400, guide: "8–12 items", maxItems: 12 },
  { id: "superbe", name: "Superbe", price: 3600, guide: "12–16 items", maxItems: 16 },
  { id: "grande", name: "Grande", price: 5200, guide: "16+ items", maxItems: 30 },
];

/** Step 3 — everything that can go inside. */
export const ITEM_GROUPS: ItemGroup[] = [
  {
    id: "chocolates",
    name: "Chocolates & Sweets",
    hint: "Not dispatched outside Rawalpindi/Islamabad in peak summer — they melt.",
    items: [
      { id: "lindt", name: "Lindt bar", price: 1450 },
      { id: "lindor", name: "Lindor truffle box", price: 3200 },
      { id: "ferrero", name: "Ferrero Rocher (16 pc)", price: 3900 },
      { id: "bounty", name: "Bounty bar", price: 350 },
      { id: "mars", name: "Mars bar", price: 350 },
      { id: "smarties", name: "Smarties tube", price: 480 },
      { id: "oreo-wafer", name: "Oreo wafers box", price: 950 },
      { id: "cookie-box", name: "Cookie box", price: 1600 },
      { id: "foxs", name: "Fox's candy tin", price: 1100 },
    ],
  },
  {
    id: "snacks",
    name: "Snacks & Drinks",
    hint: "Crowd-pleasers. Great for filling out a larger basket.",
    items: [
      { id: "pringles", name: "Pringles", price: 700 },
      { id: "doritos", name: "Doritos", price: 650 },
      { id: "takis", name: "Takis", price: 750 },
      { id: "nachos", name: "Nom Nachos", price: 600 },
      { id: "pipers", name: "Piper's Gold biscuits", price: 450 },
      { id: "nimko", name: "Crisp nimko", price: 400 },
      { id: "pepsi", name: "Pepsi (can)", price: 180 },
      { id: "redbull", name: "Red Bull", price: 480 },
      { id: "coffee", name: "Mövenpick coffee", price: 2400 },
      { id: "tea", name: "Premium tea selection", price: 1900 },
    ],
  },
  {
    id: "drynuts",
    name: "Dry Fruit & Nuts",
    hint: "Priced per 250 g pack.",
    items: [
      { id: "almond", name: "Almonds", price: 1600 },
      { id: "cashew", name: "Cashews", price: 2100 },
      { id: "pista", name: "Pistachios", price: 2400 },
      { id: "walnut", name: "Walnuts", price: 1800 },
      { id: "apricot", name: "Dried apricots", price: 1100 },
      { id: "raisin", name: "Raisins", price: 900 },
      { id: "dates", name: "Medjool dates", price: 2200 },
    ],
  },
  {
    id: "care",
    name: "Skincare & Body Care",
    hint: "Everything here is sealed and brand new.",
    items: [
      { id: "nivea-fw", name: "Nivea face wash", price: 850 },
      { id: "nivea-cream", name: "Nivea face cream", price: 900 },
      { id: "nivea-lotion", name: "Nivea body lotion", price: 1100 },
      { id: "nivea-wash", name: "Nivea body wash", price: 1050 },
      { id: "nivea-deo", name: "Nivea deodorant", price: 950 },
      { id: "vaseline", name: "Vaseline lip balm", price: 400 },
      { id: "shave-gel", name: "Shaving gel", price: 950 },
      { id: "bathbomb", name: "Bath bomb set", price: 1600 },
    ],
  },
  {
    id: "fragrance",
    name: "Fragrance",
    hint: "Add one signature scent — it lifts the whole basket.",
    items: [
      { id: "janan-mini", name: "Janan Sports mini", price: 1400 },
      { id: "janan-musk", name: "Janan Musk 30 ml", price: 2600 },
      { id: "j-perfume", name: "J. perfume", price: 4500 },
      { id: "nike-spray", name: "Nike body spray", price: 1200 },
      { id: "nivea-spray", name: "Nivea body spray", price: 1000 },
    ],
  },
  {
    id: "candles",
    name: "Candles & Home",
    hint: "Hand-poured, burns 30–40 hours.",
    items: [
      { id: "candle-small", name: "Scented candle — small", price: 2300 },
      { id: "candle-large", name: "Scented candle — large", price: 4200 },
      { id: "candle-trio", name: "Candle trio set", price: 6800 },
      { id: "diffuser", name: "Reed diffuser", price: 5400 },
      { id: "fairy-lights", name: "Fairy lights", price: 900 },
    ],
  },
  {
    id: "handmade",
    name: "Crochet & Plushies",
    hint: "Made by hand in our studio — allow an extra day for these.",
    items: [
      { id: "crochet-rose", name: "Crochet rose (single)", price: 700 },
      { id: "crochet-bouquet", name: "Crochet bouquet (5 stems)", price: 3200 },
      { id: "crochet-keyring", name: "Crochet keyring", price: 850 },
      { id: "plush-small", name: "Small plushie", price: 1800 },
      { id: "plush-large", name: "Large plushie", price: 3500 },
      { id: "letter-bottle", name: "Mini letter bottle", price: 600 },
    ],
  },
  {
    id: "keepsakes",
    name: "Keepsakes & Extras",
    hint: "The small touches people remember.",
    items: [
      { id: "photo-frame", name: "Photo frame", price: 2200 },
      { id: "polaroids", name: "Printed polaroid set (10)", price: 1500 },
      { id: "mug", name: "Personalised mug", price: 1900 },
      { id: "bracelet", name: "Stainless steel bracelet", price: 2800 },
      { id: "balloon", name: "Balloon bundle", price: 800 },
      { id: "ribbon-upgrade", name: "Satin ribbon & wax seal upgrade", price: 600 },
    ],
  },
];

/** Step 4 — greeting card. */
export const CARDS: Option[] = [
  { id: "none", name: "No card", price: 0 },
  { id: "birthday", name: "Happy Birthday", price: 250 },
  { id: "anniversary", name: "Happy Anniversary", price: 250 },
  { id: "best-wishes", name: "Best Wishes", price: 200 },
  { id: "get-well", name: "Get Well Soon", price: 200 },
  { id: "thank-you", name: "Thank You", price: 150 },
  { id: "blank", name: "Blank card (we write your message)", price: 150 },
];

export const ALL_ITEMS: Record<string, Option & { group: string }> =
  Object.fromEntries(
    ITEM_GROUPS.flatMap((g) =>
      g.items.map((i) => [i.id, { ...i, group: g.name }])
    )
  );
