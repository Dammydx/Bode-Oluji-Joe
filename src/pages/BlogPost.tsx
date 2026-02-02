import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../lib/supabase';
import { ArrowLeft, Calendar } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog post
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('blogPosts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error('Post not found');
        }

        setPost(data);
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

    fetchPost();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format content with paragraphs
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() ? <p key={index} className="mb-4">{paragraph}</p> : <br key={index} />
    ));
  };

  if (loading) {
    return (
      <div className="pt-28 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 border-4 border-lilac-300 border-t-lilac-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-plum-900">Loading blog post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-28 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-plum-900 mb-4">Post Not Found</h1>
        <p className="text-gray-700 mb-6">
          {error || 'The blog post you are looking for doesn\'t exist.'}
        </p>
        <Link to="/blog" className="btn btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Back Button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-lilac-500 hover:text-lilac-600 mb-6"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-plum-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-500">
              <Calendar size={18} className="mr-2" />
              <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none text-gray-700">
            {formatContent(post.content)}
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link to="/blog" className="btn btn-outline">
              Back to All Posts
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;