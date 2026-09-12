import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/siteData';

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Automatic carousel transition every 4.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section 
      className="hero-slider-section"
      aria-label="Hero Highlights"
    >
      {HERO_SLIDES.map((slide, idx) => (
        <div 
          key={slide.id} 
          className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="hero-bg-img" 
            loading={idx === 0 ? "eager" : "lazy"}
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <div className="hero-badge">
                  <Sparkles size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  {slide.badge}
                </div>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                
                <div className="hero-actions">
                  <a href={slide.primaryLink} className="btn-primary">
                    {slide.primaryBtn}
                  </a>
                  <a href={slide.secondaryLink} className="btn-outline-white">
                    {slide.secondaryBtn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next buttons */}
      <button 
        className="slider-arrow prev" 
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        className="slider-arrow next" 
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {HERO_SLIDES.map((_, dotIdx) => (
          <button
            key={dotIdx}
            className={`dot-btn ${dotIdx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(dotIdx)}
            aria-label={`Go to slide ${dotIdx + 1}`}
          />
        ))}
      </div>

      {/* Automatic Slide Progress Bar */}
      <div key={currentIndex} className="hero-auto-progress-bar" />
    </section>
  );
};
