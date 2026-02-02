import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { FileText, MessageSquare, Settings, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { logout } = useAdmin();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-plum-900">Admin Dashboard</h1>
          <button 
            onClick={logout}
            className="btn flex items-center text-plum-900 bg-red-100 hover:bg-red-200"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Blog Card */}
          <motion.div variants={itemVariants}>
            <Link to="/admin/blog" className="card block hover:bg-lilac-50 h-full">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-lilac-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={24} className="text-plum-900" />
                </div>
                <h2 className="text-xl font-semibold text-plum-900 mb-2">Blog Manager</h2>
                <p className="text-gray-600">
                  Create, edit, and delete blog posts
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Messages Card */}
          <motion.div variants={itemVariants}>
            <Link to="/admin/messages" className="card block hover:bg-lilac-50 h-full">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-lilac-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare size={24} className="text-plum-900" />
                </div>
                <h2 className="text-xl font-semibold text-plum-900 mb-2">Messages</h2>
                <p className="text-gray-600">
                  View and manage contact form submissions
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Settings Card */}
          <motion.div variants={itemVariants}>
            <Link to="/admin/settings" className="card block hover:bg-lilac-50 h-full">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-lilac-100 rounded-full flex items-center justify-center mb-4">
                  <Settings size={24} className="text-plum-900" />
                </div>
                <h2 className="text-xl font-semibold text-plum-900 mb-2">Settings</h2>
                <p className="text-gray-600">
                  Update your admin PIN and preferences
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-plum-900 mb-4">Quick Help</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Use the <strong>Blog Manager</strong> to create and publish new blog content</li>
            <li>Check <strong>Messages</strong> regularly to respond to potential clients</li>
            <li>Update your admin PIN in <strong>Settings</strong> to keep your account secure</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;