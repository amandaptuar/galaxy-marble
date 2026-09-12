import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { GUIDES } from '../data/siteData';

export const GuidesSection = () => {
  return (
    <section className="guides-section" id="guides">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Knowledge & Vastu</span>
          <h2 className="section-title">Guides & Insights</h2>
          <p className="section-subtitle">
            Expert insights on stone selection, idol Vastu orientation, and maintaining pure Makrana marble.
          </p>
        </div>

        <div className="guides-grid">
          {GUIDES.map((guide) => (
            <article key={guide.id} className="guide-card">
              <div className="guide-img-wrap">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="guide-img"
                  loading="lazy"
                />
              </div>

              <div className="guide-info">
                <div className="guide-tag-date">
                  <span>{guide.tag}</span>
                  <span>{guide.date}</span>
                </div>

                <h3 className="guide-card-title">{guide.title}</h3>
                <p className="guide-desc">{guide.desc}</p>

                <a 
                  href="#consultation" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 6, 
                    color: 'var(--color-gold)', 
                    fontSize: '0.82rem', 
                    fontWeight: 600,
                    marginTop: 14 
                  }}
                >
                  <span>Read Full Guide</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
