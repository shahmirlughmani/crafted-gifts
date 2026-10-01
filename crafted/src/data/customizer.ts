export type Option = {
  id: string;
  name: string;
  price: number;
  note?: string;
};

export type SizeId = "small" | "medium" | "large";

export type Size = {
  id: SizeId;
  name: string;
  guide: string;
  maxItems: number;
};

export type Vessel = {
  id: string;
  name: string;
  note: string;
  /** Price per size. Only the sizes listed here are offered for this vessel. */
  prices: Partial<Record<SizeId, number>>;
};

export type ItemGroup = {
  id: string;
  name: string;
  hint: string;
  items: Option[];
};

/**
 * Step 1 — what the gift is presented in, priced per size.
 */
export const VESSELS: Vessel[] = [
  {
    id: "classic-box",
    name: "Classic Gift Box",
    note: "Rigid magnetic box with a ribbon",
    prices: { small: 1250, large: 2000 },
  },
  {
    id: "pvc-box",
    name: "PVC Box",
    note: "Clear-panel box — everything on show",
    prices: { small: 850, medium: 950, large: 1050 },
  },
  {
    id: "acrylic-box",
    name: "Acrylic Gift Box",
    note: "Clear acrylic, fairy lights optional",
    prices: { large: 5500 },
  },
  {
    id: "acrylic-tray",
    name: "Acrylic Tray",
    note: "Flat and clear — shows everything at once",
    prices: { large: 4500 },
  },
  {
    id: "wooden-tray",
    name: "Wooden Gift Tray",
    note: "Warm wood finished with a satin bow",
    prices: { small: 3000, large: 4000 },
  },
  {
    id: "white-basket",
    name: "White Basket",
    note: "Woven basket — holds the most",
    prices: { small: 3500, medium: 4000, large: 4500 },
  },
  {
    id: "gift-bag",
    name: "Transparent Gift Bag",
    note: "The lightest way to send something small",
    prices: { small: 550 },
  },
  {
    id: "mini-bucket",
    name: "Mini Bucket",
    note: "Max 4–5 chocolates space",
    prices: { small: 400 },
  },
];

/** Step 2 — size. Sets a soft item guide; the vessel decides which are offered. */
export const SIZES: Size[] = [
  { id: "small", name: "Small", guide: "4–7 items", maxItems: 7 },
  { id: "medium", name: "Medium", guide: "7–11 items", maxItems: 11 },
  { id: "large", name: "Large", guide: "11–18 items", maxItems: 18 },
];

/** Step 3 — everything that can go inside. Prices are the owner's list prices. */
export const ITEM_GROUPS: ItemGroup[] = [
  {
    id: "chocolates",
    name: "Chocolates",
    hint: "Not dispatched outside Rawalpindi/Islamabad in peak summer — they melt.",
    items: [
      { id: "kitkat-2", name: "KitKat 2 Finger", price: 250, note: "17.7 g" },
      { id: "kitkat-4", name: "KitKat 4 Finger", price: 500, note: "41 g" },
      { id: "twix", name: "Twix bar", price: 500, note: "50 g" },
      { id: "snickers", name: "Snickers bar", price: 500, note: "50 g" },
      { id: "mars", name: "Mars bar", price: 500, note: "51 g" },
      { id: "mrbeast", name: "Mr. Beast Milk Crunch", price: 2000, note: "60 g" },
      { id: "dairymilk", name: "Cadbury Dairy Milk", price: 250, note: "36 g" },
      { id: "ferrero", name: "Ferrero Rocher T3", price: 900 },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    hint: "Cans and bottles sit upright — they fill out a basket nicely.",
    items: [
      { id: "mogu", name: "Mogu Mogu", price: 500, note: "320 ml" },
      { id: "7up", name: "7Up Free can", price: 150, note: "250 ml" },
      { id: "fruita", name: "Nestlé Fruita Vitals", price: 200 },
      { id: "redbull", name: "Red Bull", price: 500, note: "250 ml" },
      { id: "pepsi", name: "Pepsi can", price: 150, note: "250 ml" },
      { id: "coke", name: "Coca-Cola can", price: 150, note: "250 ml" },
      { id: "redbull-red", name: "Red Bull Red Edition", price: 500, note: "250 ml" },
      { id: "gatorade", name: "Gatorade Tropical Fruit", price: 250, note: "500 ml" },
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    hint: "Crowd-pleasers. Great for filling out a larger vessel.",
    items: [
      { id: "samyang", name: "Samyang Buldak ramen", price: 650, note: "140 g" },
      { id: "pringles", name: "Pringles mini", price: 650 },
      { id: "biscoff", name: "Lotus Biscoff biscuits", price: 1500, note: "250 g" },
      { id: "trident", name: "Trident gum", price: 650, note: "14 sticks" },
      { id: "astor", name: "Astor chocolate wafer tin", price: 1550 },
      { id: "sweetzone", name: "Sweetzone jelly", price: 600, note: "90 g" },
      { id: "noms", name: "Noms nacho chips", price: 150 },
      { id: "foxs", name: "Fox's candy", price: 500 },
      { id: "loacker", name: "Loacker Quadratini wafers", price: 900, note: "175 g" },
    ],
  },
  {
    id: "drynuts",
    name: "Dry Fruit & Nuts",
    hint: "Priced per 75 g pack.",
    items: [
      { id: "almond", name: "Almonds", price: 750, note: "75 g" },
      { id: "walnut", name: "Walnuts", price: 750, note: "75 g" },
      { id: "pista", name: "Pistachios", price: 750, note: "75 g · shelled" },
      { id: "cashew", name: "Plain cashews", price: 750, note: "75 g" },
    ],
  },
  {
    id: "care-men",
    name: "Body Care — Men",
    hint: "Everything here is sealed and brand new.",
    items: [
      { id: "dove-men-wash", name: "Dove Men body wash", price: 2000 },
      { id: "nivea-men-fw", name: "Nivea Men face wash", price: 2000 },
      { id: "nivea-men-deo", name: "Nivea Men deodorant", price: 2000 },
      { id: "nivea-men-gel", name: "Nivea Men shower gel", price: 2000 },
    ],
  },
  {
    id: "care-women",
    name: "Women's Essentials",
    hint: "The self-care shelf — sealed and brand new.",
    items: [
      { id: "dove-rollon", name: "Dove roll-on", price: 650 },
      { id: "dove-soap", name: "Dove Go Fresh soap", price: 500 },
      { id: "wipes", name: "Wipes", price: 1000 },
      { id: "headband", name: "Absorbent headband", price: 1500 },
      { id: "dove-lotion", name: "Dove body lotion", price: 2000 },
      { id: "dove-wash", name: "Dove body wash", price: 2000 },
      { id: "dove-shampoo", name: "Dove shampoo", price: 2000 },
    ],
  },
  {
    id: "fragrance",
    name: "Fragrance",
    hint: "Add one signature scent — it lifts the whole gift.",
    items: [
      { id: "dove-men-spray", name: "Dove Men body spray", price: 2000 },
      { id: "nivea-men-spray", name: "Nivea Men body spray", price: 2000 },
      { id: "janan-sports", name: "Janan Sports", price: 2400, note: "30 ml" },
      { id: "janan-musk", name: "Janan Musk", price: 2600, note: "30 ml" },
      { id: "dove-women-spray", name: "Dove Women body spray", price: 2000 },
      { id: "bbw-mist", name: "Bath & Body Works mist", price: 5000 },
      { id: "bbw-mist-mini", name: "Bath & Body Works mist mini", price: 3000 },
    ],
  },
  {
    id: "candles",
    name: "Candles",
    hint: "Bath & Body Works — the centrepiece of a calmer gift.",
    items: [
      { id: "bbw-candle-l", name: "Bath & Body Works candle — large", price: 9000 },
      { id: "bbw-candle-s", name: "Bath & Body Works candle — small", price: 5500 },
    ],
  },
  {
    id: "handmade",
    name: "Crochet & Plushies",
    hint: "Made by hand in our studio — allow an extra day for these.",
    items: [
      { id: "crochet-rose", name: "Crochet rose", price: 750 },
      { id: "crochet-keyring", name: "Crochet keychain", price: 550 },
      { id: "mr-bean", name: "Mr Bean teddy", price: 700 },
      { id: "plushie", name: "Plushie", price: 3000 },
    ],
  },
  {
    id: "extras",
    name: "Extras",
    hint: "The small touches people remember.",
    items: [
      { id: "letter-bottle", name: "Letter bottle", price: 150 },
      { id: "helium-balloon", name: "Helium balloon", price: 200 },
      { id: "bow-balloon", name: "Bow balloon", price: 550 },
      { id: "polaroid", name: "Polaroid with frame", price: 1150 },
    ],
  },
];

/** Step 4 — greeting card. */
export const CARDS: Option[] = [
  { id: "none", name: "No card", price: 0 },
  { id: "birthday", name: "Happy Birthday", price: 250 },
  { id: "thank-you", name: "Thank You", price: 250 },
  { id: "anniversary", name: "Anniversary", price: 250 },
  { id: "blank", name: "Blank card", price: 200, note: "We write your message" },
];

export const ALL_ITEMS: Record<string, Option & { group: string }> =
  Object.fromEntries(
    ITEM_GROUPS.flatMap((g) =>
      g.items.map((i) => [i.id, { ...i, group: g.name }])
    )
  );

/** The sizes a given vessel is offered in. */
export const sizesFor = (vesselId: string): Size[] => {
  const v = VESSELS.find((x) => x.id === vesselId);
  return v ? SIZES.filter((s) => v.prices[s.id] !== undefined) : SIZES;
};

/** What this vessel costs in this size. */
export const vesselPrice = (vesselId: string, size: SizeId): number =>
  VESSELS.find((v) => v.id === vesselId)?.prices[size] ?? 0;

/** Cheapest size of a vessel — shown as "from Rs. X" on the tile. */
export const vesselFrom = (v: Vessel): number =>
  Math.min(...Object.values(v.prices).filter((n): n is number => n !== undefined));
