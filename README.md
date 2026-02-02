# FlowDesk - Portfolio Website for Lewechi Princess

A beautiful, professional portfolio website for Lewechi Princess, a Virtual Assistant, Social Media Manager, and Customer Service Representative.

## Overview

FlowDesk is a sleek, fully-responsive portfolio website that showcases Lewechi Princess's services, blog content, and provides a contact form. The site features an elegant, animated layout with a feminine color scheme of Lilac, Deep Plum, and White.

All blog posts and messages are stored in Supabase and can be managed through a PIN-protected Admin Panel.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Animations:** Framer Motion
- **State Management:** React Context API
- **Routing:** React Router v6
- **Notifications:** React-Toastify
- **Backend/Database:** Supabase

## Features

- **Elegant Design**: Soft, feminine aesthetic with animations and transitions
- **Responsive Layout**: Optimized for all device sizes
- **Blog System**: Full CRUD operations for blog posts
- **Contact Form**: Form validation and message storage
- **Admin Panel**: PIN-protected area for content management
- **Smooth Animations**: Page transitions and UI interactions

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Accessing the Admin Panel

1. Navigate to `/admin` in the browser
2. Enter the default PIN: `7892`
3. You'll now have access to:
   - Blog Manager (create, edit, delete posts)
   - Messages (view and manage contact form submissions)
   - Settings (change your admin PIN)

## Changing the Admin PIN

1. Log into the admin panel
2. Navigate to the Settings section
3. Enter your current PIN and your new desired PIN
4. Click "Update PIN"

## Supabase Setup

The application requires three tables in your Supabase database:

1. `blogPosts`: Stores all blog articles
2. `messages`: Stores contact form submissions
3. `admin`: Stores the admin PIN

The database structure is defined in `src/lib/database.types.ts`

## Deployment

Build the project for production:
```
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the developer.