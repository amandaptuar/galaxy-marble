import React from 'react';
import { FEATURED_BRANDS } from '../data/siteData';

export const FeaturedBrands = () => {
  return (
    <section className="brands-section" aria-label="Featured Publications">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            color: 'var(--color-text-muted)',
            fontWeight: 600 
          }}>
            Featured In
          </span>
        </div>

        <div className="brands-grid">
          {FEATURED_BRANDS.map((imgUrl, idx) => (
            <img 
              key={idx} 
              src={imgUrl} 
              alt="Publication / Press Logo" 
              className="brand-logo-img"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
