/**
 * Delivery charges by destination.
 *
 * Islamabad and Rawalpindi are delivered by our own rider at a flat rate.
 * Everywhere else ships by TCS from Islamabad, and the charge follows TCS's
 * zone pricing: major cities, secondary cities, remote areas.
 *
 * THE ZONE FIGURES ARE ESTIMATES. Neither TCS nor Leopards publishes a per-city
 * rate card online (the TCS "rate calculator" is a contact form), so these come
 * from third-party rate guides for a ~3 kg parcel, which is what a typical gift
 * box weighs. The owner should correct them from real TCS bookings — they live
 * in one place, here, and nothing else needs to change.
 */

export type Zone = "twin" | "major" | "secondary" | "remote";

/** What the customer pays for delivery to each zone, in rupees. */
export const ZONE_FEES: Record<Zone, number> = {
  twin: 1000, // Islamabad & Rawalpindi — own rider, flat
  major: 1600, // TCS to a major city, ~3 kg
  secondary: 1900, // TCS to a secondary city, ~3 kg
  remote: 2300, // TCS to a remote / hill area, ~3 kg
};

export const ZONE_LABEL: Record<Zone, string> = {
  twin: "Islamabad & Rawalpindi",
  major: "Major city via TCS",
  secondary: "Secondary city via TCS",
  remote: "Remote area via TCS",
};

/** Cakes are made fresh and only travel with our own rider. */
export const CAKE_CITIES = ["Islamabad", "Rawalpindi"] as const;

/** Every city in the checkout dropdown, grouped so the list reads naturally. */
export const CITY_ZONES: Record<string, Zone> = {
  // own rider
  Islamabad: "twin",
  Rawalpindi: "twin",

  // major — TCS hubs, overnight
  Lahore: "major",
  Karachi: "major",
  Faisalabad: "major",
  Multan: "major",
  Peshawar: "major",
  Gujranwala: "major",
  Sialkot: "major",
  Hyderabad: "major",
  Quetta: "major",

  // secondary — larger district cities
  Abbottabad: "secondary",
  Bahawalpur: "secondary",
  Sargodha: "secondary",
  Sukkur: "secondary",
  Gujrat: "secondary",
  Sheikhupura: "secondary",
  Jhelum: "secondary",
  "Mandi Bahauddin": "secondary",
  Okara: "secondary",
  Sahiwal: "secondary",
  Kasur: "secondary",
  "Rahim Yar Khan": "secondary",
  "Dera Ghazi Khan": "secondary",
  Mardan: "secondary",
  Mingora: "secondary",
  Kohat: "secondary",
  Nowshera: "secondary",
  Attock: "secondary",
  Chakwal: "secondary",
  Wah: "secondary",
  Taxila: "secondary",
  Murree: "secondary",
  Larkana: "secondary",
  Nawabshah: "secondary",
  "Mirpur Khas": "secondary",
  Mirpur: "secondary",
  Muzaffarabad: "secondary",
  Hafizabad: "secondary",
  Jhang: "secondary",
  Vehari: "secondary",
  Burewala: "secondary",
  Khanewal: "secondary",
  Bahawalnagar: "secondary",
  Muzaffargarh: "secondary",
  "Toba Tek Singh": "secondary",
  Narowal: "secondary",
  Daska: "secondary",
  Chiniot: "secondary",
  "Mian Channu": "secondary",
  Khushab: "secondary",
  Mianwali: "secondary",
  Bhakkar: "secondary",
  Layyah: "secondary",
  Lodhran: "secondary",
  Pakpattan: "secondary",
  Haripur: "secondary",
  Mansehra: "secondary",
  Swabi: "secondary",
  Charsadda: "secondary",
  "Dera Ismail Khan": "secondary",
  Bannu: "secondary",
  Jacobabad: "secondary",
  Shikarpur: "secondary",
  Khairpur: "secondary",
  Dadu: "secondary",
  Badin: "secondary",
  Thatta: "secondary",
  Jamshoro: "secondary",

  // remote — far, hill or difficult-access
  Gilgit: "remote",
  Skardu: "remote",
  Hunza: "remote",
  Chitral: "remote",
  Gwadar: "remote",
  Turbat: "remote",
  Khuzdar: "remote",
  Zhob: "remote",
  Loralai: "remote",
  Chaman: "remote",
  Sibi: "remote",
  Parachinar: "remote",
  Timergara: "remote",
  Kotli: "remote",
  Bagh: "remote",
  Rawalakot: "remote",
};

/** Alphabetical, with the twin cities pinned to the top. */
export const CITIES: string[] = [
  "Islamabad",
  "Rawalpindi",
  ...Object.keys(CITY_ZONES)
    .filter((c) => CITY_ZONES[c] !== "twin")
    .sort((a, b) => a.localeCompare(b)),
];

/** Shown as the last option; the charge is settled on WhatsApp. */
export const OTHER_CITY = "Other city";

export const zoneOf = (city: string): Zone | null => CITY_ZONES[city] ?? null;

/** Delivery charge for a city, or null when it has to be quoted. */
export const deliveryFor = (city: string): number | null => {
  const z = zoneOf(city);
  return z ? ZONE_FEES[z] : null;
};

export const cakesDeliverTo = (city: string): boolean =>
  (CAKE_CITIES as readonly string[]).includes(city);
