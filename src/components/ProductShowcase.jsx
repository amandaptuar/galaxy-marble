import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductShowcase = ({ 
  id,
  tag, 
  title, 
  subtitle, 
  products,
  sectionData,
}) => {
  const navigate = useNavigate();
  const tabs = sectionData?.tabs || [];
  const [activeTab, setActiveTab] = useState(tabs[0] || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentProducts = products || (sectionData?.by_tab?.[activeTab] || []);

  // Calculate cards per page based on window width
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 900) {
        setCardsPerPage(2);
      } else if (window.innerWidth < 1280) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(4);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalCards = currentProducts.length;
  const maxIndex = Math.max(0, totalCards - cardsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  return (
    <section className="product-showcase-section" id={id}>
      <div className="container">
        <div className="section-title-wrap">
          {tag && (
            <span className="section-tag">
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              {tag}
            </span>
          )}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* Tab Buttons if any */}
        {!products && tabs.length > 1 && (
          <div className="tab-buttons-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Scroller Container */}
        <div 
          className="featured-scroller-wrap"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prev Arrow */}
          <button 
            className="featured-scroller-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous products"
            title="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Viewport & Track */}
          <div className="featured-scroller-viewport">
            <div 
              className="featured-scroller-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {currentProducts.map((prod, idx) => (
                <div 
                  key={prod.id || idx}
                  className="featured-scroller-card-item"
                  style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
                >
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button 
            className="featured-scroller-nav-btn next"
            onClick={nextSlide}
            aria-label="Next products"
            title="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Scroller Dots & View All CTA */}
        <div className="featured-scroller-footer">
          <div className="featured-scroller-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`featured-scroller-dot ${dotIdx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <div className="featured-scroller-cta-wrap">
            <button 
              className="btn-view-all-collection"
              onClick={() => navigate('/products')}
            >
              <span>Explore All Masterpieces</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

