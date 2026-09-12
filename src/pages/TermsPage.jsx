import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight, FileText } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="policy-page-wrap">
      <div className="container">
        <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <span>Terms & Conditions</span>
        </nav>

        <div className="policy-header">
          <div className="policy-tag">
            <FileText size={14} className="text-gold" />
            <span>Legal Framework</span>
          </div>
          <h1>Terms of Artisanal Commission & Service</h1>
          <p className="policy-date">Effective Date: September 2026 • Galaxy Marble (Jaipur & Makrana, Rajasthan)</p>
        </div>

        <div className="policy-content-card">
          <section className="policy-section">
            <h2>1. Preamble & Scope of Commission</h2>
            <p>
              Welcome to <strong>Galaxy Marble</strong>. These Terms and Conditions govern the reservation, bespoke fabrication, payment, and delivery of handcrafted marble deity murtis, home temples (mandirs), center tables, and architectural stone ornaments commissioned via our website or atelier.
            </p>
            <p>
              By reserving an artwork or initiating a project consultation with Galaxy Marble, you acknowledge and accept the natural nuances of hand-sculpted heritage stone craftsmanship set forth herein.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Authentic Makrana Marble & Natural Stone Inherent Variations</h2>
            <p>
              Galaxy Marble exclusively carves natural stone, predominantly Grade-A crystalline Makrana white marble, Black Banswara, and natural translucent Jade Onyx.
            </p>
            <ul>
              <li>
                <strong>Organic Veining:</strong> Natural marble is formed over millennia. Subtle calcite clouds, fine grey or golden streaks, and crystalline quartz pockets are authentic signatures of the stone and are not considered defects.
              </li>
              <li>
                <strong>Handcrafted Uniqueness:</strong> As every idol is individually chiseled by hand, minor variations in facial contours, crown filigree, and pedestal carvings reflect the artisan’s individual chisel mastery.
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Custom Pooja Mandir Proportions & Vastu Tolerances</h2>
            <p>
              All bespoke mandir elevations are developed in alignment with Shilpa Shastra and Vastu Vidya principles. Due to hand chiseling and diamond pad finishing, overall dimension variances within ±0.5 inches are standard within hand-carved stone architecture.
            </p>
          </section>

          <section className="policy-section">
            <h2>4. Quotations, Invoicing & Payment Terms</h2>
            <ul>
              <li><strong>Standard Catalog Orders:</strong> Require 100% advance payment via our secure payment gateway or direct banking channel.</li>
              <li><strong>Bespoke / Grand Temple Commissions:</strong> Structured as 50% mobilization deposit upon 3D elevation sign-off, and 50% final balance upon inspection video approval prior to crating.</li>
              <li>Prices are quoted in Indian Rupees (INR) and include baseline export wooden crating unless customized.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Multi-Layer Insured Export Wooden Crating & Transit</h2>
            <p>
              Every stone sculpture is encapsulated in shock-absorbent EPE foam, moisture-sealed barrier film, and secured within export-grade heat-treated fumigated wooden crates.
            </p>
            <p>
              All shipments include door-to-door transit insurance covering structural fracture or damage during freight handling.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Receipt, Inspection & Transit Damage Protocol</h2>
            <p>
              Upon delivery, the patron or designated recipient is advised to examine the exterior wooden crate. In the unlikely event of physical transit trauma:
            </p>
            <ul>
              <li>Photograph and record a brief unboxing video clearly depicting the crate condition and damaged portion.</li>
              <li>Report the damage to Galaxy Marble Concierge at <strong>+91 90572 06605</strong> or <strong>concierge@galaxymarble.com</strong> within 48 hours of delivery.</li>
              <li>Upon verification, Galaxy Marble guarantees repair, restorative sculpting, or full replacement under transit insurance at zero supplementary cost.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Cancellations, Modifications & Returns</h2>
            <p>
              Because each murti and mandir is commissioned specifically to order and often sanctified with custom dimension requirements, bespoke orders cannot be cancelled once block cutting has commenced. Catalog items may be exchanged within 7 days of delivery in pristine original packaging.
            </p>
          </section>

          <section className="policy-section">
            <h2>8. Governing Law & Atelier Concierge Contact</h2>
            <p>
              These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Jaipur, Rajasthan.
            </p>
            <div className="contact-callout-box">
              <ShieldCheck size={20} className="text-gold" />
              <div>
                <strong>Questions regarding your commission terms?</strong>
                <p>Contact our Legal & Client Relations Desk at <a href="mailto:legal@galaxymarble.com">legal@galaxymarble.com</a> or <a href="tel:+919057206605">+91 90572 06605</a>.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
