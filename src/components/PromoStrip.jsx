import React from 'react';
import { Link } from 'react-router-dom';

export const PromoStrip = ({ 
  tag = "Heritage Architecture",
  title = "Transform Your Residence Into A Sacred Sanctuary", 
  desc = "Customized Makrana marble temples, bespoke carved pillars, hand-finished deities, and backlit onyx walls designed according to Vedic Vastu Shastra.",
  btnText = "Consult Mandir Architect",
  btnLink = "/contact",
  bgImage = "/marble-pooja-room-banner.jpg"
}) => {
  const isInternal = btnLink.startsWith('/');

  return (
    <section className="promo-strip-section">
      <img src={bgImage} alt={title} className="promo-strip-bg" loading="lazy" />
      <div className="promo-strip-content">
        <span className="promo-tag">{tag}</span>
        <h2 className="promo-title">{title}</h2>
        <p className="promo-desc">{desc}</p>
        {isInternal ? (
          <Link to={btnLink} className="btn-primary">
            {btnText}
          </Link>
        ) : (
          <a href={btnLink} className="btn-primary">
            {btnText}
          </a>
        )}
      </div>
    </section>
  );
};
