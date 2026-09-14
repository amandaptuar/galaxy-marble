import React from 'react';
import { Star, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { COMMUNITY } from '../data/siteData';

export const CommunityReviews = () => {
  return (
    <section className="community-section" id="community">
      <div className="container">
        <div className="section-title-wrap">
          <div className="brand-pill" style={{ margin: '0 auto 12px' }}>
            <Sparkles size={12} className="text-gold" />
            <span>Voices of Connoisseurs</span>
          </div>
          <h2 className="section-title">Client Commissions & Community</h2>
          <p className="section-subtitle">
            Hear from distinguished architects, interior connoisseurs, and estate patrons who entrusted Galaxy Marble with their monumental stone commissions.
          </p>
        </div>

        <div className="community-grid">
          {COMMUNITY.map((member, idx) => (
            <div key={idx} className="community-card">
              {/* Architectural Installation Image */}
              <div className="community-img-wrap">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="community-img"
                  loading="lazy"
                  onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }}
                />
                <span className="community-tag-badge">
                  <CheckCircle2 size={12} />
                  <span>{member.tag || 'Verified Commission'}</span>
                </span>
              </div>

              {/* Reviewer & Project Details */}
              <div className="community-info">
                <div className="community-rating-row">
                  <div className="star-row">
                    {[...Array(member.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#d4af37" color="#d4af37" />
                    ))}
                  </div>
                  <span className="verified-patron-badge">Verified Commission</span>
                </div>

                <div className="community-quote-wrap">
                  <Quote size={18} className="quote-icon" />
                  <p className="community-quote">{member.quote}</p>
                </div>
                
                <div className="community-patron-footer">
                  <img 
                    src={member.avatar || member.image} 
                    alt={member.name} 
                    className="community-patron-avatar"
                    onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }}
                  />
                  <div>
                    <h3 className="community-name">{member.name}</h3>
                    <p className="community-role">{member.role || member.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
