import React, { useState } from 'react';
import { Sparkles, Quote } from 'lucide-react';
import { FEATURED_BRANDS } from '../data/siteData';

export const FeaturedBrands = () => {
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);

  // Custom vector typography emblems for each publication
  const renderPublicationLogo = (brand) => {
    switch (brand.id) {
      case 'ad':
        return (
          <div className="press-logo-badge ad-badge">
            <span className="logo-main-serif">ARCHITECTURAL DIGEST</span>
            <span className="logo-sub-tag">THE INTERNATIONAL DESIGN AUTHORITY</span>
          </div>
        );
      case 'elle-decor':
        return (
          <div className="press-logo-badge elle-badge">
            <span className="logo-main-didot">ELLE</span>
            <span className="logo-sub-decor">DÉCOR</span>
          </div>
        );
      case 'vogue-living':
        return (
          <div className="press-logo-badge vogue-badge">
            <span className="logo-main-vogue">VOGUE</span>
            <span className="logo-sub-vogue">LIVING</span>
          </div>
        );
      case 'world-of-interiors':
        return (
          <div className="press-logo-badge interiors-badge">
            <span className="logo-sub-top">CONDÉ NAST</span>
            <span className="logo-main-interiors">THE WORLD OF INTERIORS</span>
          </div>
        );
      case 'robb-report':
        return (
          <div className="press-logo-badge robb-badge">
            <span className="logo-main-robb">Robb Report</span>
            <span className="logo-sub-tag">LUXURY ARCHITECTURE</span>
          </div>
        );
      default:
        return (
          <div className="press-logo-badge">
            <span className="logo-main-serif">{brand.name.toUpperCase()}</span>
          </div>
        );
    }
  };

  const currentBrand = FEATURED_BRANDS[activeBrandIndex] || FEATURED_BRANDS[0];

  return (
    <section className="brands-section" aria-label="Featured Publications">
      <div className="container">
        {/* Section Header */}
        <div className="brands-header">
          <div className="brand-pill" style={{ margin: '0 auto 10px' }}>
            <Sparkles size={12} className="text-gold" />
            <span>Press & Recognition</span>
          </div>
          <h3 className="brands-title">Featured in Architectural Publications</h3>
          <p className="brands-subtitle">
            Celebrated by premier design journals for monumental craftsmanship and architectural excellence.
          </p>
        </div>

        {/* Interactive Logos Row */}
        <div className="brands-logos-cluster">
          {FEATURED_BRANDS.map((brand, idx) => {
            const isActive = activeBrandIndex === idx;
            return (
              <div 
                key={brand.id || idx}
                className={`brand-logo-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveBrandIndex(idx)}
                onMouseEnter={() => setActiveBrandIndex(idx)}
                role="button"
                tabIndex={0}
                title={`Read ${brand.name} coverage`}
              >
                {renderPublicationLogo(brand)}
              </div>
            );
          })}
        </div>

        {/* Featured Press Quote Box */}
        {currentBrand && (
          <div className="press-quote-box">
            <Quote size={24} className="text-gold quote-watermark" />
            <p className="press-quote-text">
              "{currentBrand.quote}"
            </p>
            <div className="press-source-row">
              <span className="press-source-name">— {currentBrand.name}</span>
              <span className="press-source-tagline">{currentBrand.tagline}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
