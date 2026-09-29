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
  /** Wide hero image. The square `image` is for cards and chips; stretching it
   *  across a full-width banner looked soft and badly cropped. */
  banner?: string;
  /** Shown when the category has no products yet. */
  comingSoon?: string;
  /** Standing condition on the whole category, e.g. cake lead times. */
  note?: string;
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
  /** Overrides the category note on this product's page, e.g. a shorter
   *  lead time than the rest of the category. */
  note?: string;
  /** Set when `price` buys one piece rather than the whole set in the photo,
   *  e.g. "per pot". Rendered next to the price so it can't be misread. */
  unit?: string;
  handmade?: boolean;
};

export const CATEGORIES: Category[] = [
  {
    id: "for-him",
    name: "For Him",
    tagline: "Gifts He'll Love",
    blurb:
      "Trays, boxes and hampers filled with things he'll actually love — grooming essentials, snacks, clothing and thoughtful little extras, packed and finished by hand.",
    image: "/baskets/classic-mens-snack-box-full.webp",
    banner: "/banners/for-him.webp",
  },
  {
    id: "for-her",
    name: "For Her",
    tagline: "Made to Feel Special",
    blurb:
      "Thoughtful little luxuries, pretty keepsakes and feel-good treats — all put together with care and wrapped beautifully.",
    image: "/baskets/hello-kitty-hamper-full.webp",
    banner: "/banners/for-her.webp",
  },
  {
    id: "crochet",
    name: "Crochet",
    tagline: "Handmade, Stitch by Stitch",
    blurb:
      "Flowers that never wilt, soft toys with real character, and keepsakes made by hand in our studio. Every piece is crocheted to order.",
    image: "/crochet/rose-tulip-bouquet.webp",
    banner: "/banners/crochet.webp",
  },
  {
    id: "plushies",
    name: "Plushies",
    tagline: "Soft & Squishable",
    blurb:
      "Cuddly companions for every gift — from our handmade crochet plushies to adorable teddy bears, perfect for adding a little extra love to your box.",
    image: "/crochet/crochet-bunny-navy-full.webp",
    banner: "/banners/plushies.webp",
  },
  {
    id: "cakes",
    name: "Cakes",
    tagline: "Baked to Order",
    blurb:
      "Celebration cakes made fresh and finished to match your box, so the whole gift arrives together.",
    image: "/cakes/birthday-floral-cake-full.webp",
    banner: "/banners/cakes.webp",
    note: "Cake orders must be placed at least 1 week before delivery and are available in Islamabad & Rawalpindi only.",
  },
];

/* --------------------------------------------------------------------------
   BASKETS, BOXES & TRAYS
   PRICES ARE PLACEHOLDERS (pricePending: true) until confirmed.
   -------------------------------------------------------------------------- */
const BASKETS: Product[] = [
  {
    id: "b2",
    slug: "pink-sweetheart-basket",
    name: "Pink Celebration Basket",
    price: 16500,
    categories: ["for-her"],
    badge: "Best Seller",
    image: "/baskets/pink-sweetheart-basket-catalogue-full.webp",
    summary:
      "A charming pink-themed basket filled with sweet treats, self-care goodies and adorable surprises. Beautifully arranged and ready to make someone feel extra special.",
    contents: [
      "Hand-crocheted teddy",
      "Compact mirror",
      "Mogu Mogu",
      "Sheet face mask",
      "Hair catcher",
      "KitKat",
      "Hand cream",
      "Hand-crocheted chick keyring",
      "Trident gum",
      "Hello Kitty hair band",
      "Hello Kitty hair clips",
    ],
    featured: true,
  },
  {
    id: "b3",
    slug: "lamb-sweetheart-basket",
    name: "Pretty Pink Plushie Basket",
    price: 20500,
    categories: ["for-her"],
    image: "/baskets/lamb-sweetheart-basket-catalogue-full.webp",
    summary:
      "A cute and feminine gift basket featuring an adorable plushie, chocolates, snacks and thoughtful little extras. Perfect for birthdays, anniversaries and sweet surprises.",
    contents: [
      "Large hand-crocheted teddy",
      "Dove body lotion",
      "Sweetzone jelly",
      "Noms nacho chips",
      "Mogu Mogu",
      "Trident gum",
      "KitKat",
      "Hand cream",
      "Hair catcher",
      "Sheet face mask",
      "Wafers",
      "Pringles Krack chips",
      "Samyang ramen",
    ],
    featured: true,
  },
  {
    id: "b4",
    slug: "hello-kitty-hamper",
    name: "Hello Kitty Hamper",
    price: 27500,
    categories: ["for-her"],
    badge: "Premium",
    image: "/baskets/hello-kitty-hamper-full.webp",
    summary:
      "A full Hello Kitty set in a cream wicker hamper — tumbler, mirror, towels and accessories, with jewellery, perfume and body care alongside.",
    contents: [
      "Pink tumbler",
      "Tesoro jewellery",
      "J. perfume",
      "Lux body wash",
      "Lux soap",
      "Dove body spray",
      "Dove deodorant",
      "Hello Kitty keychain",
      "Hello Kitty scrunchie",
      "Hello Kitty mirror",
      "Hello Kitty hair clips",
      "Hello Kitty face towels",
    ],
    featured: true,
  },
  {
    id: "b5",
    slug: "umrah-mubarak-box",
    name: "Umrah Mubarak Box",
    price: 14000,
    categories: ["for-him"],
    image: "/baskets/umrah-mubarak-box-full.webp",
    summary:
      "A keepsake box for the return from Umrah — an Outfitters polo, grooming basics and a printed Umrah Mubarak card.",
    contents: [
      "Outfitters polo shirt",
      "Nivea face wash",
      "Nivea body spray",
      "Vaseline 50 ml",
      "2 × Noms nacho chips",
      "Fox's candy",
      "Umrah Mubarak card",
    ],
  },
  {
    id: "b11",
    slug: "gym-essentials-box",
    name: "Gym Essentials Box",
    price: 25500,
    categories: ["for-him"],
    image: "/baskets/gym-essentials-box-full.webp",
    summary:
      "For the one who never misses a session — training kit, creatine and a fragrance in a navy presentation box.",
    contents: [
      "Outfitters graphic shirt",
      "Outfitters cargo pants",
      "Jacked Nutrition Gold creatine",
      "J. Janan 30 ml",
      "3 × Nutrilov granola bars",
    ],
  },
  {
    id: "b15",
    slug: "pink-fairy-box",
    name: "Pink Plushie Gift Set",
    price: 23500,
    categories: ["for-her"],
    badge: "New",
    image: "/baskets/pink-fairy-box-catalogue-full.webp",
    summary:
      "A playful pink-themed gift featuring an adorable plushie, dressing-up pieces and little surprises, beautifully arranged for a memorable celebration.",
    contents: [
      "Frock",
      "Penguin plushie",
      "Lip gloss",
      "Hand cream",
      "Butterfly set",
      "Marshmallow squishy",
      "Hand-crocheted penguin keychain",
      "Makeup set",
      "Hand-crocheted bag",
      "Surprise egg",
      "Slime",
      "Barbie bow",
      "Barbie hair ties",
    ],
    featured: true,
  },
  {
    id: "b17",
    slug: "designer-essentials-tray",
    name: "Designer Essentials Tray",
    price: 28500,
    categories: ["for-him"],
    badge: "Premium",
    image: "/baskets/designer-essentials-tray-full.webp",
    summary:
      "Our most complete men's set — a polo, a fragrance, a chain and a wallet laid out on a clear acrylic tray, with snacks packed in around them.",
    contents: [
      "Outfitters polo shirt",
      "Outfitters perfume 30 ml",
      "Tesoro chain",
      "Outfitters wallet",
      "Nivea face wash",
      "3 × Pepsi cans",
      "Noms nacho chips",
      "Cocoa wafers",
      "Jelly",
    ],
    featured: true,
  },
  {
    id: "b18",
    slug: "birthday-knit-box",
    name: "Birthday Knit Box",
    price: 16500,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/birthday-knit-box-full.webp",
    summary:
      "An Outfitters polo folded under fairy lights in a clear-panel box, with a fragrance, snacks and a birthday card ready to sign.",
    contents: [
      "Outfitters polo shirt",
      "Outfitters perfume 30 ml",
      "Doritos 120 g",
      "2 × Red Bull",
      "Warm fairy lights",
      "Happy Birthday card",
      "Burgundy clear-panel gift box",
    ],
    featured: true,
  },
  {
    id: "b19",
    slug: "chocolate-lovers-box",
    name: "Chocolate Lover's Box",
    price: 15500,
    categories: ["for-him"],
    image: "/baskets/chocolate-lovers-box-full.webp",
    summary:
      "Chocolate, gum and something cold — two bars of Lindt with drinks packed in behind a clear panel.",
    contents: [
      "Trident jar",
      "Mentos",
      "2 × Lindt",
      "Wafers",
      "2 × Pepsi",
      "Red Bull",
    ],
  },
  {
    id: "b20",
    slug: "white-rose-balloon-set",
    name: "White Rose & Balloon Set",
    price: 10500,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/white-rose-balloon-set-full.webp",
    summary:
      "A black-wrapped bouquet of white roses, sent with a set of lit bubble balloons finished in matching bows.",
    contents: [
      "White rose bouquet",
      "4 × bow balloons",
    ],
    featured: true,
  },
];

const HANDMADE: Product[] = [
  {
    id: "h1",
    slug: "duckling-plushie-basket",
    name: "Crochet Duckling Chicks",
    price: 550,
    unit: "per chick",
    handmade: true,
    categories: ["crochet"],
    badge: "New",
    image: "/crochet/duck-plushie-set.webp",
    summary:
      "Hand-crocheted ducklings in bonnets and wings — soft, weighted just right, and impossible to put down. Sold individually; pick as many as you like.",
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
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/race-car-keyring.webp",
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
    name: "Crochet Lipgloss Holder",
    price: 750,
    unit: "each",
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/mini-doll-basket.webp",
    summary:
      "A tiny hand-crocheted doll that slips over a lipgloss to keep it safe in your bag — each one dressed differently.",
    contents: [
      "1 × crocheted lipgloss holder",
      "Fits a standard lipgloss tube",
      "Every one dressed differently",
      "Colours and themes on request",
    ],
    featured: true,
  },
  {
    id: "h4",
    slug: "teddy-shadow-box",
    name: "Teddy Shadow Box",
    price: 1200,
    handmade: true,
    categories: ["crochet"],
    badge: "Keepsake",
    image: "/crochet/teddy-shadow-box.webp",
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
    price: 1400,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/crochet-scrunchies.webp",
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
    price: 550,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/octopus-keyring.webp",
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
    price: 750,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/teddy-bear-keyring.webp",
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
    price: 2500,
    handmade: true,
    categories: ["crochet"],
    badge: "Best Seller",
    image: "/crochet/cherry-crossbody-bag.webp",
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
    price: 3000,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/strawberry-pouch.webp",
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
    price: 1100,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/forget-me-not-stems.webp",
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
    price: 500,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/granny-square-purse.webp",
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
    price: 3500,
    handmade: true,
    categories: ["crochet"],
    badge: "Premium",
    image: "/crochet/rose-tulip-bouquet.webp",
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
    price: 350,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/swiss-roll-keyring.webp",
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
    price: 350,
    handmade: true,
    categories: ["crochet"],
    badge: "Popular",
    image: "/crochet/strawberry-keyring.webp",
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
    price: 1400,
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/tulip-vase.webp",
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
    categories: ["for-him"], image: "/products/dry-fruit-basket.webp",
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
    id: "l5", slug: "signature-gift-box", name: "Classic Gift Box", price: 14500,
    categories: ["for-him"], image: "/products/signature-gift-box-catalogue-full.webp",
    summary: "A simple, versatile gift that can be customised for birthdays, celebrations or just because.",
    contents: ["Engine shirt","Jafferjees wallet","Janan Sports mini fragrance","Mini letter bottle","Mini Bounty bar"],
  },
  {
    id: "l6", slug: "gentlemans-essentials-box", name: "Gentleman's Essentials Box", price: 23500,
    categories: ["for-him"], image: "/products/gentlemans-essentials-box-catalogue-full.webp",
    summary: "Everything he reaches for daily, upgraded — shirt, leather goods and a steel bracelet.",
    contents: ["Lama shirt","Jafferjees wallet","Jafferjees card holder","Jafferjees keyring","Stainless steel bracelet"],
  },
  {
    id: "l7", slug: "luxe-green-box", name: "Luxe Gentleman's Tray", price: 38500,
    categories: ["for-him"], badge: "Premium", image: "/products/luxe-green-box-catalogue-full.webp",
    summary: "A statement gift — a luxury watch and sunglasses with an Outfitters knit polo, presented in an acrylic tray. A memorable choice for birthdays and special celebrations.",
    contents: ["Sveston watch","Lacoste sunglasses","Outfitters knit polo"],
  },
  {
    id: "l8", slug: "classic-snack-box", name: "The Snack Box", price: 17500,
    categories: ["for-him"], image: "/products/classic-snack-box-catalogue-full.webp",
    summary: "Snacks and self-care together — the crowd-pleaser of our range.",
    contents: ["6 × Pepsi","Mövenpick coffee","2 × Nom Nachos","Fox's toffee","2 × Pringles","2 × Piper's Gold biscuits","Vaseline lip balm","Nivea lotion","Nivea shaving gel"],
  },
  {
    id: "l9", slug: "cambridge-clothes-box", name: "Essentials Gift Box", price: 24500,
    categories: ["for-him"], image: "/products/cambridge-clothes-box-catalogue-full.webp",
    summary: "A sleek transparent gift box filled with carefully selected essentials. Modern, elegant and perfect for a special surprise.",
    contents: ["Cambridge dress shirt","J. perfume","Nivea face wash","Nivea after-shave lotion"],
  },
  {
    id: "l10", slug: "deluxe-care-basket", name: "Gentleman's Grooming Basket", price: 15000,
    categories: ["for-him"], image: "/products/deluxe-care-basket-catalogue-full.webp",
    summary: "A stylish basket filled with men's grooming essentials, chocolates and drinks, beautifully arranged and finished with a navy bow.",
    contents: ["Nivea Men Protect & Care","Nivea Men face wash","Nivea Men cream","Nivea Men deodorant","2 × Pepsi","Balocco Cubes"],
  },
  {
    id: "l11", slug: "classic-care-basket", name: "The Luxe Men's Tray", price: 11000,
    categories: ["for-him"], image: "/products/classic-care-basket-catalogue-full.webp",
    summary: "A premium navy gift tray featuring carefully selected grooming essentials, drinks and treats.",
    contents: ["Cocoa wafers","Crisp nimko","2 × Pepsi","Nivea lotion","Nivea body wash","Nivea deodorant","Nivea body spray"],
  },
  {
    id: "l12", slug: "birthday-box", name: "Birthday Box", price: 20500,
    categories: ["for-him"], image: "/products/birthday-box-catalogue-full.webp",
    summary: "A refined gift set featuring a polo shirt, a fragrance and carefully selected essentials, presented under a lit Happy Birthday banner.",
    contents: ["Outfitters men's T-shirt","Janan Musk 30 ml","Nivea face wash","Nivea body spray","Nivea face cream","Birthday card"],
  },
  {
    id: "l13", slug: "cougar-shirt-box", name: "The Gentleman's Gift Basket", price: 17500,
    categories: ["for-him"], image: "/products/cougar-shirt-box-catalogue-full.webp",
    summary: "A complete gift basket for him featuring grooming essentials and chocolate, finished with a classic navy-blue bow.",
    contents: ["Cougar shirt","Nivea body spray","Nivea face wash","Janan Sports mini fragrance","Bounty bar","Letter bottle"],
  },
  {
    id: "l14", slug: "mini-treat-box", name: "Mini Treat Box", price: 5000,
    categories: ["for-him"], badge: "Popular", image: "/products/mini-treat-box.webp",
    summary: "Small, sweet and always in stock — perfect as an add-on or a first gift.",
    contents: ["Nike body spray","Pepsi Diet","Piper's Gold biscuits","Vaseline lip balm","2 × Mars bars"],
  },
  {
    id: "l15", slug: "snack-care-box", name: "Especially For You — Men's Box", price: 14500,
    categories: ["for-him"], image: "/products/snack-care-box-catalogue-full.webp",
    summary: "A thoughtfully curated box combining men's grooming essentials with chocolates, biscuits and favourite snacks — the perfect all-in-one gift for him.",
    contents: ["2 × Pepsi Zero","Nom Nachos","Nivea body spray","Nivea cream","Nivea face wash","Piper's Gold biscuits","Vaseline lip balm","Janan perfume","Fox's candy"],
  },
];

/* --------------------------------------------------------------------------
   LATEST DROP — studio photography, categorised by the owner.
   PRICES ARE PLACEHOLDERS (pricePending: true).
   -------------------------------------------------------------------------- */
const LATEST: Product[] = [
  {
    id: "n1",
    slug: "birthday-cupcake-box",
    name: "Birthday Cupcake Box",
    price: 14500,
    categories: ["cakes"],
    badge: "New",
    image: "/cakes/birthday-cupcake-box-full.webp",
    note: "Book 5 days before your desired date.",
    summary:
      "A cake platter under a lit acrylic lid, sent with a rose and baby's breath bouquet — the whole celebration in one delivery.",
    contents: [
      "Cake platter in an acrylic box",
      "Bento cake",
      "7 cupcakes",
      "Rose & baby's breath bouquet",
      "Colours can be customised",
    ],
    featured: true,
  },
  {
    id: "n2",
    slug: "mehndi-celebration-box",
    name: "Mehndi Celebration Box",
    price: 3500,
    categories: ["for-her"],
    badge: "New",
    image: "/baskets/mehndi-celebration-box-full.webp",
    summary:
      "Everything for the mehndi — green glass bangles, jhumkay and sweets in a scalloped white box tied with pink satin.",
    contents: [
      "Jhumkay",
      "Bangles",
      "2 × Ferrero Rocher",
      "Wispy cone",
      "Lollipop",
      "2 × hair catchers",
    ],
    featured: true,
  },
  {
    id: "n3",
    slug: "penguin-anniversary-basket",
    name: "Pink Anniversary Basket",
    price: 19000,
    categories: ["for-her"],
    badge: "Anniversary",
    image: "/baskets/penguin-anniversary-basket-catalogue-full.webp",
    summary:
      "A romantic gift basket filled with a soft plushie, chocolates and thoughtful little surprises, finished with a delicate pink ribbon. A beautiful way to celebrate your special someone.",
    contents: [
      "Miniso plushie",
      "Dove body spray",
      "Dove body lotion",
      "Marshmallows",
      "Jelly",
      "Noms nacho chips",
      "Mogu Mogu",
      "Fox's toffee",
      "Skittles",
      "2 × KitKat",
      "Miniso makeup wipes",
      "Face mask",
      "Anniversary card",
      "Your picture, printed",
    ],
    featured: true,
  },
  {
    id: "n4",
    slug: "pink-pamper-basket",
    name: "Pink Pamper Basket",
    price: 10500,
    categories: ["for-her"],
    image: "/baskets/pink-pamper-basket-full.webp",
    summary:
      "A full self-care afternoon in a basket — hair towel, masks, nails and something sweet, with a crochet keychain for company.",
    contents: [
      "Miniso hair-drying towel",
      "Miniso makeup wipes",
      "Press-on nails",
      "Mirror",
      "Hand cream",
      "Lip gloss",
      "Face mask",
      "Hair catcher",
      "Marshmallows",
      "Astor wafers",
      "Hand-crocheted keychain",
      "Letter bottle",
    ],
    featured: true,
  },
  {
    id: "n5",
    slug: "batman-keyring",
    name: "Batman Keyring",
    price: 900,
    handmade: true,
    categories: ["crochet"],
    badge: "New",
    image: "/crochet/batman-keyring-full.webp",
    summary:
      "A tiny caped crusader in grey and black with a yellow belt — crocheted stitch by stitch and finished with a steel ring.",
    contents: [
      "1 × crocheted Batman figure",
      "Removable cape",
      "Stainless steel keyring",
      "Approx. 10 cm tall",
    ],
  },
  {
    id: "n6",
    slug: "tulip-rose-pot-pair",
    name: "Tulip & Rose Pots",
    price: 1100,
    unit: "per pot",
    handmade: true,
    categories: ["crochet"],
    image: "/crochet/tulip-rose-pot-pair-full.webp",
    summary:
      "Little potted crochet flowers that never wilt — a butter-yellow tulip and a deep red rose in scalloped pots. Sold individually, so take one or take both.",
    contents: [
      "1 × crocheted tulip in a pot",
      "1 × crocheted rose in a pot",
      "Scalloped pot rims, weighted bases",
      "Approx. 18 cm tall",
      "Colours customisable",
    ],
    featured: true,
  },
  {
    id: "n7",
    slug: "chenille-teddy-bear",
    name: "Chenille Teddy Bear",
    price: 2000,
    handmade: true,
    categories: ["plushies", "crochet"],
    badge: "Best Seller",
    image: "/crochet/chenille-teddy-bear-full.webp",
    summary:
      "Worked in soft chenille yarn so it feels like velvet — a proper sit-on-the-bed bear with safety eyes and jointed limbs.",
    contents: [
      "1 × crocheted chenille teddy bear",
      "Safety eyes, securely fastened",
      "Hypoallergenic fill",
      "Approx. 30 cm tall",
      "Colours customisable",
    ],
    featured: true,
  },
  {
    id: "n8",
    slug: "red-anniversary-basket",
    name: "Red Anniversary Basket",
    price: 35000,
    categories: ["for-her"],
    badge: "Anniversary",
    image: "/baskets/red-anniversary-basket-full.webp",
    summary:
      "Our fullest anniversary basket — 26 pieces of imported chocolate, snacks, skincare and self-care, with a Bath & Body Works candle and a hand-crocheted rose, all in deep red.",
    contents: [
      "Miniso plushie",
      "Bath & Body Works candle",
      "Hand-crocheted rose",
      "Dove body spray",
      "Dove body lotion",
      "Head-wrapping towel",
      "Face mask",
      "Press-on nails",
      "Hand cream",
      "Lip gloss",
      "Wipes",
      "Lotus Biscoff",
      "Maltesers",
      "Snickers",
      "2 × KitKat",
      "Skittles",
      "Heart candy",
      "Marshmallows",
      "Jelly",
      "Pringles",
      "Astor biscuits",
      "Chocolate wafers",
      "Wafers",
      "Noms nacho chips",
      "Mogu Mogu",
      "Ramen",
    ],
    featured: true,
  },
  {
    id: "n9",
    slug: "berry-treat-box",
    name: "Berry Treat Box",
    price: 8000,
    categories: ["for-her"],
    image: "/baskets/berry-treat-box-full.webp",
    summary:
      "Snacks and small beauty bits together in a magnetic maroon box — the easy gift when you're not sure what to send.",
    contents: [
      "2 × Macho Nachos",
      "Press-on nails",
      "Heart mirror",
      "Lip gloss",
      "Bystro wafers",
      "Heart candy",
      "Lotus Biscoff",
      "Maltesers",
      "Face mask",
      "Hair catcher",
      "Loacker wafers",
    ],
  },
  {
    id: "n10",
    slug: "dove-pamper-set",
    name: "Dove Pamper Set",
    price: 35000,
    categories: ["for-her"],
    badge: "Premium",
    image: "/baskets/dove-pamper-set-full.webp",
    summary:
      "The full Dove range — wash, hair care, skincare and fragrance — with towels and a loofah, paired with a box of fresh roses.",
    contents: [
      "Fresh rose box",
      "Dove body wash",
      "Dove hair shampoo",
      "Dove conditioner",
      "Dove deodorant",
      "Dove body lotion",
      "Dove soap bar",
      "Dove body spray",
      "Dove hand cream",
      "Dove body cream",
      "Miniso towel",
      "Miniso head band",
      "Hair brush",
      "Loofah",
    ],
    featured: true,
  },
  {
    id: "n11",
    slug: "cosy-clothing-box",
    name: "Cosy Clothing Box",
    price: 17500,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/cosy-clothing-box-full.webp",
    summary:
      "Three Outfitters tees ribbon-tied in a two-tier black box, with a handwritten letter on burnt-edge paper in the lid.",
    contents: [
      "3 × Outfitters T-shirts",
      "Handwritten letter on burnt-edge paper",
      "Satin ribbons in black and blue",
      "Two-tier presentation box",
    ],
    featured: true,
  },
  {
    id: "n12",
    // Slug deliberately left as eid-mubarak-box so the link the owner has been
    // sharing keeps working; the display name is what changed.
    slug: "eid-mubarak-box",
    name: "Energy & Care Box",
    price: 15000,
    categories: ["for-him"],
    image: "/baskets/eid-mubarak-box-full.webp",
    summary:
      "Energy drinks, grooming basics and a run of sweets behind a clear panel — packed and ribboned by hand.",
    contents: [
      "4 × Red Bull",
      "Nivea face wash",
      "Nivea face cream",
      "Nivea body spray",
      "Vaseline",
      "4 × Sour Punk",
      "Fini jelly",
      "2 × Kinder Bueno",
      "Chocolate chip cookies",
    ],
  },
  {
    id: "n13",
    slug: "red-snack-box",
    name: "Red Snack Box",
    price: 12500,
    categories: ["for-him"],
    image: "/baskets/red-snack-box-full.webp",
    summary:
      "Packed corner to corner with imported snacks — including the ramen for anyone who thinks they can handle it.",
    contents: [
      "Macho Nachos",
      "Mellow marshmallows",
      "Astor wafers",
      "2 × Snickers",
      "Bystro wafers",
      "Ramen",
      "Lotus Biscoff",
      "Maltesers",
      "Pringles",
      "Loacker wafers",
    ],
    featured: true,
  },
  {
    id: "n14",
    slug: "birthday-floral-cake",
    name: "Happy Birthday Floral Cake",
    price: 8000,
    categories: ["cakes"],
    badge: "New",
    image: "/cakes/birthday-floral-cake-full.webp",
    summary:
      "A beautiful celebration cake decorated with purple buttercream flowers, butterflies and a personalised birthday message.",
    contents: [
      "Bento cake with your message piped on",
      "7 cupcakes",
      "Buttercream roses & macarons",
      "Butterfly toppers & baby's breath",
      "Colours can be customised",
    ],
    featured: true,
  },
  {
    id: "n15",
    slug: "blue-balloon-cake-box",
    name: "Blue Acrylic Cake Box with Bow Balloons",
    price: 18000,
    categories: ["cakes"],
    badge: "New",
    image: "/cakes/blue-balloon-cake-box-full.webp",
    summary:
      "A dreamy arrangement of clear balloons trimmed with delicate blue bows, over a celebration cake finished in a lit acrylic box.",
    contents: [
      "Bento cake",
      "7 cupcakes",
      "3 bow balloons",
      "Clear acrylic box with fairy lights",
    ],
    featured: true,
  },
  {
    id: "n16",
    slug: "acrylic-chocolate-cake-box",
    name: "Acrylic Cake Box with Chocolates",
    price: 13000,
    categories: ["cakes"],
    image: "/cakes/acrylic-chocolate-cake-box-full.webp",
    summary:
      "A layered German fudge cake dressed with white roses and Dairy Milk bars, finished in a ribboned acrylic box.",
    contents: [
      "Layered German fudge cake",
      "12 × Cadbury Dairy Milk",
      "White roses & red blooms",
      "Clear acrylic box with satin ribbon",
    ],
  },
  {
    id: "n17",
    slug: "crochet-bunny-navy",
    name: "Crochet Bunny in Navy",
    price: 3000,
    handmade: true,
    categories: ["plushies", "crochet"],
    badge: "New",
    image: "/crochet/crochet-bunny-navy-full.webp",
    summary:
      "A handmade white crochet bunny dressed in a cute navy-blue outfit, making a charming keepsake or thoughtful gift.",
    contents: [
      "1 × hand-crocheted bunny",
      "Navy dungarees with a daisy button",
      "Safety eyes, securely fastened",
      "Hypoallergenic fill",
      "Colours customisable",
    ],
    featured: true,
  },
  {
    id: "n18",
    slug: "crochet-bunny-red",
    name: "Crochet Bunny in Red",
    price: 3200,
    handmade: true,
    categories: ["plushies", "crochet"],
    image: "/crochet/crochet-bunny-red-full.webp",
    summary:
      "A soft handmade bunny dressed in a festive red outfit — perfect for birthdays, celebrations or simply making someone smile.",
    contents: [
      "1 × hand-crocheted bunny",
      "Red dungarees and matching bonnet",
      "Cherry detail",
      "Safety eyes, securely fastened",
      "Colours customisable",
    ],
    featured: true,
  },
  {
    id: "n19",
    slug: "crochet-flower-turtle",
    name: "Crochet Flower Turtle",
    price: 3500,
    handmade: true,
    categories: ["plushies", "crochet"],
    image: "/crochet/crochet-flower-turtle-full.webp",
    summary:
      "A handmade crochet turtle decorated with colourful flowers — a sweet keepsake made to last long after the occasion.",
    contents: [
      "1 × hand-crocheted turtle",
      "Crocheted flowers on the shell",
      "Chenille yarn, velvet-soft",
      "Safety eyes, securely fastened",
      "Colours customisable",
    ],
  },
  {
    id: "n20",
    slug: "classic-mens-snack-box",
    name: "The Classic Men's Snack Box",
    price: 14500,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/classic-mens-snack-box-full.webp",
    summary:
      "A fun selection of favourite snacks, chocolates and drinks arranged in a premium gift box. Perfect for the guy who loves good snacks and a thoughtful surprise.",
    contents: [
      "Outfitters knit polo",
      "J. perfume 30 ml",
      "2 × Noms nacho chips",
      "2 × Coca-Cola cans",
      "2 × Piper's Gold biscuits",
      "2 × Twix bars",
      "Mini letter bottle",
    ],
    featured: true,
  },
  {
    id: "n21",
    slug: "batman-gift-box",
    name: "Bat-Man Gift Box",
    price: 10500,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/batman-gift-box-full.webp",
    summary:
      "A birthday-ready gift box filled with snacks, chocolates and drinks, finished with a glowing Happy Birthday banner and our own crochet Batman.",
    contents: [
      "Nivea Men Deep body spray",
      "Nivea Men face cream",
      "Nivea Men face wash",
      "2 × Pepsi Zero",
      "2 × Kurkure Toofani Mirch",
      "Hand-crocheted Batman keyring",
      "2 × Cadbury Moro",
      "Loacker wafers",
    ],
    featured: true,
  },
  {
    id: "n22",
    slug: "eid-dry-fruit-box",
    name: "Eid Dry Fruit Box",
    price: 14000,
    categories: ["for-him", "for-her"],
    badge: "Eid",
    image: "/baskets/eid-dry-fruit-box-full.webp",
    summary:
      "A beautifully arranged selection of premium dry fruits and nuts, presented in an elegant gift box with an Eid Mubarak finish. Perfect for thoughtful festive gifting.",
    contents: [
      "Almonds — 150 g",
      "Cashews — 150 g",
      "Pistachios — 150 g",
      "5 × Ferrero Rocher",
      "Scalloped gift box with Eid Mubarak ribbon",
    ],
  },
  {
    id: "n23",
    slug: "gym-performance-box",
    name: "Gym Performance Box",
    price: 24500,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/gym-performance-box-full.webp",
    summary:
      "Everything for the one who never misses a session — protein, bars and training kit packed into a navy box with a cream bow.",
    contents: [
      "Whey protein",
      "3 × Nutrilov protein bars",
      "2 × Mars",
      "Outfitters activewear shirt",
      "Shaker bottle",
    ],
    featured: true,
  },
  {
    id: "n24",
    slug: "birthday-polo-box",
    name: "Birthday Polo Box",
    price: 21500,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/birthday-polo-box-full.webp",
    summary:
      "A knit polo ribbon-tied beside his grooming line-up and a row of Dairy Milk, under a lit Happy Birthday banner.",
    contents: [
      "Outfitters polo shirt",
      "Janan Sports 30 ml",
      "Nivea face wash",
      "Nivea body spray",
      "Nivea face cream",
      "3 × Cadbury Dairy Milk",
      "Birthday card",
    ],
    featured: true,
  },
  {
    id: "n25",
    slug: "unstitched-suit-box",
    name: "Unstitched Suit Box",
    price: 12500,
    categories: ["for-him"],
    image: "/baskets/unstitched-suit-box-full.webp",
    summary:
      "A J. unstitched suit wrapped and ribboned by hand, with a fragrance and grooming basics alongside it.",
    contents: [
      "J. unstitched suit",
      "Janan perfume 30 ml",
      "Nivea face wash",
      "Birthday card",
    ],
  },
  {
    id: "n26",
    slug: "birthday-wallet-tee-box",
    name: "Birthday Wallet & Tee Box",
    price: 22000,
    categories: ["for-him"],
    badge: "New",
    image: "/baskets/birthday-wallet-tee-box-full.webp",
    summary:
      "A wardrobe piece, a leather wallet and a fragrance boxed together with chocolate and a card to sign.",
    contents: [
      "Outfitters men's T-shirt",
      "Janan Musk 30 ml",
      "Jafferjees wallet",
      "Nivea body spray",
      "3 × Cadbury Dairy Milk",
      "Birthday card",
    ],
    featured: true,
  },
];

export const PRODUCTS: Product[] = [...LATEST, ...BASKETS, ...LEGACY, ...HANDMADE];

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
