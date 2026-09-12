import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const NAV_ITEMS = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Products',
    path: '/products'
  },
  {
    title: 'About',
    path: '/about'
  },
  {
    title: 'Contact',
    path: '/contact'
  }
];

export const Header = () => {
  const { 
    totalCartCount, 
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    setIsConsultationOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-main">
            {/* Left: Mobile hamburger or Desktop logo + brand */}
            <div className="header-left">
              <button 
                className="hamburger-btn mobile-only" 
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu size={22} />
              </button>

              {/* Desktop Logo on left */}
              <Link to="/" className="header-logo desktop-only" aria-label="Galaxy Marble Home">
                <img 
                  src="/logo.png" 
                  alt="Galaxy Marble Logo" 
                  className="brand-logo-round"
                />
                <span className="brand-name-compact">GALAXY MARBLE</span>
              </Link>

              <button 
                className="icon-btn mobile-only" 
                onClick={() => setIsSearchOpen(true)}
                title="Search Products"
                aria-label="Search site"
              >
                <Search size={19} />
              </button>
            </div>

            {/* Center: Mobile logo OR Desktop Nav Links (Home, Products, About, Contact) */}
            <div className="header-center">
              {/* Mobile Centered Logo */}
              <Link to="/" className="header-logo mobile-only" aria-label="Galaxy Marble Home">
                <img 
                  src="/logo.png" 
                  alt="Galaxy Marble Logo" 
                  className="brand-logo-round"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="desktop-nav" aria-label="Main Navigation">
                <ul className="nav-menu">
                  {NAV_ITEMS.map((item, idx) => (
                    <li key={idx} className="nav-item">
                      <NavLink 
                        to={item.path} 
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      >
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right: Search, Wishlist, Cart */}
            <div className="header-right">
              <button 
                className="icon-btn desktop-only" 
                onClick={() => setIsSearchOpen(true)}
                title="Search Products"
                aria-label="Search site"
              >
                <Search size={19} />
              </button>

              <button 
                className="icon-btn" 
                onClick={() => setIsWishlistOpen(true)}
                title="View Wishlist"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="badge-count">{wishlist.length}</span>
                )}
              </button>

              <button 
                className="icon-btn" 
                onClick={() => setIsCartOpen(true)}
                title="View Shopping Cart"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={20} />
                {totalCartCount > 0 && (
                  <span className="badge-count">{totalCartCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
