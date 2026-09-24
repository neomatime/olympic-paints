import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Information",
  description: "Olympic Paints shipping information for samples, consultation materials and supported product enquiries.",
};

export default function ShippingPage() {
  return (
    <>
      <header className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Shipping</p>
        <h1 className="text-4xl font-serif font-bold text-ink mb-6">Shipping Information</h1>
        <p className="text-lg text-muted leading-relaxed">
          Shipping details may apply to samples, consultation materials or supported product requests where fulfilment is available.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Delivery areas</h2>
        <p className="text-muted leading-relaxed">
          Delivery availability depends on product type, destination and service partner coverage within South Africa.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Timing</h2>
        <p className="text-muted leading-relaxed">
          Estimated timing is shared during the enquiry or order process and may vary by location, stock availability and project needs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Collection</h2>
        <p className="text-muted leading-relaxed">
          Some requests may be better handled through a store, partner location or Colour Cafe visit where guidance can be provided in person.
        </p>
      </section>
    </>
  );
}
