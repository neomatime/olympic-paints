"use client";

import { SectionHeading } from "./section-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="py-32 px-6 text-center max-w-xl mx-auto">
      <SectionHeading eyebrow="Coming Soon" eyebrowColor="gold" title={title} description={description} centered />
      <form className="mt-8 flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <Input label="" placeholder="Your email" type="email" aria-label="Email for updates" className="flex-1" />
        <Button variant="primary" type="submit">Notify Me</Button>
      </form>
    </section>
  );
}
