import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GALLERY } from '../data/siteData';
import { useStore } from '../context/StoreContext';

export const GalleryLookbook = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.gallery-card')?.offsetWidth || 320;
    el.scrollBy({ left: dir === 'left' ? -cardWidth - 16 : cardWidth + 16, behavior: 'smooth' });
  };

  // Touch swipe support
  const touchStart = useRef(0);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) scroll(diff > 0 ? 'right' : 'left');
  };

  const { setQuickViewProduct } = useStore();

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            Architectural Inspiration
          </span>
          <h2 className="section-title">Build Your Dream Home</h2>
          <p className="section-subtitle">
            We travel far and wide to hand-pick an eclectic mix of treasures for your home, pieces that will add personality and bring you joy daily.
          </p>
        </div>

        <div className="gallery-scroller-wrap">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button className="gallery-scroll-btn gallery-scroll-left" onClick={() => scroll('left')} aria-label="Scroll left">
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Scrollable Gallery */}
          <div
            className="gallery-scroller"
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {GALLERY.map((item, idx) => (
              <div 
                key={idx} 
                className="gallery-card"
                onClick={() => setQuickViewProduct(item)}
                title={`View ${item.title}`}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="gallery-img"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <h3 className="gallery-title">{item.title}</h3>
                  <p className="gallery-sub">{item.category}</p>
                </div>
              </div>
            ))}

            {/* Explore More Products Card */}
            <Link 
              to="/products"
              className="gallery-card gallery-explore-card"
              title="Explore More Products"
            >
              <div className="gallery-explore-overlay-full">
                <div className="gallery-explore-icon-glow">
                  <ArrowRight size={30} />
                </div>
                <h3 className="gallery-title" style={{ fontSize: '1.25rem', marginTop: 12 }}>
                  Explore More Products →
                </h3>
                <p className="gallery-sub" style={{ color: '#b48a28', fontWeight: 600 }}>
                  View Full Architectural Catalog
                </p>
              </div>
            </Link>
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button className="gallery-scroll-btn gallery-scroll-right" onClick={() => scroll('right')} aria-label="Scroll right">
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
