import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Check, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { CATALOG_PRODUCTS } from '../data/siteData';
import { ProductCard } from '../components/ProductCard';

const CATEGORIES = ['All', 'Deity Murtis', 'Temples', 'Furniture', 'Home Decor'];
const STONE_TYPES = ['All', 'Pure Makrana White', 'Vietnam Crystal White', 'Black Banswara', 'Jade Onyx'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹ 50,000', min: 0, max: 50000 },
  { label: '₹ 50,000 - ₹ 1,50,000', min: 50000, max: 150000 },
  { label: '₹ 1,50,000 - ₹ 3,00,000', min: 150000, max: 300000 },
  { label: 'Above ₹ 3,00,000', min: 300000, max: Infinity },
];

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStone, setSelectedStone] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
        return false;
      }
      // Stone filter
      if (selectedStone !== 'All' && prod.stoneType !== selectedStone) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && !prod.inStock) {
        return false;
      }
      // Price range
      const range = PRICE_RANGES[selectedPriceRange];
      if (range && (prod.numericPrice < range.min || prod.numericPrice > range.max)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = prod.title.toLowerCase().includes(q);
        const matchSku = prod.sku && prod.sku.toLowerCase().includes(q);
        const matchCat = prod.category && prod.category.toLowerCase().includes(q);
        if (!matchTitle && !matchSku && !matchCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
      if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return 0; // featured
    });
  }, [selectedCategory, selectedStone, selectedPriceRange, inStockOnly, sortBy, searchQuery]);

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedStone !== 'All' ? 1 : 0) +
    (selectedPriceRange !== 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStone('All');
    setSelectedPriceRange(0);
    setInStockOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="catalog-page-wrap">
      {/* Catalog Hero Banner */}
      <div className="catalog-hero-header">
        <div className="container">
          <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span>Products</span>
            {selectedCategory !== 'All' && (
              <>
                <ChevronRight size={14} className="crumb-sep" />
                <span className="crumb-active">{selectedCategory}</span>
              </>
            )}
          </nav>

          <div className="catalog-hero-content">
            <span className="section-tag">
              <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
              Artisanal Stone Collection
            </span>
            <h1 className="catalog-title">Luxury Makrana Marble Masterpieces</h1>
            <p className="catalog-desc">
              Explore meticulously hand-carved deities, custom pooja room mandirs, and luxury architectural stone decor. Each artwork is sculpted in 100% genuine Makrana marble with certified generational durability.
            </p>
          </div>
        </div>
      </div>

      {/* Catalog Main Layout */}
      <div className="container catalog-body">
        <div className="catalog-layout">
          {/* Desktop Filter Sidebar */}
          <aside className="catalog-sidebar hidden md:block">
            <div className="sidebar-header">
              <div className="sidebar-title">
                <SlidersHorizontal size={18} className="text-gold" />
                <span>Filters & Refine</span>
              </div>
              {activeFilterCount > 0 && (
                <button className="clear-filter-btn" onClick={resetFilters}>
                  Reset All ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h3 className="filter-group-title">Categories</h3>
              <ul className="filter-list">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stone Type Filter */}
            <div className="filter-group">
              <h3 className="filter-group-title">Natural Stone Type</h3>
              <ul className="filter-list">
                {STONE_TYPES.map((stone) => (
                  <li key={stone}>
                    <button
                      className={`filter-pill-btn ${selectedStone === stone ? 'active' : ''}`}
                      onClick={() => setSelectedStone(stone)}
                    >
                      <span>{stone}</span>
                      {selectedStone === stone && <Check size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h3 className="filter-group-title">Price Range</h3>
              <div className="radio-filter-list">
                {PRICE_RANGES.map((rng, idx) => (
                  <label key={idx} className="filter-radio-label">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === idx}
                      onChange={() => setSelectedPriceRange(idx)}
                    />
                    <span>{rng.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="filter-group">
              <label className="checkbox-filter-label">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>Show In-Stock Ready to Ship Only</span>
              </label>
            </div>
          </aside>

          {/* Catalog Content Area */}
          <main className="catalog-main">
            {/* Top Controls Bar */}
            <div className="catalog-top-bar">
              <div className="catalog-count-wrap">
                <p className="catalog-count-text">
                  Showing <strong>{filteredProducts.length}</strong> of <strong>{CATALOG_PRODUCTS.length}</strong> luxury creations
                </p>
                {/* Mobile filter trigger */}
                <button
                  className="mobile-filter-trigger md:hidden"
                  onClick={() => setIsMobileFilterOpen(true)}
                  aria-label="Open Filters"
                >
                  <Filter size={16} />
                  <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
                </button>
              </div>

              <div className="catalog-sort-wrap">
                <label htmlFor="sort-select" className="sort-label">
                  <ArrowUpDown size={14} />
                  <span>Sort By:</span>
                </label>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured Artisanal</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="active-chips-wrap">
                {selectedCategory !== 'All' && (
                  <span className="filter-chip">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}>
                      <X size={13} />
                    </button>
                  </span>
                )}
                {selectedStone !== 'All' && (
                  <span className="filter-chip">
                    Stone: {selectedStone}
                    <button onClick={() => setSelectedStone('All')}>
                      <X size={13} />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== 0 && (
                  <span className="filter-chip">
                    {PRICE_RANGES[selectedPriceRange].label}
                    <button onClick={() => setSelectedPriceRange(0)}>
                      <X size={13} />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="filter-chip">
                    In Stock Only
                    <button onClick={() => setInStockOnly(false)}>
                      <X size={13} />
                    </button>
                  </span>
                )}
                <button className="reset-chips-btn" onClick={resetFilters}>
                  <RefreshCw size={12} /> Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="catalog-empty-state">
                <div className="empty-icon-wrap">
                  <SlidersHorizontal size={40} className="text-gold" />
                </div>
                <h3>No Artworks Match Your Selected Criteria</h3>
                <p>Try clearing some filters or exploring our full collection of marble sculptures.</p>
                <button className="btn-primary" onClick={resetFilters} style={{ marginTop: 20 }}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide-over Drawer */}
      {isMobileFilterOpen && (
        <div className="drawer-overlay open" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-wrap">
                <Filter size={18} className="text-gold" />
                <h3>Filter Products</h3>
              </div>
              <button 
                className="icon-btn" 
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              {/* Category */}
              <div className="filter-group">
                <h4 className="filter-group-title">Categories</h4>
                <div className="filter-chips-grid">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Type */}
              <div className="filter-group">
                <h4 className="filter-group-title">Natural Stone Type</h4>
                <div className="filter-chips-grid">
                  {STONE_TYPES.map((stone) => (
                    <button
                      key={stone}
                      className={`filter-pill-btn ${selectedStone === stone ? 'active' : ''}`}
                      onClick={() => setSelectedStone(stone)}
                    >
                      {stone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <h4 className="filter-group-title">Price Range</h4>
                <div className="radio-filter-list">
                  {PRICE_RANGES.map((rng, idx) => (
                    <label key={idx} className="filter-radio-label">
                      <input
                        type="radio"
                        name="mobilePriceRange"
                        checked={selectedPriceRange === idx}
                        onChange={() => setSelectedPriceRange(idx)}
                      />
                      <span>{rng.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div className="filter-group">
                <label className="checkbox-filter-label">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>In-Stock Ready to Ship Only</span>
                </label>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="btn-outline" onClick={resetFilters} style={{ flex: 1 }}>
                Reset
              </button>
              <button className="btn-primary" onClick={() => setIsMobileFilterOpen(false)} style={{ flex: 2 }}>
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
