import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowRight, ShoppingBag, 
  Sparkles, ShieldCheck, Truck, ChevronRight, Tag 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, showToast } = useStore();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [orderNote, setOrderNote] = useState('');

  const freeCratingThreshold = 100000;
  const cratingCost = cartSubtotal >= freeCratingThreshold ? 0 : 4999;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + cratingCost);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'MAKRANA10') {
      setDiscountPercent(10);
      showToast('10% Artisanal Coupon Applied!');
    } else if (couponCode.trim().toUpperCase() === 'GALAXY') {
      setDiscountPercent(15);
      showToast('15% VIP Patron Discount Applied!');
    } else {
      showToast('Invalid coupon code. Try "MAKRANA10"');
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
            <span>Shopping Cart</span>
          </nav>

          <div className="cart-hero-content">
            <span className="section-tag">
              <ShoppingBag size={12} style={{ display: 'inline', marginRight: 4 }} />
              Sacred Patron Cart
            </span>
            <h1 className="cart-title">Your Selected Stone Sculptures</h1>
            <p className="cart-desc">
              Review your customized deities and architectural accents before reserving master artisan production.
            </p>
          </div>
        </div>
      </div>

      <div className="container cart-main-body">
        {cart.length === 0 ? (
          <div className="cart-empty-screen">
            <div className="empty-cart-icon">
              <ShoppingBag size={56} className="text-gold" />
            </div>
            <h2>Your Shopping Cart is Empty</h2>
            <p>You have not selected any marble masterpieces yet. Browse our signature collections carved from pure Makrana marble.</p>
            <Link to="/products" className="btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
              Explore Artisanal Collection
            </Link>
          </div>
        ) : (
          <div className="cart-split-layout">
            {/* Left: Cart Items List */}
            <div className="cart-items-column">
              {/* Shipping Progress */}
              <div className="crating-progress-box">
                <div className="crating-icon">
                  <Truck size={20} className="text-gold" />
                </div>
                <div className="crating-text">
                  {cartSubtotal >= freeCratingThreshold ? (
                    <p className="crating-qualified">
                      ✨ <strong>Congratulations!</strong> You qualify for <strong>FREE Door-to-Door Insured Wooden Crating</strong> worldwide!
                    </p>
                  ) : (
                    <p>
                      Add <strong>₹ {(freeCratingThreshold - cartSubtotal).toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Export Insured Wooden Crating</strong>!
                    </p>
                  )}
                  <div className="crating-bar-track">
                    <div 
                      className="crating-bar-fill"
                      style={{ width: `${Math.min(100, (cartSubtotal / freeCratingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="cart-table-card">
                <div className="cart-table-header hidden md:grid">
                  <span>Artwork</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span style={{ textAlign: 'right' }}>Total</span>
                </div>

                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id || item.title} className="cart-item-row">
                      <div className="item-artwork-info">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="item-thumb-img" 
                        />
                        <div className="item-details">
                          <h3 className="item-title">{item.title}</h3>
                          <span className="item-sku">SKU: {item.sku}</span>
                          <span className="item-stone-badge">Pure Makrana White</span>
                          <button 
                            className="remove-link-btn"
                            onClick={() => removeFromCart(item.title)}
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="item-unit-price">
                        <span className="mobile-label md:hidden">Price: </span>
                        <strong>{item.price}</strong>
                      </div>

                      <div className="item-quantity-stepper">
                        <div className="stepper-box">
                          <button 
                            onClick={() => updateQuantity(item.title, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.title, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="item-line-total">
                        <span className="mobile-label md:hidden">Subtotal: </span>
                        <strong>
                          ₹ {((item.numericPrice || 99999) * item.quantity).toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Notes / Vastu Instructions */}
              <div className="cart-notes-card">
                <h3>Special Instructions & Vastu Requirements</h3>
                <p>Add custom dimension constraints, deity posture requirements, or prayer hall delivery specifics:</p>
                <textarea 
                  rows={3}
                  placeholder="e.g. Please ensure the pedestal height matches our mandir platform (36 inches). Abhaya mudra preferred."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                />
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="cart-summary-column">
              <div className="cart-summary-card">
                <h3 className="summary-title">Order Summary</h3>

                {/* Coupon Box */}
                <form onSubmit={applyCoupon} className="coupon-form">
                  <div className="coupon-input-wrap">
                    <Tag size={15} className="text-gold" />
                    <input 
                      type="text" 
                      placeholder="Coupon (e.g. MAKRANA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="coupon-btn">Apply</button>
                  </div>
                </form>

                <div className="summary-lines">
                  <div className="summary-line">
                    <span>Sculptures Subtotal</span>
                    <span>₹ {cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="summary-line text-gold">
                      <span>Artisanal Discount ({discountPercent}%)</span>
                      <span>- ₹ {discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="summary-line">
                    <span>Multi-Layer Insured Wooden Crating</span>
                    <span>
                      {cratingCost === 0 ? (
                        <strong className="text-green">FREE</strong>
                      ) : (
                        `₹ ${cratingCost.toLocaleString('en-IN')}`
                      )}
                    </span>
                  </div>

                  <div className="summary-line">
                    <span>Vedic Vastu Quality Inspection</span>
                    <span className="text-green">COMPLIMENTARY</span>
                  </div>

                  <div className="summary-line total-line">
                    <span>Estimated Total</span>
                    <span className="grand-total-amount">
                      ₹ {grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button 
                  className="btn-primary checkout-action-btn"
                  onClick={() => navigate('/checkout')}
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <Link to="/products" className="continue-shopping-link">
                  ← Continue Exploring Collections
                </Link>

                <div className="cart-security-perks">
                  <div className="perk-item">
                    <ShieldCheck size={16} className="text-gold" />
                    <span>100% Certified Makrana White Marble Guarantee</span>
                  </div>
                  <div className="perk-item">
                    <Truck size={16} className="text-gold" />
                    <span>Transit Damage Insurance Included</span>
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
