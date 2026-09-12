import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, Compass, Award, 
  ChevronRight, ArrowRight, CheckCircle2 
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="about-page-wrap spacy-mode">
      {/* Hero Header */}
      <div className="about-hero-header">
        <div className="container">
          <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span>About Us</span>
          </nav>

          <div className="about-hero-content">
            <span className="section-tag">
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              Generational Artistry
            </span>
            <h1 className="about-title">Sacred Stone Heritage</h1>
            <p className="about-desc">
              Master sculptors of pure Makrana white marble deities & bespoke temple architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Spacious 3-Stat Key Highlights */}
      <section className="about-stats-section spacy">
        <div className="container">
          <div className="spacy-stats-grid">
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Pure Makrana Marble</span>
              <p className="stat-sub">Historic calcite stone with generational durability.</p>
            </div>

            <div className="stat-card">
              <span className="stat-number">400+</span>
              <span className="stat-label">Years of Quarry Lineage</span>
              <p className="stat-sub">The iconic marble of India's eternal sanctums.</p>
            </div>

            <div className="stat-card">
              <span className="stat-number">Vedic</span>
              <span className="stat-label">Vastu Shastra Compliance</span>
              <p className="stat-sub">Accurate iconography, sacred postures & dimensions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Essence: Two-Column Clean Philosophy */}
      <section className="about-philosophy-section spacy">
        <div className="container">
          <div className="philosophy-grid spacy">
            <div className="philosophy-content">
              <span className="gold-tag">Our Philosophy</span>
              <h2>Sculpting the Sacred in Eternal Stone</h2>
              <p className="philosophy-lead">
                Galaxy Marble transforms pure subterranean calcite boulders into living expressions of devotion.
              </p>

              <div className="philosophy-pillars">
                <div className="pillar-item">
                  <CheckCircle2 size={20} className="text-gold" />
                  <div>
                    <h4>Grade-A Calcite Purity</h4>
                    <p>Over 98% calcium carbonate. Does not absorb oil, yellow, or deteriorate with daily abhishek.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <CheckCircle2 size={20} className="text-gold" />
                  <div>
                    <h4>Multi-Generational Sculptors</h4>
                    <p>Handcrafted by artisans whose families have carved temple deities for generations in Rajasthan.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <CheckCircle2 size={20} className="text-gold" />
                  <div>
                    <h4>Zero Artificial Coatings</h4>
                    <p>Finished solely with natural diamond pads and clean water for luminous, organic translucence.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="philosophy-image-box">
              <img 
                src="https://www.shoptilakstonearts.com/cdn/shop/files/SMT01948-Edit-min.jpg" 
                alt="Master Marble Artisans in Rajasthan" 
                className="philosophy-img"
              />
              <div className="image-badge-floating">
                <span>Rajasthan Atelier</span>
                <strong>Hand-Chiseled Mastery</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Craftsmanship Process (Spacious, Minimal Cards) */}
      <section className="about-process-section spacy">
        <div className="container">
          <div className="section-title-wrap text-center">
            <span className="section-tag">The Craft</span>
            <h2 className="section-title">4-Stage Sculpture Process</h2>
          </div>

          <div className="spacy-process-grid">
            <div className="spacy-process-card">
              <span className="process-num">01</span>
              <h3>Quarry Selection</h3>
              <p>Hand-picking flawless crystalline Makrana calcite blocks without fissures or iron veins.</p>
            </div>

            <div className="spacy-process-card">
              <span className="process-num">02</span>
              <h3>Vastu Blueprint</h3>
              <p>Iconographic sketching and 3D architectural proportioning following Shilpa Shastra.</p>
            </div>

            <div className="spacy-process-card">
              <span className="process-num">03</span>
              <h3>Chisel Sculpting</h3>
              <p>Intricate hand-carving of serene facial features, ornaments, and divine hand mudras.</p>
            </div>

            <div className="spacy-process-card">
              <span className="process-num">04</span>
              <h3>Diamond Polish</h3>
              <p>14-day continuous water polishing for timeless, chemical-free natural luster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacious Bottom CTA */}
      <section className="about-cta-section spacy">
        <div className="container">
          <div className="spacy-cta-card">
            <div className="cta-content">
              <span className="gold-tag">Bespoke Sanctums</span>
              <h2>Ready to Commission Your Mandir?</h2>
              <p>Connect with our stone architects to receive 3D elevation drawings and custom guidance.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">
                <span>Consult Our Artisans</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/products" className="btn-outline">
                Browse Artworks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
