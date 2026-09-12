import React from 'react';
import { COLLECTIONS } from '../data/siteData';

export const CollectionsGrid = () => {
  return (
    <section className="collections-section" id="collections">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Iconic Signatures</span>
          <h2 className="section-title">Shop By Collections</h2>
          <p className="section-subtitle">
            Curated marble collections meticulously hand-carved to bring divine presence and grandeur to your home.
          </p>
        </div>

        <div className="collections-grid">
          {COLLECTIONS.map((col) => (
            <a 
              key={col.id} 
              href="#dream-murtis" 
              className="collection-card"
            >
              <div className="collection-img-wrap">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="collection-img"
                  loading="lazy"
                />
              </div>
              <div className="collection-info">
                <h3 className="collection-card-title">{col.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
