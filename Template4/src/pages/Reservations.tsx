import Seo from "@/components/Seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ReservationsPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data) as Record<string, string>;
    const nextErrors: Record<string, string> = {};

    if (!values.date) nextErrors.date = 'Please choose a date';
    if (!values.time) nextErrors.time = 'Please choose a time';
    const guests = Number(values.guests || 0);
    if (!guests || guests < 1) nextErrors.guests = 'Guests must be at least 1';
    if (!values.name || values.name.length < 2) nextErrors.name = 'Please enter your full name';
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email';
    if (values.phone && !/^[0-9+()\-\s]{7,}$/.test(values.phone)) nextErrors.phone = 'Enter a valid phone number';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      toast.success('Reservation request submitted! We\'ll contact you shortly.');
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <Seo title="Reservations | Maison Rouge" description="Book a table at Maison Rouge. Reserve your date, time, and guests." />
      <SiteHeader />
      <main className="container py-10">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl">Book a Table</h1>
          <p className="text-muted-foreground">Reserve your dining experience with us.</p>
        </header>
        <section className="mx-auto max-w-2xl rounded-lg border bg-card p-6">
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm mb-1" htmlFor="date">Date</label>
              <input className="w-full rounded-md border bg-background px-3 py-2" type="date" id="date" name="date" required />
              {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="time">Time</label>
              <input className="w-full rounded-md border bg-background px-3 py-2" type="time" id="time" name="time" required />
              {errors.time && <p className="text-sm text-destructive mt-1">{errors.time}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="guests">Guests</label>
              <input className="w-full rounded-md border bg-background px-3 py-2" type="number" id="guests" name="guests" min={1} max={12} required />
              {errors.guests && <p className="text-sm text-destructive mt-1">{errors.guests}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="name">Name</label>
              <input className="w-full rounded-md border bg-background px-3 py-2" type="text" id="name" name="name" placeholder="Full name" required />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <input className="w-full rounded-md border bg-background px-3 py-2" type="email" id="email" name="email" placeholder="you@example.com" required />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="phone">Phone</label>
              <input className="w-full rounded-md border bg-background px-3 py-2" type="tel" id="phone" name="phone" placeholder="+1 555 123 4567" />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="notes">Notes</label>
              <textarea className="w-full rounded-md border bg-background px-3 py-2" id="notes" name="notes" rows={4} placeholder="Allergies, special requests..."></textarea>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" variant="hero" className="w-full">Request Reservation</Button>
            </div>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
