import React, { useRef, useState, useEffect } from 'react';
import { Star, Sparkles, CheckCircle2, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { COMMUNITY } from '../data/siteData';

export const CommunityReviews = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="community-section" id="customer-reviews">
      <div className="container">
        {/* Section Header with Centered Title & Nav Arrows */}
        <div className="section-title-wrap text-center">
          <div className="brand-pill" style={{ margin: '0 auto 12px' }}>
            <Sparkles size={12} className="text-gold" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle" style={{ maxWidth: 620, margin: '0 auto 24px' }}>
            Real experiences from villa patrons, architects, and home owners across India who commissioned bespoke marble sanctums, basins, and flooring.
          </p>

          {/* Scroller Controls */}
          <div className="reviews-scroller-nav">
            <button 
              className={`reviews-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous customer reviews"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="scroller-hint-text">Swipe / Click to Read Reviews</span>
            <button 
              className={`reviews-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next customer reviews"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Carousel Track */}
        <div className="reviews-scroller-viewport">
          <div className="reviews-cards-track" ref={scrollContainerRef}>
            {COMMUNITY.map((member, idx) => (
              <div key={idx} className="review-card-item">
                {/* Installation Image */}
                <div className="review-card-img-wrap">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="review-card-img"
                    loading="lazy"
                    onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }}
                  />
                  <span className="review-tag-badge">
                    <CheckCircle2 size={12} />
                    <span>{member.tag || 'Verified Commission'}</span>
                  </span>
                </div>

                {/* Review Info */}
                <div className="review-card-body">
                  <div className="review-rating-row">
                    <div className="star-row">
                      {[...Array(member.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#d4af37" color="#d4af37" />
                      ))}
                    </div>
                    <span className="review-location-badge">
                      <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />
                      {member.location}
                    </span>
                  </div>

                  <div className="review-quote-box">
                    <Quote size={18} className="quote-icon-gold" />
                    <p className="review-quote-text">"{member.quote}"</p>
                  </div>
                  
                  <div className="review-author-footer">
                    <img 
                      src={member.avatar || member.image} 
                      alt={member.name} 
                      className="review-author-avatar"
                      onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }}
                    />
                    <div className="review-author-meta">
                      <h3 className="review-author-name">{member.name}</h3>
                      <p className="review-author-role">{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
