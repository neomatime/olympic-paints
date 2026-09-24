import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Legal" }]} />
      <ScrollReveal>
        <div className="max-w-3xl mx-auto px-6 py-24">
          <article className="prose prose-sm prose-neutral max-w-none">
            {children}
          </article>
        </div>
      </ScrollReveal>
    </>
  );
}
