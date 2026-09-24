import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/coming-soon";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export const metadata: Metadata = { title: "Colour Visualiser" };

export default function VisualiserPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Studio", href: "/studio" }, { label: "Visualiser" }]} />
      <ComingSoon
        title="See your colours on your walls."
        description="Upload a photo of your room, apply Olympic paint colours, and see the transformation before you commit. Coming soon."
      />
    </>
  );
}
