import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from '../../context/AdminContext';

// Admin components
import Login from './Login';
import Dashboard from './Dashboard';
import BlogManager from './BlogManager';
import Messages from './Messages';
import Settings from './Settings';

const Admin: React.FC = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Ensure we only redirect after the initial auth check
    if (!isInitialLoad && !isAdmin) {
      navigate('/admin/login');
    }
    setIsInitialLoad(false);
  }, [isAdmin, navigate, isInitialLoad]);

  // Protection function for routes
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (isInitialLoad) {
      return <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-lilac-300 border-t-lilac-500 rounded-full animate-spin"></div>
      </div>;
    }
    
    if (!isAdmin) {
      toast.error('Please log in to access the admin panel');
      return <Navigate to="/admin/login" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="blog/*" 
          element={
            <ProtectedRoute>
              <BlogManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="messages" 
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
};

export default Admin;