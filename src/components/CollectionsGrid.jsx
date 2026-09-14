import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/siteData';

export const CollectionsGrid = () => {
  return (
    <section className="collections-section" id="collections">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            The 10 Curated Disciplines
          </span>
          <h2 className="section-title">Shop By Collections</h2>
          <p className="section-subtitle">
            Curated marble collections meticulously hand-carved to bring divine presence, timeless elegance, and grandeur to your home.
          </p>
        </div>

        <div className="collections-grid">
          {COLLECTIONS.map((col) => (
            <Link 
              key={col.id} 
              to={col.link || `/products?category=${encodeURIComponent(col.title)}`} 
              className="collection-card"
            >
              <div className="collection-img-wrap">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="collection-img"
                  loading="lazy"
                />
                <div className="collection-overlay-gradient"></div>
                {col.tag && (
                  <span className="collection-badge-tag">{col.tag}</span>
                )}
                <div className="collection-quick-view">
                  <span>Explore Collection</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <div className="collection-info">
                <h3 className="collection-card-title">{col.title}</h3>
                {col.subtitle && (
                  <p className="collection-card-subtitle">{col.subtitle}</p>
                )}
              </div>
            </Link>
          ))}

          {/* Explore More Products Card at End of Collections Grid */}
          <Link 
            to="/products" 
            className="collection-card collection-explore-more-card"
            title="Explore More Products"
          >
            <div className="collection-img-wrap collection-explore-img-wrap">
              <div className="collection-explore-inner">
                <div className="collection-explore-icon">
                  <ArrowRight size={28} />
                </div>
                <span className="collection-badge-tag">COMPLETE CATALOG</span>
              </div>
            </div>
            <div className="collection-info">
              <h3 className="collection-card-title">Explore More Products →</h3>
              <p className="collection-card-subtitle">Browse our complete 2026 stone inventory & custom atelier commissions</p>
            </div>
          </Link>
        </div>

        {/* Global Explore More Button */}
        <div className="collections-footer-action">
          <Link to="/products" className="btn-collections-explore-more">
            <span>Explore All 10 Collections & Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

