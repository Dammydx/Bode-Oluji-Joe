import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../lib/supabase';
import { Calendar, ArrowRight } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Create preview text (first 150 characters)
  const createPreview = (content: string) => {
    if (content.length <= 150) return content;
    return content.substring(0, 150).trim() + '...';
  };

  return (
    <div className="pt-20 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-lilac-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-plum-900">Blog</h1>
            <p className="mt-4 text-xl text-gray-700">
              Insights, tips, and resources for productivity and virtual assistance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-lilac-300 border-t-lilac-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-plum-900">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
            <p className="mt-4">Please try again later or contact the administrator.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-700">No blog posts found.</p>
            <p className="mt-2 text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card hover:shadow-lg"
              >
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2" />
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>
                <h2 className="text-2xl font-bold text-plum-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {createPreview(post.content)}
                </p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="flex items-center text-lilac-500 hover:text-lilac-600 font-medium"
                >
                  Read More 
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;