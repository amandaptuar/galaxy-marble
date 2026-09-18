import React from 'react';
import { Eye, Sparkles, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { setQuickViewProduct, enquireOnWhatsApp } = useStore();

  const categoryName = (product.category || 'MARBLE BASIN').toUpperCase();
  const stoneName = product.stone_type || product.stoneType || 'Makrana Stone';

  const handleProductClick = () => {
    setQuickViewProduct(product);
  };

  return (
    <div 
      className="product-card"
      onClick={handleProductClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Media & Badges */}
      <div 
        className="product-media"
        title={`View ${product.title}`}
      >
        {/* Main Image */}
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-img-main" 
          loading="lazy"
        />

        {/* Hover Image */}
        {product.hover_image && product.hover_image !== product.image && (
          <img 
            src={product.hover_image} 
            alt={product.title} 
            className="product-img-hover" 
            loading="lazy"
          />
        )}

        {/* Top Badges Wrap */}
        <div className="card-top-badges">
          <span className="product-badge-stone">
            <Sparkles size={10} style={{ display: 'inline', marginRight: 3 }} />
            {stoneName.split(' ')[0]}
          </span>
          {product.in_stock === false ? (
            <span className="product-badge-stock out">Custom Order</span>
          ) : (
            <span className="product-badge-stock in">Available</span>
          )}
        </div>

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
            <span>Specifications</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="product-info">
        {/* Product Category Heading strictly */}
        <div className="product-meta-row">
          <h3 className="product-card-heading" title={categoryName}>
            {categoryName}
          </h3>
          {product.sku && <span className="product-sku">{product.sku}</span>}
        </div>

        {/* Price Box - Strictly NO PRICES, Price on Request / Enquiry */}
        <div className="product-price-box">
          <div className="price-stack">
            <span className="price-on-request">Price on Request</span>
            <span className="price-sub-note">Custom sizing & crating available</span>
          </div>
        </div>

        {/* Action Buttons: View Details + WhatsApp Enquiry */}
        <div className="product-card-actions">
          {/* View Details Button (Expands product in large dialogue) */}
          <button 
            className="btn-view-details"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            title="View enlarged photo and complete specifications"
            aria-label={`View details of ${product.title}`}
          >
            <Eye size={15} />
            <span>View Details</span>
          </button>

          {/* Primary WhatsApp Enquiry Button */}
          <button 
            className="btn-whatsapp-enquire"
            onClick={(e) => {
              e.stopPropagation();
              enquireOnWhatsApp(product);
            }}
            title="Enquire on WhatsApp with details"
            aria-label={`Enquire for ${product.title} on WhatsApp`}
          >
            <MessageCircle size={15} />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
