import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, Package, MessageSquare, Users, Plus, Edit2, 
  Trash2, Search, ExternalLink, Phone, MessageCircle, 
  Calendar, Clock, CheckCircle2, AlertCircle, X, LogOut, Sparkles, Filter, ChevronRight,
  Upload, Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ARCHITECTURAL_CATEGORIES, STONE_TYPES } from '../data/siteData';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry, getRegisteredUsers } from '../lib/supabase';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { products, addProductToStore, updateProductInStore, deleteProductFromStore, showToast } = useStore();

  // Auth Guard
  useEffect(() => {
    const isAuth = localStorage.getItem('gm_admin_auth');
    if (isAuth !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleAdminLogout = () => {
    localStorage.removeItem('gm_admin_auth');
    localStorage.removeItem('gm_admin_email');
    showToast('Signed out of Admin Portal');
    navigate('/admin/login');
  };

  // Active Tab: 'products' | 'enquiries' | 'users'
  const [activeTab, setActiveTab] = useState('products');

  // Enquiries & Users State
  const [enquiries, setEnquiries] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Load Enquiries and Registered Users
  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [enqList, userList] = await Promise.all([
        fetchEnquiries(),
        getRegisteredUsers()
      ]);
      setEnquiries(enqList || []);
      setRegisteredUsers(userList || []);
    } catch (e) {
      console.error('Failed to load admin data', e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Product Modals (Add / Edit)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Product Form State - Supports 1 to 3 images with default fallback
  const [prodForm, setProdForm] = useState({
    title: '',
    category: 'MARBLE BASIN',
    customCategory: '',
    stoneType: 'Pure Makrana White',
    description: '',
    dimensions: '',
    images: ['', '', ''],
    inStock: true
  });

  const handleImageChange = (index, value) => {
    setProdForm(prev => {
      const next = [...prev.images];
      next[index] = value;
      return { ...prev, images: next };
    });
  };

  const handleFileUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleImageChange(index, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImageAt = (index) => {
    handleImageChange(index, '');
  };

  // Open Add Product
  const openAddModal = () => {
    setProdForm({
      title: '',
      category: 'MARBLE BASIN',
      customCategory: '',
      stoneType: 'Pure Makrana White',
      description: 'Luxury handcrafted architectural marble piece.',
      dimensions: 'Standard architectural sizing',
      images: ['', '', ''],
      inStock: true
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Product
  const openEditModal = (product) => {
    setEditingProduct(product);
    const existing = (product.images && product.images.length > 0)
      ? [...product.images]
      : [product.image, product.hover_image].filter(Boolean);
    while (existing.length < 3) existing.push('');

    setProdForm({
      title: product.title || '',
      category: (product.category || 'MARBLE SLABS & TILES').toUpperCase(),
      customCategory: '',
      stoneType: product.stone_type || product.stoneType || 'Pure Makrana White',
      description: product.description || '',
      dimensions: product.dimensions || '',
      images: existing.slice(0, 3),
      inStock: product.in_stock !== false
    });
  };

  // Submit Add / Edit Product
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!prodForm.title.trim()) {
      alert('Please provide a product title.');
      return;
    }

    // Determine category and ensure ALL CAPS
    let finalCategory = prodForm.customCategory.trim() 
      ? prodForm.customCategory.trim().toUpperCase() 
      : prodForm.category.toUpperCase();

    // Filter valid non-empty images
    const validImages = prodForm.images.filter(img => img && typeof img === 'string' && img.trim());
    
    // Minimum one image required - if none provided, fallback to default image
    if (validImages.length === 0) {
      validImages.push('/marble-hero-bg.jpg');
    }

    const payload = {
      title: prodForm.title.trim(),
      category: finalCategory, // STRICTLY UPPERCASE
      stoneType: prodForm.stoneType,
      stone_type: prodForm.stoneType,
      description: prodForm.description,
      dimensions: prodForm.dimensions,
      image: validImages[0],
      hover_image: validImages[1] || validImages[0],
      images: validImages,
      in_stock: prodForm.inStock,
      inStock: prodForm.inStock
    };

    try {
      if (editingProduct) {
        await updateProductInStore(editingProduct.id, payload);
        setEditingProduct(null);
      } else {
        await addProductToStore(payload);
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save product: ' + err.message);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}" from the website catalog?`)) {
      await deleteProductFromStore(id);
    }
  };

  // Update Enquiry Status
  const handleStatusChange = async (enquiryId, newStatus) => {
    const updated = await updateEnquiryStatus(enquiryId, newStatus);
    setEnquiries(updated);
    showToast(`Enquiry status updated to ${newStatus}`);
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id) => {
    if (window.confirm('Delete this customer query record?')) {
      const updated = await deleteEnquiry(id);
      setEnquiries(updated);
      showToast('Enquiry record deleted.');
    }
  };

  // Format Date & Time cleanly
  const formatTimestamp = (isoString) => {
    if (!isoString) return 'Recent';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return isoString;
    }
  };

  // Search in products
  const [productSearch, setProductSearch] = useState('');
  const filteredAdminProducts = useMemo(() => {
    if (!productSearch.trim()) return products;
    const q = productSearch.toLowerCase();
    return products.filter(p => 
      p.title?.toLowerCase().includes(q) || 
      p.category?.toLowerCase().includes(q) ||
      (p.stone_type || p.stoneType)?.toLowerCase().includes(q)
    );
  }, [products, productSearch]);

  // Clean phone number for WhatsApp link
  const getWhatsAppNumber = (phoneStr) => {
    if (!phoneStr) return '';
    let digits = phoneStr.replace(/[^0-9]/g, '');
    if (digits.length === 10) digits = '91' + digits;
    return digits;
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Top Admin Navigation Bar */}
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <div className="admin-topbar-left">
            <Link to="/" className="admin-topbar-brand">
              <img src="/logo.png" alt="Logo" className="brand-logo-round" />
              <div className="brand-text">
                <span className="brand-title">GALAXY MARBLE</span>
                <span className="brand-tagline">EXECUTIVE CONTROL PORTAL</span>
              </div>
            </Link>
          </div>

          <div className="admin-topbar-right">
            <Link to="/products" target="_blank" className="btn-view-live-site" title="View Live Website">
              <span className="btn-text-full">View Live Website</span>
              <span className="btn-text-mobile">Live Site</span>
              <ExternalLink size={14} />
            </Link>

            <button 
              className="btn-admin-logout"
              onClick={handleAdminLogout}
              title="Sign Out"
            >
              <LogOut size={16} />
              <span className="btn-text-full">Sign Out</span>
              <span className="btn-text-mobile">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="container admin-main-content">
        {/* Statistics Header Row */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon-wrap gold">
              <Package size={22} />
            </div>
            <div className="stat-data">
              <span className="stat-label">Total Catalog Products</span>
              <h3 className="stat-value">{products.length}</h3>
              <span className="stat-sub">Live on website</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap blue">
              <MessageSquare size={22} />
            </div>
            <div className="stat-data">
              <span className="stat-label">Customer Enquiries</span>
              <h3 className="stat-value">{enquiries.length}</h3>
              <span className="stat-sub">Recorded with timestamps</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap green">
              <Users size={22} />
            </div>
            <div className="stat-data">
              <span className="stat-label">Registered Patrons</span>
              <h3 className="stat-value">{registeredUsers.length}</h3>
              <span className="stat-sub">Verified unique phone numbers</span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} />
            <span>Products Management ({products.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => { setActiveTab('enquiries'); loadDashboardData(); }}
          >
            <MessageSquare size={18} />
            <span>Customer Enquiries & Queries ({enquiries.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => { setActiveTab('users'); loadDashboardData(); }}
          >
            <Users size={18} />
            <span>Registered Patrons ({registeredUsers.length})</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: PRODUCTS MANAGEMENT                                       */}
        {/* ================================================================= */}
        {activeTab === 'products' && (
          <div className="admin-tab-panel">
            <div className="admin-panel-toolbar">
              <div className="panel-search-box">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search catalog products..." 
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              <button className="btn-add-product-primary" onClick={openAddModal}>
                <Plus size={18} />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table or Clean Empty State */}
            {filteredAdminProducts.length === 0 ? (
              <div className="admin-empty-panel">
                <Package size={52} className="text-gold" style={{ margin: '0 auto 14px', opacity: 0.85 }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                  No Products in Catalog
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: 460, margin: '0 auto 20px', lineHeight: 1.5 }}>
                  {productSearch ? `No products match "${productSearch}".` : 'All dummy products have been removed. Click below to add your first real marble product to the website.'}
                </p>
                <button className="btn-add-product-primary" onClick={openAddModal} style={{ margin: '0 auto' }}>
                  <Plus size={18} />
                  <span>Add New Product</span>
                </button>
              </div>
            ) : (
              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category (ALL CAPS)</th>
                      <th>Stone Type</th>
                      <th>Dimensions</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdminProducts.map((prod) => (
                      <tr key={prod.id}>
                        <td className="product-identity-cell">
                          <img 
                            src={prod.image} 
                            alt={prod.title} 
                            className="admin-table-thumb" 
                          />
                          <div className="prod-title-group">
                            <strong className="prod-title-text">{prod.title}</strong>
                            <span className="prod-sku-text">{prod.sku || 'N/A'}</span>
                          </div>
                        </td>
                        <td>
                          <span className="admin-cat-badge">
                            {(prod.category || 'MARBLE').toUpperCase()}
                          </span>
                        </td>
                        <td className="prod-stone-text">{prod.stone_type || prod.stoneType || 'Natural Stone'}</td>
                        <td className="prod-dim-text">{prod.dimensions || 'Custom'}</td>
                        <td>
                          {prod.in_stock === false ? (
                            <span className="badge-status custom">Custom Order</span>
                          ) : (
                            <span className="badge-status instock">In Stock</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="table-actions-cluster">
                            <button 
                              className="btn-action edit"
                              onClick={() => openEditModal(prod)}
                              title="Edit Product"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button 
                              className="btn-action delete"
                              onClick={() => handleDeleteProduct(prod.id, prod.title)}
                              title="Delete Product"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: CUSTOMER ENQUIRIES / QUERIES                              */}
        {/* ================================================================= */}
        {activeTab === 'enquiries' && (
          <div className="admin-tab-panel">
            <div className="admin-panel-toolbar">
              <div className="enquiries-intro">
                <h3>Customer Quotation Enquiries</h3>
                <p>Every enquiry submitted by website users is recorded below with exact date & time, customer contact info, and product details.</p>
              </div>
              <button className="btn-secondary" onClick={loadDashboardData}>
                Refresh Enquiries
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div className="admin-empty-panel">
                <MessageSquare size={48} className="text-gold" />
                <h3>No Customer Enquiries Yet</h3>
                <p>When users click "Enquire on WhatsApp" or submit their Enquiry Bag, all query details with timestamps will be displayed here.</p>
              </div>
            ) : (
              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Customer Details</th>
                      <th>Enquired Product</th>
                      <th>Query / Project Notes</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Direct Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => {
                      const cleanPhone = getWhatsAppNumber(enq.user_phone);
                      return (
                        <tr key={enq.id}>
                          <td className="timestamp-cell">
                            <div className="timestamp-badge">
                              <Calendar size={13} />
                              <span>{formatTimestamp(enq.created_at)}</span>
                            </div>
                          </td>

                          <td className="customer-cell">
                            <strong>{enq.user_name || 'Valued Patron'}</strong>
                            <div className="customer-phone-row">
                              <Phone size={12} className="text-gold" />
                              <span>{enq.user_phone || 'No phone'}</span>
                            </div>
                          </td>

                          <td className="enquiry-product-cell">
                            <div className="enq-prod-group">
                              {enq.product_image && (
                                <img src={enq.product_image} alt="" className="admin-table-thumb-sm" />
                              )}
                              <div>
                                <span className="enq-prod-title">{enq.product_title}</span>
                                <span className="enq-prod-cat">{(enq.product_category || '').toUpperCase()}</span>
                              </div>
                            </div>
                          </td>

                          <td className="enquiry-query-cell">
                            <p className="query-snippet">{enq.query_message || 'Price quotation request'}</p>
                            {enq.quantity > 1 && <span className="qty-tag">Qty: {enq.quantity}</span>}
                          </td>

                          <td>
                            <select 
                              className={`status-select ${(enq.status || 'New').toLowerCase()}`}
                              value={enq.status || 'New'}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            >
                              <option value="New">🟡 New</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="In Discussion">🟣 In Discussion</option>
                              <option value="Completed">🟢 Completed</option>
                            </select>
                          </td>

                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions-cluster">
                              {/* Direct WhatsApp to Customer */}
                              {cleanPhone && (
                                <a 
                                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${enq.user_name || ''}, regarding your enquiry for ${enq.product_title} at Galaxy Marble:`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-whatsapp-action"
                                  title="Chat with customer on WhatsApp"
                                >
                                  <MessageCircle size={15} />
                                  <span>WhatsApp</span>
                                </a>
                              )}

                              {/* Direct Call to Customer */}
                              {enq.user_phone && (
                                <a 
                                  href={`tel:${enq.user_phone}`}
                                  className="btn-call-action"
                                  title="Call customer"
                                >
                                  <Phone size={14} />
                                </a>
                              )}

                              {/* Delete Enquiry */}
                              <button 
                                className="btn-action delete"
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                title="Delete enquiry record"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: REGISTERED USERS                                          */}
        {/* ================================================================= */}
        {activeTab === 'users' && (
          <div className="admin-tab-panel">
            <div className="admin-panel-toolbar">
              <div>
                <h3>Registered Patron Database</h3>
                <p>Enforces unique phone number constraint: one user per phone number registered in Supabase.</p>
              </div>
              <button className="btn-secondary" onClick={loadDashboardData}>
                Refresh Users
              </button>
            </div>

            {registeredUsers.length === 0 ? (
              <div className="admin-empty-panel">
                <Users size={48} className="text-gold" />
                <h3>No Registered Users Yet</h3>
                <p>When users register on the website with their phone number, their profile records will be stored and listed here.</p>
              </div>
            ) : (
              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Patron Name</th>
                      <th>Registered Phone (Unique)</th>
                      <th>Account Role</th>
                      <th>Registration Date & Time</th>
                      <th style={{ textAlign: 'right' }}>Direct Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((u) => {
                      const cleanPhone = getWhatsAppNumber(u.phone);
                      return (
                        <tr key={u.id || u.phone}>
                          <td className="customer-cell">
                            <div className="user-profile-badge">
                              <div className="user-avatar-initial">
                                {u.full_name ? u.full_name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <strong>{u.full_name}</strong>
                            </div>
                          </td>
                          <td className="user-phone-cell">
                            <code>{u.phone}</code>
                          </td>
                          <td>
                            <span className="user-role-badge">{u.role || 'Patron'}</span>
                          </td>
                          <td className="timestamp-cell">
                            <div className="timestamp-badge">
                              <Calendar size={13} />
                              <span>{formatTimestamp(u.created_at)}</span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions-cluster">
                              {cleanPhone && (
                                <a 
                                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${u.full_name}, thank you for registering with Galaxy Marble.`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-whatsapp-action"
                                >
                                  <MessageCircle size={14} />
                                  <span>WhatsApp</span>
                                </a>
                              )}
                              <a 
                                href={`tel:${u.phone}`}
                                className="btn-call-action"
                              >
                                <Phone size={14} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* ADD / EDIT PRODUCT MODAL                                         */}
      {/* ================================================================= */}
      {(isAddModalOpen || editingProduct) && (
        <div className="modal-backdrop" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}>
          <div 
            className="admin-product-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <div className="admin-modal-header">
              <div className="brand-pill">
                <Sparkles size={12} className="text-gold" />
                <span>{editingProduct ? 'Update Masterpiece' : 'New Masterpiece Creation'}</span>
              </div>
              <h2>{editingProduct ? 'Edit Catalog Product' : 'Add New Product to Website'}</h2>
              <button 
                className="modal-close-btn"
                onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="admin-modal-form">
              {/* Product Title */}
              <div className="form-field">
                <label>Product Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Italian Statuario Bookmatched Marble Slab"
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                />
              </div>

              {/* Category (Strictly ALL CAPS) */}
              <div className="form-row-2">
                <div className="form-field">
                  <label>Category (ALL CAPS) *</label>
                  <select 
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value.toUpperCase() })}
                  >
                    {ARCHITECTURAL_CATEGORIES.map(c => (
                      <option key={c.title} value={c.title.toUpperCase()}>
                        {c.title.toUpperCase()}
                      </option>
                    ))}
                    <option value="CUSTOM">+ Add Custom Category (ALL CAPS)</option>
                  </select>
                </div>

                {prodForm.category === 'CUSTOM' ? (
                  <div className="form-field">
                    <label>Enter Custom Category Name (ALL CAPS) *</label>
                    <input 
                      type="text"
                      placeholder="e.g. MONOLITHIC BATHROOMS"
                      value={prodForm.customCategory}
                      onChange={(e) => setProdForm({ ...prodForm, customCategory: e.target.value.toUpperCase() })}
                      style={{ textTransform: 'uppercase' }}
                      required
                    />
                  </div>
                ) : (
                  <div className="form-field">
                    <label>Stone Type / Quarry *</label>
                    <input 
                      type="text"
                      placeholder="e.g. Pure Makrana White Marble"
                      value={prodForm.stoneType}
                      onChange={(e) => setProdForm({ ...prodForm, stoneType: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* Dimensions */}
              <div className="form-row-2">
                <div className="form-field">
                  <label>Dimensions / Specifications</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 8 ft x 5 ft (20mm thickness)"
                    value={prodForm.dimensions}
                    onChange={(e) => setProdForm({ ...prodForm, dimensions: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Availability</label>
                  <div className="stock-toggle-wrap">
                    <label className="checkbox-switch">
                      <input 
                        type="checkbox"
                        checked={prodForm.inStock}
                        onChange={(e) => setProdForm({ ...prodForm, inStock: e.target.checked })}
                      />
                      <span>In Stock & Ready for Shipping</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Images (1 to 3 images with default fallback) */}
              <div className="form-field admin-images-section">
                <div className="admin-images-header">
                  <div>
                    <label className="admin-images-title">
                      <ImageIcon size={16} className="text-gold" />
                      <span>Product Images (1 to 3 Images)</span>
                    </label>
                    <p className="admin-images-desc">
                      Add 1, 2, or 3 images for your product. If left empty, default luxury marble image (<code>/marble-hero-bg.jpg</code>) will automatically be used.
                    </p>
                  </div>
                </div>

                <div className="admin-image-slots-grid">
                  {[0, 1, 2].map((idx) => {
                    const currentImg = prodForm.images[idx] || '';
                    const isPrimary = idx === 0;
                    const slotLabel = isPrimary 
                      ? 'Image 1 (Main / Cover Photo)' 
                      : idx === 1 
                        ? 'Image 2 (Angle / Hover View)' 
                        : 'Image 3 (Detail / Close-up)';

                    return (
                      <div key={idx} className={`admin-image-slot-card ${currentImg ? 'has-img' : 'is-empty'}`}>
                        <div className="slot-top-bar">
                          <span className="slot-badge-label">{slotLabel}</span>
                          {currentImg ? (
                            <button
                              type="button"
                              className="btn-slot-clear"
                              onClick={() => removeImageAt(idx)}
                              title="Remove image"
                            >
                              <X size={13} />
                              <span>Clear</span>
                            </button>
                          ) : (
                            <span className="slot-status-hint">
                              {isPrimary ? 'Fallback to default if blank' : 'Optional'}
                            </span>
                          )}
                        </div>

                        {/* Live Image Preview Area */}
                        <div className="slot-thumb-container">
                          {currentImg ? (
                            <div className="slot-thumb-wrapper">
                              <img 
                                src={currentImg} 
                                alt={`Slot ${idx + 1}`} 
                                className="slot-live-img"
                                onError={(e) => { e.target.src = '/marble-hero-bg.jpg'; }}
                              />
                              <span className="slot-active-tag">Active</span>
                            </div>
                          ) : isPrimary ? (
                            <div className="slot-default-preview">
                              <img 
                                src="/marble-hero-bg.jpg" 
                                alt="Default Marble" 
                                className="slot-live-img default-faded" 
                              />
                              <div className="default-overlay-pill">
                                <Sparkles size={12} />
                                <span>Default Fallback</span>
                              </div>
                            </div>
                          ) : (
                            <div className="slot-empty-box">
                              <ImageIcon size={22} className="slot-empty-icon" />
                              <span className="slot-empty-txt">No image added</span>
                            </div>
                          )}
                        </div>

                        {/* Input & Action Buttons */}
                        <div className="slot-inputs-row">
                          <input 
                            type="text"
                            placeholder={isPrimary ? "Enter image URL or upload..." : `Optional Image ${idx + 1} URL...`}
                            value={currentImg}
                            onChange={(e) => handleImageChange(idx, e.target.value)}
                            className="slot-text-input"
                          />

                          <div className="slot-button-group">
                            <label className="btn-slot-file-upload">
                              <Upload size={13} />
                              <span>Upload File</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleFileUpload(idx, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>

                            {isPrimary && !currentImg && (
                              <button
                                type="button"
                                className="btn-slot-default-fill"
                                onClick={() => handleImageChange(0, '/marble-hero-bg.jpg')}
                              >
                                Use Default
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="form-field">
                <label>Description & Architectural Highlights</label>
                <textarea 
                  rows={3}
                  placeholder="Natural crystalline luster, edge finish, architectural applications..."
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                />
              </div>

              {/* Note on Price */}
              <div className="admin-price-note">
                <Sparkles size={14} className="text-gold" />
                <span>Note: As configured, no prices are displayed to customers. Products feature the direct <strong>WhatsApp Price Enquiry</strong> button.</span>
              </div>

              {/* Action Buttons */}
              <div className="admin-modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Save Product Changes' : 'Publish Product to Live Website'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
