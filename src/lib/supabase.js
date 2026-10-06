import { createClient } from '@supabase/supabase-js';

// Read credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase client if valid credentials exist
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConnected = () => {
  return Boolean(supabase && supabaseUrl && supabaseAnonKey);
};

export const getSupabaseConfig = () => {
  return {
    url: supabaseUrl,
    hasKey: Boolean(supabaseAnonKey),
    isConnected: isSupabaseConnected()
  };
};

// Local storage fallback keys for instant offline and development reliability
const STORAGE_KEYS = {
  USERS: 'gm_users_auth',
  PRODUCTS: 'gm_live_products',
  CATEGORIES: 'gm_live_categories',
  ENQUIRIES: 'gm_live_enquiries',
  CURRENT_USER: 'gm_current_session_user'
};

const getLocal = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultVal;
  }
};

const setLocal = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

// ==========================================
// 1. AUTHENTICATION & USER MANAGEMENT
// ==========================================

/**
 * Register a new user
 * Enforces: One user can register one time only from the phone number
 */
export async function registerUser({ fullName, phone, password }) {
  const cleanPhone = phone.trim().replace(/[^0-9+]/g, '');
  const cleanName = fullName.trim();

  if (!cleanPhone || cleanPhone.length < 10) {
    throw new Error('Please provide a valid phone number (at least 10 digits).');
  }
  if (!password || password.length < 4) {
    throw new Error('Password must be at least 4 characters.');
  }

  // 1. Try with Supabase if configured
  if (supabase) {
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('users_auth')
        .select('id, phone')
        .eq('phone', cleanPhone)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.warn('Supabase check error, fallback will verify:', checkError);
      } else if (existingUser) {
        throw new Error('This phone number is already registered! Please login instead.');
      }

      const { data: newUser, error: insertError } = await supabase
        .from('users_auth')
        .insert([
          {
            full_name: cleanName,
            phone: cleanPhone,
            password: password,
            role: 'user',
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505' || insertError.message?.includes('duplicate key')) {
          throw new Error('This phone number is already registered! Please login instead.');
        }
        throw new Error(insertError.message || 'Registration failed');
      }

      const localUsers = getLocal(STORAGE_KEYS.USERS, []);
      if (!localUsers.some(u => u.phone === cleanPhone)) {
        localUsers.push(newUser);
        setLocal(STORAGE_KEYS.USERS, localUsers);
      }

      setLocal(STORAGE_KEYS.CURRENT_USER, newUser);
      return newUser;
    } catch (err) {
      if (err.message.includes('already registered')) {
        throw err;
      }
      console.warn('Supabase error, attempting local storage:', err);
    }
  }

  // 2. Local Fallback
  const localUsers = getLocal(STORAGE_KEYS.USERS, []);
  const existing = localUsers.find(u => u.phone === cleanPhone);
  if (existing) {
    throw new Error('This phone number is already registered! Please login instead.');
  }

  const newUser = {
    id: 'user_' + Date.now(),
    full_name: cleanName,
    phone: cleanPhone,
    password: password,
    role: 'user',
    created_at: new Date().toISOString()
  };

  localUsers.push(newUser);
  setLocal(STORAGE_KEYS.USERS, localUsers);
  setLocal(STORAGE_KEYS.CURRENT_USER, newUser);
  return newUser;
}

/**
 * Login user with phone number and password
 */
export async function loginUser({ phone, password }) {
  const cleanPhone = phone.trim().replace(/[^0-9+]/g, '');

  if (supabase) {
    try {
      const { data: user, error } = await supabase
        .from('users_auth')
        .select('*')
        .eq('phone', cleanPhone)
        .eq('password', password)
        .maybeSingle();

      if (error) {
        console.warn('Supabase login error, fallback will attempt:', error);
      } else if (user) {
        setLocal(STORAGE_KEYS.CURRENT_USER, user);
        return user;
      } else {
        throw new Error('Invalid phone number or password. Please try again.');
      }
    } catch (err) {
      if (err.message.includes('Invalid phone number')) {
        throw err;
      }
    }
  }

  // Fallback to local
  const localUsers = getLocal(STORAGE_KEYS.USERS, []);
  const found = localUsers.find(u => u.phone === cleanPhone && u.password === password);
  if (!found) {
    throw new Error('Invalid phone number or password. Please check your credentials.');
  }

  setLocal(STORAGE_KEYS.CURRENT_USER, found);
  return found;
}

/**
 * Get currently active session user
 */
export function getCurrentSessionUser() {
  return getLocal(STORAGE_KEYS.CURRENT_USER, null);
}

/**
 * Logout current user
 */
export function logoutCurrentUser() {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Get all registered users (for Admin Panel)
 */
export async function getRegisteredUsers() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users_auth')
        .select('id, full_name, phone, role, created_at')
        .order('created_at', { ascending: false });

      if (!error && data) return data;
    } catch (e) {
      console.warn('Error fetching users from Supabase:', e);
    }
  }
  return getLocal(STORAGE_KEYS.USERS, []);
}

// ==========================================
// 2. CATEGORIES MANAGEMENT (NEW)
// ==========================================

export const DEFAULT_CATEGORY_IMAGE = '/marble-hero-bg.jpg';

/**
 * Fetch all categories (Base site categories remain intact, custom categories are merged on top)
 */
export async function fetchLiveCategories(seedCategories = []) {
  const baseCategories = seedCategories.map((c, i) => ({
    id: c.id || `cat-${c.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    title: c.title.trim().toUpperCase(),
    description: c.description || 'Luxury handcrafted natural marble masterpiece.',
    image: c.image || DEFAULT_CATEGORY_IMAGE,
    featured: true,
    sort_order: i + 1,
    created_at: new Date().toISOString()
  }));

  const baseTitles = new Set(baseCategories.map(c => c.title.toUpperCase()));

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const customCats = data.filter(c => !baseTitles.has((c.title || '').toUpperCase()));
        const merged = [...baseCategories, ...customCats];
        setLocal(STORAGE_KEYS.CATEGORIES, merged);
        return merged;
      }
    } catch (e) {
      console.warn('Error fetching categories from Supabase:', e);
    }
  }

  const localCats = getLocal(STORAGE_KEYS.CATEGORIES, []);
  if (localCats && localCats.length > 0) {
    const customLocal = localCats.filter(c => !baseTitles.has((c.title || '').toUpperCase()));
    return [...baseCategories, ...customLocal];
  }

  return baseCategories;
}

/**
 * Add a new category (Title is STRICTLY ALL CAPS)
 */
export async function addCategory(categoryData) {
  const title = (categoryData.title || '').trim().toUpperCase();
  if (!title) {
    throw new Error('Category title is required.');
  }

  const id = categoryData.id || `cat-${Date.now()}`;
  const image = (categoryData.image && categoryData.image.trim()) 
    ? categoryData.image.trim() 
    : DEFAULT_CATEGORY_IMAGE;

  const newCategory = {
    id,
    title,
    description: categoryData.description || `Exquisite handcrafted ${title.toLowerCase()} collection.`,
    image,
    featured: categoryData.featured !== false,
    sort_order: categoryData.sort_order || 99,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([newCategory])
        .select()
        .single();

      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.CATEGORIES, []);
        const updated = [...list.filter(c => c.id !== data.id && c.title !== data.title), data];
        setLocal(STORAGE_KEYS.CATEGORIES, updated);
        return data;
      }
      if (error) {
        console.warn('Supabase category insert error:', error);
      }
    } catch (e) {
      console.warn('Supabase add category failed, saving locally:', e);
    }
  }

  // Local fallback
  const list = getLocal(STORAGE_KEYS.CATEGORIES, []);
  const updated = [...list.filter(c => c.id !== newCategory.id && c.title !== newCategory.title), newCategory];
  setLocal(STORAGE_KEYS.CATEGORIES, updated);
  return newCategory;
}

/**
 * Update an existing category
 */
export async function updateCategory(id, categoryData) {
  const title = (categoryData.title || '').trim().toUpperCase();
  const updatedFields = {
    ...categoryData,
    title: title,
    updated_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.CATEGORIES, []);
        const updated = list.map(c => c.id === id ? { ...c, ...data } : c);
        setLocal(STORAGE_KEYS.CATEGORIES, updated);
        return data;
      }
    } catch (e) {
      console.warn('Supabase update category error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.CATEGORIES, []);
  const updated = list.map(c => c.id === id ? { ...c, ...updatedFields } : c);
  setLocal(STORAGE_KEYS.CATEGORIES, updated);
  return updated.find(c => c.id === id);
}

/**
 * Delete a category
 */
export async function deleteCategory(id) {
  if (supabase) {
    try {
      await supabase.from('categories').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete category error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.CATEGORIES, []);
  const updated = list.filter(c => c.id !== id);
  setLocal(STORAGE_KEYS.CATEGORIES, updated);
  return true;
}

// ==========================================
// 3. PRODUCTS MANAGEMENT
// ==========================================

export const DUMMY_SEED_IDS = new Set([
  'gm-prod-101', 'gm-prod-102', 'gm-prod-103', 'gm-prod-104',
  'gm-prod-105', 'gm-prod-106', 'gm-prod-107', 'gm-prod-108',
  'gm-prod-109', 'gm-prod-110', 'gm-prod-111', 'gm-prod-112'
]);

export const DEFAULT_PRODUCT_IMAGE = '/marble-hero-bg.jpg';

/**
 * Fetch all products (Supabase with local fallback)
 */
export async function fetchLiveProducts(seedProducts = []) {
  const rawCached = getLocal(STORAGE_KEYS.PRODUCTS, []);
  const cleanCached = (rawCached || []).filter(p => !DUMMY_SEED_IDS.has(p.id));
  if (cleanCached.length !== (rawCached || []).length) {
    setLocal(STORAGE_KEYS.PRODUCTS, cleanCached);
  }

  if (supabase) {
    try {
      await supabase
        .from('products')
        .delete()
        .in('id', Array.from(DUMMY_SEED_IDS));

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const liveClean = data.filter(p => !DUMMY_SEED_IDS.has(p.id));
        setLocal(STORAGE_KEYS.PRODUCTS, liveClean);
        return liveClean;
      }
    } catch (e) {
      console.warn('Error loading products from Supabase:', e);
    }
  }

  return cleanCached;
}

/**
 * Client-side Canvas Image Compressor
 * Resizes large photos to optimal web dimensions (~1200px max, 85% quality JPEG)
 * Prevents payload limit issues and makes Supabase uploads fast.
 */
export async function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Invalid image file.'));
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Add a new product (Category is ALWAYS UPPERCASE, supports 1-3+ images with default fallback)
 */
export async function addProduct(productData) {
  const rawImages = Array.isArray(productData.images) 
    ? productData.images.filter(img => img && typeof img === 'string' && img.trim()) 
    : [];
  
  if (productData.image && typeof productData.image === 'string' && productData.image.trim() && !rawImages.includes(productData.image.trim())) {
    rawImages.unshift(productData.image.trim());
  }

  if (rawImages.length === 0) {
    rawImages.push(DEFAULT_PRODUCT_IMAGE);
  }

  const primaryImage = rawImages[0] || DEFAULT_PRODUCT_IMAGE;
  const hoverImage = rawImages[1] || primaryImage;
  const categoryUpper = (productData.category || 'TEMPLE').trim().toUpperCase();

  const newProduct = {
    id: productData.id || 'gm-prod-' + Date.now(),
    title: productData.title.trim(),
    sku: productData.sku ? productData.sku.trim().toUpperCase() : 'GM-' + Math.floor(1000 + Math.random() * 9000),
    category: categoryUpper,
    sub_category: productData.subCategory || productData.sub_category || '',
    stone_type: productData.stoneType || productData.stone_type || 'Natural Marble',
    description: productData.description || 'Luxury handcrafted natural marble masterpiece.',
    dimensions: productData.dimensions || 'Custom architectural sizing available',
    features: productData.features || ['100% Natural Stone', 'Custom Finishing Available', 'Worldwide Insured Crating'],
    image: primaryImage,
    hover_image: hoverImage,
    images: rawImages,
    in_stock: true,
    rating: 5.0,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()
        .single();

      if (error) {
        console.error('Supabase Product Insertion Error:', error);
        throw new Error(error.message || 'Failed to insert into Supabase');
      }

      if (data) {
        const list = getLocal(STORAGE_KEYS.PRODUCTS, []);
        const updated = [data, ...list.filter(p => p.id !== data.id)];
        setLocal(STORAGE_KEYS.PRODUCTS, updated);
        return data;
      }
    } catch (e) {
      console.error('Supabase product upload error:', e);
      // If table missing or network error, save locally as fallback and notify
      const list = getLocal(STORAGE_KEYS.PRODUCTS, []);
      const updated = [newProduct, ...list.filter(p => p.id !== newProduct.id)];
      setLocal(STORAGE_KEYS.PRODUCTS, updated);
      throw e;
    }
  }

  // Local fallback
  const list = getLocal(STORAGE_KEYS.PRODUCTS, []);
  const updated = [newProduct, ...list.filter(p => p.id !== newProduct.id)];
  setLocal(STORAGE_KEYS.PRODUCTS, updated);
  return newProduct;
}

/**
 * Update an existing product
 */
export async function updateProduct(id, productData) {
  const rawImages = Array.isArray(productData.images) 
    ? productData.images.filter(img => img && typeof img === 'string' && img.trim()) 
    : [];
  
  if (productData.image && typeof productData.image === 'string' && productData.image.trim() && !rawImages.includes(productData.image.trim())) {
    rawImages.unshift(productData.image.trim());
  }

  if (rawImages.length === 0) {
    rawImages.push(DEFAULT_PRODUCT_IMAGE);
  }

  const primaryImage = rawImages[0] || DEFAULT_PRODUCT_IMAGE;
  const hoverImage = rawImages[1] || primaryImage;
  const categoryUpper = (productData.category || '').trim().toUpperCase();

  const updatedFields = {
    ...productData,
    category: categoryUpper,
    image: primaryImage,
    hover_image: hoverImage,
    images: rawImages,
    updated_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.PRODUCTS, []);
        const updated = list.map(p => p.id === id ? { ...p, ...data } : p);
        setLocal(STORAGE_KEYS.PRODUCTS, updated);
        return data;
      }
    } catch (e) {
      console.warn('Supabase update product error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.PRODUCTS, []);
  const updated = list.map(p => p.id === id ? { ...p, ...updatedFields } : p);
  setLocal(STORAGE_KEYS.PRODUCTS, updated);
  return updated.find(p => p.id === id);
}

/**
 * Delete a product
 */
export async function deleteProduct(id) {
  if (supabase) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete product error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.PRODUCTS, []);
  const updated = list.filter(p => p.id !== id);
  setLocal(STORAGE_KEYS.PRODUCTS, updated);
  return true;
}

// ==========================================
// 4. ENQUIRIES / QUERIES MANAGEMENT
// ==========================================

/**
 * Record a new customer enquiry
 */
export async function createEnquiry(enquiryData) {
  const enquiry = {
    id: enquiryData.id || 'enq_' + Date.now(),
    user_name: enquiryData.userName || enquiryData.user_name || 'Valued Patron',
    user_phone: enquiryData.userPhone || enquiryData.user_phone || 'Not Provided',
    user_email: enquiryData.userEmail || enquiryData.user_email || '',
    product_id: enquiryData.productId || enquiryData.product_id || '',
    product_title: enquiryData.productTitle || enquiryData.product_title || 'General Enquiry',
    product_category: (enquiryData.productCategory || enquiryData.product_category || '').toUpperCase(),
    product_image: enquiryData.productImage || enquiryData.product_image || '',
    query_message: enquiryData.queryMessage || enquiryData.query_message || 'Price & bespoke dimensions enquiry',
    quantity: enquiryData.quantity || 1,
    status: 'New',
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([enquiry])
        .select()
        .single();

      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.ENQUIRIES, []);
        setLocal(STORAGE_KEYS.ENQUIRIES, [data, ...list]);
        return data;
      }
    } catch (e) {
      console.warn('Supabase enquiry insert failed:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.ENQUIRIES, []);
  const updated = [enquiry, ...list];
  setLocal(STORAGE_KEYS.ENQUIRIES, updated);
  return enquiry;
}

/**
 * Fetch all enquiries for Admin Panel
 */
export async function fetchEnquiries() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setLocal(STORAGE_KEYS.ENQUIRIES, data);
        return data;
      }
    } catch (e) {
      console.warn('Error loading enquiries from Supabase:', e);
    }
  }

  return getLocal(STORAGE_KEYS.ENQUIRIES, []);
}

/**
 * Update enquiry status
 */
export async function updateEnquiryStatus(id, status) {
  if (supabase) {
    try {
      await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase enquiry status update error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.ENQUIRIES, []);
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  setLocal(STORAGE_KEYS.ENQUIRIES, updated);
  return updated;
}

/**
 * Delete an enquiry
 */
export async function deleteEnquiry(id) {
  if (supabase) {
    try {
      await supabase.from('enquiries').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase enquiry deletion error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.ENQUIRIES, []);
  const updated = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.ENQUIRIES, updated);
  return updated;
}
