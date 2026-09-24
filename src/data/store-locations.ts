import type { StoreLocation } from "@/types";

// HQ address/phone/email extracted verbatim from the site footer (present on every page)
// and contact.html. Hours are not published anywhere on the existing site, so standard
// SA retail hours are used as a reasonable placeholder (flagged in the task report).
// Centurion Mall and Mall of the South are named as "Now Open" Colour Cafe branches in
// find-a-store.html, but that page gives no street address, phone, email or hours for
// either branch — only the mall name and city. Coordinates below are the real,
// publicly-known coordinates of those two shopping malls (approximate mall centroids),
// not scraped from the site.
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
    name: "Olympic Paints Colour Cafe — Centurion Mall",
    address: "Centurion Mall",
    city: "Centurion",
    province: "Gauteng",
    postalCode: "0157",
    phone: "(011) 857 1045",
    email: "info@olympicpaints.co.za",
    coordinates: { lat: -25.8601, lng: 28.1875 },
    hours: [
      { day: "Monday - Saturday", open: "09:00", close: "18:00" },
      { day: "Sunday", open: "09:00", close: "15:00" },
    ],
  },
  {
    id: "mall-of-the-south",
    name: "Olympic Paints Colour Cafe — Mall of the South",
    address: "Mall of the South",
    city: "Johannesburg South",
    province: "Gauteng",
    postalCode: "2091",
    phone: "(011) 857 1045",
    email: "info@olympicpaints.co.za",
    coordinates: { lat: -26.287, lng: 28.0743 },
    hours: [
      { day: "Monday - Saturday", open: "09:00", close: "18:00" },
      { day: "Sunday", open: "09:00", close: "15:00" },
    ],
  },
];
