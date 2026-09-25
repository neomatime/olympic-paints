import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16 lg:pt-20 lg:grid lg:grid-cols-2">
      <aside className="relative hidden lg:block" aria-hidden="true">
        <div className="sticky top-20 h-[calc(100vh-5rem)] min-h-[560px] overflow-hidden">
          <Image src="/images/colour-cafe/coffee-bar.webp" alt="" fill sizes="50vw" className="object-cover" priority />
          <div className="absolute left-10 bottom-10 right-10 max-w-sm rounded-sm bg-cream/85 px-7 py-6 text-ink backdrop-blur-sm">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] uppercase text-ink/70">
              <span className="w-6 h-px bg-olympic-yellow" />
              The Colour Cafe
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight">
              Enjoy a cup of coffee through a design consultation with us.
            </p>
          </div>
        </div>
      </aside>

      <div className="flex justify-center px-6 py-12 md:py-20 lg:items-center lg:min-h-[calc(100vh-5rem)] lg:px-16">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
