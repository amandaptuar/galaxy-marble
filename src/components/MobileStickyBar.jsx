import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileStickyBar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProducts = () => {
    navigate('/products');
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/919057206605?text=Hello%20Galaxy%20Marble%2C%20I%20would%20like%20to%20enquire%20about%20your%20bespoke%20marble%20crafts.',
      '_blank'
    );
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
        className="sticky-tab-btn sticky-whatsapp-btn" 
        onClick={handleWhatsApp}
        aria-label="WhatsApp Enquiry"
      >
        <div className="sticky-wa-icon-wrap">
          <MessageCircle size={20} />
        </div>
        <span>Enquire</span>
      </button>
    </nav>
  );
};

