import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import supabase from '../../../lib/supabase';
import { ChevronLeft, Save } from 'lucide-react';

const BlogForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch post data if editing
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

        setFormData({
          title: data.title,
          content: data.content,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Failed to fetch post');
        }
        navigate('/admin/blog');
      } finally {
        setFetching(false);
      }
    };

    if (isEditing) {
      fetchPost();
    } else {
      setFetching(false);
    }
  }, [id, isEditing, navigate]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEditing) {
        // Update existing post
        const { error } = await supabase
          .from('blogPosts')
          .update({
            title: formData.title,
            content: formData.content,
          })
          .eq('id', id);

        if (error) {
          throw new Error(error.message);
        }

        toast.success('Post updated successfully');
      } else {
        // Create new post
        const { error } = await supabase
          .from('blogPosts')
          .insert([
            {
              title: formData.title,
              content: formData.content,
            },
          ]);

        if (error) {
          throw new Error(error.message);
        }

        toast.success('Post created successfully');
      }
      
      // Navigate back to blog manager
      navigate('/admin/blog');
    } catch (error) {
      let message = 'Failed to save post';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching post data
  if (fetching) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-lilac-300 border-t-lilac-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-plum-900">Loading post data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link to="/admin/blog" className="mr-4 text-plum-900 hover:text-lilac-500">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-plum-900">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`textarea min-h-[300px] ${errors.content ? 'border-red-500' : ''}`}
              placeholder="Write your post content here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              to="/admin/blog"
              className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex items-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  {isEditing ? 'Update Post' : 'Create Post'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default BlogForm;