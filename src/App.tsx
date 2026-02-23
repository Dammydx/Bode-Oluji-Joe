// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ScrollToTop from './components/common/ScrollToTop';
import { AdminProvider } from './context/AdminContext';

// Layouts
import SiteLayout from './components/common/SiteLayout';
import BlankLayout from './components/common/BlankLayout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Invite from './pages/Invite';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// ✅ NEW: Card page
import Card from './pages/Card';

function App() {
  return (
    <AdminProvider>
      <Router>
        {/* ScrollToTop should be inside Router */}
        <ScrollToTop />

        <Routes>
          {/* ✅ Normal website routes (WITH Header + Footer) */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/invite" element={<Invite />} />

            {/* Admin can stay here if you want header/footer on admin,
                BUT most people prefer admin without normal footer/header.
                We'll move it to BlankLayout below instead. */}
          </Route>

          {/* ✅ Special pages (NO Header + NO Footer) */}
          <Route element={<BlankLayout />}>
            <Route path="/card" element={<Card />} />
            <Route path="/admin/*" element={<Admin />} />
          </Route>

          {/* ✅ 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer position="bottom-right" />
      </Router>
    </AdminProvider>
  );
}

export default App;