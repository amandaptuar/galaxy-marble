import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileStickyBar = () => {
  const navigate = useNavigate();
  const { 
    totalCartCount, 
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen,
    setIsSearchOpen 
  } = useStore();

  const handleHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProducts = () => {
    navigate('/products');
  };

  return (
    <nav className="mobile-sticky-bar" aria-label="Mobile Sticky Navigation">
      <button 
        className="sticky-tab-btn" 
        onClick={handleHome}
        aria-label="Home"
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        className="sticky-tab-btn" 
        onClick={handleProducts}
        aria-label="Products"
      >
        <LayoutGrid size={20} />
        <span>Products</span>
      </button>

      <button 
        className="sticky-tab-btn" 
        onClick={() => setIsSearchOpen(true)}
        aria-label="Search"
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      <button 
        className="sticky-tab-btn" 
        onClick={() => setIsWishlistOpen(true)}
        aria-label="Wishlist"
      >
        <Heart size={20} />
        <span>Wishlist</span>
        {wishlist.length > 0 && (
          <span className="sticky-badge">{wishlist.length}</span>
        )}
      </button>

      <button 
        className="sticky-tab-btn" 
        onClick={() => setIsCartOpen(true)}
        aria-label="Shopping Cart"
      >
        <ShoppingBag size={20} />
        <span>Cart</span>
        {totalCartCount > 0 && (
          <span className="sticky-badge">{totalCartCount}</span>
        )}
      </button>
    </nav>
  );
};
