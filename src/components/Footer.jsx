import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export const Footer = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Thank you! Code GALAXY10 has been sent to ${email}`);
    setEmail('');
  };

  return (
    <footer className="site-footer" id="about-us">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand & Heritage */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <img 
                src="/logo.png" 
                alt="Galaxy Marble Logo" 
                className="brand-logo-round" 
                style={{ width: 62, height: 62 }} 
              />
              <div>
                <span className="brand-name" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
                  GALAXY MARBLE
                </span>
                <p style={{ fontSize: '0.62rem', letterSpacing: '3px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                  Artisanal Stone Atelier
                </p>
              </div>
            </div>

            <p style={{ color: '#9ba1a8', lineHeight: 1.6, fontSize: '0.84rem', marginBottom: 20 }}>
              Galaxy Marble is a premier heritage studio specializing in handcrafted Makrana pure white marble deities, bespoke home mandirs, and luxury architectural stone carvings. Preserving multi-generational Rajasthani carving traditions for discerning collectors worldwide.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', color: '#b5bac1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={16} className="text-gold" />
                <span>NH-8 Marble Industrial Belt, Kishangarh, Rajasthan 305801, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={16} className="text-gold" />
                <span>+91 90572 06605 / Concierge</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={16} className="text-gold" />
                <span>concierge@galaxymarble.com</span>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="footer-col-title">Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/contact" className="footer-link">Custom Temple Design</Link></li>
              <li><Link to="/products" className="footer-link">Marble Idol Catalogue</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Cart & Crating</Link></li>
              <li><Link to="/about" className="footer-link">Heritage & Marble Care</Link></li>
              <li><a href="https://wa.me/919057206605" target="_blank" rel="noreferrer" className="footer-link">Order Tracking via WhatsApp (+91 90572 06605)</a></li>
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h4 className="footer-col-title">Collections & Legal</h4>
            <ul className="footer-links">
              <li><Link to="/products" className="footer-link">All Marble Artworks</Link></li>
              <li><Link to="/about" className="footer-link">About Our Artisans</Link></li>
              <li><Link to="/contact" className="footer-link">Jaipur Studio Atelier</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy & Export Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-col-title">Join The Sanctum</h4>
            <p style={{ fontSize: '0.84rem', color: '#9ba1a8', lineHeight: 1.5, marginBottom: 14 }}>
              Subscribe to receive private previews of new deity sculpts, architectural pooja room designs, and an exclusive 10% privilege on your first bespoke order.
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>

            <div style={{ display: 'flex', gap: 14, marginTop: 22 }}>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="icon-btn" style={{ color: '#ffffff', background: '#26282b' }} aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="icon-btn" style={{ color: '#ffffff', background: '#26282b' }} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="icon-btn" style={{ color: '#ffffff', background: '#26282b' }} aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2026 Galaxy Marble India Pvt. Ltd. All Rights Reserved. Crafted with Devotion in Rajasthan.</p>
          <img 
            src="https://cdn.shopify.com/s/files/1/0590/1952/6242/files/footer-cards.png" 
            alt="Accepted Payment Methods: Visa, Mastercard, Amex, UPI, Netbanking" 
            className="payment-badges-img"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
};
