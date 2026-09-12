import React, { useState } from 'react';
import { ProductCard } from './ProductCard';

export const ProductShowcase = ({ 
  id,
  tag, 
  title, 
  subtitle, 
  products,
  sectionData,
  defaultLimit = 8 
}) => {
  const tabs = sectionData?.tabs || [];
  const [activeTab, setActiveTab] = useState(tabs[0] || '');
  const [displayCount, setDisplayCount] = useState(defaultLimit);

  const currentProducts = products || (sectionData?.by_tab?.[activeTab] || []);
  const visibleProducts = currentProducts.slice(0, displayCount);

  return (
    <section className="product-showcase-section" id={id}>
      <div className="container">
        <div className="section-title-wrap">
          {tag && <span className="section-tag">{tag}</span>}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* Tab Buttons (Desktop & Tablet) */}
        {!products && tabs.length > 1 && (
          <>
            <div className="tab-buttons-wrap hidden md:flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setDisplayCount(defaultLimit);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown Selector */}
            <div className="mobile-tab-select-wrap">
              <select
                className="mobile-tab-select"
                value={activeTab}
                onChange={(e) => {
                  setActiveTab(e.target.value);
                  setDisplayCount(defaultLimit);
                }}
              >
                {tabs.map((tab) => (
                  <option key={tab} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Products Grid */}
        <div className={`products-grid ${visibleProducts.length === 1 ? 'single-item' : ''}`}>
          {visibleProducts.map((prod, idx) => (
            <ProductCard key={idx} product={prod} />
          ))}
        </div>

        {/* Load More Button if more available */}
        {currentProducts.length > displayCount && (
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button 
              className="btn-outline"
              onClick={() => setDisplayCount((prev) => prev + 8)}
            >
              Load More ({currentProducts.length - displayCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
