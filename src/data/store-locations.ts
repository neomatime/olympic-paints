import type { StoreLocation } from "@/types";

// Centurion Mall address and hours are from its Google Business listing (2026-09-25).
// Lenasia HQ hours are still placeholders — confirm with the client.
// Mall of the South address/hours are omitted until confirmed; the store card hides them.
export const storeLocations: StoreLocation[] = [
  {
    id: "lenasia-hq",
    name: "Olympic Paints Headquarters & Colour Cafe",
    address: "28 Mecca Rd",
    city: "Lenasia",
    province: "Gauteng",
    postalCode: "1827",
    phone: "(011) 857 1045",
    email: "info@olympicpaints.co.za",
    coordinates: { lat: -26.3336, lng: 27.8462 },
    hours: [
      { day: "Monday - Friday", open: "08:00", close: "17:00" },
      { day: "Saturday", open: "08:00", close: "13:00" },
      { day: "Sunday", open: "Closed", close: "Closed" },
    ],
  },
  {
    id: "centurion-mall",
    name: "Olympic Colour Cafe — Centurion Mall",
    address: "Shop 312 F, Centurion Mall, 1269 Gordon Hood Rd",
    city: "Centurion",
    province: "Gauteng",
    postalCode: "0157",
    phone: "(011) 857 1045",
    email: "info@olympicpaints.co.za",
    coordinates: { lat: -25.8601, lng: 28.1875 },
    hours: [
      { day: "Monday - Thursday", open: "09:00", close: "19:00" },
      { day: "Friday", open: "09:00", close: "20:00" },
      { day: "Saturday", open: "08:00", close: "18:00" },
      { day: "Sunday", open: "09:00", close: "17:00" },
    ],
  },
  {
    id: "mall-of-the-south",
    name: "Olympic Paints Colour Cafe — Mall of the South",
    city: "Johannesburg South",
    province: "Gauteng",
    phone: "(011) 857 1045",
    email: "info@olympicpaints.co.za",
    coordinates: { lat: -26.287, lng: 28.0743 },
  },
];
