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
    number: "0327-5023235",
  },

  contact: {
    whatsappNumber: "923275023235",
    whatsappDisplay: "+92 327 5023235",
    instagram: "https://www.instagram.com/craftedgiftsbys/",
    instagramHandle: "craftedgiftsbys",
    email: "craftedgiftsbys@gmail.com",
  },

  fulfilment: {
    pickupArea: "E-11, Islamabad",
    pickupLine: "Pickup available in E-11, Islamabad.",
    urgentLine: "Urgent orders available. Extra charges apply.",
    readyIn: "Usually ready in 24 hours",
  },

  currency: "Rs.",
  freeDeliveryOver: 2499,
  deliveryFee: 200,
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${CONFIG.contact.whatsappNumber}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
