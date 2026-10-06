import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_SEO = {
  '/': {
    title: 'Galaxy Marble | Handcrafted Marble Mandirs, Temples, Basins & Luxury Stone Art',
    description: 'Explore 100% pure Makrana white marble home temples, designer wash basins, masjid mimbars, outdoor fountains, and 3D CNC stone wall claddings. Handcrafted by Rajasthani artisans.',
    canonical: 'https://galaxy-marble.netlify.app/'
  },
  '/products': {
    title: 'Architectural Marble Collections & Catalog | Galaxy Marble',
    description: 'Browse our complete catalog of handcrafted Makrana white marble pooja mandirs, luxury countertop basins, fountains, and stone wall panels with direct quarry pricing.',
    canonical: 'https://galaxy-marble.netlify.app/products'
  },
  '/about': {
    title: 'Heritage & Craftsmanship | Galaxy Marble Makrana Rajasthan',
    description: 'Learn about Galaxy Marble’s rich legacy in Makrana, Rajasthan. Multi-generational master sculptors crafting Vedic Vastu compliant sacred marble temples and luxury architectural stone.',
    canonical: 'https://galaxy-marble.netlify.app/about'
  },
  '/contact': {
    title: 'Contact Galaxy Marble | Custom Sizing, 3D Consultation & Price Quotes',
    description: 'Get in touch with Galaxy Marble artisans for bespoke dimensions, free 3D CAD design consultation, and instant price quotation via WhatsApp or phone.',
    canonical: 'https://galaxy-marble.netlify.app/contact'
  },
  '/terms': {
    title: 'Terms of Service | Galaxy Marble',
    description: 'Read the terms of service, custom order fabrication guidelines, and warranty policies of Galaxy Marble.',
    canonical: 'https://galaxy-marble.netlify.app/terms'
  },
  '/privacy': {
    title: 'Privacy Policy | Galaxy Marble',
    description: 'Learn how Galaxy Marble protects your personal information, quotation inquiries, and account privacy.',
    canonical: 'https://galaxy-marble.netlify.app/privacy'
  },
  '/admin': {
    title: 'Executive Admin Portal | Galaxy Marble',
    description: 'Administrative product and category management portal.',
    canonical: 'https://galaxy-marble.netlify.app/admin'
  }
};

export function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const search = location.search;

    let seo = PAGE_SEO[pathname] || PAGE_SEO['/'];

    // Dynamic title for Category Filter on /products?category=XYZ
    if (pathname === '/products' && search) {
      const params = new URLSearchParams(search);
      const category = params.get('category');
      if (category) {
        const decoded = decodeURIComponent(category).toUpperCase();
        seo = {
          title: `${decoded} Marble Collection | Galaxy Marble`,
          description: `Explore bespoke handcrafted ${decoded.toLowerCase()} designs in 100% pure Makrana white marble with worldwide safe crated shipping.`,
          canonical: `https://galaxy-marble.netlify.app/products?category=${encodeURIComponent(category)}`
        };
      }
    }

    // Update document title
    document.title = seo.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', seo.canonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', seo.canonical);
      document.head.appendChild(canonicalLink);
    }

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', seo.canonical);

  }, [location]);

  return null;
}
