import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  FileText,
  Users,
  X,
  Send,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

import heroImg2 from '/images/Doluboss.png';

const Home: React.FC = () => {
  const [inviteOpen, setInviteOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-yellow-100 via-white to-yellow-50 animate-gradientMove" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight"
              >
                Bode Oluji Joe
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-2 text-lg sm:text-xl text-gray-700 font-medium"
              >
                CEO | Business Leader | Speaker
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="mt-2 text-base sm:text-lg text-gray-600"
              >
                Chief Executive Officer at Dolu Properties — Real Estate, Leadership & Wealth Creation
              </motion.p>

              <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-4">
                <Link to="/services" className="btn btn-primary">
                  View Services
                </Link>
                <Link to="/about" className="btn btn-outline">
                  About Me
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Contact Me
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-6">
                <button
                  onClick={() => setInviteOpen(true)}
                  className="btn bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  Request an Invite
                </button>
              </motion.div>
            </div>

            {/* Image Section */}
            <motion.div variants={itemVariants} className="flex justify-center order-first lg:order-last">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="aspect-square overflow-hidden rounded-full shadow-lg">
                  <img src={heroImg2} alt="Bode Oluji Joe" className="w-full h-full object-cover" />
                </div>

                <div className="absolute -bottom-4 -right-4 flex flex-col space-y-2">
                  <div className="bg-yellow-400 text-black text-xs sm:text-sm font-medium py-1 px-3 rounded-full shadow-md transform rotate-2">
                    CEO
                  </div>
                  <div className="bg-yellow-400 text-black text-xs sm:text-sm font-medium py-1 px-3 rounded-full shadow-md transform -rotate-2">
                    Business Leader
                  </div>
                  <div className="bg-yellow-400 text-black text-xs sm:text-sm font-medium py-1 px-3 rounded-full shadow-md transform rotate-1">
                    Speaker
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black">My Core Pillars</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              I provide guidance in business growth, leadership coaching, real estate investments, and wealth creation strategies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Calendar size={48} />}
              title="Purpose-Driven Leadership"
              description="Leading with clarity, integrity, and a commitment to meaningful impact."
            />
            <ServiceCard
              icon={<FileText size={48} />}
              title="Strategic Thinking & Innovation"
              description="Developing forward-thinking solutions that drive growth and relevance."
            />
            <ServiceCard
              icon={<CheckCircle size={48} />}
              title="Value & Wealth Building"
              description="Creating sustainable value while empowering long-term wealth creation."
            />
            <ServiceCard
              icon={<Users size={48} />}
              title="Spirituality & Purpose"
              description="Grounding leadership and success in faith, values, and inner alignment."
            />
          </div>

          <div className="mt-12 text-center">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Invite Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Invite Bode Oluji Joe</h2>
            <p className="mt-4 text-lg text-gray-600">
              For executive speaking engagements, leadership sessions, and high-level church invitations. Share the full details so we can plan properly and deliver with excellence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button onClick={() => setInviteOpen(true)} className="btn bg-yellow-400 hover:bg-yellow-500 text-black">
                Request an Invite
              </button>
              <Link to="/contact" className="btn btn-outline">
                Contact Page
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <GalleryGrid />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let’s discuss your growth, leadership, and investment opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn bg-yellow-400 hover:bg-yellow-500 text-black">
                Get Started Today
              </Link>

              {/* ✅ Button instead of text link */}
              <Link to="/feedback" className="btn btn-outline border-yellow-300 text-yellow-300 hover:text-black hover:bg-yellow-300">
                Leave Feedback
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Invite Modal */}
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </>
  );
};

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card hover:border-2 hover:border-yellow-300"
    >
      <div className="text-yellow-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// --------- GALLERY GRID WITH RANDOM ANIMATION & DOTS ---------
const galleryImages = Object.values(
  import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', {
    eager: true,
    as: 'url',
  })
);

const GalleryGrid: React.FC = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const sets: string[][] = [];

  for (let i = 0; i < galleryImages.length; i += 3) {
    sets.push(galleryImages.slice(i, i + 3));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % sets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sets.length]);

  if (galleryImages.length === 0) {
    return <p className="text-center text-gray-500">No images found in gallery folder.</p>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Gallery</h2>
          <p className="mt-3 text-lg text-gray-600">Moments, milestones, and impact.</p>
        </div>

        <motion.div
          key={currentSet}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {sets[currentSet].map((img, idx) => (
            <motion.div
              key={idx}
              className="overflow-hidden rounded-xl shadow-md cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              onClick={() => (window.location.href = '/gallery')}
            >
              <img src={img} alt="Gallery" className="w-full h-[260px] object-cover object-center" />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center gap-3 mt-6">
          {sets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSet(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSet === idx ? 'bg-yellow-400 scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/gallery" className="btn btn-primary px-6 py-3">
            Visit My Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

/** Invite Modal */
const InviteModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);

  // ✅ Popup state (replaces plain msg text)
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupMsg, setPopupMsg] = useState('');

  const inputClass =
    'w-full min-w-0 rounded-lg border px-4 py-2 bg-white text-black border-black ' +
    'focus:outline-none focus:ring-2 focus:ring-yellow-400';

  const openPopup = (type: 'success' | 'error', message: string) => {
    setPopupType(type);
    setPopupMsg(message);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const honeypot = (formRef.current?.elements.namedItem('company_site') as HTMLInputElement | null)?.value;
    if (honeypot) return;
    if (!formRef.current) return;

    setLoading(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_INVITE_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      formRef.current.reset();
      openPopup('success', 'Request sent successfully. You will be contacted shortly.');
    } catch (err) {
      console.error('Invite modal send error:', err);
      openPopup('error', 'Failed to send request. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md sm:max-w-lg lg:max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-4 sm:px-6 py-4 border-b">
              <div className="pr-6">
                <h3 className="text-lg sm:text-xl font-bold text-black">Request an Invite</h3>
                <p className="text-sm text-gray-600 mt-1">Executive engagements and invitations.</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <X />
              </button>
            </div>

            {/* Body (scrollable on mobile) */}
            <div className="max-h-[85vh] overflow-y-auto">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
              >
                <input name="company_site" className="hidden" tabIndex={-1} autoComplete="off" />

                {/* 🔥 Identify this form */}
                <input type="hidden" name="form_type" value="Invite Request" />

                <input name="full_name" placeholder="Full Name" required className={inputClass} />
                <input name="email" type="email" placeholder="Email" required className={inputClass} />

                <input name="phone" placeholder="Phone / WhatsApp" required className={inputClass} />
                <input name="org" placeholder="Organization / Church / Institution" required className={inputClass} />

                <select name="event_type" required className={inputClass}>
                  <option value="">Select Event Type</option>
                  <option>Leadership Summit</option>
                  <option>Business Conference</option>
                  <option>Executive Training</option>
                  <option>Church Conference</option>
                  <option>Special Service</option>
                  <option>Private Executive Session</option>
                </select>

                <input name="topic" placeholder="Topic / Theme" required className={inputClass} />

                <input name="event_date" type="date" required className={inputClass} />
                <input name="event_time" type="time" required className={inputClass} />

                <input
                  name="location"
                  placeholder="Location (Venue, City/State)"
                  required
                  className={`${inputClass} md:col-span-2`}
                />

                <input name="duration" placeholder="Duration Needed (e.g., 45 mins)" required className={inputClass} />
                <input name="budget" placeholder="Honorarium / Budget Range (optional)" className={inputClass} />

                <textarea
                  name="event_goal"
                  placeholder="What do you want to achieve at the end of the engagement?"
                  required
                  className={`${inputClass} md:col-span-2 h-24`}
                />

                <textarea
                  name="welfare"
                  placeholder="Welfare / Logistics (optional) — transport, accommodation, etc."
                  className={`${inputClass} md:col-span-2 h-20`}
                />

                <textarea
                  name="notes"
                  placeholder="Additional notes (optional)"
                  className={`${inputClass} md:col-span-2 h-20`}
                />

                <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button type="button" onClick={onClose} className="btn btn-outline w-full sm:w-auto">
                    Cancel
                  </button>

                  <button
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>

                <p className="md:col-span-2 text-xs text-gray-500">
                  By submitting, you confirm the details are accurate for scheduling and preparation.
                </p>
              </form>
            </div>

            {/* ✅ Popup Modal (Success/Error) */}
            <AnimatePresence>
              {popupOpen && (
                <motion.div
                  className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-4"
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
                        <h3 className="text-lg font-bold text-black">
                          {popupType === 'success' ? 'Submitted' : 'Error'}
                        </h3>
                      </div>

                      <button
                        onClick={closePopup}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        aria-label="Close"
                      >
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home;
