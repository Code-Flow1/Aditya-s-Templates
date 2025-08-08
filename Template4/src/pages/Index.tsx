import Seo from "@/components/Seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import heroImg from "@/assets/images/hero-restaurant.jpg";
import dish1 from "@/assets/images/dish-main-1.jpg";
import dish2 from "@/assets/images/dish-main-2.jpg";
import dessert1 from "@/assets/images/dessert-1.jpg";
import starter1 from "@/assets/images/starter-1.jpg";
import interior1 from "@/assets/images/interior-1.jpg";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Seo title="Maison Rouge | Fine Dining Restaurant" description="Elegant modern fine dining. View our menu, book a table, and explore our story." />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[480px] w-full">
          <img
            src={heroImg}
            alt="Maison Rouge elegant dining room"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="relative z-10 h-full container flex flex-col items-start justify-center text-left text-white">
            <h1 className="font-display text-4xl md:text-6xl mb-4 animate-enter">
              An Elegant Modern Fine Dining Experience
            </h1>
            <p className="max-w-xl text-base md:text-lg text-white/90 mb-6 animate-fade-in">
              Discover seasonal tasting menus, curated wines, and impeccable service in a warm, intimate setting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl" aria-label="View Menu">
                <Link to="/menu">View Menu</Link>
              </Button>
              <Button asChild variant="gold" size="xl" aria-label="Book a Table">
                <Link to="/reservations">Book a Table</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Dishes */}
        <section className="container py-16">
          <header className="text-center mb-8">
            <h2 className="font-display text-3xl">Featured Dishes</h2>
            <p className="text-muted-foreground">A taste of what awaits you.</p>
          </header>
          <div className="relative">
            <Carousel className="px-12">
              <CarouselContent>
                {[{src: dish1, title: 'Seared Beef Tenderloin'}, {src: dish2, title: 'Herb Butter Salmon'}, {src: dessert1, title: 'Chocolate Fondant'}, {src: starter1, title: 'Burrata & Heirloom'}].map((d, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <article className="rounded-lg overflow-hidden border bg-card hover-scale">
                      <img src={d.src} alt={`${d.title} at Maison Rouge`} className="w-full h-56 object-cover" loading="lazy" />
                      <div className="p-4">
                        <h3 className="font-medium">{d.title}</h3>
                        <p className="text-sm text-muted-foreground">Elegant plating and seasonal ingredients.</p>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* About */}
        <section className="container py-16 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl mb-3">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              At Maison Rouge, we celebrate craftsmanship and hospitality. Our chefs craft seasonal menus inspired by local farms and global techniques.
            </p>
            <Button asChild variant="link">
              <Link className="story-link" to="/about">Learn more about us</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden border bg-card">
            <img src={interior1} alt="Intimate table setting at Maison Rouge" className="w-full h-72 object-cover" loading="lazy" />
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-secondary/50 py-16">
          <div className="container">
            <header className="text-center mb-8">
              <h2 className="font-display text-3xl">What Guests Say</h2>
              <p className="text-muted-foreground">Kind words from recent diners</p>
            </header>
            <Carousel className="px-12">
              <CarouselContent>
                {[
                  {q: 'An unforgettable meal — refined, warm, and perfectly paced.', a: 'Alexandra R.'},
                  {q: 'The tasting menu was superb. Service was impeccable.', a: 'Michael T.'},
                  {q: 'Ambience, flavors, and wine pairing — all exquisite.', a: 'Serena K.'},
                ].map((t, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <blockquote className="rounded-lg border bg-card p-6 h-full flex flex-col justify-between">
                      <p className="text-lg mb-4">“{t.q}”</p>
                      <footer className="text-sm text-muted-foreground">— {t.a}</footer>
                    </blockquote>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
