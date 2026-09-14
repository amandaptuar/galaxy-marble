import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, ShieldCheck } from 'lucide-react';
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
    setIsSearchOpen,
    setIsMobileMenuOpen
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

            {/* Center: Mobile logo OR Desktop Nav Links */}
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
                  {/* Quick link to Admin */}
                  <li className="nav-item">
                    <NavLink 
                      to="/admin" 
                      className={({ isActive }) => `nav-link admin-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <ShieldCheck size={13} style={{ display: 'inline', marginRight: 4 }} />
                      <span>Admin</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right: Search & Direct WhatsApp Enquire */}
            <div className="header-right">
              <button 
                className="icon-btn" 
                onClick={() => setIsSearchOpen(true)}
                title="Search Products"
                aria-label="Search site"
              >
                <Search size={19} />
              </button>

              <a 
                href="https://wa.me/919929288880?text=Hello%20Galaxy%20Marble%2C%20I%20would%20like%20to%20enquire%20about%20your%20bespoke%20marble%20crafts." 
                target="_blank" 
                rel="noopener noreferrer"
                className="header-whatsapp-cta desktop-only"
                title="Consult with Master Craftsman"
              >
                <span>Enquire Now</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
