import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, ChevronRight } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="policy-page-wrap">
      <div className="container">
        <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <span>Privacy Policy</span>
        </nav>

        <div className="policy-header">
          <div className="policy-tag">
            <Lock size={14} className="text-gold" />
            <span>Patron Privacy & Trust</span>
          </div>
          <h1>Client Privacy & Information Protection</h1>
          <p className="policy-date">Last Updated: September 2026 • Galaxy Marble Privacy Framework</p>
        </div>

        <div className="policy-content-card">
          <section className="policy-section">
            <h2>1. Our Commitment to Your Privacy</h2>
            <p>
              At <strong>Galaxy Marble</strong>, we hold the sanctity and discretion of our patrons in the highest esteem. This Privacy Policy details how we collect, safeguard, and utilize personal details and architectural data shared with us through our website, WhatsApp concierge, and atelier consultations.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Information Collected During Consultation & Purchase</h2>
            <ul>
              <li>
                <strong>Personal Identification:</strong> Name, delivery address, phone number, and email address for order fulfillment and insured transit documentation.
              </li>
              <li>
                <strong>Architectural & Vastu Specifications:</strong> Room dimensions, Pooja room floor plans, and custom stone design sketches provided to our architects.
              </li>
              <li>
                <strong>Transaction Data:</strong> Encrypted payment confirmation references from verified payment gateways (Razorpay, UPI, Wire Transfer). We do not store raw credit/debit card numbers or bank credentials.
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Purpose & Utilization of Patron Data</h2>
            <p>Your details are utilized strictly for:</p>
            <ul>
              <li>Direct artisan communication and video progress updates regarding your custom sculpture.</li>
              <li>Export packaging, fumigation certification, and door-to-door transit logistics.</li>
              <li>Providing authentic stone provenance certificates and warranty registration.</li>
              <li>Customer support follow-ups and maintenance guidance for Makrana white marble.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Discretion of Custom Mandir Designs</h2>
            <p>
              All bespoke architectural drawings, sacred family deity modifications, and private residence installations remain strictly proprietary and confidential. Galaxy Marble will never publish photos of your residential sanctuary without your explicit prior written consent.
            </p>
          </section>

          <section className="policy-section">
            <h2>5. Bank-Grade Security Measures</h2>
            <p>
              Our website utilizes standard SSL/TLS (Secure Sockets Layer) 256-bit encryption for all data transmissions. Internal access to client addresses and project files is limited exclusively to senior atelier coordinators and logistics dispatchers.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Patron Data Rights & Contact Desk</h2>
            <p>
              You may request access to, amendment of, or deletion of your personal contact records at any time by contacting our Data Protection Officer:
            </p>
            <div className="contact-callout-box">
              <ShieldCheck size={20} className="text-gold" />
              <div>
                <strong>Privacy & Client Data Desk:</strong>
                <p>Email: <a href="mailto:privacy@galaxymarble.com">privacy@galaxymarble.com</a> • WhatsApp: <a href="https://wa.me/919057206605">+91 90572 06605</a></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
