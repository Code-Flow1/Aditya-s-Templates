import Seo from "@/components/Seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import interior1 from "@/assets/images/interior-1.jpg";
import dish1 from "@/assets/images/dish-main-1.jpg";
import dish2 from "@/assets/images/dish-main-2.jpg";
import dessert1 from "@/assets/images/dessert-1.jpg";
import dishTop from "@/assets/images/dish-top-1.jpg";
import drink1 from "@/assets/images/drink-1.jpg";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Item { src: string; category: 'Food' | 'Interior' | 'Drinks' | 'Desserts'; alt: string }

const ITEMS: Item[] = [
  { src: dish1, category: 'Food', alt: 'Beef Tenderloin' },
  { src: dish2, category: 'Food', alt: 'Herb Butter Salmon' },
  { src: dishTop, category: 'Food', alt: 'Truffle Pasta' },
  { src: dessert1, category: 'Desserts', alt: 'Chocolate Fondant' },
  { src: drink1, category: 'Drinks', alt: 'Negroni Cocktail' },
  { src: interior1, category: 'Interior', alt: 'Dining Room' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<'All' | Item['category']>('All');
  const categories: Array<'All' | Item['category']> = ['All', 'Food', 'Desserts', 'Drinks', 'Interior'];
  const visible = filter === 'All' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <>
      <Seo title="Gallery | Maison Rouge" description="Browse our food, interior, and drink gallery." />
      <SiteHeader />
      <main className="container py-10">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl">Gallery</h1>
          <p className="text-muted-foreground">Explore moments from our dining room and kitchen.</p>
        </header>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((c) => (
            <Button key={c} variant={c === filter ? 'gold' : 'secondary'} onClick={() => setFilter(c)}>{c}</Button>
          ))}
        </div>

        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {visible.map((i, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <button className="rounded-lg overflow-hidden border hover-scale" aria-label={`Open ${i.alt}`}>
                  <img src={i.src} alt={`${i.alt} at Maison Rouge`} className="h-48 w-full object-cover" loading="lazy" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-0 border-0 overflow-hidden">
                <img src={i.src} alt={i.alt} className="w-full h-auto" />
              </DialogContent>
            </Dialog>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
