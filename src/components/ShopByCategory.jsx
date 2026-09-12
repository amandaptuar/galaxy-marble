import React from 'react';
import { CATEGORIES } from '../data/siteData';

export const ShopByCategory = () => {
  return (
    <section className="category-section" id="categories">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Curated Collections</span>
          <h2 className="section-title">Shop By Category</h2>
          <p className="section-subtitle">
            Explore our handcrafted marble sacred murtis, divine idols, and spiritual art forms.
          </p>
        </div>

        <div className="category-scroll-wrap">
          <div className="category-scroll-container">
            {CATEGORIES.map((cat, idx) => (
              <a 
                key={idx} 
                href="#dream-murtis" 
                className="category-card"
              >
                <div className="category-img-box">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="category-img"
                    loading="lazy"
                  />
                </div>
                <h3 className="category-name">{cat.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
