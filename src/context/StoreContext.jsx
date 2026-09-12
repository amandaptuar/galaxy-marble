import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DUMMY_PRODUCTS, DUMMY_PRODUCT } from '../data/siteData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_cart');
      return saved ? JSON.parse(saved) : [
        // default 1 dummy product item
        {
          id: DUMMY_PRODUCT.sku,
          title: DUMMY_PRODUCT.title,
          sku: DUMMY_PRODUCT.sku,
          price: DUMMY_PRODUCT.price,
          numericPrice: 99999,
          originalPrice: DUMMY_PRODUCT.originalPrice,
          image: DUMMY_PRODUCT.image,
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gm_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Parse price string to number
  const parseNumericPrice = (pStr) => {
    if (!pStr) return 0;
    const num = pStr.replace(/[^0-9]/g, '');
    return num ? parseInt(num, 10) : 50000;
  };

  // Toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.sku || product.title,
          title: product.title,
          sku: product.sku || 'GM-' + Math.floor(1000 + Math.random() * 9000),
          price: product.price,
          numericPrice: parseNumericPrice(product.price),
          originalPrice: product.originalPrice,
          image: product.image,
          quantity: quantity
        }
      ];
    });
    showToast(`Added "${product.title.slice(0, 32)}..." to shopping cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productTitle) => {
    setCart((prev) => prev.filter((item) => item.title !== productTitle));
  };

  const updateQuantity = (productTitle, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.title === productTitle) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.title === product.title);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((item) => item.title !== product.title);
      } else {
        showToast(`Added "${product.title.slice(0, 30)}..." to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productTitle) => {
    return wishlist.some((item) => item.title === productTitle);
  };

  // Flatten all products for instant search
  const allProducts = useMemo(() => {
    return DUMMY_PRODUCTS;
  }, []);

  // Cart subtotal calculation
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.numericPrice || parseNumericPrice(item.price)) * item.quantity, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartSubtotal,
        totalCartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isConsultationOpen,
        setIsConsultationOpen,
        allProducts,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
