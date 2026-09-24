import { products } from "@/data/products";
import { colours } from "@/data/colours";
import { collections } from "@/data/collections";
import { inspirations } from "@/data/inspiration";
import { team } from "@/data/team";
import { storeLocations } from "@/data/store-locations";
import { navItems } from "@/data/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <h1 className="text-espresso">Olympic Paints</h1>
      <p className="max-w-prose text-muted">
        Next.js migration scaffold is live. Page content lands in later tasks.
      </p>
      <p className="max-w-prose text-muted">
        {products.length} products, {colours.length} colours, {collections.length} collections,{" "}
        {inspirations.length} inspirations, {team.length} team members, {storeLocations.length} store locations,{" "}
        {navItems.length} nav items.
      </p>
    </main>
  );
}
