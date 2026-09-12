import React from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const inWishlist = isInWishlist(product.title);

  // Compute savings if originalPrice is available
  const parseNum = (p) => (p ? parseInt(p.replace(/[^0-9]/g, ''), 10) : 0);
  const currentNum = product.numericPrice || parseNum(product.price);
  const origNum = parseNum(product.originalPrice);
  const savings = origNum > currentNum ? origNum - currentNum : 0;

  return (
    <div className="product-card">
      {/* Media & Badges */}
      <div 
        className="product-media"
        onClick={() => setQuickViewProduct(product)}
        title={`View details of ${product.title}`}
      >
        {/* Main Image */}
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-img-main" 
          loading="lazy"
        />

        {/* Hover Image */}
        {product.hoverImage && product.hoverImage !== product.image && (
          <img 
            src={product.hoverImage} 
            alt={product.title} 
            className="product-img-hover" 
            loading="lazy"
          />
        )}

        {/* Top Badges Wrap */}
        <div className="card-top-badges">
          {product.discount && (
            <span className="product-badge-discount">
              {product.discount} OFF
            </span>
          )}
          <span className="product-badge-stone">
            <Sparkles size={10} style={{ display: 'inline', marginRight: 3 }} />
            {product.stoneType ? product.stoneType.split(' ')[0] : 'Makrana'}
          </span>
        </div>

        {/* Wishlist Button */}
        <button 
          className={`card-wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={inWishlist ? "Remove from Wishlist" : "Save to Wishlist"}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={inWishlist ? "#d12f2f" : "none"} />
        </button>

        {/* Desktop Quick View Overlay Button */}
        <div className="quick-view-btn-wrap">
          <button 
            className="btn-quick-view"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <Eye size={14} />
            <span>Quick View & Specs</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="product-info">
        {/* Stone / Category Header */}
        <div className="product-meta-row">
          <span className="product-category-tag">
            {product.category || 'Marble Sculpture'}
          </span>
          {product.sku && <span className="product-sku">{product.sku}</span>}
        </div>
        
        {/* Product Title */}
        <h3 
          className="product-title" 
          title={product.title}
          onClick={() => setQuickViewProduct(product)}
        >
          {product.title}
        </h3>

        {/* Rating & Verified Proof */}
        <div className="product-rating-row">
          <div className="product-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="#e5a93b" color="#e5a93b" />
            ))}
          </div>
          <span className="rating-score">5.0</span>
          <span className="rating-verified">
            <CheckCircle2 size={11} className="text-gold" />
            Vedic Verified
          </span>
        </div>

        {/* Price & Savings Box */}
        <div className="product-price-box">
          <div className="price-stack">
            <span className="price-current">{product.price}</span>
            {product.originalPrice && (
              <span className="price-original">{product.originalPrice}</span>
            )}
          </div>
          {savings > 0 && (
            <span className="savings-pill">
              Save ₹ {savings.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Action Buttons: Add to Cart + Mobile Quick View */}
        <div className="product-card-actions">
          <button 
            className="btn-add-cart"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
          </button>

          <button 
            className="mobile-quick-view-btn"
            onClick={() => setQuickViewProduct(product)}
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
