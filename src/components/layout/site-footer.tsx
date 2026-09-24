import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-cream/80">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <Link href="/" aria-label="Olympic Paints home">
            <Image src="/images/logo.png" alt="Olympic Paints" width={48} height={48} className="rounded-full mb-4" />
          </Link>
          <p className="text-sm leading-relaxed text-cream/50">
            Olympic Paints blends simple lines, honest materials, and refined details to create interiors that feel calm, personal, and grounded. Since 1981.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
            <Link href="/collections" className="hover:text-cream transition-colors">Colours</Link>
            <Link href="/products" className="hover:text-cream transition-colors">Products</Link>
            <Link href="/inspiration" className="hover:text-cream transition-colors">Inspiration</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">Explore</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/colour-cafe" className="hover:text-cream transition-colors">Colour Cafe</Link>
            <Link href="/our-story" className="hover:text-cream transition-colors">Our Story</Link>
            <Link href="/find-a-store" className="hover:text-cream transition-colors">Find a Store</Link>
            <Link href="/contact" className="hover:text-cream transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">Get in Touch</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="tel:+27118571045" className="hover:text-cream transition-colors">(011) 857 1045</a>
            <a href="mailto:info@olympicpaints.co.za" className="hover:text-cream transition-colors">info@olympicpaints.co.za</a>
            <p className="text-cream/30 text-xs leading-relaxed mt-2">
              28 Mecca Rd, Lenasia, 1827<br />Gauteng, South Africa
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-cream/30 max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Olympic Paints. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="/privacy" className="hover:text-cream/60 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-cream/60 transition-colors">Terms</Link>
          <Link href="/shipping" className="hover:text-cream/60 transition-colors">Shipping</Link>
          <Link href="/returns" className="hover:text-cream/60 transition-colors">Returns</Link>
        </div>
      </div>
    </footer>
  );
}
