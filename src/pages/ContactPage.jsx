import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Send, MessageCircle, 
  Sparkles, CheckCircle, ShieldCheck, ChevronRight,
  ExternalLink, Navigation
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function ContactPage() {
  const { showToast } = useStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Bespoke Pooja Room Mandir',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Inquiry sent! Our head artisan will connect with you via WhatsApp.');
  };

  return (
    <div className="contact-page-wrap spacy-mode">
      {/* Hero Header */}
      <div className="contact-hero-header">
        <div className="container">
          <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span>Contact Us</span>
          </nav>

          <div className="contact-hero-content">
            <span className="section-tag">
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              Direct Atelier Concierge
            </span>
            <h1 className="contact-title">Connect With Our Sculptors</h1>
            <p className="contact-desc">
              Bespoke murtis, luxury mandirs & architectural stone artistry.
            </p>
          </div>
        </div>
      </div>

      {/* Spacious 3-Card Info Strip */}
      <div className="contact-info-strip spacy">
        <div className="container">
          <div className="spacy-info-grid">
            <div className="spacy-info-card">
              <div className="info-icon-box">
                <MapPin size={22} className="text-gold" />
              </div>
              <div className="info-details">
                <h3>Makrana Atelier & Studio</h3>
                <p>Makrana, Rajasthan 341505, India</p>
                <span className="info-sub">Quarry & Hand-Sculpting Atelier</span>
              </div>
            </div>

            <div className="spacy-info-card">
              <div className="info-icon-box">
                <Phone size={22} className="text-gold" />
              </div>
              <div className="info-details">
                <h3>Call & WhatsApp</h3>
                <p>
                  <a href="https://wa.me/919057206605" target="_blank" rel="noreferrer" className="text-gold font-semibold">
                    +91 90572 06605
                  </a>
                </p>
                <span className="info-sub">Mon–Sat: 9:30 AM – 7:30 PM</span>
              </div>
            </div>

            <div className="spacy-info-card">
              <div className="info-icon-box">
                <Mail size={22} className="text-gold" />
              </div>
              <div className="info-details">
                <h3>Email Concierge</h3>
                <p><a href="mailto:concierge@galaxymarble.com">concierge@galaxymarble.com</a></p>
                <span className="info-sub">24-Hour Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Clean Form & Studio Highlights */}
      <div className="container contact-main-body spacy">
        <div className="contact-split-layout spacy">
          {/* Left: Streamlined Inquiry Form */}
          <div className="contact-form-card spacy">
            {isSubmitted ? (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle size={52} className="text-gold" />
                </div>
                <h2>Thank You, {formData.name}!</h2>
                <p>
                  Your inquiry for <strong>{formData.projectType}</strong> has been received. Our senior artisan will message you on WhatsApp at <strong>{formData.phone}</strong> shortly.
                </p>
                <button 
                  className="btn-outline" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      projectType: 'Bespoke Pooja Room Mandir',
                      message: ''
                    });
                  }}
                  style={{ marginTop: 24 }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="luxury-contact-form spacy">
                <div className="form-header spacy">
                  <h2>Project Consultation</h2>
                  <p>Share your requirement for custom sizing, 3D designs, and quote.</p>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Rajesh Singhania"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label>WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      placeholder="+91 90572 XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label>Requirement *</label>
                    <select 
                      name="projectType" 
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      <option value="MARBLE SLABS & TILES">MARBLE SLABS & TILES</option>
                      <option value="TEMPLES & MANDIRS">TEMPLES & MANDIRS</option>
                      <option value="LUXURY FURNITURE">LUXURY FURNITURE</option>
                      <option value="FIREPLACES & INLAYS">FIREPLACES & INLAYS</option>
                      <option value="Home Decor Accents (Urli, Lamps)">Decor Accents</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Dimensions / Specifications (Optional)</label>
                  <textarea 
                    name="message" 
                    rows={3}
                    placeholder="Height, space dimensions, or preferred deity posture..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary form-submit-btn">
                  <Send size={16} />
                  <span>Request Custom Consultation</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Atelier & WhatsApp Card */}
          <div className="contact-sidebar-card spacy">
            <div className="atelier-highlight-box spacy">
              <span className="gold-tag">Jaipur & Makrana</span>
              <h3>Visit Our Studio</h3>
              <p>
                Schedule an in-person walkthrough to inspect raw Makrana blocks, view live chiseling, and review 3D temple elevations.
              </p>

              <div className="atelier-perks-list spacy">
                <div className="perk-item">
                  <ShieldCheck size={18} className="text-gold" />
                  <span>100% Pure Makrana Marble</span>
                </div>
                <div className="perk-item">
                  <ShieldCheck size={18} className="text-gold" />
                  <span>Vedic Vastu Shastra Alignment</span>
                </div>
                <div className="perk-item">
                  <ShieldCheck size={18} className="text-gold" />
                  <span>Door-to-Door Insured Wooden Crating</span>
                </div>
              </div>

              <div className="whatsapp-callout spacy">
                <h4>Instant WhatsApp Concierge</h4>
                <p>Send your drawings, room photos, or deity ideas directly to our master artisan.</p>
                <a 
                  href="https://wa.me/919057206605?text=Hello%20Galaxy%20Marble%2C%20I%20am%20interested%20in%20custom%20marble%20mandirs%20and%20murtis."
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-btn"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp (+91 90572 06605)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Google Map Section - Makrana, Rajasthan */}
      <section className="contact-map-section spacy">
        <div className="container">
          <div className="map-card-wrapper">
            <div className="map-header-bar">
              <div className="map-header-left">
                <span className="gold-tag">Atelier & Heritage Quarries</span>
                <h3>Makrana, Rajasthan, India</h3>
                <p>Coordinates: 27.0375° N, 74.7279° E • Birthplace of the Taj Mahal & historic temple marble</p>
              </div>
              <a 
                href="https://www.google.com/maps/place/Makrana,+Rajasthan/@27.0432,74.7432,17z/data=!4m6!3m5!1s0x396b9dabf80381a5:0x54ae574801fd7669!8m2!3d27.0375085!4d74.7279059!16zL20vMGI0aHRn?hl=en&entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="btn-outline map-open-btn"
              >
                <Navigation size={16} />
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="map-iframe-container">
              <iframe
                title="Galaxy Marble Studio - Makrana, Rajasthan"
                src="https://maps.google.com/maps?q=Makrana%2C%20Rajasthan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
