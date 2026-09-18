import React, { useState, useRef, useEffect } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, Maximize2 } from 'lucide-react';

const WORKSHOP_VIDEOS = [
  {
    id: 1,
    src: '/videos/WhatsApp Video 2026-09-17 at 7.09.47 PM.mp4',
    title: 'Makrana Marble Hand Carving',
    tag: 'Artisan Workshop',
    duration: '0:25'
  },
  {
    id: 2,
    src: '/videos/WhatsApp Video 2026-09-17 at 7.09.48 PM.mp4',
    title: 'Sacred Temple Shikhara Detailing',
    tag: 'Architectural Sanctum',
    duration: '0:35'
  },
  {
    id: 3,
    src: '/videos/WhatsApp Video 2026-09-18 at 3.06.58 PM.mp4',
    title: 'Luxury Fluted Basin Polishing',
    tag: 'Pure White Stone',
    duration: '0:30'
  },
  {
    id: 4,
    src: '/videos/WhatsApp Video 2026-09-18 at 3.06.58 PM (1).mp4',
    title: 'Monolithic Pedestal Basin Turning',
    tag: 'Master Masonry',
    duration: '0:20'
  },
  {
    id: 5,
    src: '/videos/WhatsApp Video 2026-09-18 at 3.06.58 PM (2).mp4',
    title: 'Handcrafted Marble Console Crafting',
    tag: 'Bespoke Furniture',
    duration: '0:28'
  },
  {
    id: 6,
    src: '/videos/WhatsApp Video 2026-09-18 at 3.06.59 PM.mp4',
    title: 'Intricate Floral Jali Wall Relief',
    tag: 'CNC & Hand Tooling',
    duration: '0:32'
  },
  {
    id: 7,
    src: '/videos/WhatsApp Video 2026-09-18 at 3.06.59 PM (1).mp4',
    title: 'Sacred Tulsi Kyara Hand Sculpture',
    tag: 'Vedic Heritage',
    duration: '0:24'
  },
  {
    id: 8,
    src: '/videos/WhatsApp Video 2026-09-18 at 3.06.59 PM (2).mp4',
    title: 'Grand Courtyard Water Fountain Assembly',
    tag: 'Architectural Stone',
    duration: '0:30'
  },
  {
    id: 9,
    src: '/videos/WhatsApp Video 2026-09-18 at 3.07.00 PM.mp4',
    title: 'Direct Quarry White Marble Selection',
    tag: 'Quarry Sourcing',
    duration: '0:36'
  }
];

export function VideoScroller() {
  const scrollContainerRef = useRef(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const modalVideoRef = useRef(null);

  // Check scroll position for arrow button visibility
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
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Keyboard navigation & ESC close for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeVideoIndex === null) return;
      if (e.key === 'Escape') {
        setActiveVideoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveVideoIndex((prev) => (prev + 1) % WORKSHOP_VIDEOS.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveVideoIndex((prev) => (prev - 1 + WORKSHOP_VIDEOS.length) % WORKSHOP_VIDEOS.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeVideoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideoIndex]);

  const activeVideo = activeVideoIndex !== null ? WORKSHOP_VIDEOS[activeVideoIndex] : null;

  return (
    <section className="video-scroller-section" id="workshop-videos">
      <div className="container">
        {/* Centered Minimal Header */}
        <div className="video-scroller-header-centered">
          <span className="section-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            Artisans at Work
          </span>
          <h2 className="section-title">Mastery In Motion</h2>
          <p className="section-subtitle">
            Authentic hand-carving captured live inside our Makrana ateliers.
          </p>

          {/* Navigation Controls Centered */}
          <div className="video-scroll-nav-btns centered-nav">
            <button 
              className={`video-nav-btn prev-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous videos"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="video-scroll-indicator-text">Swipe / Click to Explore</span>
            <button 
              className={`video-nav-btn next-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next videos"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Video Reel Scroller */}
        <div className="video-scroller-viewport">
          <div className="video-cards-track" ref={scrollContainerRef}>
            {WORKSHOP_VIDEOS.map((item, index) => (
              <div 
                key={item.id} 
                className="video-reel-card"
                onClick={() => setActiveVideoIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveVideoIndex(index); }}
                aria-label={`Play video: ${item.title}`}
              >
                <div className="video-media-wrapper">
                  <video
                    src={item.src}
                    className="video-reel-preview"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => e.target.play().catch(() => {})}
                    onMouseLeave={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                  />
                  <div className="video-overlay-gradient"></div>
                  
                  {/* Floating Play Pulse Button */}
                  <div className="video-play-badge">
                    <div className="video-play-pulse"></div>
                    <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: 2 }} />
                  </div>

                  <span className="video-badge-tag">{item.tag}</span>

                  <div className="video-card-meta">
                    <h3 className="video-card-title">{item.title}</h3>
                    <div className="video-meta-row">
                      <span className="video-click-hint">
                        <Maximize2 size={12} style={{ display: 'inline', marginRight: 4 }} />
                        Click to watch
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 70% SCREEN LIGHTBOX MODAL                                    */}
      {/* ============================================================ */}
      {activeVideo && (
        <div 
          className="video-modal-backdrop" 
          onClick={() => setActiveVideoIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal dialog strictly sized at 70% of screen */}
          <div 
            className="video-modal-dialog-70"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="video-modal-header">
              <div className="modal-title-info">
                <span className="modal-tag">{activeVideo.tag}</span>
                <h3 className="modal-video-title">{activeVideo.title}</h3>
              </div>
              <div className="modal-actions">
                <button 
                  className="modal-icon-btn"
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button 
                  className="modal-icon-btn modal-close-btn"
                  onClick={() => setActiveVideoIndex(null)}
                  title="Close (ESC)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Video Player Frame */}
            <div className="video-modal-player-box">
              <video
                ref={modalVideoRef}
                key={activeVideo.src}
                src={activeVideo.src}
                className="video-modal-media"
                controls
                autoPlay
                muted={isMuted}
                playsInline
              />

              {/* Prev / Next Modal Arrows */}
              <button 
                className="modal-nav-arrow modal-prev-arrow"
                onClick={() => setActiveVideoIndex((prev) => (prev - 1 + WORKSHOP_VIDEOS.length) % WORKSHOP_VIDEOS.length)}
                aria-label="Previous video"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                className="modal-nav-arrow modal-next-arrow"
                onClick={() => setActiveVideoIndex((prev) => (prev + 1) % WORKSHOP_VIDEOS.length)}
                aria-label="Next video"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="video-modal-footer">
              <span className="modal-counter">
                Video {activeVideoIndex + 1} of {WORKSHOP_VIDEOS.length}
              </span>
              <span className="modal-instruction">
                Use ← / → keys or arrows to navigate • ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
