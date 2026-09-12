import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, Trash2, Plus, Minus, ArrowRight, Check, 
  ShoppingBag, Heart, Search, ArrowUp, Phone, Calendar, Sparkles, Star 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DrawersAndModals = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
    quickViewProduct,
    setQuickViewProduct,
    isSearchOpen,
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isConsultationOpen,
    setIsConsultationOpen,
    allProducts,
    toastMessage,
    showToast
  } = useStore();

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Quick view quantity state
  const [qvQuantity, setQvQuantity] = useState(1);

  // Consultation form state
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    interest: 'Bespoke Home Temple',
    date: '',
    notes: ''
  });

  // Scroll to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(allProducts.slice(0, 8));
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = allProducts.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      );
      setSearchResults(filtered.slice(0, 16));
    }
  }, [searchQuery, allProducts]);

  // Reset quick view quantity when active product changes
  useEffect(() => {
    if (quickViewProduct) {
      setQvQuantity(1);
    }
  }, [quickViewProduct]);

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    showToast(`Appointment booked! Our senior artisan will contact you via WhatsApp.`);
    setIsConsultationOpen(false);
    setConsultForm({
      name: '',
      phone: '',
      interest: 'Bespoke Home Temple',
      date: '',
      notes: ''
    });
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="global-toast">
          ✨ {toastMessage}
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919057206605?text=Hello%20Galaxy%20Marble%2C%20I%20am%20interested%20in%20custom%20marble%20murtis%20and%20temple%20designs."
        target="_blank" 
        rel="noreferrer"
        className="floating-whatsapp"
        title="Chat on WhatsApp (+91 90572 06605)"
        aria-label="Chat on WhatsApp"
      >
        <Phone size={26} />
      </a>

      {/* Back to Top */}
      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Backdrop */}
      <div 
        className={`drawer-backdrop ${(isCartOpen || isWishlistOpen || isMobileMenuOpen) ? 'open' : ''}`}
        onClick={() => {
          setIsCartOpen(false);
          setIsWishlistOpen(false);
          setIsMobileMenuOpen(false);
        }}
      />

      {/* ==========================================================================
          Cart Slide-over Drawer
          ========================================================================== */}
      <aside className={`slide-drawer right ${isCartOpen ? 'open' : ''}`} aria-label="Shopping Cart Drawer">
        <div className="drawer-header">
          <h3 className="drawer-title">Shopping Cart ({cart.length})</h3>
          <button 
            className="icon-btn" 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Crating Progress */}
        <div style={{ padding: '12px 24px', background: '#faf8f4', borderBottom: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 6 }}>
            🛡️ Safe Export Wooden Crating & Insurance Included
          </p>
          <div style={{ width: '100%', height: 4, background: '#e0ded8', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'var(--color-gold)' }}></div>
          </div>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: 8 }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.85rem', marginBottom: 20 }}>Discover our masterfully hand-chiseled deities and artifacts.</p>
              <button 
                className="btn-primary" 
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.title} className="cart-item-row">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <span style={{ fontSize: '0.72rem', color: '#888', marginBottom: 4 }}>SKU: {item.sku}</span>
                    <span className="cart-item-price">{item.price}</span>

                    <div className="cart-qty-row">
                      <div className="qty-stepper">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.title, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.title, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.title)}
                        style={{ color: '#c93b3b', cursor: 'pointer', padding: 4 }}
                        title="Remove Item"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontWeight: 600 }}>Estimated Subtotal:</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-gold)' }}>
                ₹ {cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p style={{ fontSize: '0.74rem', color: '#888', marginBottom: 16 }}>
              Taxes and insured wooden crating calculated at checkout. Custom size adjustments available on request.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="btn-outline" 
                style={{ width: '100%' }}
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/cart');
                }}
              >
                <span>View Full Cart Page</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ==========================================================================
          Wishlist Slide-over Drawer
          ========================================================================== */}
      <aside className={`slide-drawer right ${isWishlistOpen ? 'open' : ''}`} aria-label="Wishlist Drawer">
        <div className="drawer-header">
          <h3 className="drawer-title">My Wishlist ({wishlist.length})</h3>
          <button 
            className="icon-btn" 
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
              <Heart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: 8 }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: '0.85rem' }}>Click the heart icon on any idol or temple to curate your dream sanctuary collection.</p>
            </div>
          ) : (
            <div>
              {wishlist.map((prod) => (
                <div key={prod.title} className="cart-item-row">
                  <img src={prod.image} alt={prod.title} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{prod.title}</h4>
                    <span className="cart-item-price">{prod.price}</span>

                    <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                      <button 
                        className="btn-add-cart"
                        style={{ padding: '6px 12px', fontSize: '0.72rem' }}
                        onClick={() => {
                          addToCart(prod);
                          toggleWishlist(prod);
                        }}
                      >
                        <ShoppingBag size={12} />
                        <span>Move to Cart</span>
                      </button>

                      <button 
                        onClick={() => toggleWishlist(prod)}
                        style={{ color: '#999', cursor: 'pointer', padding: 4 }}
                        title="Remove"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* ==========================================================================
          Mobile Menu Drawer (Slide-in from Left)
          ========================================================================== */}
      <aside className={`slide-drawer left ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation Menu">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img 
              src="/logo.png" 
              alt="Galaxy Marble Logo" 
              className="brand-logo-round" 
              style={{ width: 38, height: 38 }} 
            />
            <span className="brand-name" style={{ fontSize: '1.15rem' }}>GALAXY MARBLE</span>
          </div>
          <button 
            className="icon-btn" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body" style={{ padding: '16px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link 
              to="/" 
              className="dropdown-link" 
              style={{ fontSize: '0.95rem', fontWeight: 600, padding: '16px 24px', borderBottom: '1px solid #f0ede6' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="dropdown-link" 
              style={{ fontSize: '0.95rem', fontWeight: 600, padding: '16px 24px', borderBottom: '1px solid #f0ede6' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="dropdown-link" 
              style={{ fontSize: '0.95rem', fontWeight: 600, padding: '16px 24px', borderBottom: '1px solid #f0ede6' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="dropdown-link" 
              style={{ fontSize: '0.95rem', fontWeight: 600, padding: '16px 24px', borderBottom: '1px solid #f0ede6' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div style={{ padding: '24px', marginTop: 20 }}>
            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsConsultationOpen(true);
              }}
            >
              <Sparkles size={16} />
              <span>Book Virtual Consultation</span>
            </button>

            <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.82rem', color: '#777' }}>
              <p>Need urgent assistance?</p>
              <a 
                href="https://wa.me/919057206605" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#25d366', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4 }}
              >
                <Phone size={14} />
                <span>Chat on WhatsApp (+91 90572 06605)</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* ==========================================================================
          Quick View Modal
          ========================================================================== */}
      {quickViewProduct && (
        <div className="center-modal-wrap open" onClick={() => setQuickViewProduct(null)}>
          <div className="center-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30, padding: 30 }}>
              {/* Product Imagery */}
              <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#f5f5f5' }}>
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 320 }}
                />
                {quickViewProduct.discount && (
                  <span className="product-badge-discount">{quickViewProduct.discount}</span>
                )}
              </div>

              {/* Product Details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="section-tag" style={{ textAlign: 'left', marginBottom: 4 }}>
                  Authentic Makrana Marble
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
                  {quickViewProduct.title}
                </h2>
                {quickViewProduct.sku && (
                  <span style={{ fontSize: '0.78rem', color: '#888', marginBottom: 12 }}>
                    SKU: {quickViewProduct.sku} • Verified Sacred Geometry
                  </span>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" />
                  ))}
                  <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: 6 }}>(Verified Sanctum Piece)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span style={{ fontSize: '0.95rem', color: '#999', textDecoration: 'line-through' }}>
                      {quickViewProduct.originalPrice}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.6, marginBottom: 24 }}>
                  Handcrafted from Grade-A Makrana White Marble with 24K real gold foil detailing. Safe multi-layered export wooden crate shipping across India and worldwide.
                </p>

                {/* Quantity & Actions */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div className="qty-stepper" style={{ height: 44 }}>
                    <button 
                      className="qty-btn" 
                      style={{ width: 36, height: '100%' }}
                      onClick={() => setQvQuantity((prev) => Math.max(1, prev - 1))}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-val" style={{ width: 44 }}>{qvQuantity}</span>
                    <button 
                      className="qty-btn" 
                      style={{ width: 36, height: '100%' }}
                      onClick={() => setQvQuantity((prev) => prev + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ flex: 1, height: 44 }}
                    onClick={() => {
                      addToCart(quickViewProduct, qvQuantity);
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </button>

                  <button 
                    className="icon-btn" 
                    style={{ width: 44, height: 44, border: '1px solid var(--color-border)' }}
                    onClick={() => toggleWishlist(quickViewProduct)}
                    title="Wishlist"
                  >
                    <Heart size={18} fill={wishlist.some(p => p.title === quickViewProduct.title) ? "#d12f2f" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          Live Search Modal
          ========================================================================== */}
      {isSearchOpen && (
        <div className="center-modal-wrap open" onClick={() => setIsSearchOpen(false)}>
          <div 
            className="center-modal-content" 
            style={{ maxWidth: 720, padding: '28px 24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--color-border)', paddingBottom: 16 }}>
              <Search size={22} className="text-gold" />
              <input 
                type="text" 
                placeholder="Search deities (Ganesha, Radha Krishna, Hanuman), center tables, or SKUs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{ 
                  flex: 1, 
                  border: 'none', 
                  outline: 'none', 
                  fontSize: '1rem', 
                  fontFamily: 'inherit',
                  background: 'transparent' 
                }}
              />
              <button 
                className="icon-btn" 
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginTop: 20, maxHeight: '60vh', overflowY: 'auto' }}>
              <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                {searchQuery ? `Results (${searchResults.length})` : 'Popular Marble Artworks'}
              </p>

              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                  No marble sculptures found matching "{searchQuery}".
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                  {searchResults.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="product-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setQuickViewProduct(item);
                        setIsSearchOpen(false);
                      }}
                    >
                      <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: 10, textAlign: 'center' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 600, height: '2.4rem', overflow: 'hidden', lineHeight: 1.2 }}>
                          {item.title}
                        </h4>
                        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          Consultation Booking Modal
          ========================================================================== */}
      {isConsultationOpen && (
        <div className="center-modal-wrap open" onClick={() => setIsConsultationOpen(false)}>
          <div 
            className="center-modal-content" 
            style={{ maxWidth: 540, padding: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn"
              onClick={() => setIsConsultationOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <span className="section-tag">
                <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                Private Atelier Service
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600 }}>
                Book 1-on-1 Virtual Consultation
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 6 }}>
                Connect with our senior master sculptors for custom pooja room planning, deity dimensions, and 3D architectural renders.
              </p>
            </div>

            <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#444' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Rameshwar Sharma"
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 4, border: '1px solid var(--color-border)', marginTop: 4 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#444' }}>
                  WhatsApp / Phone Number *
                </label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 90572 XXXXX"
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 4, border: '1px solid var(--color-border)', marginTop: 4 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#444' }}>
                  Requirement Interest
                </label>
                <select 
                  value={consultForm.interest}
                  onChange={(e) => setConsultForm({ ...consultForm, interest: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 4, border: '1px solid var(--color-border)', marginTop: 4 }}
                >
                  <option value="Bespoke Home Temple">Bespoke Home Temple / Mandir</option>
                  <option value="Custom Deity Murti">Custom Deity Idol (Makrana Marble)</option>
                  <option value="Backlit Marble Jali">Backlit Marble Jali Wall Panel</option>
                  <option value="Marble Dining or Center Table">Marble Dining or Center Table</option>
                  <option value="Commercial Sanctuary Project">Commercial Sanctuary / Temple Project</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#444' }}>
                  Preferred Consultation Date
                </label>
                <input 
                  type="date" 
                  value={consultForm.date}
                  onChange={(e) => setConsultForm({ ...consultForm, date: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 4, border: '1px solid var(--color-border)', marginTop: 4 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', color: '#444' }}>
                  Project Dimensions / Specific Notes
                </label>
                <textarea 
                  rows={3}
                  placeholder="Tell us about your room size, preferred height of deity (e.g. 24 inch, 36 inch), or custom Vastu requirements..."
                  value={consultForm.notes}
                  onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 4, border: '1px solid var(--color-border)', marginTop: 4 }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 8 }}>
                <Calendar size={16} />
                <span>Confirm Appointment</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
