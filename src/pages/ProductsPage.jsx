import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, X, Check, Sparkles, RefreshCw, ChevronRight, 
  Search, SlidersHorizontal, ChevronDown, ArrowLeft, ArrowRight, Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ARCHITECTURAL_CATEGORIES, normalizeCategory } from '../data/siteData';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoadingProducts } = useStore();

  const isShowAllParam = searchParams.get('all') === 'true';

  // Selected categories state
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const catParam = searchParams.get('category');
    if (!catParam) return [];
    return catParam.split(',').map(c => normalizeCategory(decodeURIComponent(c)));
  });

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Sort By
  const [sortBy, setSortBy] = useState('featured');

  // Sync category from URL param if changed externally
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      const cats = catParam.split(',').map(c => normalizeCategory(decodeURIComponent(c)));
      setSelectedCategories(cats);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // Extract architectural categories with live product counts
  const categoryList = useMemo(() => {
    const map = new Map();
    ARCHITECTURAL_CATEGORIES.forEach(c => map.set(c.title.toUpperCase(), 0));

    products.forEach(p => {
      const cat = normalizeCategory(p.category);
      if (map.has(cat)) {
        map.set(cat, map.get(cat) + 1);
      }
    });

    return ARCHITECTURAL_CATEGORIES.map(cat => ({
      ...cat,
      liveCount: map.get(cat.title.toUpperCase()) || 0
    }));
  }, [products]);

  // Handle clicking a specific category circle
  const handleSelectCategory = (catTitle) => {
    const norm = normalizeCategory(catTitle);
    setSelectedCategories([norm]);
    setSearchParams({ category: norm });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to All Categories Circle View
  const handleBackToCategories = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category Toggle Handler (Multi-select in filter sidebar)
  const handleCategoryToggle = (catName) => {
    const norm = normalizeCategory(catName);
    setSelectedCategories(prev => {
      if (prev.includes(norm)) {
        const next = prev.filter(c => c !== norm);
        if (next.length === 0) {
          setSearchParams({});
        } else {
          setSearchParams({ category: next.join(',') });
        }
        return next;
      } else {
        const next = [...prev, norm];
        setSearchParams({ category: next.join(',') });
        return next;
      }
    });
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setSearchParams({});
  };

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const prodCategory = normalizeCategory(prod.category);

      // Category filter
      if (selectedCategories.length > 0) {
        const normalizedSelected = selectedCategories.map(normalizeCategory);
        if (!normalizedSelected.includes(prodCategory)) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = prod.title?.toLowerCase().includes(q);
        const matchSku = prod.sku?.toLowerCase().includes(q);
        const matchCat = prodCategory.toLowerCase().includes(q);
        const matchDesc = prod.description?.toLowerCase().includes(q);

        if (!matchTitle && !matchSku && !matchCat && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'name-desc') return (b.title || '').localeCompare(a.title || '');
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return 0; // featured
    });
  }, [products, selectedCategories, searchQuery, sortBy]);

  const activeFilterCount = selectedCategories.length + (searchQuery ? 1 : 0);

  // Active category metadata if a single category is selected
  const currentCategoryData = useMemo(() => {
    if (selectedCategories.length === 1) {
      return ARCHITECTURAL_CATEGORIES.find(
        c => normalizeCategory(c.title) === selectedCategories[0]
      );
    }
    return null;
  }, [selectedCategories]);

  // Determine whether to show the initial CIRCLE CATEGORIES view
  // Shows when no category is selected and user hasn't explicitly clicked "View All"
  const isCircleCategoryView = selectedCategories.length === 0 && !isShowAllParam;

  return (
    <div className="catalog-page-wrap">
      {/* ============================================================ */}
      {/* 1. INITIAL VIEW: CIRCLE CATEGORIES FIRST                     */}
      {/* ============================================================ */}
      {isCircleCategoryView ? (
        <div className="category-selection-page">
          {/* Header Banner - Only Heading */}
          <div className="catalog-hero-header">
            <div className="container">
              <div className="catalog-hero-content">
                <h1 className="catalog-page-title">Explore By Category</h1>
              </div>
            </div>
          </div>

          {/* Circle Categories Grid Container */}
          <div className="container circle-categories-container">
            <div className="circle-categories-grid">
              {categoryList.map((cat) => (
                <div 
                  key={cat.title} 
                  className="circle-cat-item"
                  onClick={() => handleSelectCategory(cat.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSelectCategory(cat.title); }}
                  aria-label={`Open ${cat.title} category`}
                >
                  <div className="circle-cat-avatar-wrap">
                    <div className="circle-cat-avatar">
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="circle-cat-img"
                        loading="lazy"
                      />
                      <div className="circle-cat-hover-ring"></div>
                    </div>
                    <span className="circle-cat-count-pill">
                      {cat.liveCount > 0 ? `${cat.liveCount} Masterpieces` : `${cat.count || 10}+ Designs`}
                    </span>
                  </div>

                  <div className="circle-cat-info">
                    <h2 className="circle-cat-title">{cat.title}</h2>
                    <p className="circle-cat-desc">{cat.description}</p>
                    <span className="circle-cat-action-link">
                      <span>Explore Collection</span>
                      <ArrowRight size={14} className="cat-arrow" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Products Option */}
            <div className="circle-cat-footer-actions">
              <div className="all-products-banner-box">
                <div className="banner-text">
                  <h3>Looking for our complete catalog?</h3>
                  <p>Browse all handcrafted marble pieces across every category simultaneously.</p>
                </div>
                <button 
                  className="btn-primary btn-explore-all"
                  onClick={() => setSearchParams({ all: 'true' })}
                >
                  <Layers size={16} style={{ marginRight: 6 }} />
                  <span>View All Masterpieces ({products.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* 2. SPECIFIC CATEGORY PAGE VIEW                               */
        /* ============================================================ */
        <div className="specific-category-page">
          {/* Catalog Hero Header - Clean Heading & White Back Button Underneath */}
          <div className="catalog-hero-header category-focused-header">
            <div className="container">
              <div className="category-header-centered-wrap">
                <h1 className="catalog-page-title category-focused-title">
                  {currentCategoryData ? currentCategoryData.title : 'Architectural Stonework'}
                </h1>

                <div className="category-back-btn-row">
                  <button 
                    className="btn-back-to-categories-white"
                    onClick={handleBackToCategories}
                    title="Return to Category Selection"
                  >
                    <ArrowLeft size={16} strokeWidth={2.5} />
                    <span>Back to Categories</span>
                  </button>
                </div>
              </div>

              {/* Quick Category Switcher Circles Bar */}
              <div className="category-quick-switcher-bar">
                <span className="quick-switch-label">Switch Category:</span>
                <div className="quick-switch-scroll">
                  <button 
                    className={`quick-switch-pill ${selectedCategories.length === 0 ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategories([]);
                      setSearchParams({ all: 'true' });
                    }}
                  >
                    <span>All ({products.length})</span>
                  </button>
                  {ARCHITECTURAL_CATEGORIES.map((cat) => {
                    const isCurrent = selectedCategories.includes(normalizeCategory(cat.title));
                    return (
                      <button
                        key={cat.title}
                        className={`quick-switch-pill ${isCurrent ? 'active' : ''}`}
                        onClick={() => handleSelectCategory(cat.title)}
                      >
                        <img src={cat.image} alt="" className="quick-pill-img" />
                        <span>{cat.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Catalog Body */}
          <div className="container catalog-body-container">
            <div className="catalog-grid-layout">
              {/* Filter Sidebar */}
              <aside className="catalog-filter-sidebar" aria-label="Product Filters">
                <div className="filter-sidebar-header">
                  <h3 className="filter-sidebar-title">
                    <SlidersHorizontal size={16} className="text-gold" />
                    <span>Filter By</span>
                  </h3>
                  {activeFilterCount > 0 && (
                    <button 
                      className="btn-clear-filters-link"
                      onClick={resetAllFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Instant Search in Catalog */}
                <div className="filter-search-box">
                  <Search size={15} className="filter-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search in category..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="filter-search-input"
                  />
                  {searchQuery && (
                    <button 
                      className="filter-search-clear" 
                      onClick={() => setSearchQuery('')}
                      title="Clear"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Category List */}
                <div className="amazon-filter-group">
                  <div className="filter-group-header-row">
                    <h4 className="amazon-filter-group-title">
                      <span>CATEGORIES</span>
                    </h4>
                    <button 
                      className="sidebar-category-view-btn"
                      onClick={handleBackToCategories}
                      title="View category circles"
                    >
                      Circles View
                    </button>
                  </div>
                  <ul className="amazon-checkbox-list">
                    {/* All Categories Option */}
                    <li className="amazon-checkbox-item">
                      <label 
                        className={`amazon-checkbox-label ${selectedCategories.length === 0 ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCategories([]);
                          setSearchParams({ all: 'true' });
                        }}
                      >
                        <span className={`amazon-custom-checkbox ${selectedCategories.length === 0 ? 'checked' : ''}`}>
                          {selectedCategories.length === 0 && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span className="amazon-filter-text">ALL CATEGORIES</span>
                        <span className="amazon-filter-count">({products.length})</span>
                      </label>
                    </li>

                    {categoryList.map((cat) => {
                      const isChecked = selectedCategories.includes(normalizeCategory(cat.title));
                      return (
                        <li key={cat.title} className="amazon-checkbox-item">
                          <label 
                            className={`amazon-checkbox-label ${isChecked ? 'active' : ''}`}
                            onClick={() => handleSelectCategory(cat.title)}
                          >
                            <span className={`amazon-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </span>
                            <span className="amazon-filter-text">{cat.title}</span>
                            <span className="amazon-filter-count">({cat.liveCount || cat.count})</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Callout */}
                <div className="amazon-filter-callout">
                  <p>
                    <strong>Bespoke Quarry Orders:</strong> All temple sanctums, fountains, basins, and wall panels can be hand-carved to your exact dimensions and CAD drawings.
                  </p>
                </div>
              </aside>

              {/* Main Product Column */}
              <main className="catalog-products-column">
                {/* Top Toolbar */}
                <div className="catalog-results-toolbar">
                  <div className="toolbar-left">
                    <span className="results-count-text">
                      Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> masterpieces
                      {currentCategoryData && <span className="text-gold"> in {currentCategoryData.title}</span>}
                    </span>
                  </div>

                  <div className="toolbar-right catalog-desktop-sort">
                    <label htmlFor="catalog-sort" className="sort-label">Sort by:</label>
                    <select 
                      id="catalog-sort"
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="catalog-sort-select"
                    >
                      <option value="featured">Featured Collection</option>
                      <option value="rating">Customer Rating</option>
                      <option value="name-asc">Alphabetical (A - Z)</option>
                      <option value="name-desc">Alphabetical (Z - A)</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Bar */}
                {activeFilterCount > 0 && (
                  <div className="active-filters-chips-bar">
                    <span className="chips-label">Active Filters:</span>
                    <div className="chips-container">
                      {selectedCategories.map(cat => (
                        <span key={cat} className="filter-chip">
                          <span>Category: {cat}</span>
                          <button onClick={handleBackToCategories} title="Remove category">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      {searchQuery && (
                        <span className="filter-chip">
                          <span>Search: "{searchQuery}"</span>
                          <button onClick={() => setSearchQuery('')} title="Clear search">
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      <button className="btn-clear-all-chips" onClick={resetAllFilters}>
                        Clear All
                      </button>
                    </div>
                  </div>
                )}

                {/* Products Grid */}
                {isLoadingProducts ? (
                  <div className="catalog-loading-box">
                    <RefreshCw size={28} className="animate-spin text-gold" />
                    <p>Loading luxury architectural catalog...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="catalog-no-results">
                    <Sparkles size={48} className="no-res-icon" />
                    <h3>No Masterpieces Found in this Selection</h3>
                    <p>
                      {searchQuery 
                        ? `No designs matched "${searchQuery}". Try a different keyword.` 
                        : 'Explore another category or consult our quarry sculptors for bespoke fabrication.'}
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
                      <button className="btn-primary" onClick={handleBackToCategories}>
                        View All Categories
                      </button>
                      <Link to="/contact" className="btn-outline">
                        Request Custom Order
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="catalog-product-grid">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
