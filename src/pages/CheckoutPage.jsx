import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Lock, CheckCircle2, Truck, CreditCard, 
  Sparkles, ChevronRight, Phone, ArrowLeft 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function CheckoutPage() {
  const { cart, cartSubtotal } = useStore();
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    suite: '',
    city: '',
    state: 'Rajasthan',
    pinCode: '',
    country: 'India',
    notes: ''
  });

  const cratingCost = cartSubtotal >= 100000 ? 0 : 4999;
  const assemblyCost = shippingMethod === 'white-glove' ? 4999 : 0;
  const grandTotal = cartSubtotal + cratingCost + assemblyCost;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedOrderNo = 'GM-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrderNo);
    setIsOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0 && !isOrderPlaced) {
    return (
      <div className="checkout-empty-wrap container">
        <div className="empty-cart-screen">
          <h2>No Items to Checkout</h2>
          <p>Your shopping cart is currently empty. Please select a marble sculpture to proceed.</p>
          <Link to="/products" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
            Browse Marble Artworks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrap">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <span>Checkout</span>
        </nav>

        {isOrderPlaced ? (
          /* Order Confirmation Screen */
          <div className="order-confirmation-card">
            <div className="confirmation-badge">
              <CheckCircle2 size={64} className="text-gold" />
            </div>
            <span className="gold-tag">Artisanal Order Confirmed</span>
            <h1 className="confirmation-title">Thank You, {formData.firstName || 'Honored Patron'}!</h1>
            <p className="confirmation-sub">
              Your order <strong>#{orderNumber}</strong> has been successfully registered with Galaxy Marble Ateliers.
            </p>

            <div className="order-summary-box">
              <div className="summary-row">
                <span>Order Reference:</span>
                <strong>{orderNumber}</strong>
              </div>
              <div className="summary-row">
                <span>Total Amount:</span>
                <strong>₹ {grandTotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="summary-row">
                <span>Payment Mode:</span>
                <strong>
                  {paymentMethod === 'upi' ? 'UPI (Instant Confirmation)' :
                   paymentMethod === 'card' ? 'Credit / Debit Card' :
                   paymentMethod === 'concierge' ? 'WhatsApp Concierge Assisted Wire' : 'Net Banking'}
                </strong>
              </div>
              <div className="summary-row">
                <span>Dispatch & Crating:</span>
                <strong>Multi-Layer Wooden Export Crating (Insured)</strong>
              </div>
              <div className="summary-row">
                <span>Delivery Destination:</span>
                <span>{formData.city ? `${formData.city}, ${formData.state} - ${formData.pinCode}` : 'Destination Address Provided'}</span>
              </div>
            </div>

            <div className="confirmation-next-steps">
              <h4>What happens next?</h4>
              <ul>
                <li>Our senior sculptor inspects the raw Makrana stone slab and verifies iconographic Vastu alignment.</li>
                <li>You will receive photo and HD video updates on WhatsApp (<strong>{formData.phone || '+91 90572 06605'}</strong>) as carving begins.</li>
                <li>Before wooden crating dispatch, a final virtual walkthrough will be conducted for your sign-off.</li>
              </ul>
            </div>

            <div className="confirmation-actions">
              <button 
                className="btn-primary"
                onClick={() => navigate('/')}
              >
                Return to Galaxy Marble Home
              </button>
              <a 
                href={`https://wa.me/919057206605?text=Hello%20Galaxy%20Marble%2C%20I%20just%20placed%20order%20%23${orderNumber}.`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Connect on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          /* Checkout Split Form */
          <div className="checkout-split-layout">
            {/* Left: Forms */}
            <form onSubmit={handlePlaceOrder} className="checkout-form-column">
              {/* 1. Contact Info */}
              <div className="checkout-section-box">
                <div className="section-box-header">
                  <span className="step-num">1</span>
                  <h3>Contact Information</h3>
                </div>
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="patron@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>WhatsApp Contact Mobile *</label>
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
              </div>

              {/* 2. Shipping Address */}
              <div className="checkout-section-box">
                <div className="section-box-header">
                  <span className="step-num">2</span>
                  <h3>Temple / Residence Delivery Address</h3>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      required 
                      placeholder="Rajesh"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      required 
                      placeholder="Singhania"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Street Address *</label>
                  <input 
                    type="text" 
                    name="address" 
                    required 
                    placeholder="House / Villa No., Society / Street Name"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Apartment / Landmark / Pooja Hall Floor</label>
                  <input 
                    type="text" 
                    name="suite" 
                    placeholder="e.g. 2nd Floor, Villa Lotus"
                    value={formData.suite}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-grid-3">
                  <div className="form-field">
                    <label>City *</label>
                    <input 
                      type="text" 
                      name="city" 
                      required 
                      placeholder="Jaipur / Mumbai"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>State *</label>
                    <input 
                      type="text" 
                      name="state" 
                      required 
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>PIN Code *</label>
                    <input 
                      type="text" 
                      name="pinCode" 
                      required 
                      placeholder="302018"
                      value={formData.pinCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Shipping Options */}
              <div className="checkout-section-box">
                <div className="section-box-header">
                  <span className="step-num">3</span>
                  <h3>Delivery & Crating Method</h3>
                </div>

                <div className="shipping-radio-options">
                  <label className={`shipping-option-card ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                    />
                    <div className="option-info">
                      <strong>Multi-Layer Insured Wooden Export Crating</strong>
                      <p>Fumigated wooden box with high-density EPE foam & shock absorption</p>
                    </div>
                    <span className="option-price">
                      {cratingCost === 0 ? 'FREE' : `₹ ${cratingCost.toLocaleString('en-IN')}`}
                    </span>
                  </label>

                  <label className={`shipping-option-card ${shippingMethod === 'white-glove' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="white-glove"
                      checked={shippingMethod === 'white-glove'}
                      onChange={() => setShippingMethod('white-glove')}
                    />
                    <div className="option-info">
                      <strong>White-Glove Inside Delivery & Mandir Placement</strong>
                      <p>Includes uncrating, room-of-choice placement, and debris removal</p>
                    </div>
                    <span className="option-price">+ ₹ 4,999</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Selection */}
              <div className="checkout-section-box">
                <div className="section-box-header">
                  <span className="step-num">4</span>
                  <h3>Payment Preferences</h3>
                </div>

                <div className="payment-options-grid">
                  <label className={`payment-pill ${paymentMethod === 'upi' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="upi" 
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <span>UPI (GPay / PhonePe / Paytm)</span>
                  </label>

                  <label className={`payment-pill ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span>Credit / Debit Cards</span>
                  </label>

                  <label className={`payment-pill ${paymentMethod === 'concierge' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="concierge" 
                      checked={paymentMethod === 'concierge'}
                      onChange={() => setPaymentMethod('concierge')}
                    />
                    <span>WhatsApp Concierge Wire (50% Booking)</span>
                  </label>
                </div>

                <div className="payment-note-box">
                  <Lock size={15} className="text-gold" />
                  <span>256-bit Bank Grade Encryption • Escrow Protection • 100% Genuine Makrana Guarantee</span>
                </div>
              </div>

              <button type="submit" className="btn-primary place-order-btn">
                <span>Place Order & Confirm Production</span>
                <Sparkles size={18} />
              </button>
            </form>

            {/* Right: Sticky Order Review */}
            <div className="checkout-summary-column">
              <div className="checkout-summary-card">
                <h3>Order Review ({cart.length} Artworks)</h3>

                <div className="checkout-items-list">
                  {cart.map((item) => (
                    <div key={item.id || item.title} className="checkout-mini-item">
                      <div className="mini-thumb-wrap">
                        <img src={item.image} alt={item.title} className="mini-thumb" />
                        <span className="mini-qty-badge">{item.quantity}</span>
                      </div>
                      <div className="mini-info">
                        <h4>{item.title}</h4>
                        <span className="mini-sku">{item.sku}</span>
                      </div>
                      <span className="mini-price">
                        ₹ {((item.numericPrice || 99999) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="summary-lines">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹ {cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-line">
                    <span>Export Wooden Crating</span>
                    <span>{cratingCost === 0 ? 'FREE' : `₹ ${cratingCost.toLocaleString('en-IN')}`}</span>
                  </div>
                  {shippingMethod === 'white-glove' && (
                    <div className="summary-line text-gold">
                      <span>White-Glove Mandir Placement</span>
                      <span>+ ₹ 4,999</span>
                    </div>
                  )}
                  <div className="summary-line total-line">
                    <span>Total Payable</span>
                    <span className="grand-total-amount">
                      ₹ {grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="checkout-trust-points">
                  <div className="trust-point">
                    <ShieldCheck size={16} className="text-gold" />
                    <span>Pure Makrana Marble Quarry Certificate</span>
                  </div>
                  <div className="trust-point">
                    <Truck size={16} className="text-gold" />
                    <span>Full Transit Insurance Included</span>
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
