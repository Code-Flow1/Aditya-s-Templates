import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
}

const Seo = ({ title, description }: SeoProps) => {
  useEffect(() => {
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || '');
    } else if (description) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const canonicalHref = window.location.origin + window.location.pathname;
    if (linkCanonical) {
      linkCanonical.href = canonicalHref;
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalHref;
      document.head.appendChild(link);
    }
  }, [title, description]);

  return null;
};

export default Seo;
