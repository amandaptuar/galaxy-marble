import React from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { CONSULTATION_DATA } from '../data/siteData';
import { useStore } from '../context/StoreContext';

export const ConsultationBanner = () => {
  const { setIsConsultationOpen } = useStore();

  return (
    <section className="consultation-section" id="consultation">
      <div className="container">
        <div className="consultation-card">
          <div className="consultation-content">
            <span className="section-tag" style={{ color: 'var(--color-gold-border)' }}>
              <Sparkles size={13} style={{ display: 'inline', marginRight: 6 }} />
              {CONSULTATION_DATA.badge}
            </span>
            <h2 className="section-title" style={{ color: '#ffffff', textAlign: 'left', marginBottom: 16 }}>
              {CONSULTATION_DATA.title}
            </h2>
            <p style={{ color: '#cccccc', lineHeight: 1.6, marginBottom: 28, fontSize: '0.95rem' }}>
              {CONSULTATION_DATA.subtitle}
            </p>

            <div>
              <button 
                className="btn-primary"
                onClick={() => setIsConsultationOpen(true)}
              >
                <Calendar size={16} />
                <span>Book a Free Consultation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="consultation-img-wrap">
            <img 
              src={CONSULTATION_DATA.image} 
              alt="Consultation with Marble Sculptor" 
              className="consultation-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
