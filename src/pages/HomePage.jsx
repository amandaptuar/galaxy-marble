import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { TrustBadges } from '../components/TrustBadges';
import { ShopByCategory } from '../components/ShopByCategory';
import { ProductShowcase } from '../components/ProductShowcase';
import { PromoStrip } from '../components/PromoStrip';
import { GalleryLookbook } from '../components/GalleryLookbook';
import { CollectionsGrid } from '../components/CollectionsGrid';
import { CommunityReviews } from '../components/CommunityReviews';
import { GuidesSection } from '../components/GuidesSection';
import { FaqSection } from '../components/FaqSection';
import { FeaturedBrands } from '../components/FeaturedBrands';
import { ConsultationBanner } from '../components/ConsultationBanner';
import { OurProductGallery } from '../components/OurProductGallery';
import { useStore } from '../context/StoreContext';

export function HomePage() {
  const { products } = useStore();

  return (
    <>
      {/* Hero Slideshow */}
      <HeroSlider />

      {/* Trust Highlights */}
      <TrustBadges />

      {/* Shop By Category */}
      <ShopByCategory />

      {/* Products Showcase (Shown when live products exist) */}
      {products && products.length > 0 && (
        <div id="featured-products">
          <ProductShowcase
            id="products"
            tag="Handcrafted Stonework"
            title="Featured Architectural Collection"
            subtitle="Explore pure Makrana white marble slabs, carved pooja mandirs, and luxury stone furniture."
            products={products}
          />
        </div>
      )}

      {/* Promotional Strip Banner 1 */}
      <PromoStrip
        tag="Pure Makrana Heritage"
        title="Bespoke Marble Pooja Rooms & Architectural Sanctums"
        desc="From conceptual 3D elevation drawings to final on-site installation, we engineer sacred sanctuaries following ancient Vedic principles."
        btnText="Schedule Private Consultation"
        btnLink="/contact"
        bgImage="/marble-pooja-room-banner.jpg"
      />

      {/* Lookbook Gallery: Build your Dream Home */}
      <GalleryLookbook />

      {/* Promotional Strip 2: Export Guarantee */}
      <PromoStrip
        tag="Worldwide Safe Delivery"
        title="Global White Glove Delivery in Shockproof Wooden Crates"
        desc="Every architectural component and marble masterpiece is packed in custom fumigated multi-layered wooden crates with comprehensive transit insurance."
        btnText="Explore All Products"
        btnLink="/products"
        bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Our Product Gallery Slider (Authentic Creations) */}
      <OurProductGallery />

      {/* Collections Showcase */}
      <CollectionsGrid />

      {/* The Community: Verified Client Reviews */}
      <CommunityReviews />

      {/* Guides & Insights */}
      <GuidesSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Featured In / Press Logos */}
      <FeaturedBrands />

      {/* Free Virtual 1-on-1 Consultation */}
      <ConsultationBanner />
    </>
  );
}
