/*
  # Initial Schema Setup for FlowDesk

  1. New Tables
    - `blogPosts`: Stores blog articles
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `messages`: Stores contact form submissions
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `read` (boolean)
      - `created_at` (timestamp)
    
    - `admin`: Stores admin settings
      - `id` (uuid, primary key)
      - `pin` (text)

  2. Security
    - Enable RLS on all tables
    - Set up appropriate policies for each table
    - Allow public read access to blog posts
    - Restrict message and admin access to authenticated users
*/

-- Create blogPosts table
CREATE TABLE IF NOT EXISTS public.blogPosts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Set up RLS for blogPosts
ALTER TABLE public.blogPosts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read blog posts
CREATE POLICY "Anyone can read blog posts" ON public.blogPosts
    FOR SELECT USING (true);

-- Only authenticated users can insert, update, delete
CREATE POLICY "Authenticated users can insert blog posts" ON public.blogPosts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog posts" ON public.blogPosts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog posts" ON public.blogPosts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Set up RLS for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert messages (for contact form)
CREATE POLICY "Anyone can insert messages" ON public.messages
    FOR INSERT WITH CHECK (true);

-- Only authenticated users can select, update, delete
CREATE POLICY "Authenticated users can view messages" ON public.messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update messages" ON public.messages
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete messages" ON public.messages
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create admin table
CREATE TABLE IF NOT EXISTS public.admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pin TEXT NOT NULL
);

-- Set up RLS for admin
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can access admin settings
CREATE POLICY "Authenticated users can view admin settings" ON public.admin
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update admin settings" ON public.admin
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert admin settings" ON public.admin
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');