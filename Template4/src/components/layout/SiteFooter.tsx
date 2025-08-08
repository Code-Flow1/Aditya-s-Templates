import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-display text-lg mb-3">Maison <span className="text-primary">Rouge</span></h3>
          <p className="text-sm text-muted-foreground">An elegant modern fine dining experience in the heart of the city.</p>
          <div className="flex gap-3 mt-4">
            <a className="hover:text-primary" href="#" aria-label="Instagram"><Instagram /></a>
            <a className="hover:text-primary" href="#" aria-label="Facebook"><Facebook /></a>
            <a className="hover:text-primary" href="#" aria-label="Twitter"><Twitter /></a>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:underline" to="/menu">Menu</Link></li>
            <li><Link className="hover:underline" to="/reservations">Reservations</Link></li>
            <li><Link className="hover:underline" to="/about">About Us</Link></li>
            <li><Link className="hover:underline" to="/gallery">Gallery</Link></li>
            <li><Link className="hover:underline" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> 123 Grand Avenue, City</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> bookings@maisonrouge.com</li>
            <li>Open: Tue–Sun, 17:00–23:00</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Join our newsletter for seasonal menus and events.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}
            className="flex gap-2"
          >
            <input
              required
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-md border px-3 py-2 bg-background"
              aria-label="Email address"
            />
            <Button type="submit" variant="gold">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maison Rouge. All rights reserved.
      </div>
    </footer>
  );
}
