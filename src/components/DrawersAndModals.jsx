import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, Trash2, Plus, Minus, ArrowRight, Check, 
  ShoppingBag, Heart, Search, ArrowUp, Phone, Sparkles, Star, MessageCircle, ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AuthModal } from './AuthModal';

export const DrawersAndModals = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
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
    showToast,
    enquireOnWhatsApp,
    submitCartEnquiry,
    currentUser,
    setIsAuthModalOpen
  } = useStore();

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Quick view quantity & selected image state
  const [qvQuantity, setQvQuantity] = useState(1);
  const [qvSelectedImgIdx, setQvSelectedImgIdx] = useState(0);

  // Consultation form state
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    interest: 'Bespoke Architectural Project',
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
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        ((p.stone_type || p.stoneType) && (p.stone_type || p.stoneType).toLowerCase().includes(q))
      );
      setSearchResults(filtered.slice(0, 16));
    }
  }, [searchQuery, allProducts]);

  // Reset quick view quantity & active image when active product changes
  useEffect(() => {
    if (quickViewProduct) {
      setQvQuantity(1);
      setQvSelectedImgIdx(0);
    }
  }, [quickViewProduct]);

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    showToast(`Appointment booked! Our senior architectural engineer will contact you via WhatsApp.`);
    setIsConsultationOpen(false);
    setConsultForm({
      name: '',
      phone: '',
      interest: 'Bespoke Architectural Project',
      date: '',
      notes: ''
    });
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <aside 
          className="global-toast-notification"
          role="status"
          aria-live="polite"
        >
          <div className="toast-inner-wrap">
            <span className="toast-bullet-icon" aria-hidden="true">✓</span>
            <span className="toast-body-text">{toastMessage}</span>
          </div>
        </aside>
      )}

      {/* Floating Back to Top Button */}
      <button 
        className={`floating-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>

      {/* User Login / Register Modal */}
      <AuthModal />

      {/* 1. ENQUIRY CART DRAWER */}
      {isCartOpen && (
        <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div 
            className="drawer-panel drawer-right cart-drawer" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Enquiry Bag"
          >
            <div className="drawer-header">
              <div className="drawer-title-group">
                <ShoppingBag size={20} className="text-gold" />
                <h2>Project Enquiry Bag ({cart.length})</h2>
              </div>
              <button 
                className="drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Enquiry Bag"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="drawer-empty-state">
                  <ShoppingBag size={48} className="empty-icon" />
                  <h3>Your Enquiry Bag is Empty</h3>
                  <p>Browse our architectural slabs, mandirs, and luxury stone pieces to request a quotation.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/products');
                    }}
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="drawer-cart-list">
                  {cart.map((item) => (
                    <div key={item.id || item.title} className="drawer-cart-item">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="drawer-item-img" 
                      />
                      <div className="drawer-item-info">
                        <span className="drawer-item-cat">{(item.category || '').toUpperCase()}</span>
                        <h4 className="drawer-item-title">{item.title}</h4>
                        <div className="drawer-item-stone">{item.stoneType}</div>
                        <div className="drawer-item-price-note">Price on Request</div>

                        <div className="drawer-qty-row">
                          <div className="drawer-qty-stepper">
                            <button 
                              onClick={() => updateQuantity(item.id || item.title, -1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id || item.title, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button 
                            className="drawer-remove-item"
                            onClick={() => removeFromCart(item.id || item.title)}
                            aria-label="Remove item"
                            title="Remove"
                          >
                            <Trash2 size={14} />
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
                <div className="drawer-summary-card">
                  <p className="enquiry-bag-hint">
                    ✨ <strong>Official Quotation:</strong> Submitting will record your enquiry and open WhatsApp to discuss pricing, custom sizing & freight.
                  </p>
                </div>

                <div className="drawer-action-stack">
                  {/* WhatsApp Direct Bulk Enquiry */}
                  <button 
                    className="btn-whatsapp-full"
                    onClick={() => {
                      submitCartEnquiry({
                        name: currentUser ? currentUser.full_name : '',
                        phone: currentUser ? currentUser.phone : '',
                        notes: 'Direct enquiry from quick bag'
                      });
                      setIsCartOpen(false);
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>Enquire on WhatsApp</span>
                  </button>

                  {/* Full Cart / Quote Details Page */}
                  <button 
                    className="btn-drawer-checkout"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/cart');
                    }}
                  >
                    <span>Review Project Enquiry</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div 
            className="drawer-panel drawer-right wishlist-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Wishlist"
          >
            <div className="drawer-header">
              <div className="drawer-title-group">
                <Heart size={20} className="text-gold" />
                <h2>Saved Masterpieces ({wishlist.length})</h2>
              </div>
              <button 
                className="drawer-close-btn"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close Wishlist"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              {wishlist.length === 0 ? (
                <div className="drawer-empty-state">
                  <Heart size={48} className="empty-icon" />
                  <h3>Your Wishlist is Empty</h3>
                  <p>Save hand-carved stone art and architectural marble to your private moodboard.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigate('/products');
                    }}
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="drawer-cart-list">
                  {wishlist.map((item) => (
                    <div key={item.id || item.title} className="drawer-cart-item">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="drawer-item-img" 
                      />
                      <div className="drawer-item-info">
                        <span className="drawer-item-cat">{(item.category || '').toUpperCase()}</span>
                        <h4 className="drawer-item-title">{item.title}</h4>
                        <div className="drawer-item-price-note">Price on Request</div>

                        <div className="drawer-wishlist-actions">
                          <button 
                            className="btn-wishlist-move-cart"
                            onClick={() => {
                              addToCart(item);
                              toggleWishlist(item);
                            }}
                          >
                            <ShoppingBag size={12} />
                            <span>Add to Enquiry</span>
                          </button>
                          <button 
                            className="drawer-remove-item"
                            onClick={() => toggleWishlist(item)}
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. PRODUCT QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div 
            className="quick-view-modal-card" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={quickViewProduct.title}
          >
            <button 
              className="modal-close-btn"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="quick-view-split">
              {/* Media Gallery with 1 to 3 Images Support */}
              <div className="quick-view-gallery">
                {(() => {
                  const qvImages = (quickViewProduct.images && quickViewProduct.images.length > 0)
                    ? quickViewProduct.images
                    : [quickViewProduct.image, quickViewProduct.hover_image].filter(Boolean);
                  const activeImg = qvImages[qvSelectedImgIdx] || quickViewProduct.image || '/marble-hero-bg.jpg';

                  return (
                    <>
                      <div className="quick-view-hero-img-wrap">
                        <img 
                          src={activeImg} 
                          alt={quickViewProduct.title}
                          className="quick-view-hero-img" 
                          onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }}
                        />
                      </div>
                      {qvImages.length > 1 && (
                        <div className="qv-thumbnails-row">
                          {qvImages.map((img, i) => (
                            <button
                              key={i}
                              type="button"
                              className={`qv-thumb-btn ${qvSelectedImgIdx === i ? 'active' : ''}`}
                              onClick={() => setQvSelectedImgIdx(i)}
                              title={`View Angle ${i + 1}`}
                            >
                              <img src={img} alt="" onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }} />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Product Info */}
              <div className="quick-view-details">
                <div className="qv-category-row">
                  <span className="qv-category-badge">
                    {(quickViewProduct.category || 'MARBLE').toUpperCase()}
                  </span>
                  {quickViewProduct.sku && (
                    <span className="qv-sku-badge">{quickViewProduct.sku}</span>
                  )}
                </div>

                <h2 className="qv-product-title">{quickViewProduct.title}</h2>

                {/* Rating & Stone Spec */}
                <div className="qv-ratings">
                  <div className="star-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#d4af37" color="#d4af37" />
                    ))}
                  </div>
                  <span className="qv-stone-type">
                    • {quickViewProduct.stone_type || quickViewProduct.stoneType || 'Natural Stone'}
                  </span>
                </div>

                {/* Price Display: Strictly Price on Request */}
                <div className="qv-price-wrap">
                  <span className="qv-price-badge">Price on Request</span>
                  <p className="qv-price-sub">
                    Direct quarry pricing based on your project dimensions, edge profile & shipping address.
                  </p>
                </div>

                {/* Description */}
                <p className="qv-description">
                  {quickViewProduct.description || 'Artisanal natural marble crafted with architectural precision.'}
                </p>

                {/* Specs List */}
                <div className="qv-spec-grid">
                  <div className="qv-spec-item">
                    <span className="spec-label">Stone Grade:</span>
                    <span className="spec-val">{quickViewProduct.stone_type || quickViewProduct.stoneType || '100% Pure Natural'}</span>
                  </div>
                  <div className="qv-spec-item">
                    <span className="spec-label">Dimensions:</span>
                    <span className="spec-val">{quickViewProduct.dimensions || 'Custom Sizing'}</span>
                  </div>
                  <div className="qv-spec-item">
                    <span className="spec-label">Availability:</span>
                    <span className="spec-val">{quickViewProduct.in_stock === false ? 'Custom Fabrication' : 'In Stock'}</span>
                  </div>
                  <div className="qv-spec-item">
                    <span className="spec-label">Delivery:</span>
                    <span className="spec-val">Export Insured Crating</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="qv-actions-cluster">
                  <button 
                    className="btn-whatsapp-primary"
                    onClick={() => {
                      enquireOnWhatsApp(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>Enquire on WhatsApp</span>
                  </button>

                  <a 
                    href="tel:+919929288880"
                    className="btn-call-consultation"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    <Phone size={17} />
                    <span>Call +91 99292 88880</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. INSTANT SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="search-overlay" onClick={() => setIsSearchOpen(false)}>
          <div 
            className="search-modal-container"
            onClick={(e) => e.stopPropagation()}
            role="search"
          >
            <div className="search-input-header">
              <Search size={22} className="search-icon-active" />
              <input 
                type="text"
                className="search-main-input"
                placeholder="Search marble slabs, mandirs, tables, fireplaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                className="search-close-btn"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={22} />
              </button>
            </div>

            <div className="search-modal-results">
              <div className="results-count-bar">
                <span>Found {searchResults.length} masterpieces</span>
              </div>

              <div className="search-results-grid">
                {searchResults.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="search-result-card"
                    onClick={() => {
                      setQuickViewProduct(prod);
                      setIsSearchOpen(false);
                    }}
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      className="search-res-img" 
                    />
                    <div className="search-res-details">
                      <span className="search-res-cat">{(prod.category || '').toUpperCase()}</span>
                      <h4 className="search-res-title">{prod.title}</h4>
                      <span className="search-res-price">Price on Request</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. ARCHITECTURAL CONSULTATION MODAL */}
      {isConsultationOpen && (
        <div className="modal-backdrop" onClick={() => setIsConsultationOpen(false)}>
          <div 
            className="consultation-modal-card" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <button 
              className="modal-close-btn"
              onClick={() => setIsConsultationOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="consult-modal-header">
              <div className="brand-pill">
                <Sparkles size={12} className="text-gold" />
                <span>Bespoke Engineering</span>
              </div>
              <h3>Schedule Architectural Stone Consultation</h3>
              <p>Consult directly with our master stone architects for temple design, Italian marble selection, and custom installations.</p>
            </div>

            <form onSubmit={handleConsultSubmit} className="consult-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone Number (WhatsApp) *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 98290 12345"
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Project Requirement</label>
                <select 
                  value={consultForm.interest}
                  onChange={(e) => setConsultForm({ ...consultForm, interest: e.target.value })}
                >
                  <option value="MARBLE SLABS & TILES">MARBLE SLABS & TILES (Flooring & Cladding)</option>
                  <option value="TEMPLES & MANDIRS">TEMPLES & MANDIRS (Bespoke Pooja Sanctums)</option>
                  <option value="LUXURY FURNITURE">LUXURY FURNITURE (Custom Tables & Consoles)</option>
                  <option value="FIREPLACES & INLAYS">FIREPLACES & INLAYS (Pietra Dura Art)</option>
                  <option value="FOUNTAINS & OUTDOOR">FOUNTAINS & OUTDOOR (Courtyard Fountains)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Notes & Dimensions</label>
                <textarea 
                  rows={3}
                  placeholder="Briefly describe your site location, dimensions, and preferred stone..."
                  value={consultForm.notes}
                  onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary w-full" style={{ marginTop: 10 }}>
                Request VIP WhatsApp Consultation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="drawer-panel drawer-left mobile-menu-drawer"
            onClick={(e) => e.stopPropagation()}
            role="navigation"
          >
            <div className="drawer-header">
              <div className="mobile-drawer-brand">
                <img src="/logo.png" alt="Logo" className="brand-logo-round" />
                <span>GALAXY MARBLE</span>
              </div>
              <button 
                className="drawer-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile User Profile Section */}
            <div className="mobile-user-status-bar">
              {currentUser ? (
                <div className="mobile-user-info">
                  <div className="mobile-avatar">{currentUser.full_name?.charAt(0).toUpperCase()}</div>
                  <div>
                    <strong>{currentUser.full_name}</strong>
                    <span className="mobile-phone">{currentUser.phone}</span>
                  </div>
                </div>
              ) : (
                <button 
                  className="mobile-sign-in-cta"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                >
                  <span>Sign In / Register</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

            <div className="mobile-nav-links">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>Enquiry Bag ({cart.length})</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Our Heritage</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Artisans</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-gold">Admin Panel</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
