import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import supabase from '../lib/supabase';
import { Instagram, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('messages').insert([
        { ...formData, read: false },
      ]);

      if (error) throw error;
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-20 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-black">
              Contact Me
            </h1>
            <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
              Reach out to discuss leadership, business growth, real estate opportunities, or wealth creation strategies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-black mb-6">
              Get In Touch
            </h2>
            <p className="text-gray-700 mb-8">
              Connect with Bode Oluji Joe to discuss leadership and business growth.
            </p>

            <a
              href="https://www.instagram.com/davidoluji/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-black hover:text-yellow-500 transition-colors"
            >
              <Instagram size={20} className="mr-3" />
              Instagram
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              {['name', 'email'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-black mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2 bg-white text-black 
                      focus:outline-none focus:ring-2 focus:ring-yellow-400
                      ${errors[field] ? 'border-red-500' : 'border-black'}
                    `}
                  />
                  {errors[field] && (
                    <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-2 bg-white text-black 
                    focus:outline-none focus:ring-2 focus:ring-yellow-400
                    ${errors.message ? 'border-red-500' : 'border-black'}
                  `}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center
                  bg-yellow-400 hover:bg-yellow-500
                  text-black px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
