import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowRight, ShoppingBag, 
  Sparkles, ShieldCheck, Truck, ChevronRight, MessageCircle, Phone, User, MapPin, FileText, CheckCircle2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, submitCartEnquiry, currentUser, setIsAuthModalOpen } = useStore();
  const navigate = useNavigate();

  // Contact Form
  const [customerName, setCustomerName] = useState(() => currentUser ? currentUser.full_name : '');
  const [customerPhone, setCustomerPhone] = useState(() => currentUser ? currentUser.phone : '');
  const [siteLocation, setSiteLocation] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync if user logs in
  React.useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.full_name);
      if (!customerPhone) setCustomerPhone(currentUser.phone);
    }
  }, [currentUser]);

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      alert('Please provide a valid 10-digit WhatsApp phone number so our artisans can connect with you.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fullNotes = [
        siteLocation ? `Site Location: ${siteLocation}` : '',
        projectNotes ? `Specifications: ${projectNotes}` : ''
      ].filter(Boolean).join(' | ');

      await submitCartEnquiry({
        name: customerName.trim() || 'Valued Patron',
        phone: customerPhone.trim(),
        notes: fullNotes
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-page-wrap">
      {/* Header */}
      <div className="cart-hero-header">
        <div className="container">
          <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span>Project Enquiry Bag</span>
          </nav>

          <div className="cart-hero-content">
            <span className="section-tag">
              <ShoppingBag size={12} style={{ display: 'inline', marginRight: 4 }} />
              Architectural Quotation Request
            </span>
            <h1 className="cart-title">Your Selected Stone Masterpieces</h1>
            <p className="cart-desc">
              Review your selected marble slabs, bespoke pooja mandirs, and luxury furniture. Submit your enquiry to receive direct quarry pricing and WhatsApp consultation.
            </p>
          </div>
        </div>
      </div>

      <div className="container cart-main-body">
        {isSubmitted ? (
          <div className="cart-empty-screen">
            <div className="empty-cart-icon">
              <CheckCircle2 size={64} className="text-gold" />
            </div>
            <h2>Quotation Enquiry Submitted!</h2>
            <p>
              Your enquiry has been logged in our system with timestamp and transmitted to our master architects via WhatsApp. Our team will contact you shortly on <strong>{customerPhone}</strong>.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24 }}>
              <button 
                className="btn-primary"
                onClick={() => {
                  clearCart();
                  navigate('/products');
                }}
              >
                Browse More Products
              </button>
              <Link to="/" className="btn-secondary">
                Return to Home
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty-screen">
            <div className="empty-cart-icon">
              <ShoppingBag size={56} className="text-gold" />
            </div>
            <h2>Your Enquiry Bag is Empty</h2>
            <p>You have not selected any stone masterpieces yet. Explore our signature Makrana marble slabs, hand-carved mandirs, and luxury furniture.</p>
            <Link to="/products" className="btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
              Explore Architectural Catalog
            </Link>
          </div>
        ) : (
          <div className="cart-split-layout">
            {/* Left Column: Items List */}
            <div className="cart-items-column">
              <div className="crating-progress-box">
                <div className="crating-icon">
                  <Truck size={22} className="text-gold" />
                </div>
                <div className="crating-text">
                  <p className="crating-qualified">
                    ✨ <strong>Export-Insured Crating & Freight:</strong> All products are packed in multi-layered insured wooden crates with worldwide door-to-door transit insurance.
                  </p>
                </div>
              </div>

              {/* Items Card */}
              <div className="cart-table-card">
                <div className="cart-table-header">
                  <span>Selected Product ({cart.length})</span>
                  <span>Quantity</span>
                  <span>Pricing</span>
                </div>

                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id || item.title} className="cart-item-row">
                      <div className="item-cell-product">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="cart-thumb" 
                        />
                        <div className="item-info">
                          <span className="item-category-pill">
                            {(item.category || '').toUpperCase()}
                          </span>
                          <h3 className="item-title">{item.title}</h3>
                          <div className="item-meta-sub">
                            <span>Stone: {item.stoneType || 'Natural Marble'}</span>
                            {item.dimensions && <span>• {item.dimensions}</span>}
                          </div>
                          <button 
                            className="btn-remove-row"
                            onClick={() => removeFromCart(item.id || item.title)}
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="item-cell-qty">
                        <div className="cart-qty-stepper">
                          <button 
                            onClick={() => updateQuantity(item.id || item.title, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id || item.title, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Pricing Cell */}
                      <div className="item-cell-price">
                        <span className="price-tag-enquiry">Price on Request</span>
                        <span className="price-tag-sub">Direct Quarry Quote</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer-actions">
                  <Link to="/products" className="btn-continue-shopping">
                    ← Add More Products
                  </Link>
                  <button className="btn-clear-cart" onClick={clearCart}>
                    Clear Entire Bag
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Customer Details & WhatsApp Submission */}
            <div className="cart-summary-column">
              <div className="cart-summary-card">
                <div className="summary-header">
                  <Sparkles size={16} className="text-gold" />
                  <h2>Submit Quotation Request</h2>
                </div>

                <form onSubmit={handleSubmitEnquiry} className="enquiry-contact-form">
                  {!currentUser && (
                    <div className="guest-auth-prompt">
                      <span>Have an account?</span>
                      <button 
                        type="button" 
                        className="auth-link-btn"
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        Sign in for fast auto-fill
                      </button>
                    </div>
                  )}

                  <div className="form-field">
                    <label htmlFor="client-name">Your Full Name *</label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input 
                        id="client-name"
                        type="text" 
                        required
                        placeholder="e.g. Vikramaditya Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="client-phone">WhatsApp Phone Number *</label>
                    <div className="input-with-icon">
                      <Phone size={16} className="input-icon" />
                      <input 
                        id="client-phone"
                        type="tel" 
                        required
                        placeholder="10-digit mobile number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                    <small className="field-hint">
                      Admin will log this enquiry and connect with you on WhatsApp.
                    </small>
                  </div>

                  <div className="form-field">
                    <label htmlFor="client-loc">Project Location (City / State)</label>
                    <div className="input-with-icon">
                      <MapPin size={16} className="input-icon" />
                      <input 
                        id="client-loc"
                        type="text" 
                        placeholder="e.g. Mumbai, Maharashtra"
                        value={siteLocation}
                        onChange={(e) => setSiteLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="client-notes">Custom Dimensions / Notes</label>
                    <div className="input-with-icon">
                      <FileText size={16} className="input-icon" />
                      <textarea 
                        id="client-notes"
                        rows={3}
                        placeholder="e.g. Sizing requirements, edge profile, Pooja room height..."
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Primary Submit Button */}
                  <button 
                    type="submit" 
                    className="btn-submit-whatsapp-quote"
                    disabled={isSubmitting}
                  >
                    <MessageCircle size={20} />
                    <span>{isSubmitting ? 'Logging Enquiry...' : 'Enquire on WhatsApp'}</span>
                  </button>
                </form>

                {/* Trust Points */}
                <div className="summary-trust-badges">
                  <div className="trust-item">
                    <ShieldCheck size={16} className="text-gold" />
                    <span>100% Direct Marble Quarry Rates</span>
                  </div>
                  <div className="trust-item">
                    <Sparkles size={16} className="text-gold" />
                    <span>Free CAD Drawing Consultation</span>
                  </div>
                  <div className="trust-item">
                    <Truck size={16} className="text-gold" />
                    <span>Insured Wooden Export Crating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
