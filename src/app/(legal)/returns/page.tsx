import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "Olympic Paints returns guidance for samples, materials and supported product requests.",
};

export default function ReturnsPage() {
  return (
    <>
      <header className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Returns</p>
        <h1 className="text-4xl font-serif font-bold text-ink mb-6">Returns Guidance</h1>
        <p className="text-lg text-muted leading-relaxed">
          Returns depend on the nature of the request, whether an item has been tinted, opened, specially prepared or supplied through a partner.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Colour confidence</h2>
        <p className="text-muted leading-relaxed">
          Because colour is personal and light-sensitive, we recommend consultation, samples and material comparison before final project decisions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Eligible returns</h2>
        <p className="text-muted leading-relaxed">
          Where returns are available, items should be unused, unopened and accompanied by proof of purchase or request confirmation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">How to ask</h2>
        <p className="text-muted leading-relaxed">
          Contact Olympic Paints with your details, item information and reason for the return so the team can guide the next step.
        </p>
      </section>
    </>
  );
}
