import React from 'react';
import { GALLERY } from '../data/siteData';

export const GalleryLookbook = () => {
  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Architectural Inspiration</span>
          <h2 className="section-title">Build Your Dream Home</h2>
          <p className="section-subtitle">
            We travel far and wide to hand-pick an eclectic mix of treasures for your home, pieces that will add personality and bring you joy daily.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY.map((item, idx) => (
            <div key={idx} className="gallery-card">
              <img 
                src={item.image} 
                alt={item.title} 
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-sub">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
