import Seo from "@/components/Seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import chef1 from "@/assets/images/chef-1.jpg";
import chef2 from "@/assets/images/chef-2.jpg";
import interior1 from "@/assets/images/interior-1.jpg";
import dishTop from "@/assets/images/dish-top-1.jpg";
import dessert1 from "@/assets/images/dessert-1.jpg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function AboutPage() {
  const gallery = [interior1, dishTop, dessert1];
  return (
    <>
      <Seo title="About Us | Maison Rouge" description="Our story, chefs, and awards at Maison Rouge." />
      <SiteHeader />
      <main className="container py-10">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl">Our Story</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Rooted in craftsmanship and hospitality, Maison Rouge brings seasonal flavors and refined techniques together in an intimate, elegant setting.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 items-start mb-12">
          <article className="rounded-lg border bg-card p-6">
            <h2 className="font-display text-2xl mb-3">The Kitchen</h2>
            <p className="text-muted-foreground">Led by a passionate team, our kitchen crafts tasting menus that evolve with the seasons. We seek balance between innovation and comfort, always honoring the ingredient.</p>
          </article>
          <article className="rounded-lg border bg-card p-6">
            <h2 className="font-display text-2xl mb-3">Accolades</h2>
            <ul className="space-y-2 text-sm">
              <li>• City Dining Awards – Restaurant of the Year (2024)</li>
              <li>• Best Wine Program – Somm Journal (2023)</li>
              <li>• Top 100 Restaurants – Food & Travel (2023)</li>
            </ul>
          </article>
        </section>

        <section className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg overflow-hidden border">
            <img src={chef1} alt="Head Chef portrait" className="w-full h-80 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="font-medium">Chef Antoine</h3>
              <p className="text-sm text-muted-foreground">Executive Chef — French technique, global inspiration.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border">
            <img src={chef2} alt="Pastry Chef portrait" className="w-full h-80 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="font-medium">Chef Amélie</h3>
              <p className="text-sm text-muted-foreground">Pastry Chef — delicate textures, bold flavors.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-4">Gallery Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map((src, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <button className="rounded-lg overflow-hidden border hover-scale" aria-label="Open image">
                    <img src={src} alt={`Maison Rouge highlight ${i+1}`} className="h-48 w-full object-cover" loading="lazy" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 border-0 overflow-hidden">
                  <img src={src} alt={`Maison Rouge highlight ${i+1}`} className="w-full h-auto" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
