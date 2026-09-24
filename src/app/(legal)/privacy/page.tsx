import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Olympic Paints privacy policy for website enquiries and consultation requests.",
};

export default function PrivacyPage() {
  return (
    <>
      <header className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Privacy</p>
        <h1 className="text-4xl font-serif font-bold text-ink mb-6">Privacy Policy</h1>
        <p className="text-lg text-muted leading-relaxed">
          This policy explains how Olympic Paints handles information shared through website enquiries, consultation requests and digital interactions.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Information we collect</h2>
        <p className="text-muted leading-relaxed">
          We may collect your name, contact details, project focus, message content and basic website usage information so we can respond helpfully and improve the experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">How we use information</h2>
        <p className="text-muted leading-relaxed">
          Information is used to respond to enquiries, support consultations, guide store requests, improve service quality and maintain website security.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Sharing information</h2>
        <p className="text-muted leading-relaxed">
          We do not sell personal information. Information may be shared with trusted service partners only where needed to respond to your request or operate the website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-bold text-ink mb-4">Your choices</h2>
        <p className="text-muted leading-relaxed">
          You may request access, correction or deletion of personal information by contacting Olympic Paints through the contact page.
        </p>
      </section>
    </>
  );
}
