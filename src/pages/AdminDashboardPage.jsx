import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package, Tag, Plus, Trash2, Search, ExternalLink, 
  Upload, Image as ImageIcon, X, LogOut, ArrowUpRight, Loader2, CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { 
  DEFAULT_PRODUCT_IMAGE,
  DEFAULT_CATEGORY_IMAGE,
  compressImageFile
} from '../lib/supabase';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { 
    products, 
    addProductToStore, 
    deleteProductFromStore, 
    categories,
    addCategoryToStore,
    deleteCategoryFromStore,
    showToast 
  } = useStore();

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
    showToast('Signed out of Admin');
    navigate('/admin/login');
  };

  // Only 2 Tabs: 'products' | 'categories'
  const [activeTab, setActiveTab] = useState('products');

  // ==========================================
  // PRODUCT MANAGEMENT
  // ==========================================
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [selectedCatFilter, setSelectedCatFilter] = useState('ALL');
  const [productSearch, setProductSearch] = useState('');

  const [prodForm, setProdForm] = useState({
    title: '',
    category: '',
    customCategory: '',
    images: ['', '', '']
  });

  const handleImageChange = (index, value) => {
    setProdForm(prev => {
      const next = [...prev.images];
      next[index] = value;
      return { ...prev, images: next };
    });
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    try {
      // Compress image client-side to ensure fast uploads & fit within Supabase payload limits
      const compressedDataUrl = await compressImageFile(file, 1200, 1200, 0.82);
      handleImageChange(index, compressedDataUrl);
    } catch (e) {
      console.warn('Image compression fallback to direct FileReader:', e);
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleImageChange(index, ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImageAt = (index) => {
    handleImageChange(index, '');
  };

  const openAddModal = () => {
    const defaultCat = categories.length > 0 ? categories[0].title.toUpperCase() : 'TEMPLE';
    setProdForm({
      title: '',
      category: defaultCat,
      customCategory: '',
      images: ['', '', '']
    });
    setIsSubmittingProduct(false);
    setIsAddModalOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!prodForm.title.trim()) {
      alert('Please enter a product name.');
      return;
    }

    let finalCategory = '';
    if (prodForm.category === 'CUSTOM') {
      finalCategory = (prodForm.customCategory || '').trim().toUpperCase();
      if (!finalCategory) {
        alert('Please enter a custom category name.');
        return;
      }
    } else {
      finalCategory = (prodForm.category || 'TEMPLE').trim().toUpperCase();
    }

    const validImages = prodForm.images.filter(img => img && typeof img === 'string' && img.trim());
    if (validImages.length === 0) {
      validImages.push(DEFAULT_PRODUCT_IMAGE);
    }

    const payload = {
      title: prodForm.title.trim(),
      category: finalCategory,
      stoneType: 'Natural Marble',
      stone_type: 'Natural Marble',
      dimensions: 'Custom Sizing Available',
      image: validImages[0],
      hover_image: validImages[1] || validImages[0],
      images: validImages,
      in_stock: true,
      inStock: true
    };

    setIsSubmittingProduct(true);
    try {
      await addProductToStore(payload);
      showToast(`✓ "${payload.title}" successfully added to ${finalCategory}!`);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Add product error:', err);
      alert(`Product Upload Note: Saved to local catalog! If Supabase sync failed (${err.message}), please ensure the SQL schema was executed in your Supabase SQL editor.`);
      setIsAddModalOpen(false);
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const handleDeleteProduct = async (id, title) => {
    if (window.confirm(`Delete "${title}" from the website?`)) {
      await deleteProductFromStore(id);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCatFilter === 'ALL' || (p.category || '').toUpperCase() === selectedCatFilter.toUpperCase();
      if (!matchCat) return false;
      if (!productSearch.trim()) return true;
      const q = productSearch.toLowerCase();
      return (
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        (p.stone_type || p.stoneType)?.toLowerCase().includes(q)
      );
    });
  }, [products, selectedCatFilter, productSearch]);

  // ==========================================
  // CATEGORY MANAGEMENT
  // ==========================================
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    title: '',
    image: ''
  });

  const openAddCategoryModal = () => {
    setCategoryForm({
      title: '',
      image: DEFAULT_CATEGORY_IMAGE
    });
    setIsSubmittingCategory(false);
    setIsCategoryModalOpen(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const cleanTitle = categoryForm.title.trim().toUpperCase();
    if (!cleanTitle) {
      alert('Please enter a category name.');
      return;
    }

    setIsSubmittingCategory(true);
    try {
      await addCategoryToStore({
        title: cleanTitle,
        description: `Bespoke handcrafted ${cleanTitle.toLowerCase()} collection.`,
        image: categoryForm.image.trim() || DEFAULT_CATEGORY_IMAGE
      });
      showToast(`✓ Category "${cleanTitle}" created!`);
      setIsCategoryModalOpen(false);
    } catch (err) {
      console.error('Add category error:', err);
      alert('Category saved locally. If Supabase sync failed, please run the SQL script in your Supabase dashboard.');
      setIsCategoryModalOpen(false);
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  const handleDeleteCategory = async (cat) => {
    if (window.confirm(`Delete category "${cat.title}"?`)) {
      await deleteCategoryFromStore(cat.id, cat.title);
    }
  };

  const handleCatFileUpload = async (file) => {
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 1000, 1000, 0.80);
      setCategoryForm(prev => ({ ...prev, image: compressed }));
    } catch (e) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCategoryForm(prev => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Top Header */}
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <div className="admin-topbar-left">
            <Link to="/" className="admin-topbar-brand">
              <img src="/logo.png" alt="Logo" className="brand-logo-round" />
              <div className="brand-text">
                <span className="brand-title">GALAXY MARBLE</span>
                <span className="brand-tagline">ADMIN PANEL</span>
              </div>
            </Link>
          </div>

          <div className="admin-topbar-right">
            <Link to="/products" target="_blank" className="btn-view-live-site" title="View Website">
              <span>View Website</span>
              <ArrowUpRight size={15} />
            </Link>

            <button 
              className="btn-admin-logout"
              onClick={handleAdminLogout}
              title="Logout"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container admin-main-content">
        {/* Simple 2-Tab Navigation */}
        <div className="admin-nav-tabs" style={{ marginBottom: 20 }}>
          <button 
            className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
            style={{ fontSize: '0.95rem', padding: '10px 22px' }}
          >
            <Package size={18} />
            <span>Products ({products.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
            style={{ fontSize: '0.95rem', padding: '10px 22px' }}
          >
            <Tag size={18} />
            <span>Categories ({categories.length})</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: PRODUCTS                                                  */}
        {/* ================================================================= */}
        {activeTab === 'products' && (
          <div className="admin-tab-panel">
            {/* Toolbar: Filter & Add Product Button */}
            <div className="admin-panel-toolbar" style={{ marginBottom: 20 }}>
              <div className="admin-filter-group" style={{ flex: 1, maxWidth: 500 }}>
                <div className="panel-search-box" style={{ flex: 1 }}>
                  <Search size={16} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                  {productSearch && (
                    <button className="clear-search-btn" onClick={() => setProductSearch('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <select 
                  value={selectedCatFilter} 
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="admin-cat-filter-select"
                >
                  <option value="ALL">All Categories ({products.length})</option>
                  {categories.map(c => {
                    const count = products.filter(p => (p.category || '').toUpperCase() === c.title.toUpperCase()).length;
                    return (
                      <option key={c.id || c.title} value={c.title.toUpperCase()}>
                        {c.title.toUpperCase()} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="btn-add-product-primary" onClick={openAddModal} style={{ padding: '11px 22px' }}>
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="admin-empty-panel">
                <Package size={48} className="text-gold" style={{ margin: '0 auto 12px' }} />
                <h3>No Products Found</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '8px 0 16px' }}>
                  Click below to add a new product.
                </p>
                <button className="btn-add-product-primary" onClick={openAddModal} style={{ margin: '0 auto' }}>
                  <Plus size={18} />
                  <span>Add Product</span>
                </button>
              </div>
            ) : (
              <div className="admin-product-cards-grid">
                {filteredProducts.map((prod) => {
                  const imagesList = Array.isArray(prod.images) && prod.images.length > 0 
                    ? prod.images 
                    : [prod.image, prod.hover_image].filter(Boolean);

                  return (
                    <div key={prod.id} className="admin-product-item-card">
                      <div className="card-thumb-header">
                        <img 
                          src={prod.image || DEFAULT_PRODUCT_IMAGE} 
                          alt={prod.title} 
                          className="card-thumb-img"
                          onError={(e) => { e.target.src = DEFAULT_PRODUCT_IMAGE; }}
                        />
                        <div className="card-floating-badges">
                          <span className="admin-cat-badge">
                            {(prod.category || 'MARBLE').toUpperCase()}
                          </span>
                          {imagesList.length > 1 && (
                            <span className="img-count-badge">
                              <ImageIcon size={11} />
                              {imagesList.length} Photos
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="card-body">
                        <h4 className="card-prod-title" title={prod.title}>{prod.title}</h4>
                      </div>

                      <div className="card-footer-actions">
                        <button 
                          className="btn-card-action delete"
                          onClick={() => handleDeleteProduct(prod.id, prod.title)}
                          title="Delete product"
                          style={{ width: '100%' }}
                        >
                          <Trash2 size={14} />
                          <span>Delete Product</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: CATEGORIES                                                */}
        {/* ================================================================= */}
        {activeTab === 'categories' && (
          <div className="admin-tab-panel">
            <div className="admin-panel-toolbar" style={{ marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Categories List</h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                  All categories currently available on the website.
                </p>
              </div>
              <button className="btn-add-product-primary" onClick={openAddCategoryModal} style={{ padding: '11px 22px' }}>
                <Plus size={18} />
                <span>Add Category</span>
              </button>
            </div>

            <div className="admin-categories-grid">
              {categories.map((cat) => {
                const count = products.filter(p => (p.category || '').toUpperCase() === cat.title.toUpperCase()).length;
                return (
                  <div key={cat.id || cat.title} className="admin-cat-card">
                    <div className="cat-card-img-wrap">
                      <img 
                        src={cat.image || DEFAULT_CATEGORY_IMAGE} 
                        alt={cat.title} 
                        className="cat-card-img"
                        onError={(e) => { e.target.src = DEFAULT_CATEGORY_IMAGE; }}
                      />
                      <div className="cat-card-overlay">
                        <span className="cat-count-badge">
                          <Package size={12} />
                          {count} Product{count !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="cat-card-body">
                      <h4 className="cat-name">{cat.title.toUpperCase()}</h4>
                    </div>

                    <div className="cat-card-footer">
                      <button 
                        className="btn-cat-action delete"
                        onClick={() => handleDeleteCategory(cat)}
                        title="Delete Category"
                        style={{ width: '100%' }}
                      >
                        <Trash2 size={14} />
                        <span>Delete Category</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* ADD PRODUCT MODAL (With Animation & Fast Uploads)                */}
      {/* ================================================================= */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => !isSubmittingProduct && setIsAddModalOpen(false)}>
          <div 
            className="admin-product-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <div className="admin-modal-header">
              <h2>Add New Product</h2>
              <button 
                className="modal-close-btn"
                disabled={isSubmittingProduct}
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="admin-modal-form">
              {/* Category */}
              <div className="form-field">
                <label>1. Category *</label>
                <select 
                  value={prodForm.category}
                  onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                  style={{ fontWeight: 600, fontSize: '0.95rem' }}
                  disabled={isSubmittingProduct}
                >
                  {categories.map(c => (
                    <option key={c.id || c.title} value={c.title.toUpperCase()}>
                      {c.title.toUpperCase()}
                    </option>
                  ))}
                  <option value="CUSTOM">+ Create New Category...</option>
                </select>
              </div>

              {prodForm.category === 'CUSTOM' && (
                <div className="form-field" style={{ background: '#fffbeb', padding: 12, borderRadius: 8, border: '1px solid #fde68a' }}>
                  <label style={{ color: '#92400e' }}>Enter New Category Name (ALL CAPS) *</label>
                  <input 
                    type="text"
                    placeholder="e.g. MARBLE TABLE"
                    value={prodForm.customCategory}
                    onChange={(e) => setProdForm({ ...prodForm, customCategory: e.target.value.toUpperCase() })}
                    style={{ textTransform: 'uppercase', background: '#ffffff' }}
                    required
                    disabled={isSubmittingProduct}
                  />
                </div>
              )}

              {/* Title */}
              <div className="form-field">
                <label>2. Product Title / Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Makrana White Marble Carved Mandir"
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  disabled={isSubmittingProduct}
                />
              </div>

              {/* Product Photos (2 to 3 Photos) */}
              <div className="form-field admin-images-section">
                <div className="admin-images-header">
                  <label className="admin-images-title">
                    <ImageIcon size={16} className="text-gold" />
                    <span>3. Product Photos (2 to 3 Images)</span>
                  </label>
                </div>

                <div className="admin-image-slots-grid">
                  {[0, 1, 2].map((idx) => {
                    const currentImg = prodForm.images[idx] || '';
                    const isPrimary = idx === 0;
                    const slotLabel = isPrimary 
                      ? 'Photo 1 (Main Card Photo)' 
                      : idx === 1 
                        ? 'Photo 2 (Angle / Hover)' 
                        : 'Photo 3 (Detail View)';

                    return (
                      <div key={idx} className={`admin-image-slot-card ${currentImg ? 'has-img' : 'is-empty'}`}>
                        <div className="slot-top-bar">
                          <span className="slot-badge-label">{slotLabel}</span>
                          {currentImg && !isSubmittingProduct && (
                            <button
                              type="button"
                              className="btn-slot-clear"
                              onClick={() => removeImageAt(idx)}
                              title="Remove image"
                            >
                              <X size={13} />
                              <span>Clear</span>
                            </button>
                          )}
                        </div>

                        {/* Image Preview Box */}
                        <div className="slot-thumb-container">
                          {currentImg ? (
                            <div className="slot-thumb-wrapper">
                              <img 
                                src={currentImg} 
                                alt={`Slot ${idx + 1}`} 
                                className="slot-live-img"
                                onError={(e) => { e.target.src = DEFAULT_PRODUCT_IMAGE; }}
                              />
                            </div>
                          ) : isPrimary ? (
                            <div className="slot-default-preview">
                              <img 
                                src={DEFAULT_PRODUCT_IMAGE} 
                                alt="Default Marble" 
                                className="slot-live-img default-faded" 
                              />
                            </div>
                          ) : (
                            <div className="slot-empty-box">
                              <ImageIcon size={22} className="slot-empty-icon" />
                              <span className="slot-empty-txt">No photo added</span>
                            </div>
                          )}
                        </div>

                        {/* Input & Upload Buttons */}
                        <div className="slot-inputs-row">
                          <input 
                            type="text"
                            placeholder={isPrimary ? "Paste URL or click Upload..." : `Photo ${idx + 1} URL...`}
                            value={currentImg}
                            onChange={(e) => handleImageChange(idx, e.target.value)}
                            className="slot-text-input"
                            disabled={isSubmittingProduct}
                          />

                          <div className="slot-button-group">
                            <label className={`btn-slot-file-upload ${isSubmittingProduct ? 'disabled' : ''}`}>
                              <Upload size={13} />
                              <span>Upload</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                style={{ display: 'none' }}
                                disabled={isSubmittingProduct}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleFileUpload(idx, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons with Submit Animation */}
              <div className="admin-modal-actions" style={{ marginTop: 24 }}>
                <button 
                  type="button" 
                  className="btn-secondary"
                  disabled={isSubmittingProduct}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`btn-primary btn-publish-animated ${isSubmittingProduct ? 'is-loading' : ''}`}
                  disabled={isSubmittingProduct}
                  style={{ padding: '12px 28px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  {isSubmittingProduct ? (
                    <>
                      <Loader2 size={18} className="btn-spinner animate-spin" />
                      <span>Uploading to Supabase...</span>
                    </>
                  ) : (
                    <span>✓ Done & Publish Product</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* ADD CATEGORY MODAL                                               */}
      {/* ================================================================= */}
      {isCategoryModalOpen && (
        <div className="modal-backdrop" onClick={() => !isSubmittingCategory && setIsCategoryModalOpen(false)}>
          <div 
            className="admin-product-modal-card cat-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <div className="admin-modal-header">
              <h2>Add New Category</h2>
              <button 
                className="modal-close-btn"
                disabled={isSubmittingCategory}
                onClick={() => setIsCategoryModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="admin-modal-form">
              <div className="form-field">
                <label>Category Name (ALL CAPS) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. MARBLE DINING TABLE"
                  value={categoryForm.title}
                  onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value.toUpperCase() })}
                  style={{ textTransform: 'uppercase' }}
                  disabled={isSubmittingCategory}
                />
              </div>

              <div className="form-field">
                <label>Category Cover Image</label>
                <div className="cat-img-preview-box">
                  <img 
                    src={categoryForm.image || DEFAULT_CATEGORY_IMAGE} 
                    alt="Category Preview" 
                    className="cat-preview-img"
                    onError={(e) => { e.target.src = DEFAULT_CATEGORY_IMAGE; }}
                  />
                  <div className="cat-img-inputs">
                    <input 
                      type="text" 
                      placeholder="Image URL..."
                      value={categoryForm.image}
                      onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                      className="slot-text-input"
                      disabled={isSubmittingCategory}
                    />
                    <label className={`btn-slot-file-upload ${isSubmittingCategory ? 'disabled' : ''}`}>
                      <Upload size={13} />
                      <span>Upload Image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }}
                        disabled={isSubmittingCategory}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleCatFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-modal-actions" style={{ marginTop: 24 }}>
                <button 
                  type="button" 
                  className="btn-secondary"
                  disabled={isSubmittingCategory}
                  onClick={() => setIsCategoryModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`btn-primary btn-publish-animated ${isSubmittingCategory ? 'is-loading' : ''}`}
                  disabled={isSubmittingCategory}
                >
                  {isSubmittingCategory ? (
                    <>
                      <Loader2 size={18} className="btn-spinner animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>✓ Create Category</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) for Mobile */}
      <button 
        className="admin-mobile-fab" 
        onClick={openAddModal}
        title="Add Product"
      >
        <Plus size={24} />
      </button>

      {/* Mobile Bottom Navigation */}
      <div className="admin-mobile-bottom-nav">
        <button 
          className={`mob-nav-item ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={18} />
          <span>Products</span>
        </button>
        <button 
          className={`mob-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <Tag size={18} />
          <span>Categories</span>
        </button>
      </div>
    </div>
  );
}
