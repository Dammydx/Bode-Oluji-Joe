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
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-black mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-6">
              Connect with Bode Oluji Joe to discuss leadership and business growth.
            </p>

            <a
              href="https://www.instagram.com/davidoluji/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-black hover:text-yellow-500 transition-colors mb-6"
            >
              <Instagram size={20} className="mr-3" />
              Instagram
            </a>

            <a
              href="https://www.facebook.com/bodejoe.oluji/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-black hover:text-yellow-500 transition-colors mb-6"
            >
              <Facebook size={20} className="mr-3" />
              Facebook
            </a>

            {/* Feedback Button */}
            <div className="border-t pt-6">
              <p className="text-gray-700 mb-4 font-medium">Attended an engagement?</p>

              <Link
                to="/feedback"
                className="inline-flex items-center justify-center
                  bg-yellow-400 hover:bg-yellow-500
                  text-black px-5 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Leave Feedback
              </Link>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input name="company_site" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Optional: identify form */}
              <input type="hidden" name="form_type" value="Contact Message" />

              {fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-black mb-1 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2 bg-white text-black 
                      focus:outline-none focus:ring-2 focus:ring-yellow-400
                      ${errors[field] ? 'border-red-500' : 'border-black'}
                    `}
                  />
                  {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-black mb-1">Message</label>
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
                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
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
