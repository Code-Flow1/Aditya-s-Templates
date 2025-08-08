import Seo from "@/components/Seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Placeholder() {
  return (
    <>
      <Seo title="Page | Maison Rouge" />
      <SiteHeader />
      <main className="container py-10">
        <h1 className="font-display text-4xl">Page</h1>
      </main>
      <SiteFooter />
    </>
  );
}
