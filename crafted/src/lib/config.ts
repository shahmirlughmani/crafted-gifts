export const CONFIG = {
  brand: {
    name: "Crafted Gifts by S",
    short: "Crafted",
    tagline: "Thoughtful Gifts, Made with Love",
    // Must be the domain that actually serves the site: the Share button, the
    // sitemap, robots.txt and every link preview are built from this.
    url: "https://crafted-giftss.vercel.app",
  },

  /** Google Apps Script Web App URL — orders are written to your Sheet. */
  scriptUrl:
    "https://script.google.com/macros/s/AKfycbxr79LZn5yLUqucllvJX-mqrD-xqubzoM5UXhk_0Ptfime7N7S8zPPDVwTUIVuYydebcA/exec",

  payment: {
    method: "Bank transfer",
    bank: "MCB",
    name: "SABA KHAN",
    number: "1729288611004257",
    numberLabel: "Account number",
  },

  contact: {
    whatsappNumber: "923275023235",
    whatsappDisplay: "+92 327 5023235",
    instagram: "https://www.instagram.com/craftedgiftsbys/",
    instagramDm: "https://ig.me/m/craftedgiftsbys",
    instagramHandle: "craftedgiftsbys",
    email: "craftedgiftsbys@gmail.com",
  },

  fulfilment: {
    pickupArea: "E-11, Islamabad",
    pickupLine: "Pickup available in E-11, Islamabad.",
    urgentLine: "Urgent orders depend on the queue and the city — just ask.",
    readyIn: "Every order is prepared and packed by hand",
    /** Orders are only put into the queue once payment has cleared. */
    advanceLine: "Orders are confirmed only after full advance payment.",
  },

  delivery: {
    localAreas: "Islamabad",
    localLine: "Islamabad — delivery within 3 days",
    outsideAreas: "Outside Islamabad",
    outsideLine: "Outside Islamabad — delivery within 6–7 days",
    /**
     * Islamabad & Rawalpindi are a flat Rs. 1,000 by our own rider. Everywhere
     * else goes by TCS at a zone rate — see src/data/delivery.ts. The cart
     * can't know the city yet, so it shows "worked out at checkout"; checkout
     * computes the real figure from the chosen city.
     */
    chargeLine:
      "Islamabad & Rawalpindi Rs. 1,000 flat. Other cities ship by TCS from Islamabad and the charge is added at checkout from your city.",
    shortNote: "Islamabad in 3 days · elsewhere 6–7 by TCS · delivery added at checkout",
    quotedLabel: "Worked out at checkout",
  },

  cakes: {
    leadTime: "Cake orders must be placed at least 1 week before delivery.",
    areas: "Cakes are available in Islamabad & Rawalpindi only.",
    note: "Cake orders must be placed at least 1 week before delivery and are available in Islamabad & Rawalpindi only.",
  },

  /**
   * Visitor tracking. Both are OFF until an id is pasted in — leave them empty
   * and no script is loaded at all.
   *   metaPixelId — Meta Events Manager > Data Sources > your pixel (a number)
   *   ga4Id       — Google Analytics > Admin > Data Streams (looks like G-XXXXXXX)
   */
  analytics: {
    metaPixelId: "",
    ga4Id: "",
  },

  currency: "Rs.",
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${CONFIG.contact.whatsappNumber}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;

/**
 * Instagram DMs can't be pre-filled from a link, so callers that need to send
 * order details copy the text to the clipboard first and open the thread.
 */
export const igDm = () => CONFIG.contact.instagramDm;
