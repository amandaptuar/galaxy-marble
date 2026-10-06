-- ==============================================================================
-- GALAXY MARBLE - CLEAN SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. CATEGORIES TABLE
-- Stores new and dynamic categories added via Admin
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    featured BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_title ON public.categories(title);

-- 2. PRODUCTS TABLE
-- Stores products added via Admin with 1 to 3 images support
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    sku TEXT,
    category TEXT NOT NULL,
    sub_category TEXT,
    stone_type TEXT,
    description TEXT,
    dimensions TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image TEXT NOT NULL,
    hover_image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    in_stock BOOLEAN DEFAULT TRUE,
    rating NUMERIC DEFAULT 5.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- 3. USERS AUTH / PROFILES TABLE
-- Enforces: "one user can register one time only from the phone number"
CREATE TABLE IF NOT EXISTS public.users_auth (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_auth_phone ON public.users_auth(phone);

-- 4. ENQUIRIES / QUOTES TABLE
-- Stores customer quotation inquiries & WhatsApp leads
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    user_phone TEXT NOT NULL,
    user_email TEXT,
    product_id TEXT,
    product_title TEXT NOT NULL,
    product_category TEXT,
    product_image TEXT,
    query_message TEXT,
    quantity INTEGER DEFAULT 1,
    status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'In Discussion', 'Completed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- Enables seamless frontend operations using Supabase Anon Key
-- ==============================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Categories RLS (Anyone can read, create, update, delete with anon key)
DROP POLICY IF EXISTS "Public can manage categories" ON public.categories;
CREATE POLICY "Public can manage categories"
ON public.categories FOR ALL
USING (true)
WITH CHECK (true);

-- Products RLS (Anyone can read, create, update, delete with anon key)
DROP POLICY IF EXISTS "Public can manage products" ON public.products;
CREATE POLICY "Public can manage products"
ON public.products FOR ALL
USING (true)
WITH CHECK (true);

-- Users Auth RLS (Anyone can read and register users with anon key)
DROP POLICY IF EXISTS "Public can read and register users" ON public.users_auth;
CREATE POLICY "Public can read and register users"
ON public.users_auth FOR ALL
USING (true)
WITH CHECK (true);

-- Enquiries RLS (Anyone can manage enquiries with anon key)
DROP POLICY IF EXISTS "Public can manage enquiries" ON public.enquiries;
CREATE POLICY "Public can manage enquiries"
ON public.enquiries FOR ALL
USING (true)
WITH CHECK (true);
