import React, { useState, useRef } from 'react';
import { Gem, Award, PackageCheck, Compass } from 'lucide-react';
import { TRUST_BADGES } from '../data/siteData';

const ICONS = [Gem, Award, PackageCheck, Compass];

export const TrustBadges = () => {
  const scrollRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (offsetWidth * 0.75));
    setActiveSlide(Math.min(TRUST_BADGES.length - 1, Math.max(0, index)));
  };

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.trust-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveSlide(index);
    }
  };

  return (
    <section className="trust-badges-section" aria-label="Our Guarantees">
      <div className="container">
        {/* Scroller on mobile, Grid on desktop */}
        <div 
          className="trust-badges-grid"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div key={idx} className="trust-card">
                <div className="trust-icon-box">
                  <Icon size={22} />
                </div>
                <div className="trust-card-text">
                  <h3 className="trust-title">{badge.title}</h3>
                  <p className="trust-desc">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="trust-mobile-dots" aria-hidden="true">
          {TRUST_BADGES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`trust-dot-btn ${dotIdx === activeSlide ? 'active' : ''}`}
              onClick={() => scrollToCard(dotIdx)}
              aria-label={`Go to item ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
