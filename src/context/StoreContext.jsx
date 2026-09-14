import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { SEED_PRODUCTS, WHATSAPP_CONFIG, normalizeCategory } from '../data/siteData';
import { 
  fetchLiveProducts, 
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  registerUser,
  loginUser,
  getCurrentSessionUser,
  logoutCurrentUser,
  createEnquiry
} from '../lib/supabase';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // 1. PRODUCTS STATE (Dynamic from Supabase / Local storage)
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const liveList = await fetchLiveProducts([]);
      // Merge seed products with live (admin-added) products
      // Live products take priority; seed products fill out the catalog
      const liveIds = new Set((liveList || []).map(p => p.id));
      const seedOnly = SEED_PRODUCTS.filter(sp => !liveIds.has(sp.id));
      const merged = [...(liveList || []), ...seedOnly].map(p => ({
        ...p,
        category: normalizeCategory(p.category)
      }));
      setProducts(merged);
    } catch (e) {
      console.error('Failed to load products:', e);
      // Fallback to seed products if Supabase fails
      setProducts(SEED_PRODUCTS.map(p => ({
        ...p,
        category: normalizeCategory(p.category)
      })));
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Admin live modifiers
  const addProductToStore = async (productData) => {
    const saved = await apiAddProduct(productData);
    setProducts(prev => [saved, ...prev.filter(p => p.id !== saved.id)]);
    showToast(`Product "${saved.title.slice(0, 24)}..." published successfully!`);
    return saved;
  };

  const updateProductInStore = async (id, productData) => {
    const updated = await apiUpdateProduct(id, productData);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast(`Product updated successfully!`);
    return updated;
  };

  const deleteProductFromStore = async (id) => {
    await apiDeleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product removed from catalog.`);
    return true;
  };

  // 2. USER AUTH STATE
  const [currentUser, setCurrentUser] = useState(() => getCurrentSessionUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = async (phone, password) => {
    const user = await loginUser({ phone, password });
    setCurrentUser(user);
    return user;
  };

  const handleRegister = async ({ fullName, phone, password }) => {
    const user = await registerUser({ fullName, phone, password });
    setCurrentUser(user);
    return user;
  };

  const handleLogout = () => {
    logoutCurrentUser();
    setCurrentUser(null);
    showToast('Signed out of account.');
  };

  // 3. ENQUIRY CART STATE (No prices, items for quotation)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_enquiry_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gm_enquiry_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gm_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id || item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id || item.title === product.title)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id || 'gm-' + Date.now(),
          title: product.title,
          sku: product.sku || 'GM-ARTISAN',
          category: (product.category || 'MARBLE SLABS & TILES').toUpperCase(),
          stoneType: product.stone_type || product.stoneType || 'Natural Stone',
          dimensions: product.dimensions || 'Custom Sizing',
          image: product.image || '/marble-hero-bg.jpg',
          quantity: quantity
        }
      ];
    });
    showToast(`Added "${product.title.slice(0, 28)}..." to Enquiry Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId && item.title !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId || item.title === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id || item.title === product.title);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((item) => item.id !== product.id && item.title !== product.title);
      } else {
        showToast(`Added "${product.title.slice(0, 26)}..." to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productIdOrTitle) => {
    return wishlist.some((item) => item.id === productIdOrTitle || item.title === productIdOrTitle);
  };

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // 4. WHATSAPP & DATABASE ENQUIRY WORKFLOW
  /**
   * Submit single product WhatsApp enquiry and log to Supabase/Admin
   */
  const enquireOnWhatsApp = async (product, customMessage = '') => {
    // 1. Add to user's cart history
    addToCart(product, 1);

    // 2. Prepare user contact info
    const customerName = currentUser ? currentUser.full_name : 'Customer';
    const customerPhone = currentUser ? currentUser.phone : 'Not provided';

    // 3. Save Enquiry in Supabase with exact Date & Time
    try {
      await createEnquiry({
        userName: customerName,
        userPhone: customerPhone,
        productId: product.id,
        productTitle: product.title,
        productCategory: (product.category || '').toUpperCase(),
        productImage: product.image,
        queryMessage: customMessage || `Price quote & availability request for ${product.title} (${product.sku || 'SKU N/A'})`,
        quantity: 1
      });
    } catch (e) {
      console.warn('Enquiry creation error:', e);
    }

    // 4. Format WhatsApp Message with product image URL
    const productImageUrl = product.image
      ? `${window.location.origin}${product.image.startsWith('/') ? '' : '/'}${product.image}`
      : '';

    const text = encodeURIComponent(
      `🏛️ *Galaxy Marble - Product Enquiry*\n\n` +
      `*Product:* ${product.title}\n` +
      `*Category:* ${(product.category || '').toUpperCase()}\n` +
      `*SKU:* ${product.sku || 'N/A'}\n` +
      `*Stone Type:* ${product.stone_type || product.stoneType || 'Makrana Natural'}\n` +
      `*Dimensions:* ${product.dimensions || 'Custom'}\n\n` +
      (productImageUrl ? `📸 *Product Image:* ${productImageUrl}\n\n` : '') +
      (customMessage ? `*Customer Note:* ${customMessage}\n\n` : '') +
      `*Customer Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n\n` +
      `I am interested in this product. Please share the price quotation, availability, and delivery timeline.`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.PHONE_NUMBER}?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast(`Enquiry sent! Redirecting to WhatsApp...`);
  };

  /**
   * Submit multi-item bulk Enquiry from Cart
   */
  const submitCartEnquiry = async ({ name, phone, notes }) => {
    if (cart.length === 0) {
      showToast('Your enquiry bag is empty.');
      return;
    }

    const customerName = name || (currentUser ? currentUser.full_name : 'Valued Patron');
    const customerPhone = phone || (currentUser ? currentUser.phone : 'Not provided');

    // 1. Save each product or aggregated enquiry in Supabase
    try {
      for (const item of cart) {
        await createEnquiry({
          userName: customerName,
          userPhone: customerPhone,
          productId: item.id,
          productTitle: item.title,
          productCategory: (item.category || '').toUpperCase(),
          productImage: item.image,
          queryMessage: `Cart Enquiry (Qty: ${item.quantity}). Notes: ${notes || 'None'}`,
          quantity: item.quantity
        });
      }
    } catch (e) {
      console.warn('Error recording bulk cart enquiry:', e);
    }

    // 2. Format WhatsApp Message with itemized list
    const itemsList = cart
      .map((item, idx) => `${idx + 1}. *${item.title}* (${item.category || ''}) - Qty: ${item.quantity}`)
      .join('\n');

    const text = encodeURIComponent(
      `🏛️ *Galaxy Marble - Quotation Request*\n\n` +
      `*Enquiry Patron:* ${customerName}\n` +
      `*Contact Phone:* ${customerPhone}\n\n` +
      `*Requested Masterpieces:*\n${itemsList}\n\n` +
      (notes ? `*Project Specifications:* ${notes}\n\n` : '') +
      `Please provide the official architectural quotation and freight timeline.`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.PHONE_NUMBER}?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast('Official quote enquiry submitted to admin & WhatsApp opened!');
  };

  return (
    <StoreContext.Provider
      value={{
        // Products
        products,
        isLoadingProducts,
        loadProducts,
        addProductToStore,
        updateProductInStore,
        deleteProductFromStore,
        allProducts: products,

        // Auth
        currentUser,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        isAuthModalOpen,
        setIsAuthModalOpen,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartCount,
        isCartOpen,
        setIsCartOpen,

        // Enquiry & WhatsApp
        enquireOnWhatsApp,
        submitCartEnquiry,

        // Wishlist & Modals
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
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
