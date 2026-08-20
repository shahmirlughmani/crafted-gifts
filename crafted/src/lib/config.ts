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
    readyIn: "Gifts ready in 4–5 days",
  },

  delivery: {
    /** Flat inDrive charge inside the twin cities. */
    localFee: 1200,
    localAreas: "Islamabad & Rawalpindi",
    localLine: "Rs. 1,200 flat within Islamabad & Rawalpindi",
    /** Everywhere else ships via TCS and is quoted after the order. */
    outsideLine:
      "Outside the twin cities we ship via TCS. The Rs. 1,200 covers the minimum TCS rate for 2–3 kg — if your order is heavier we'll message you the exact charge from the TCS rate card before dispatch.",
    shortNote: "Rs. 1,200 delivery · heavier out-of-city orders quoted after",
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
