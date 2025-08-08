import Seo from "@/components/Seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import starter1 from "@/assets/images/starter-1.jpg";
import dish1 from "@/assets/images/dish-main-1.jpg";
import dish2 from "@/assets/images/dish-main-2.jpg";
import dessert1 from "@/assets/images/dessert-1.jpg";
import drink1 from "@/assets/images/drink-1.jpg";
import { useState } from "react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  title: string;
  price: number;
  img: string;
  desc: string;
  category: "Starters" | "Mains" | "Desserts" | "Drinks";
}

const ITEMS: MenuItem[] = [
  { id: 's1', title: 'Burrata & Heirloom', price: 14, img: starter1, desc: 'Basil oil, balsamic pearls', category: 'Starters' },
  { id: 'm1', title: 'Beef Tenderloin', price: 34, img: dish1, desc: 'Red wine reduction, roasted roots', category: 'Mains' },
  { id: 'm2', title: 'Herb Butter Salmon', price: 29, img: dish2, desc: 'Asparagus, lemon zest', category: 'Mains' },
  { id: 'd1', title: 'Chocolate Fondant', price: 12, img: dessert1, desc: 'Vanilla ice cream, gold leaf', category: 'Desserts' },
  { id: 'dr1', title: 'Negroni', price: 11, img: drink1, desc: 'Classic with orange twist', category: 'Drinks' },
];

export default function MenuPage() {
  const [order, setOrder] = useState<Record<string, number>>({});

  const addToOrder = (id: string) => {
    setOrder((o) => ({ ...o, [id]: (o[id] || 0) + 1 }));
    const item = ITEMS.find(i => i.id === id);
    toast.success(`${item?.title} added to order`);
  };

  const total = Object.entries(order).reduce((sum, [id, qty]) => {
    const item = ITEMS.find(i => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const categories = ["Starters", "Mains", "Desserts", "Drinks"] as const;

  return (
    <>
      <Seo title="Menu | Maison Rouge" description="Explore our seasonal menu: starters, mains, desserts, and drinks." />
      <SiteHeader />
      <main className="container py-10">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl">Menu</h1>
          <p className="text-muted-foreground">Seasonal ingredients and elegant plating.</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {categories.map((cat) => (
              <section key={cat} aria-labelledby={`heading-${cat}`}>
                <h2 id={`heading-${cat}`} className="font-display text-2xl mb-4">{cat}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {ITEMS.filter(i => i.category === cat).map((i) => (
                    <article key={i.id} className="rounded-lg overflow-hidden border bg-card flex flex-col">
                      <img src={i.img} alt={`${i.title} - ${i.desc}`} className="h-44 w-full object-cover" loading="lazy" />
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-medium">{i.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{i.desc}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="font-medium">${i.price.toFixed(2)}</span>
                          <Button variant="gold" onClick={() => addToOrder(i.id)}>Add to Order</Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="h-max rounded-lg border bg-card p-5 sticky top-24">
            <h3 className="font-display text-xl mb-3">Your Order</h3>
            {Object.keys(order).length === 0 ? (
              <p className="text-sm text-muted-foreground">Your order is empty.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {Object.entries(order).map(([id, qty]) => {
                  const item = ITEMS.find(i => i.id === id)!;
                  return (
                    <li key={id} className="flex justify-between">
                      <span>{item.title} × {qty}</span>
                      <span>${(item.price * qty).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="border-t mt-4 pt-4 flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <Button className="mt-4 w-full" variant="hero" disabled={total === 0} onClick={() => toast.success('Order started — we will confirm at the table.')}>Start Order</Button>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
