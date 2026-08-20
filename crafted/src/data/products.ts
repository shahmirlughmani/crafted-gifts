export type CategoryId =
  | "for-him"
  | "for-her"
  | "crochet"
  | "plushies"
  | "cakes";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  blurb: string;
  image: string | null;
  /** Shown when the category has no products yet. */
  comingSoon?: string;
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
      "Trays, boxes and hampers built around the things he actually uses — grooming, snacks, clothing — packed and finished by hand.",
    image: "/baskets/grooms-grand-box.webp",
  },
  {
    id: "for-her",
    name: "For Her",
    tagline: "Made to Feel Special",
    blurb:
      "Soft, pretty and put together with care — skincare, treats and little keepsakes in baskets wrapped ribbon-first.",
    image: "/baskets/hello-kitty-hamper.webp",
  },
  {
    id: "crochet",
    name: "Crochet",
    tagline: "Handmade, Stitch by Stitch",
    blurb:
      "Flowers that never wilt, soft toys with real character, and keepsakes made by hand in our studio. Every piece is crocheted to order.",
    image: "/crochet/rose-tulip-bouquet.webp",
  },
  {
    id: "plushies",
    name: "Plushies",
    tagline: "Soft & Squishable",
    blurb:
      "Cuddly companions that pair with any box — or stand on their own as the whole gift.",
    image: "/crochet/duck-plushie-set.webp",
    comingSoon:
      "We're photographing our plushies now. Message us on WhatsApp in the meantime — we'll show you what's in stock.",
  },
  {
    id: "cakes",
    name: "Cakes",
    tagline: "Baked to Order",
    blurb:
      "Celebration cakes made fresh and finished to match your box — so the whole gift arrives together.",
    image: "/baskets/birthday-celebration-box.webp",
    comingSoon:
      "Our cake menu is on its way. Message us on WhatsApp with your date and flavour and we'll quote you directly.",
  },
];

/* --------------------------------------------------------------------------
   BASKETS, BOXES & TRAYS
   PRICES ARE PLACEHOLDERS (pricePending: true) until confirmed.
   -------------------------------------------------------------------------- */
const BASKETS: Product[] = [
  {
    id: "b1",
    slug: "pink-blossom-basket",
    name: "Pink Blossom Basket",
    price: 8500,
    pricePending: true,
    categories: ["for-her"],
    image: "/baskets/pink-blossom-basket.webp",
    gallery: ["/baskets/pink-blossom-basket-full.webp"],
    summary:
      "A soft pink basket built around a hand-crocheted lamb, with skincare, sweets and dried blooms tucked in around it.",
    contents: [
      "Hand-crocheted lamb plushie",
      "Sadoer sheet mask",
      "Hand cream",
      "Mogu Mogu lychee drink",
      "Mint gum & chocolate",
      "Padded headband",
      "Heart hair clip",
      "Dried pink gypsophila",
    ],
    featured: true,
  },
  {
    id: "b2",
    slug: "pink-sweetheart-basket",
    name: "Pink Sweetheart Basket",
    price: 9500,
    pricePending: true,
    categories: ["for-her"],
    badge: "Best Seller",
    image: "/baskets/pink-sweetheart-basket.webp",
    gallery: ["/baskets/pink-sweetheart-basket-full.webp"],
    summary:
      "Everything pink — body care, strawberry snacks and a crocheted chick, in a white basket finished with organza ribbon.",
    contents: [
      "Dove Body Love lotion",
      "Sadoer plant sheet mask",
      "Strawberry wafers",
      "Baked snack pack",
      "Krack chips",
      "Mogu Mogu lychee drink",
      "Hand cream & lip balm",
      "Crocheted chick keyring",
      "Padded headband",
      "Dried pink gypsophila",
    ],
    featured: true,
  },
  {
    id: "b3",
    slug: "lamb-sweetheart-basket",
    name: "Lamb Sweetheart Basket",
    price: 11500,
    pricePending: true,
    categories: ["for-her"],
    image: "/baskets/lamb-sweetheart-basket.webp",
    gallery: ["/baskets/lamb-sweetheart-basket-full.webp"],
    summary:
      "Our Sweetheart basket with a full-size crocheted lamb in dungarees sitting alongside it.",
    contents: [
      "Large hand-crocheted lamb plushie",
      "Dove Body Love lotion",
      "Sadoer plant sheet mask",
      "Strawberry wafers",
      "Baked snack pack",
      "Mogu Mogu lychee drink",
      "Hand cream & lip balm",
      "Crocheted chick keyring",
      "Padded headband",
      "Dried pink gypsophila",
    ],
    featured: true,
  },
  {
    id: "b4",
    slug: "hello-kitty-hamper",
    name: "Hello Kitty Hamper",
    price: 14500,
    pricePending: true,
    categories: ["for-her"],
    badge: "Premium",
    image: "/baskets/hello-kitty-hamper.webp",
    gallery: ["/baskets/hello-kitty-hamper-full.webp"],
    summary:
      "A full Hello Kitty set in a cream wicker hamper — towel, tumbler, mirror, jewellery and a bow necklace.",
    contents: [
      "Hello Kitty hand towel",
      "Hello Kitty tumbler",
      "Miniso dual-sided mirror",
      "Gold bow necklace",
      "Lux Botanicals body wash",
      "Dove deodorant & roll-on",
      "Perfume",
      "Hair clips & accessories",
    ],
    featured: true,
  },
  {
    id: "b5",
    slug: "umrah-mubarak-box",
    name: "Umrah Mubarak Box",
    price: 12500,
    pricePending: true,
    categories: ["for-him"],
    image: "/baskets/umrah-mubarak-box.webp",
    gallery: ["/baskets/umrah-mubarak-box-full.webp"],
    summary:
      "A keepsake box for the return from Umrah — a cream polo, grooming basics and a printed Umrah Mubarak card.",
    contents: [
      "Outfitters cream polo shirt",
      "Nivea Men Deep deodorant",
      "Nivea Men face wash",
      "Vaseline petroleum jelly",
      "2 × Noms baked snacks",
      "Fox's Crystal Clear mints",
      "Umrah Mubarak card",
      "Navy satin ribbon",
    ],
  },
  {
    id: "b6",
    slug: "midnight-snack-tray",
    name: "Midnight Snack Tray",
    price: 18500,
    pricePending: true,
    categories: ["for-him"],
    badge: "Best Seller",
    image: "/baskets/midnight-snack-tray.webp",
    gallery: ["/baskets/midnight-snack-tray-full.webp"],
    summary:
      "A lit acrylic tray packed edge to edge in navy — energy drinks, imported chocolate and everything salty.",
    contents: [
      "4 × Red Bull",
      "Piper's Gold chocolate",
      "Pringles",
      "Oreo",
      "Lindt chocolate bar",
      "Takis",
      "Fox's Fruity Mints",
      "Ice Breakers mints",
      "Merci chocolates",
      "Fairy lights",
    ],
    featured: true,
  },
  {
    id: "b7",
    slug: "snack-and-tee-tray",
    name: "Snack & Tee Tray",
    price: 13500,
    pricePending: true,
    categories: ["for-him"],
    image: "/baskets/snack-and-tee-tray.webp",
    gallery: ["/baskets/snack-and-tee-tray-full.webp"],
    summary:
      "A black tray with a folded tee under a full row of snacks, finished with a hand-crocheted tulip.",
    contents: [
      "Black cotton T-shirt",
      "Hand-crocheted blue tulip",
      "Piper's Gold biscuits",
      "Mallows marshmallows",
      "Lay's & Lay's Maxx",
      "2 × Nestlé Nesfruta",
      "Smarties",
      "Pringles",
      "Fox's mints",
      "White rose",
    ],
  },
  {
    id: "b8",
    slug: "floral-glam-basket",
    name: "Floral Glam Basket",
    price: 21500,
    pricePending: true,
    categories: ["for-her"],
    badge: "Premium",
    image: "/baskets/floral-glam-basket.webp",
    gallery: ["/baskets/floral-glam-basket-full.webp"],
    summary:
      "Fresh chrysanthemums packed around Color WOW haircare, makeup and a glass mug — our most giftable basket.",
    contents: [
      "Color WOW hair mist",
      "Color WOW root spray",
      "Eyeshadow palette",
      "Lipstick & mascara",
      "Perfume",
      "Glass mug",
      "Fresh white & purple chrysanthemums",
      "Wicker basket with satin-wrapped handle",
    ],
    featured: true,
  },
  {
    id: "b9",
    slug: "birthday-celebration-box",
    name: "Birthday Celebration Box",
    price: 16500,
    pricePending: true,
    categories: ["for-him"],
    badge: "With Cake",
    image: "/baskets/birthday-celebration-box.webp",
    gallery: ["/baskets/birthday-celebration-box-full.webp"],
    summary:
      "A lit box with a Happy Birthday banner and a matching iced cake alongside — the whole celebration in one delivery.",
    contents: [
      "Happy Birthday banner & fairy lights",
      "Iced birthday cake",
      "Black graphic T-shirt",
      "Kotton gift boxes",
      "Pringles",
      "Piper's Gold biscuits",
      "Handwritten card",
    ],
    featured: true,
  },
  {
    id: "b10",
    slug: "wooden-essentials-tray",
    name: "Wooden Essentials Tray",
    price: 9500,
    pricePending: true,
    categories: ["for-him"],
    image: "/baskets/wooden-essentials-tray.webp",
    gallery: ["/baskets/wooden-essentials-tray-full.webp"],
    summary:
      "A clean wooden tray with a folded tee, grooming basics and white roses — simple, and it always lands.",
    contents: [
      "Black cotton T-shirt",
      "Nivea Men Deep deodorant",
      "Nivea Men shower gel",
      "Nivea Men creme",
      "White foam roses",
      "Mini letter bottle",
      "Navy satin ribbon",
    ],
  },
  {
    id: "b11",
    slug: "gym-essentials-box",
    name: "Gym Essentials Box",
    price: 19500,
    pricePending: true,
    categories: ["for-him"],
    image: "/baskets/gym-essentials-box.webp",
    gallery: ["/baskets/gym-essentials-box-full.webp"],
    summary:
      "For the one who never misses a session — supplements and training kit in a navy presentation box.",
    contents: [
      "Gold Creatine tub",
      "2 × protein bars",
      "Training hoodie",
      "Shaker accessories",
      "Navy clear-panel gift box",
    ],
  },
  {
    id: "b12",
    slug: "blue-rose-snack-tray",
    name: "Blue Rose Snack Tray",
    price: 12500,
    pricePending: true,
    categories: ["for-him"],
    image: "/baskets/blue-rose-snack-tray.webp",
    gallery: ["/baskets/blue-rose-snack-tray-full.webp"],
    summary:
      "Deep blue roses and lavender packed alongside Nivea Men grooming and Italian wafers on a wooden tray.",
    contents: [
      "2 × Pepsi",
      "Nivea Men Protect & Care shower gel",
      "2 × Nivea Men deodorant",
      "Balocco wafer cubes",
      "Kimkomix snacks",
      "Blue foam roses",
      "Dried lavender",
    ],
  },
  {
    id: "b13",
    slug: "grooms-grand-box",
    name: "Groom's Grand Box",
    price: 42500,
    pricePending: true,
    categories: ["for-him"],
    badge: "Premium",
    image: "/baskets/grooms-grand-box.webp",
    gallery: ["/baskets/grooms-grand-box-full.webp"],
    summary:
      "Our largest men's set — a full navy suit and shoes on an acrylic tray, with a complete grooming line-up beneath.",
    contents: [
      "Navy suit",
      "Mocciani leather sandals",
      "Bioblas shampoo",
      "Axe body spray",
      "Nivea Men Black & White deodorant",
      "Nivea Men Deep face wash",
      "Nivea Men creme",
      "Beard oil & beard kit",
      "Closeup toothpaste",
      "Listerine Tartar Control",
      "Labello lip balm",
      "White roses & fairy lights",
    ],
    featured: true,
  },
  {
    id: "b14",
    slug: "mini-mens-box",
    name: "Mini Men's Box",
    price: 5500,
    pricePending: true,
    categories: ["for-him"],
    badge: "Popular",
    image: "/baskets/mini-mens-box.webp",
    gallery: ["/baskets/mini-mens-box-full.webp"],
    summary:
      "Small, sharp and always in stock — grooming basics and energy drinks in a black clear-panel box.",
    contents: [
      "Nivea Men creme tin",
      "Nivea Men deodorant",
      "2 × Red Bull",
      "Black clear-panel gift box",
    ],
  },
  {
    id: "b15",
    slug: "pink-fairy-box",
    name: "Pink Fairy Box",
    price: 17500,
    pricePending: true,
    categories: ["for-her"],
    badge: "New",
    image: "/baskets/pink-fairy-box.webp",
    gallery: ["/baskets/pink-fairy-box-full.webp"],
    summary:
      "A whole pink world in one box — penguin plushie, fairy wings, a robe and crochet pieces made by us.",
    contents: [
      "Large pink penguin plushie",
      "Butterfly fairy wings & wand",
      "Pink hooded robe",
      "Barbie bow & hair ties",
      "Hand-crocheted chick keyring",
      "Hand-crocheted cherry pouch",
      "Pink tumbler",
      "Lollipop bath bomb",
      "Miniso accessories",
    ],
    featured: true,
  },
  {
    id: "b17",
    slug: "designer-essentials-tray",
    name: "Designer Essentials Tray",
    price: 46500,
    pricePending: true,
    categories: ["for-him"],
    badge: "Premium",
    image: "/baskets/designer-essentials-tray.webp",
    gallery: ["/baskets/designer-essentials-tray-full.webp"],
    summary:
      "Our most expensive box — Prada fragrance, a Mont Blanc card holder and a silver chain, laid out on a clear acrylic tray.",
    contents: [
      "Prada Luna Rossa Carbon EDT 50 ml",
      "Mont Blanc leather card holder",
      "Silver chain in a gift box",
      "Black ribbed polo shirt",
      "Nivea Men face wash",
      "3 × Pepsi",
      "Mackintosh's Quality Street",
      "Noms Havsalt crisps",
      "Tiva gummy sweets",
    ],
    featured: true,
  },
  {
    id: "b18",
    slug: "birthday-knit-box",
    name: "Birthday Knit Box",
    price: 21500,
    pricePending: true,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/birthday-knit-box.webp",
    gallery: ["/baskets/birthday-knit-box-full.webp"],
    summary:
      "A Jack & Jones premium knit polo folded under fairy lights in a clear-panel box, with a birthday card ready to sign.",
    contents: [
      "Jack & Jones premium knit polo",
      "Warm fairy lights",
      "Happy Birthday card",
      "Blue satin bow",
      "Burgundy clear-panel gift box",
    ],
    featured: true,
  },
  {
    id: "b19",
    slug: "chocolate-lovers-box",
    name: "Chocolate Lover's Box",
    price: 11500,
    pricePending: true,
    categories: ["for-him", "for-her"],
    image: "/baskets/chocolate-lovers-box.webp",
    gallery: ["/baskets/chocolate-lovers-box-full.webp"],
    summary:
      "Nothing but good chocolate — Lindt Excellence, milk chocolate and a tin of treats behind a clear panel.",
    contents: [
      "Lindt Excellence Extra Creamy",
      "Milk chocolate bar",
      "Assorted chocolate tin",
      "Chocolate selection box",
      "Burgundy clear-panel gift box",
    ],
  },
  {
    id: "b16",
    slug: "movie-night-snack-box",
    name: "Movie Night Snack Box",
    price: 8500,
    pricePending: true,
    categories: ["for-him", "for-her"],
    image: "/baskets/movie-night-snack-box.webp",
    gallery: ["/baskets/movie-night-snack-box-full.webp"],
    summary:
      "Pure snacks, nothing else — crisps, sour sweets and gummies packed into a clear-panel box.",
    contents: [
      "Lay's Wavy",
      "Lay's Maxx",
      "Cheetos Flamin' Hot",
      "Hoopix watermelon bites",
      "Sour Root Bomb",
      "Assorted gummies & candy",
    ],
  },
];

const HANDMADE: Product[] = [
  {
    id: "h1",
    slug: "duckling-plushie-basket",
    name: "Duckling Plushie Basket",
    price: 4500,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
    featured: true,
  },
  {
    id: "h2",
    slug: "race-car-keyring",
    name: "Race Car Keyring",
    price: 1200,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
  },
  {
    id: "h3",
    slug: "mini-doll-basket",
    name: "Mini Doll Basket",
    price: 6500,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
    featured: true,
  },
  {
    id: "h4",
    slug: "teddy-shadow-box",
    name: "Teddy Shadow Box",
    price: 5500,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
    featured: true,
  },
  {
    id: "h5",
    slug: "crochet-scrunchies",
    name: "Crochet Scrunchie Pair",
    price: 900,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/crochet-scrunchies.webp",
    gallery: ["/crochet/crochet-scrunchies-full.webp"],
    summary:
      "Two soft scrunchies with a crocheted cherry charm — gentle on hair, and they hold their shape.",
    contents: [
      "2 × crochet scrunchies",
      "Cherry charm detail",
      "Colours customisable",
    ],
  },
  {
    id: "h6",
    slug: "octopus-keyring",
    name: "Octopus Keyring",
    price: 1100,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
  },
  {
    id: "h7",
    slug: "teddy-bear-keyring",
    name: "Teddy Bear Keyring",
    price: 1300,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/teddy-bear-keyring.webp",
    gallery: ["/crochet/teddy-bear-keyring-full.webp"],
    summary:
      "A jointed little bear in warm brown with honey paws — the classic, done properly.",
    contents: [
      "1 × crocheted teddy bear",
      "Stainless steel keyring",
      "Approx. 10 cm tall",
    ],
  },
  {
    id: "h8",
    slug: "cherry-crossbody-bag",
    name: "Cherry Crossbody Bag",
    price: 4200,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
    featured: true,
  },
  {
    id: "h9",
    slug: "strawberry-pouch",
    name: "Strawberry Pouch",
    price: 3800,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
  },
  {
    id: "h10",
    slug: "forget-me-not-stems",
    name: "Forget-Me-Not Stems",
    price: 1600,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
  },
  {
    id: "h11",
    slug: "granny-square-purse",
    name: "Granny Square Purse",
    price: 2400,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/granny-square-purse.webp",
    gallery: ["/crochet/granny-square-purse-full.webp"],
    summary:
      "Classic granny squares in two colourways, finished as a small wristlet purse.",
    contents: [
      "Crocheted granny square purse",
      "Wrist strap",
      "Choice of colourway",
    ],
  },
  {
    id: "h12",
    slug: "rose-tulip-bouquet",
    name: "Rose & Tulip Bouquet",
    price: 5500,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
    featured: true,
  },
  {
    id: "h13",
    slug: "swiss-roll-keyring",
    name: "Swiss Roll Keyring",
    price: 1000,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/swiss-roll-keyring.webp",
    gallery: ["/crochet/swiss-roll-keyring-full.webp"],
    summary:
      "A spiral swiss roll with a cherry on top, in pink or lilac — small, sweet and quick to make.",
    contents: [
      "2 × swiss roll keyrings",
      "Cherry topper",
      "Stainless steel rings",
    ],
  },
  {
    id: "h14",
    slug: "strawberry-keyring",
    name: "Strawberry Keyring Set",
    price: 1500,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
  },
  {
    id: "h15",
    slug: "tulip-vase",
    name: "Tulip Vase",
    price: 3900,
    pricePending: true,
    handmade: true,
    categories: ["crochet"],
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
    featured: true,
  },
];


/* --------------------------------------------------------------------------
   EARLIER RANGE — the original 15 boxes and baskets.
   PRICES HERE ARE THE REAL ONES FROM THE OLD SITE.
   -------------------------------------------------------------------------- */
const LEGACY: Product[] = [
  {
    id: "l1", slug: "blue-snack-box", name: "Blue Snack Box", price: 32500,
    categories: ["for-him"], badge: "Best Seller", image: "/products/blue-snack-box.webp",
    summary: "Our biggest snack spread — an overflowing box of imported chocolate, chips and energy drinks.",
    contents: ["2 × Doritos","2 × Lindt chocolate bars","6 × Red Bull","Fox's candy tin","2 × Takis","2 × Pringles","Cookie box","Smarties","Ice Breakers mints","Trident gum","Oreo wafers box"],
  },
  {
    id: "l2", slug: "eastern-clothes-box", name: "Eastern Clothes Box", price: 35000,
    categories: ["for-him"], badge: "Premium", image: "/products/eastern-clothes-box.webp",
    summary: "A complete eastern look, boxed — tailored suit, handmade chappal and finishing details.",
    contents: ["Dynasty unstitched suit","Mocciani Peshawari chappal","Royal Tag cufflinks"],
  },
  {
    id: "l3", slug: "dry-fruit-basket", name: "Dry Fruit Basket", price: 9000,
    categories: ["for-him","for-her"], image: "/products/dry-fruit-basket.webp",
    summary: "Six premium dry fruits arranged in a woven basket — the gift that always lands well.",
    contents: ["Almonds","Cashews","Pistachios","Walnuts","Dried apricots","Raisins","Presented in a woven gift basket"],
  },
  {
    id: "l4", slug: "western-clothes-box", name: "Western Clothes Box", price: 23000,
    categories: ["for-him"], image: "/products/western-clothes-box.webp",
    summary: "Smart-casual essentials in an elegant presentation box.",
    contents: ["Lama loafers","Lama shirt","Elegant gift presentation box"],
  },
  {
    id: "l5", slug: "signature-gift-box", name: "Signature Gift Box", price: 15500,
    categories: ["for-him"], image: "/products/signature-gift-box.webp",
    summary: "Our signature mix — one wardrobe piece, one leather piece, and the small handmade touches we're known for.",
    contents: ["Engine shirt","Jafferjees wallet","Janan Sports mini fragrance","Handmade crochet rose","Mini letter bottle","Mini Bounty bar"],
  },
  {
    id: "l6", slug: "gentlemans-essentials-box", name: "Gentleman's Essentials Box", price: 23500,
    categories: ["for-him"], image: "/products/gentlemans-essentials-box.webp",
    summary: "Everything he reaches for daily, upgraded — shirt, leather goods and a steel bracelet.",
    contents: ["Lama shirt","Jafferjees wallet","Jafferjees card holder","Jafferjees keyring","Stainless steel bracelet"],
  },
  {
    id: "l7", slug: "luxe-green-box", name: "Luxe Green Box", price: 38500,
    categories: ["for-him"], badge: "Premium", image: "/products/luxe-green-box.webp",
    summary: "Our most luxurious box — watch, sunglasses and knitwear for the milestone occasions.",
    contents: ["Sveston watch","Lacoste sunglasses","Outfitters knit polo"],
  },
  {
    id: "l8", slug: "classic-snack-box", name: "Classic Snack Box", price: 17500,
    categories: ["for-him","for-her"], image: "/products/classic-snack-box.webp",
    summary: "Snacks and self-care together — the crowd-pleaser of our range.",
    contents: ["6 × Pepsi","Mövenpick coffee","2 × Nom Nachos","Fox's toffee","2 × Pringles","2 × Piper's Gold biscuits","Vaseline lip balm","Nivea lotion","Nivea shaving gel"],
  },
  {
    id: "l9", slug: "cambridge-clothes-box", name: "Cambridge Clothes Box", price: 20500,
    categories: ["for-him"], image: "/products/cambridge-clothes-box.webp",
    summary: "A crisp dress shirt with the grooming pieces to match.",
    contents: ["Cambridge dress shirt","J. perfume","Nivea face wash","Nivea after-shave lotion"],
  },
  {
    id: "l10", slug: "deluxe-care-basket", name: "Deluxe Care Basket", price: 11500,
    categories: ["for-him","for-her"], image: "/products/deluxe-care-basket.webp",
    summary: "A full skincare and body-care line-up, cushioned with treats.",
    contents: ["Cocoa wafers","Crisp nimko","2 × Pepsi","Nivea face wash","Nivea face cream","Nivea lotion","Nivea body wash","Nivea deodorant","Nivea body spray"],
  },
  {
    id: "l11", slug: "classic-care-basket", name: "Classic Care Basket", price: 9500,
    categories: ["for-him","for-her"], image: "/products/classic-care-basket.webp",
    summary: "The essentials edit of our care basket, at a friendlier price.",
    contents: ["Cocoa wafers","Crisp nimko","2 × Pepsi","Nivea lotion","Nivea body wash","Nivea deodorant","Nivea body spray"],
  },
  {
    id: "l12", slug: "birthday-box", name: "Birthday Box", price: 16500,
    categories: ["for-him"], image: "/products/birthday-box.webp",
    summary: "Built for the day itself — a wearable gift, a fragrance and a card to sign.",
    contents: ["Outfitters men's T-shirt","Janan Musk 30 ml","Nivea face wash","Nivea body spray","Nivea face cream","Birthday card"],
  },
  {
    id: "l13", slug: "cougar-shirt-box", name: "Cougar Shirt Box", price: 15000,
    categories: ["for-him"], image: "/products/cougar-shirt-box.webp",
    summary: "A shirt, grooming basics and a handwritten note in a bottle.",
    contents: ["Cougar shirt","Nivea body spray","Nivea face wash","Janan Sports mini fragrance","Bounty bar","Letter bottle"],
  },
  {
    id: "l14", slug: "mini-treat-box", name: "Mini Treat Box", price: 5000,
    categories: ["for-him","for-her"], badge: "Popular", image: "/products/mini-treat-box.webp",
    summary: "Small, sweet and always in stock — perfect as an add-on or a first gift.",
    contents: ["Nike body spray","Pepsi Diet","Piper's Gold biscuits","Vaseline lip balm","2 × Mars bars"],
  },
  {
    id: "l15", slug: "snack-care-box", name: "Snack & Care Box", price: 15500,
    categories: ["for-him","for-her"], image: "/products/snack-care-box.webp",
    summary: "Half pantry, half vanity — the balanced box when you're not sure what they'd pick.",
    contents: ["2 × Pepsi Zero","Nom Nachos","Nivea body spray","Nivea cream","Nivea face wash","Piper's Gold biscuits","Vaseline lip balm","Janan perfume","Fox's candy"],
  },
];

export const PRODUCTS: Product[] = [...BASKETS, ...LEGACY, ...HANDMADE];

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
