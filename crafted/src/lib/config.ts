export const CONFIG = {
  brand: {
    name: "Crafted Gifts Bys",
    short: "Crafted",
    tagline: "Thoughtful Gifts, Made with Love",
    url: "https://craftedgiftsbys.vercel.app",
  },

  /** Google Apps Script Web App URL — orders are written to your Sheet. */
  scriptUrl:
    "https://script.google.com/macros/s/AKfycbxr79LZn5yLUqucllvJX-mqrD-xqubzoM5UXhk_0Ptfime7N7S8zPPDVwTUIVuYydebcA/exec",

  payment: {
    method: "NayaPay",
    name: "Saba Khan",
    number: "0304-5400058",
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
     * There is no flat rate any more. The charge depends on the address and is
     * quoted on WhatsApp once the order is confirmed, so the cart never adds a
     * delivery line — see `delivery: null` in lib/cart.tsx.
     */
    chargeLine:
      "Delivery charges depend on your location and are shared on WhatsApp once your order is confirmed.",
    shortNote: "Islamabad in 3 days · elsewhere 6–7 · delivery quoted on WhatsApp",
    quotedLabel: "Quoted on WhatsApp",
  },

  cakes: {
    leadTime: "Cake orders must be placed at least 1 week before delivery.",
    areas: "Cakes are available in Islamabad & Rawalpindi only.",
    note: "Cake orders must be placed at least 1 week before delivery and are available in Islamabad & Rawalpindi only.",
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
