import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, X, Check, Sparkles, RefreshCw, ChevronRight, 
  Search, SlidersHorizontal, CheckSquare, Square, ChevronDown 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ARCHITECTURAL_CATEGORIES, normalizeCategory } from '../data/siteData';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoadingProducts } = useStore();

  // Multi-select categories state
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const catParam = searchParams.get('category');
    if (!catParam) return [];
    return catParam.split(',').map(c => normalizeCategory(decodeURIComponent(c)));
  });

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Sort By
  const [sortBy, setSortBy] = useState('featured');

  // Mobile drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  // Extract strictly the 9 curated architectural categories with product counts
  const categoryList = useMemo(() => {
    const map = new Map();
    // Default allowed categories strictly in defined order
    ARCHITECTURAL_CATEGORIES.forEach(c => map.set(c.title.toUpperCase(), 0));

    // Count products per allowed category
    products.forEach(p => {
      const cat = normalizeCategory(p.category);
      if (map.has(cat)) {
        map.set(cat, map.get(cat) + 1);
      }
    });

    return Array.from(map.entries()).map(([name, count]) => ({
      name,
      count
    }));
  }, [products]);

  // Category Toggle Handler (Multi-select)
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

  // Filtered Products Logic (Category & Search only)
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const prodCategory = normalizeCategory(prod.category);

      // Category filter (multi-select)
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

  return (
    <div className="catalog-page-wrap">
      {/* Catalog Hero Banner */}
      <div className="catalog-hero-header">
        <div className="container">
          <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span>Products</span>
            {selectedCategories.length === 1 && (
              <>
                <ChevronRight size={14} className="crumb-sep" />
                <span className="crumb-active">{selectedCategories[0]}</span>
              </>
            )}
          </nav>

          <div className="catalog-hero-content">
            <span className="section-tag">
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              Bespoke Architectural Collection
            </span>
            <h1 className="catalog-page-title">Handcrafted Stone Masterpieces</h1>
            <p className="catalog-page-desc">
              Discover pure Makrana marble slabs, hand-sculpted temple sanctums, luxury stone furniture, and architectural mantels. Direct quarry pricing on enquiry.
            </p>
          </div>
        </div>
      </div>

      {/* Main Catalog Body */}
      <div className="container catalog-body-container">
        {/* Mobile Category Dropdown Selector */}
        <div className="catalog-mobile-controls">
          <div className="catalog-mobile-category-dropdown">
            <label htmlFor="mobile-category-select" className="mobile-cat-label">
              <Filter size={15} />
              <span>Filter by Category:</span>
            </label>
            <div className="mobile-select-wrapper">
              <select
                id="mobile-category-select"
                value={selectedCategories.length === 1 ? selectedCategories[0] : (selectedCategories.length === 0 ? '' : selectedCategories[0])}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val || val === 'ALL') {
                    setSelectedCategories([]);
                    setSearchParams({});
                  } else {
                    setSelectedCategories([val]);
                    setSearchParams({ category: val });
                  }
                }}
                className="mobile-category-select"
                aria-label="Filter by Category"
              >
                <option value="">ALL CATEGORIES ({products.length})</option>
                {categoryList.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="select-chevron" />
            </div>
          </div>
        </div>

        <div className="catalog-grid-layout">
          {/* ============================================================ */}
          {/* ARCHITECTURAL FILTER SIDEBAR (Desktop)                       */}
          {/* ============================================================ */}
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
                placeholder="Search products..." 
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


            {/* CATEGORY FILTER (Simple Clean Filter) */}
            <div className="amazon-filter-group">
              <h4 className="amazon-filter-group-title">
                <span>CATEGORIES</span>
              </h4>
              <ul className="amazon-checkbox-list">
                {/* All Categories Option */}
                <li className="amazon-checkbox-item">
                  <label 
                    className={`amazon-checkbox-label ${selectedCategories.length === 0 ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategories([]);
                      setSearchParams({});
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
                  const isChecked = selectedCategories.includes(cat.name);
                  return (
                    <li key={cat.name} className="amazon-checkbox-item">
                      <label 
                        className={`amazon-checkbox-label ${isChecked ? 'active' : ''}`}
                        onClick={() => handleCategoryToggle(cat.name)}
                      >
                        <span className={`amazon-custom-checkbox ${isChecked ? 'checked' : ''}`}>
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span className="amazon-filter-text">{cat.name}</span>
                        <span className="amazon-filter-count">({cat.count})</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* PROMPT NOTE */}
            <div className="amazon-filter-callout">
              <p>
                <strong>Need Custom Carving?</strong> All marble basins, mandirs, water fountains, and wall panels can be hand-sculpted to your custom CAD drawings.
              </p>
            </div>
          </aside>

          {/* ============================================================ */}
          {/* MAIN PRODUCT LISTING COLUMN                                  */}
          {/* ============================================================ */}
          <main className="catalog-products-column">
            {/* Top Toolbar */}
            <div className="catalog-results-toolbar">
              <div className="toolbar-left">
                <span className="results-count-text">
                  Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> masterpieces
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
                      <button onClick={() => handleCategoryToggle(cat)}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  {searchQuery && (
                    <span className="filter-chip">
                      <span>Search: "{searchQuery}"</span>
                      <button onClick={() => setSearchQuery('')}>
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
            ) : products.length === 0 ? (
              <div className="catalog-no-results">
                <Sparkles size={48} className="no-res-icon" />
                <h3>Catalog Being Updated</h3>
                <p>All dummy products have been removed. Real marble pieces will appear here immediately once published in the Admin Portal.</p>
                <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: '16px auto 0' }}>
                  <span>Request Custom Quarry Order</span>
                </Link>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="catalog-no-results">
                <Sparkles size={48} className="no-res-icon" />
                <h3>No Matching Masterpieces Found</h3>
                <p>Try selecting another category or resetting your search filter.</p>
                <button className="btn-primary" onClick={resetAllFilters}>
                  Show All Categories
                </button>
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
  );
}
