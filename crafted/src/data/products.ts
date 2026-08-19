export type CategoryId = "for-him" | "for-her" | "crochet" | "plushies";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  blurb: string;
  image: string | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  categories: CategoryId[];
  badge?: string;
  image: string;
  gallery?: string[];
  summary: string;
  /** Full "what's included" list shown on the product page. */
  contents: string[];
  occasions?: string[];
  featured?: boolean;
  /** true = price is a placeholder awaiting confirmation */
  pricePending?: boolean;
  handmade?: boolean;
};

export const CATEGORIES: Category[] = [
  {
    id: "for-him",
    name: "For Him",
    tagline: "Gifts He'll Love",
    blurb:
      "Considered boxes built around clothing, fragrance, watches and everyday essentials — presented so the unboxing feels like the gift.",
    image: "/products/luxe-green-box.webp",
  },
  {
    id: "for-her",
    name: "For Her",
    tagline: "Made to Feel Special",
    blurb:
      "Care baskets, handmade keepsakes and treats chosen for softness and detail, wrapped in green and gold.",
    image: "/crochet/cherry-crossbody-bag.webp",
  },
  {
    id: "crochet",
    name: "Crochet",
    tagline: "Handmade, Stitch by Stitch",
    blurb:
      "Flowers that never wilt and keepsakes made by hand in our studio. Every piece is crocheted to order.",
    image: "/crochet/rose-tulip-bouquet.webp",
  },
  {
    id: "plushies",
    name: "Plushies",
    tagline: "Soft & Squishable",
    blurb:
      "Cuddly companions that pair beautifully with any box — or stand on their own as the whole gift.",
    image: "/crochet/duck-plushie-set.webp",
  },
];

/* --------------------------------------------------------------------------
   HANDMADE — crochet & plushies.
   PRICES BELOW ARE PLACEHOLDERS (pricePending: true) until confirmed.
   -------------------------------------------------------------------------- */
const HANDMADE: Product[] = [
  {
    id: "h1",
    slug: "duckling-plushie-basket",
    name: "Duckling Plushie Basket",
    price: 4500,
    pricePending: true,
    handmade: true,
    categories: ["plushies", "for-her"],
    badge: "New",
    image: "/crochet/duck-plushie-set.webp",
    gallery: ["/crochet/duck-plushie-set-full.webp"],
    summary:
      "A nest of hand-crocheted ducklings in bonnets and wings — soft, weighted just right, and impossible to put down.",
    contents: [
      "4 × crocheted duckling plushies",
      "Woven display basket",
      "Cotton yarn, polyester fill",
      "Approx. 8 cm each",
    ],
    occasions: ["Birthday", "New Baby", "Just Because"],
    featured: true,
  },
  {
    id: "h2",
    slug: "race-car-keyring",
    name: "Race Car Keyring",
    price: 1200,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-him"],
    image: "/crochet/race-car-keyring.webp",
    gallery: ["/crochet/race-car-keyring-full.webp"],
    summary:
      "A cheerful little racer with safety eyes and a steel split ring — our most-requested small gift.",
    contents: [
      "1 × crocheted race car",
      "Stainless steel keyring",
      "Safety eyes, securely fastened",
      "Approx. 7 cm long",
    ],
    occasions: ["Just Because", "Party Favour"],
  },
  {
    id: "h3",
    slug: "mini-doll-basket",
    name: "Mini Doll Basket",
    price: 6500,
    pricePending: true,
    handmade: true,
    categories: ["plushies", "for-her"],
    badge: "Bundle",
    image: "/crochet/mini-doll-basket.webp",
    gallery: ["/crochet/mini-doll-basket-full.webp"],
    summary:
      "An assortment of tiny crocheted dolls in different outfits — pick the basket, or ask us to build a set around a theme.",
    contents: [
      "Assorted mini crochet dolls",
      "Woven display basket",
      "Each doll individually made",
      "Themes available on request",
    ],
    occasions: ["Birthday", "Collector Gift"],
    featured: true,
  },
  {
    id: "h4",
    slug: "teddy-shadow-box",
    name: "Teddy Shadow Box",
    price: 5500,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    badge: "Keepsake",
    image: "/crochet/teddy-shadow-box.webp",
    gallery: ["/crochet/teddy-shadow-box-full.webp"],
    summary:
      "A lit shadow box with a crocheted teddy, flowers and trailing vines — a gift that sits on a shelf for years.",
    contents: [
      "Crocheted teddy bear",
      "Crochet flowers & vines",
      "Warm fairy lights (battery)",
      "Glass-front display box",
      "Personalised note card",
    ],
    occasions: ["Anniversary", "Birthday", "Graduation"],
    featured: true,
  },
  {
    id: "h5",
    slug: "crochet-scrunchies",
    name: "Crochet Scrunchie Pair",
    price: 900,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    image: "/crochet/crochet-scrunchies.webp",
    gallery: ["/crochet/crochet-scrunchies-full.webp"],
    summary:
      "Two soft scrunchies with a crocheted cherry charm — gentle on hair, and they hold their shape.",
    contents: [
      "2 × crochet scrunchies",
      "Cherry charm detail",
      "Colours customisable",
    ],
    occasions: ["Just Because", "Party Favour"],
  },
  {
    id: "h6",
    slug: "octopus-keyring",
    name: "Octopus Keyring",
    price: 1100,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    image: "/crochet/octopus-keyring.webp",
    gallery: ["/crochet/octopus-keyring-full.webp"],
    summary:
      "A round little octopus with a sweet face — sold as a pair, or singly in the colour you choose.",
    contents: [
      "2 × crocheted octopus keyrings",
      "Stainless steel rings",
      "Approx. 6 cm",
      "Colours customisable",
    ],
    occasions: ["Just Because", "Party Favour"],
  },
  {
    id: "h7",
    slug: "teddy-bear-keyring",
    name: "Teddy Bear Keyring",
    price: 1300,
    pricePending: true,
    handmade: true,
    categories: ["plushies", "for-him", "for-her"],
    image: "/crochet/teddy-bear-keyring.webp",
    gallery: ["/crochet/teddy-bear-keyring-full.webp"],
    summary:
      "A jointed little bear in warm brown with honey paws — the classic, done properly.",
    contents: [
      "1 × crocheted teddy bear",
      "Stainless steel keyring",
      "Approx. 10 cm tall",
    ],
    occasions: ["Just Because", "Birthday"],
  },
  {
    id: "h8",
    slug: "cherry-crossbody-bag",
    name: "Cherry Crossbody Bag",
    price: 4200,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    badge: "Best Seller",
    image: "/crochet/cherry-crossbody-bag.webp",
    gallery: ["/crochet/cherry-crossbody-bag-full.webp"],
    summary:
      "A scalloped pink crossbody with a cherry motif and a long crocheted strap. Lined, so nothing catches.",
    contents: [
      "Crocheted crossbody bag",
      "Cherry appliqué detail",
      "Adjustable shoulder strap",
      "Fabric lining",
    ],
    occasions: ["Birthday", "Eid", "Just Because"],
    featured: true,
  },
  {
    id: "h9",
    slug: "strawberry-pouch",
    name: "Strawberry Pouch",
    price: 3800,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    image: "/crochet/strawberry-pouch.webp",
    gallery: ["/crochet/strawberry-pouch-full.webp"],
    summary:
      "A zip pouch worked in deep berry red with seed stitching and a green top — makeup, cards or cables.",
    contents: [
      "Crocheted zip pouch",
      "Seed-stitch detailing",
      "Metal zip closure",
      "Approx. 20 × 12 cm",
    ],
    occasions: ["Thank You", "Just Because"],
  },
  {
    id: "h10",
    slug: "forget-me-not-stems",
    name: "Forget-Me-Not Stems",
    price: 1600,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    image: "/crochet/forget-me-not-stems.webp",
    gallery: ["/crochet/forget-me-not-stems-full.webp"],
    summary:
      "Soft blue blooms with pearl centres on wired stems — flowers that never need water.",
    contents: [
      "3 × crocheted flower stems",
      "Pearl bead centres",
      "Wired, bendable stems",
      "Colours customisable",
    ],
    occasions: ["Get Well Soon", "Anniversary", "Thank You"],
  },
  {
    id: "h11",
    slug: "granny-square-purse",
    name: "Granny Square Purse",
    price: 2400,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    image: "/crochet/granny-square-purse.webp",
    gallery: ["/crochet/granny-square-purse-full.webp"],
    summary:
      "Classic granny squares in two colourways, finished as a small wristlet purse.",
    contents: [
      "Crocheted granny square purse",
      "Wrist strap",
      "Choice of colourway",
    ],
    occasions: ["Birthday", "Just Because"],
  },
  {
    id: "h12",
    slug: "rose-tulip-bouquet",
    name: "Rose & Tulip Bouquet",
    price: 5500,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    badge: "Premium",
    image: "/crochet/rose-tulip-bouquet.webp",
    gallery: ["/crochet/rose-tulip-bouquet-full.webp"],
    summary:
      "Deep red lilies and roses with cream tulips, hand-wrapped in tissue and ribbon. It will still look like this in ten years.",
    contents: [
      "Crocheted lilies, roses & tulips",
      "Crochet foliage",
      "Tissue wrap & satin ribbon",
      "Stem count customisable",
    ],
    occasions: ["Anniversary", "Valentine's", "Proposal"],
    featured: true,
  },
  {
    id: "h13",
    slug: "swiss-roll-keyring",
    name: "Swiss Roll Keyring",
    price: 1000,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    image: "/crochet/swiss-roll-keyring.webp",
    gallery: ["/crochet/swiss-roll-keyring-full.webp"],
    summary:
      "A spiral swiss roll with a cherry on top, in pink or lilac — small, sweet and quick to make.",
    contents: [
      "2 × swiss roll keyrings",
      "Cherry topper",
      "Stainless steel rings",
    ],
    occasions: ["Party Favour", "Just Because"],
  },
  {
    id: "h14",
    slug: "strawberry-keyring",
    name: "Strawberry Keyring Set",
    price: 1500,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    badge: "Popular",
    image: "/crochet/strawberry-keyring.webp",
    gallery: ["/crochet/strawberry-keyring-full.webp"],
    summary:
      "Three strawberries in red, pink and lilac with leafy green tops — buy the set or pick one.",
    contents: [
      "3 × crocheted strawberry keyrings",
      "Stainless steel rings",
      "Approx. 5 cm each",
    ],
    occasions: ["Party Favour", "Just Because"],
  },
  {
    id: "h15",
    slug: "tulip-vase",
    name: "Tulip Vase",
    price: 3900,
    pricePending: true,
    handmade: true,
    categories: ["crochet", "for-her"],
    image: "/crochet/tulip-vase.webp",
    gallery: ["/crochet/tulip-vase-full.webp"],
    summary:
      "Pink and lilac tulips with lily-of-the-valley, set into a crocheted pot beaded with pearls. Arrives ready to place.",
    contents: [
      "Crocheted tulips & lily-of-the-valley",
      "Beaded crochet pot",
      "Weighted base",
      "Approx. 28 cm tall",
    ],
    occasions: ["Anniversary", "Housewarming", "Get Well Soon"],
    featured: true,
  },
];

export const PRODUCTS: Product[] = [
  ...HANDMADE,
  {
    id: "p1",
    slug: "blue-snack-box",
    name: "Blue Snack Box",
    price: 32500,
    categories: ["for-him", "for-her"],
    badge: "Best Seller",
    image: "/products/blue-snack-box.webp",
    summary:
      "Our biggest snack spread — an overflowing box of imported chocolate, chips and energy drinks.",
    contents: [
      "2 × Doritos",
      "2 × Lindt chocolate bars",
      "6 × Red Bull",
      "Fox's candy tin",
      "2 × Takis",
      "2 × Pringles",
      "Cookie box",
      "Smarties",
      "Ice Breakers mints",
      "Trident gum",
      "Oreo wafers box",
    ],
    occasions: ["Birthday", "Congratulations", "Just Because"],
    featured: true,
  },
  {
    id: "p2",
    slug: "eastern-clothes-box",
    name: "Eastern Clothes Box",
    price: 35000,
    categories: ["for-him"],
    badge: "Premium",
    image: "/products/eastern-clothes-box.webp",
    summary:
      "A complete eastern look, boxed — tailored suit, handmade chappal and finishing details.",
    contents: [
      "Dynasty unstitched suit",
      "Mocciani Peshawari chappal",
      "Royal Tag cufflinks",
    ],
    occasions: ["Eid", "Wedding", "Anniversary"],
    featured: true,
  },
  {
    id: "p3",
    slug: "dry-fruit-basket",
    name: "Dry Fruit Basket",
    price: 9000,
    categories: ["for-him", "for-her"],
    image: "/products/dry-fruit-basket.webp",
    summary:
      "Six premium dry fruits arranged in a woven basket — the gift that always lands well.",
    contents: [
      "Almonds",
      "Cashews",
      "Pistachios",
      "Walnuts",
      "Dried apricots",
      "Raisins",
      "Presented in a woven gift basket",
    ],
    occasions: ["Eid", "Get Well Soon", "Thank You"],
  },
  {
    id: "p4",
    slug: "western-clothes-box",
    name: "Western Clothes Box",
    price: 23000,
    categories: ["for-him"],
    image: "/products/western-clothes-box.webp",
    summary: "Smart-casual essentials in an elegant presentation box.",
    contents: ["Lama loafers", "Lama shirt", "Elegant gift presentation box"],
    occasions: ["Birthday", "Anniversary"],
  },
  {
    id: "p5",
    slug: "signature-gift-box",
    name: "Signature Gift Box",
    price: 15500,
    categories: ["for-him"],
    image: "/products/signature-gift-box.webp",
    summary:
      "Our signature mix — one wardrobe piece, one leather piece, and the small handmade touches we're known for.",
    contents: [
      "Engine shirt",
      "Jafferjees wallet",
      "Janan Sports mini fragrance",
      "Handmade crochet rose",
      "Mini letter bottle",
      "Mini Bounty bar",
    ],
    occasions: ["Birthday", "Just Because"],
    featured: true,
  },
  {
    id: "p6",
    slug: "gentlemans-essentials-box",
    name: "Gentleman's Essentials Box",
    price: 23500,
    categories: ["for-him"],
    image: "/products/gentlemans-essentials-box.webp",
    summary:
      "Everything he reaches for daily, upgraded — shirt, leather goods and a steel bracelet.",
    contents: [
      "Lama shirt",
      "Jafferjees wallet",
      "Jafferjees card holder",
      "Jafferjees keyring",
      "Stainless steel bracelet",
    ],
    occasions: ["Anniversary", "Birthday"],
  },
  {
    id: "p7",
    slug: "luxe-green-box",
    name: "Luxe Green Box",
    price: 38500,
    categories: ["for-him"],
    badge: "Premium",
    image: "/products/luxe-green-box.webp",
    summary:
      "Our most luxurious box — watch, sunglasses and knitwear for the milestone occasions.",
    contents: [
      "Sveston watch",
      "Lacoste sunglasses",
      "Outfitters knit polo",
    ],
    occasions: ["Anniversary", "Milestone Birthday", "Wedding"],
    featured: true,
  },
  {
    id: "p8",
    slug: "classic-snack-box",
    name: "Classic Snack Box",
    price: 17500,
    categories: ["for-him", "for-her"],
    image: "/products/classic-snack-box.webp",
    summary: "Snacks and self-care together — the crowd-pleaser of our range.",
    contents: [
      "6 × Pepsi",
      "Mövenpick coffee",
      "2 × Nom Nachos",
      "Fox's toffee",
      "2 × Pringles",
      "2 × Piper's Gold biscuits",
      "Vaseline lip balm",
      "Nivea lotion",
      "Nivea shaving gel",
    ],
    occasions: ["Birthday", "Get Well Soon"],
  },
  {
    id: "p9",
    slug: "cambridge-clothes-box",
    name: "Cambridge Clothes Box",
    price: 20500,
    categories: ["for-him"],
    image: "/products/cambridge-clothes-box.webp",
    summary: "A crisp dress shirt with the grooming pieces to match.",
    contents: [
      "Cambridge dress shirt",
      "J. perfume",
      "Nivea face wash",
      "Nivea after-shave lotion",
    ],
    occasions: ["Eid", "Birthday", "Congratulations"],
  },
  {
    id: "p10",
    slug: "deluxe-care-basket",
    name: "Deluxe Care Basket",
    price: 11500,
    categories: ["for-her", "for-him"],
    image: "/products/deluxe-care-basket.webp",
    summary:
      "A full skincare and body-care line-up, cushioned with treats.",
    contents: [
      "Cocoa wafers",
      "Crisp nimko",
      "2 × Pepsi",
      "Nivea face wash",
      "Nivea face cream",
      "Nivea lotion",
      "Nivea body wash",
      "Nivea deodorant",
      "Nivea body spray",
    ],
    occasions: ["Get Well Soon", "Thank You", "Birthday"],
    featured: true,
  },
  {
    id: "p11",
    slug: "classic-care-basket",
    name: "Classic Care Basket",
    price: 9500,
    categories: ["for-her", "for-him"],
    image: "/products/classic-care-basket.webp",
    summary: "The essentials edit of our care basket, at a friendlier price.",
    contents: [
      "Cocoa wafers",
      "Crisp nimko",
      "2 × Pepsi",
      "Nivea lotion",
      "Nivea body wash",
      "Nivea deodorant",
      "Nivea body spray",
    ],
    occasions: ["Get Well Soon", "Thank You"],
  },
  {
    id: "p12",
    slug: "birthday-box",
    name: "Birthday Box",
    price: 16500,
    categories: ["for-him"],
    image: "/products/birthday-box.webp",
    summary:
      "Built for the day itself — a wearable gift, a fragrance and a card to sign.",
    contents: [
      "Outfitters men's T-shirt",
      "Janan Musk 30 ml",
      "Nivea face wash",
      "Nivea body spray",
      "Nivea face cream",
      "Birthday card",
    ],
    occasions: ["Birthday"],
  },
  {
    id: "p13",
    slug: "cougar-shirt-box",
    name: "Cougar Shirt Box",
    price: 15000,
    categories: ["for-him"],
    image: "/products/cougar-shirt-box.webp",
    summary:
      "A shirt, grooming basics and a handwritten note in a bottle.",
    contents: [
      "Cougar shirt",
      "Nivea body spray",
      "Nivea face wash",
      "Janan Sports mini fragrance",
      "Bounty bar",
      "Letter bottle",
    ],
    occasions: ["Birthday", "Just Because"],
  },
  {
    id: "p14",
    slug: "mini-treat-box",
    name: "Mini Treat Box",
    price: 5000,
    categories: ["for-her", "for-him"],
    badge: "Popular",
    image: "/products/mini-treat-box.webp",
    summary:
      "Small, sweet and always in stock — perfect as an add-on or a first gift.",
    contents: [
      "Nike body spray",
      "Pepsi Diet",
      "Piper's Gold biscuits",
      "Vaseline lip balm",
      "2 × Mars bars",
    ],
    occasions: ["Just Because", "Thank You"],
  },
  {
    id: "p15",
    slug: "snack-care-box",
    name: "Snack & Care Box",
    price: 15500,
    categories: ["for-her", "for-him"],
    image: "/products/snack-care-box.webp",
    summary:
      "Half pantry, half vanity — the balanced box when you're not sure what they'd pick.",
    contents: [
      "2 × Pepsi Zero",
      "Nom Nachos",
      "Nivea body spray",
      "Nivea cream",
      "Nivea face wash",
      "Piper's Gold biscuits",
      "Vaseline lip balm",
      "Janan perfume",
      "Fox's candy",
    ],
    occasions: ["Birthday", "Get Well Soon"],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const productsIn = (cat: CategoryId) =>
  PRODUCTS.filter((p) => p.categories.includes(cat));

export const getCategory = (id: string) =>
  CATEGORIES.find((c) => c.id === id);

export const relatedTo = (p: Product, limit = 4) =>
  PRODUCTS.filter(
    (o) => o.id !== p.id && o.categories.some((c) => p.categories.includes(c))
  )
    .sort((a, b) => Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
    .slice(0, limit);

export const PRICE_MIN = Math.min(...PRODUCTS.map((p) => p.price));
export const PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));
