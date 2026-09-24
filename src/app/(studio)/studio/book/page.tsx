import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/coming-soon";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export const metadata: Metadata = { title: "Book a Consultation" };

export default function BookPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Studio", href: "/studio" }, { label: "Book a Consultation" }]} />
      <ComingSoon
        title="Book a design consultation."
        description="Choose your date, share your brief, and sit down with an Olympic Paints interior designer. Enjoy a cup of coffee through a design consultation with us. Coming soon."
      />
    </>
  );
}
