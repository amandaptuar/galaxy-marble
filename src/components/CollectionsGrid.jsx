import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/siteData';

export const CollectionsGrid = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive calculation for cards per page
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else if (window.innerWidth < 1360) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(4);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalItemsCount = COLLECTIONS.length + 1; // Includes Explore More slide
  const maxIndex = Math.max(0, totalItemsCount - cardsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

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
    <section className="collections-section" id="collections">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            The 10 Curated Disciplines
          </span>
          <h2 className="section-title">Shop By Collections</h2>
          <p className="section-subtitle">
            Curated marble collections meticulously hand-carved to bring divine presence, timeless elegance, and grandeur to your home.
          </p>
        </div>

        {/* Collections Scroller Container */}
        <div 
          className="collections-scroller-wrap"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button 
            className="collections-scroller-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous Collections"
            title="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Viewport */}
          <div className="collections-scroller-viewport">
            <div 
              className="collections-scroller-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {COLLECTIONS.map((col) => (
                <div 
                  key={col.id} 
                  className="collections-scroller-card-item"
                  style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
                >
                  <Link 
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
                </div>
              ))}

              {/* Explore More Card at End of Track */}
              <div 
                className="collections-scroller-card-item explore-slide-wrapper"
                style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
              >
                <Link 
                  to="/products" 
                  className="collection-card collection-explore-more-card"
                  title="Explore More Products"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                    <p className="collection-card-subtitle">Browse all 10 stone categories & custom commissions</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button 
            className="collections-scroller-nav-btn next"
            onClick={nextSlide}
            aria-label="Next Collections"
            title="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="collections-scroller-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`collections-dot ${dotIdx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide group ${dotIdx + 1}`}
            />
          ))}
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


