import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ARCHITECTURAL_CATEGORIES } from '../data/siteData';

export const ShopByCategory = () => {
  const { categories, products } = useStore();

  const displayCategories = (categories && categories.length > 0) ? categories : ARCHITECTURAL_CATEGORIES;

  // Calculate product counts per category dynamically
  const getProductCount = (catTitle) => {
    if (!products || products.length === 0) return '10+';
    const count = products.filter(p => (p.category || '').toUpperCase() === catTitle.toUpperCase()).length;
    return count > 0 ? `${count} Designs` : 'Bespoke';
  };

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
            {displayCategories.map((cat, idx) => {
              const catLink = cat.link || `/products?category=${encodeURIComponent(cat.title)}`;
              const catImg = cat.image || '/marble-hero-bg.jpg';
              return (
                <Link 
                  key={cat.id || idx} 
                  to={catLink} 
                  className="category-card"
                >
                  <div className="category-img-box">
                    <img 
                      src={catImg} 
                      alt={cat.title} 
                      className="category-img"
                      loading="lazy"
                      onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }}
                    />
                    <div className="category-overlay-count">
                      <span>{getProductCount(cat.title)}</span>
                    </div>
                  </div>
                  <h3 className="category-name">{cat.title}</h3>
                </Link>
              );
            })}

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
