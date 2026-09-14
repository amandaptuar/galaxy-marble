import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ARCHITECTURAL_CATEGORIES } from '../data/siteData';

export const ShopByCategory = () => {
  return (
    <section className="category-section" id="categories">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Curated Collections</span>
          <h2 className="section-title">Architectural Marble & Stone</h2>
          <p className="section-subtitle">
            Explore bespoke architectural marble basins, dining tables, hand-carved mandirs, Tulsi pots, fountains, and Qibla stone artistry.
          </p>
        </div>

        <div className="category-scroll-wrap">
          <div className="category-scroll-container">
            {ARCHITECTURAL_CATEGORIES.map((cat, idx) => (
              <Link 
                key={idx} 
                to={cat.link} 
                className="category-card"
              >
                <div className="category-img-box">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="category-img"
                    loading="lazy"
                  />
                  <div className="category-overlay-count">
                    <span>{cat.count || 12}+ Designs</span>
                  </div>
                </div>
                <h3 className="category-name">{cat.title}</h3>
              </Link>
            ))}

            {/* Explore More Products Card at End of Scroller */}
            <Link 
              to="/products" 
              className="category-card category-explore-more-card"
              title="Explore More Products"
            >
              <div className="category-img-box explore-more-box">
                <div className="explore-more-inner">
                  <div className="explore-icon-circle">
                    <ArrowRight size={24} />
                  </div>
                  <span className="explore-badge">
                    <Sparkles size={11} style={{ display: 'inline', marginRight: 3 }} />
                    ALL COLLECTIONS
                  </span>
                </div>
              </div>
              <h3 className="category-name explore-title">
                Explore More Products →
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
