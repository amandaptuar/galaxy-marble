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
import { VideoShowcase } from '../components/VideoShowcase';
import { FeaturedBrands } from '../components/FeaturedBrands';
import { ConsultationBanner } from '../components/ConsultationBanner';
import { DUMMY_PRODUCTS } from '../data/siteData';

export function HomePage() {
  return (
    <>
      {/* Hero Slideshow */}
      <HeroSlider />

      {/* Trust Highlights */}
      <TrustBadges />

      {/* Shop By Category */}
      <ShopByCategory />

      {/* Products Showcase: Only Dummy Product Card */}
      <div id="dream-murtis">
        <ProductShowcase
          id="products"
          tag="Handcrafted Masterpieces"
          title="Our Products"
          subtitle="Explore meticulously detailed deities and luxury stone art carved from pure Makrana white marble."
          products={DUMMY_PRODUCTS}
        />
      </div>

      {/* Promotional Strip Banner 1 */}
      <PromoStrip
        tag="Pure Makrana Heritage"
        title="Bespoke Marble Pooja Rooms & Sacred Architecture"
        desc="From conceptual 3D elevation drawings to final on-site installation, we create sacred havens following ancient Vedic Vastu Shastra principles."
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
        desc="Every murti and architectural component is packed in custom fumigated multi-layered wooden crates with comprehensive transit insurance."
        btnText="Explore All Products"
        btnLink="/products"
        bgImage="https://www.shoptilakstonearts.com/cdn/shop/files/SMT01948-Edit-min.jpg"
      />

      {/* Collections Showcase */}
      <CollectionsGrid />

      {/* The Community: Verified Client Reviews */}
      <CommunityReviews />

      {/* Guides & Insights */}
      <GuidesSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Artisanal Studio Video */}
      <VideoShowcase />

      {/* Featured In / Press Logos */}
      <FeaturedBrands />

      {/* Free Virtual 1-on-1 Consultation */}
      <ConsultationBanner />
    </>
  );
}
