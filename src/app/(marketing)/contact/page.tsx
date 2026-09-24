import type { Metadata } from "next";
import { ContactPageClient } from "./contact-page-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Olympic Paints for colour consultation, Colour Cafe visits, store guidance and home transformation support.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
