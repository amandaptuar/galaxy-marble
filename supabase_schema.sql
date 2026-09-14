-- ==============================================================================
-- GALAXY MARBLE - SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. USERS AUTH / PROFILES TABLE
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

-- Index on phone for fast lookup and uniqueness enforcement
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_auth_phone ON public.users_auth(phone);

-- 2. PRODUCTS TABLE
-- Stores all Galaxy Marble products.
-- Note: category is always stored in ALL CAPS. No price column (price on enquiry).
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
    in_stock BOOLEAN DEFAULT TRUE,
    rating NUMERIC DEFAULT 5.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on category for instant filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);

-- 3. ENQUIRIES / QUERIES TABLE
-- Stores customer product enquiries and quote requests with timestamp & contact info
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

-- Index on created_at for chronological ordering
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enabling smooth client-side operations using Supabase Anon Key
-- ==============================================================================

ALTER TABLE public.users_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Users Auth policies
DROP POLICY IF EXISTS "Public can read and register users" ON public.users_auth;
CREATE POLICY "Public can read and register users"
ON public.users_auth FOR ALL
USING (true)
WITH CHECK (true);

-- Products policies (public can read, anon/admin can modify)
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products"
ON public.products FOR ALL
USING (true)
WITH CHECK (true);

-- Enquiries policies (anyone can create enquiry, admin can view/update)
DROP POLICY IF EXISTS "Anyone can create and view enquiries" ON public.enquiries;
CREATE POLICY "Anyone can create and view enquiries"
ON public.enquiries FOR ALL
USING (true)
WITH CHECK (true);
