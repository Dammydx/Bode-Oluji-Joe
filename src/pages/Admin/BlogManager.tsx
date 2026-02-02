import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import supabase from '../../lib/supabase';
import { Plus, ChevronLeft, Edit, Trash2, Calendar } from 'lucide-react';

import BlogForm from './components/BlogForm';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

const BlogManager: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
        </Routes>
      </div>
    </div>
  );
};

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blogPosts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setPosts(data || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Delete post
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blogPosts')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Update state to remove the deleted post
      setPosts(posts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      let message = 'Failed to delete post';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link to="/admin" className="mr-4 text-plum-900 hover:text-lilac-500">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-plum-900">Blog Manager</h1>
        </div>
        <Link 
          to="/admin/blog/new" 
          className="btn btn-primary flex items-center"
        >
          <Plus size={18} className="mr-2" />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-lilac-300 border-t-lilac-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-plum-900">Loading blog posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn btn-primary"
          >
            Retry
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-700 mb-4">No blog posts found</p>
          <p className="text-gray-600 mb-6">Create your first blog post to get started!</p>
          <Link to="/admin/blog/new" className="btn btn-primary">
            Create First Post
          </Link>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar size={16} className="mr-2" />
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
              </div>
              <h2 className="text-xl font-semibold text-plum-900 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4 line-clamp-2">
                {post.content.substring(0, 150)}
                {post.content.length > 150 ? '...' : ''}
              </p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                  className="btn bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center"
                >
                  <Edit size={18} className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="btn bg-red-50 text-red-600 hover:bg-red-100 flex items-center"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </button>
                <Link
                  to={`/blog/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default BlogManager;