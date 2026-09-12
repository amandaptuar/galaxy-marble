import React from 'react';
import { Star } from 'lucide-react';
import { COMMUNITY } from '../data/siteData';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const CommunityReviews = () => {
  return (
    <section className="community-section" id="community">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Voices of Devotion</span>
          <h2 className="section-title">The Community</h2>
          <p className="section-subtitle">
            Hear from architects, interior connoisseurs, and home owners who chose Galaxy Marble for their sacred spaces.
          </p>
        </div>

        <div className="community-grid">
          {COMMUNITY.map((member, idx) => (
            <div key={idx} className="community-card">
              <div className="community-img-wrap">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="community-img"
                  loading="lazy"
                />
              </div>

              <div className="community-info">
                <div style={{ display: 'flex', gap: 3, marginBottom: 10, color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" />
                  ))}
                </div>

                <p className="community-quote">{member.quote}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div>
                    <h3 className="community-name">{member.name}</h3>
                    <p className="community-role">{member.role}</p>
                  </div>

                  {member.instagram && (
                    <a 
                      href={member.instagram} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ color: '#b8860b' }}
                      title="View on Instagram"
                      aria-label="Instagram post"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
