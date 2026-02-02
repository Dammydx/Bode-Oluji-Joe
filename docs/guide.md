# FlowDesk Implementation Guide

This guide provides detailed information on setting up, maintaining, and extending the FlowDesk portfolio website.

## Table of Contents

1. [Supabase Setup](#supabase-setup)
2. [Environment Configuration](#environment-configuration)
3. [Content Management](#content-management)
4. [Deployment](#deployment)
5. [Customization](#customization)
6. [Future Improvements](#future-improvements)

## Supabase Setup

### Creating a Supabase Project

1. Sign up or log in at [Supabase](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key (you'll need these for environment variables)

### Database Tables Setup

Create the following tables in your Supabase database:

#### 1. blogPosts Table

```sql
CREATE TABLE public.blogPosts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up Row Level Security
ALTER TABLE public.blogPosts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read blog posts
CREATE POLICY "Anyone can read blog posts" ON public.blogPosts
    FOR SELECT USING (true);

-- Only authenticated users (admin) can insert, update, delete
CREATE POLICY "Authenticated users can insert blog posts" ON public.blogPosts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog posts" ON public.blogPosts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog posts" ON public.blogPosts
    FOR DELETE USING (auth.role() = 'authenticated');
```

#### 2. messages Table

```sql
CREATE TABLE public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert messages (for contact form)
CREATE POLICY "Anyone can insert messages" ON public.messages
    FOR INSERT WITH CHECK (true);

-- Only authenticated users (admin) can select, update, delete
CREATE POLICY "Authenticated users can view messages" ON public.messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update messages" ON public.messages
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete messages" ON public.messages
    FOR DELETE USING (auth.role() = 'authenticated');
```

#### 3. admin Table

```sql
CREATE TABLE public.admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pin TEXT NOT NULL
);

-- Set up Row Level Security
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can access admin settings
CREATE POLICY "Authenticated users can view admin settings" ON public.admin
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update admin settings" ON public.admin
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert admin settings" ON public.admin
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## Environment Configuration

Create a `.env` file in the root of your project with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholders with your actual Supabase project details.

## Content Management

### Adding Blog Posts

1. Log in to the admin panel at `/admin` (default PIN: 7892)
2. Navigate to the Blog Manager
3. Click "New Post"
4. Enter a title and content
5. Click "Create Post"

### Managing Messages

1. Log in to the admin panel
2. Navigate to the Messages section
3. Click on any message to view its details
4. Mark messages as read automatically by viewing them
5. Delete messages using the delete button

### Changing Admin PIN

1. Log in to the admin panel
2. Navigate to the Settings section
3. Enter your current PIN and your new desired PIN
4. Click "Update PIN"

## Deployment

### Building for Production

```bash
npm run build
```

This creates optimized files in the `dist` directory.

### Deploying to GitHub Pages

1. Create a GitHub repository for your project
2. Push your code to the repository
3. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Add these scripts to package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Deploy by running:
   ```bash
   npm run deploy
   ```

### Deploying to Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add your environment variables in the Netlify dashboard

## Customization

### Changing Colors

1. Edit the colors in `tailwind.config.js`
2. Update the color variables in the main CSS file (`src/index.css`)

### Updating Content

- **Services**: Edit the services array in `src/pages/Services.tsx`
- **About**: Update the bio and skills in `src/pages/About.tsx`
- **Homepage**: Edit the intro text in `src/pages/Home.tsx`

### Adding New Pages

1. Create a new component in the `src/pages` directory
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/common/Header.tsx`

## Future Improvements

Here are some ideas for future enhancements to the project:

### Design and User Experience

- Dark mode toggle
- More animation variations
- Improved typography scale
- Image gallery for portfolio items

### Functionality

- Blog search and filtering
- Comment system for blog posts
- Newsletter subscription
- Social media feed integration
- Multi-language support

### Technical Improvements

- Server-side rendering for improved SEO
- Automated testing
- Performance optimizations
- Service worker for offline capability
- Advanced analytics tracking

### Admin Features

- Rich text editor for blog posts
- Media library for images
- User analytics dashboard
- Post scheduling
- Auto-save drafts

## Troubleshooting

### Common Issues

1. **Supabase Connection Issues**: Double-check your environment variables
2. **Admin Login Problems**: Try the default PIN (7892), or check the database directly
3. **Build Errors**: Ensure all dependencies are installed properly
4. **Navigation Problems**: Check routes in App.tsx and path names in links

### Support

For further assistance, please contact the developer.