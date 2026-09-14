import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, MessageCircle, Eye, ArrowRight } from 'lucide-react';
import { OUR_PRODUCT_GALLERY } from '../data/siteData';
import { useStore } from '../context/StoreContext';

export const OurProductGallery = () => {
  const navigate = useNavigate();
  const { setQuickViewProduct, enquireOnWhatsApp } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive items visible calculation
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

  const totalItemsCount = OUR_PRODUCT_GALLERY.length + 1; // Includes Explore More slide
  const maxIndex = Math.max(0, totalItemsCount - cardsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleProductClick = (item) => {
    setQuickViewProduct(item);
  };

  // Touch gesture handlers for mobile swipe
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
    <section className="our-product-gallery-section" id="product-gallery">
      <div className="container">
        {/* Section Header matching website style */}
        <div className="section-title-wrap">
          <span className="section-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Master Atelier Creations
          </span>
          <h2 className="section-title">Our Product Gallery</h2>
          <p className="section-subtitle">
            Explore authentic architectural stone masterpieces, monumental 3D carved wall murals, royal Pietra Dura inlays, and bespoke luxury furniture handcrafted in our Rajasthan ateliers.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="product-gallery-slider-wrap"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button 
            className="gallery-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous Products"
            title="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Slider Track Overflow Viewport */}
          <div className="product-gallery-viewport">
            <div 
              className="product-gallery-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {OUR_PRODUCT_GALLERY.map((item) => (
                <div 
                  key={item.id} 
                  className="product-gallery-card-item"
                  style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
                >
                  <div className="gallery-product-card">
                    {/* Image Box - Navigates to Products Page */}
                    <div 
                      className="gallery-product-img-box"
                      onClick={() => handleProductClick(item)}
                      title={`View ${item.title} on Products Page`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="gallery-product-img"
                        loading="lazy"
                      />
                      <div className="gallery-product-overlay"></div>
                      
                      {/* Luxury Badge Tag */}
                      <span className="gallery-product-badge">{item.tag}</span>

                      {/* Quick Inspect Button */}
                      <button 
                        className="gallery-quick-inspect-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(item);
                        }}
                        aria-label="Inspect specifications"
                      >
                        <Eye size={15} />
                        <span>Specifications</span>
                      </button>
                    </div>

                    {/* Card Content Details */}
                    <div className="gallery-product-info">
                      <div className="gallery-product-category">
                        {item.category}
                      </div>

                      <h3 
                        className="gallery-product-title"
                        onClick={() => handleProductClick(item)}
                        title={item.title}
                      >
                        {item.title}
                      </h3>

                      <div className="gallery-product-stone">
                        <span>{item.stoneType}</span>
                      </div>

                      <div className="gallery-product-price-row">
                        <span className="gallery-price-tag">Price on Request</span>
                        <span className="gallery-crating-tag">Custom Sizing & Crating</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="gallery-product-actions">
                        <button 
                          className="btn-gallery-whatsapp"
                          onClick={() => enquireOnWhatsApp(item, `Inquiry regarding ${item.title} (${item.tag}) from Our Product Gallery`)}
                          title="Instant WhatsApp Consultation"
                        >
                          <MessageCircle size={15} />
                          <span>Enquire on WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Explore More Products Slide Card at end of slider */}
              <div 
                className="product-gallery-card-item explore-slide-wrapper"
                style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
              >
                <div 
                  className="gallery-product-card gallery-explore-slide-card"
                  onClick={() => navigate('/products')}
                  title="Explore All Products"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="gallery-product-img-box gallery-explore-slide-img-box">
                    <div className="explore-slide-art">
                      <div className="explore-slide-glow-circle">
                        <ArrowRight size={30} />
                      </div>
                      <span className="explore-slide-subtag">ALL 10 COLLECTIONS</span>
                    </div>
                  </div>

                  <div className="gallery-product-info" style={{ justifyContent: 'space-between' }}>
                    <div>
                      <div className="gallery-product-category">
                        FULL ARCHITECTURAL CATALOG
                      </div>
                      <h3 className="gallery-product-title">
                        Explore More Products
                      </h3>
                      <p className="gallery-product-desc">
                        Discover all handcrafted marble basins, dining tables, temples, water fountains, and custom commission stone arts.
                      </p>
                    </div>

                    <div className="gallery-product-actions" style={{ marginTop: 'auto' }}>
                      <button 
                        className="btn-gallery-explore-all"
                        onClick={() => navigate('/products')}
                      >
                        <span>View All Products</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button 
            className="gallery-nav-btn next"
            onClick={nextSlide}
            aria-label="Next Products"
            title="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="gallery-slider-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`gallery-dot ${dotIdx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide group ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
