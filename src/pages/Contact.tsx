import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Instagram, Send, Facebook, CheckCircle2, XCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactField = 'name' | 'email';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  // ✅ Popup State (replaces toast)
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupMsg, setPopupMsg] = useState('');

  const openPopup = (type: 'success' | 'error', message: string) => {
    setPopupType(type);
    setPopupMsg(message);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value } as ContactFormData));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactFormData];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

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

    const honeypot = (formRef.current?.elements.namedItem('company_site') as HTMLInputElement | null)?.value;
    if (honeypot) return;
    if (!formRef.current) return;

    setLoading(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      openPopup('success', 'Message sent successfully. Thank you — you will be responded to shortly.');

      setFormData({ name: '', email: '', message: '' });
      formRef.current.reset();
    } catch (err) {
      console.error('Contact send error:', err);
      openPopup('error', 'Failed to send message. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields: ContactField[] = ['name', 'email'];

  return (
    <div className="pt-20 pb-20 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-black">Contact Me</h1>
            <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
              Reach out to discuss leadership, business growth, real estate opportunities, or wealth creation strategies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* 1. Socials / Get In Touch (Mobile: 1st, Desktop: Sidebar Top) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="order-1"
          >
            <h2 className="text-2xl font-bold text-black mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-6 font-medium">
              Connect with Bode Oluji Joe to discuss leadership and business growth.
            </p>

            <div className="flex flex-col space-y-4 mb-4">
              <a
                href="https://www.instagram.com/davidoluji/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-black hover:text-yellow-500 transition-colors"
              >
                <div className="w-8 flex justify-center">
                  <Instagram size={20} className="text-yellow-500" />
                </div>
                <span className="ml-2 font-medium">Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/bodejoe.oluji/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-black hover:text-yellow-500 transition-colors"
              >
                <div className="w-8 flex justify-center">
                  <Facebook size={20} className="text-yellow-500" />
                </div>
                <span className="ml-2 font-medium">Facebook</span>
              </a>
            </div>
          </motion.div>

          {/* 2. Form Section (Mobile: 2nd, Desktop: Main Column Top) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="order-2 md:col-span-2 md:row-span-3"
          >
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input name="company_site" className="hidden" tabIndex={-1} autoComplete="off" />

                {/* System identifier */}
                <input type="hidden" name="form_type" value="Contact Message" />

                {fields.map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-bold text-black mb-1.5 capitalize">{field}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field}`}
                      className={`w-full rounded-xl border px-4 py-3 bg-white text-black 
                        focus:outline-none focus:ring-2 focus:ring-yellow-400
                        ${errors[field] ? 'border-red-500 shadow-sm' : 'border-gray-200 shadow-soft'}
                      `}
                    />
                    {errors[field] && <p className="text-xs text-red-500 mt-1 font-medium">{errors[field]}</p>}
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me more about your project or inquiry..."
                    className={`w-full rounded-xl border px-4 py-3 bg-white text-black 
                      focus:outline-none focus:ring-2 focus:ring-yellow-400
                      ${errors.message ? 'border-red-500 shadow-sm' : 'border-gray-200 shadow-soft'}
                    `}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1 font-medium">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center
                    bg-yellow-400 hover:bg-yellow-500
                    text-black px-8 py-4 rounded-xl font-bold transition-all transform active:scale-95 shadow-md"
                >
                  {loading ? (
                    <span className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* 3. Feedback Section (Mobile: 3rd, Desktop: Sidebar Middle) */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="order-3 border-t border-gray-100 pt-8"
          >
            <h3 className="text-lg font-bold text-black mb-2">Share Your Experience</h3>
            <p className="text-gray-600 mb-6 text-sm">
              If you’ve heard Bode Oluji Joe speak or attended his events, your feedback helps drive more impact.
            </p>

            <Link
              to="/feedback"
              className="inline-flex items-center justify-center w-full
                bg-white border-2 border-yellow-400 hover:bg-yellow-400
                text-black px-5 py-3 rounded-xl font-bold transition-all shadow-sm"
            >
              Leave Feedback
            </Link>
          </motion.div>

          {/* 4. Digital Card Section (Mobile: 4th/Last, Desktop: Sidebar Bottom) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="order-4 border-t border-dashed border-gray-200 pt-8"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Quick Connect</p>
            <Link
              to="/card"
              className="inline-flex items-center justify-center w-full
                bg-black hover:bg-gray-900
                text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md group"
            >
              <CheckCircle2 size={18} className="mr-2 text-yellow-400 transition-transform group-hover:scale-110" />
              View My Digital Card
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ✅ POPUP MODAL */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <div className="flex items-center gap-2">
                  {popupType === 'success' ? (
                    <CheckCircle2 className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                  <h3 className="text-lg font-bold text-black">{popupType === 'success' ? 'Message Sent' : 'Error'}</h3>
                </div>

                <button onClick={closePopup} className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <div className="px-5 py-5">
                <p className="text-gray-700">{popupMsg}</p>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={closePopup}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Okay
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
