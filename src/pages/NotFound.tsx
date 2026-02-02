import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="pt-20 min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <h1 className="text-9xl font-bold text-plum-900">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4 mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center"
          >
            <Home size={18} className="mr-2" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;