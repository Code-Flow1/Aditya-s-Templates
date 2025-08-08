import Seo from "@/components/Seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data) as Record<string, string>;
    const nextErrors: Record<string, string> = {};

    if (!values.name || values.name.length < 2) nextErrors.name = 'Please enter your name';
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email';
    if (!values.message || values.message.length < 10) nextErrors.message = 'Message should be at least 10 characters';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      toast.success('Message sent! We\'ll get back to you.');
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <Seo title="Contact | Maison Rouge" description="Get in touch with Maison Rouge. Find our location and opening hours." />
      <SiteHeader />
      <main className="container py-10">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl">Contact</h1>
          <p className="text-muted-foreground">We'd love to hear from you.</p>
        </header>

        <section className="grid gap-8 md:grid-cols-2 items-start">
          <div className="rounded-lg overflow-hidden border">
            <iframe
              title="Maison Rouge Map"
              src="https://maps.google.com/maps?q=Paris&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-80"
              loading="lazy"
            />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-display text-2xl mb-3">Send a Message</h2>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="name">Name</label>
                <input className="w-full rounded-md border bg-background px-3 py-2" id="name" name="name" required />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="email">Email</label>
                <input className="w-full rounded-md border bg-background px-3 py-2" id="email" name="email" type="email" required />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="message">Message</label>
                <textarea className="w-full rounded-md border bg-background px-3 py-2" id="message" name="message" rows={5} required />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" variant="hero">Send</Button>
            </form>

            <div className="mt-6 text-sm space-y-2">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/> 123 Grand Avenue, City</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4"/> +1 (555) 123-4567</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4"/> bookings@maisonrouge.com</p>
              <p>Open: Tue–Sun, 17:00–23:00</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
