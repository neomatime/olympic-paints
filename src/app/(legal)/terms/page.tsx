import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Olympic Paints website terms and conditions.",
};

export default function TermsPage() {
  return (
    <>
      <header className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Terms</p>
        <h1 className="text-4xl font-serif font-bold text-ink mb-6">Website Terms</h1>
        <p className="text-lg text-muted leading-relaxed">
          These terms govern use of the Olympic Paints website and digital content.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Design guidance</h2>
        <p className="text-muted leading-relaxed">
          Website content is provided for inspiration and general guidance. Final product selection should consider your specific surface, environment and project requirements.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Content ownership</h2>
        <p className="text-muted leading-relaxed">
          Brand assets, copy, images, design elements and website content belong to Olympic Paints or their respective licensors and may not be reused without permission.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Website availability</h2>
        <p className="text-muted leading-relaxed">
          We aim to keep the website available and accurate, but access may change for maintenance, updates or operational reasons.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">External links</h2>
        <p className="text-muted leading-relaxed">
          Links to third-party websites are provided for convenience. Olympic Paints is not responsible for third-party content or policies.
        </p>
      </section>
    </>
  );
}
