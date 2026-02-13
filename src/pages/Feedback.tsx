import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, Star, CheckCircle2, XCircle, X } from "lucide-react";

const Feedback: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(5);

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [popupMsg, setPopupMsg] = useState<string>("");

  const inputClass =
    "w-full rounded-lg border px-4 py-2 bg-white text-black border-black " +
    "focus:outline-none focus:ring-2 focus:ring-yellow-400";

  const openPopup = (type: "success" | "error", message: string) => {
    setPopupType(type);
    setPopupMsg(message);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // honeypot
    const honeypot = (
      formRef.current?.elements.namedItem("company_site") as HTMLInputElement | null
    )?.value;
    if (honeypot) return;

    if (!formRef.current) return;

    setLoading(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_FEEDBACK_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      formRef.current.reset();
      setRating(5);

      openPopup(
        "success",
        "Thank you! Your feedback has been submitted successfully."
      );
    } catch (err) {
      openPopup(
        "error",
        "Failed to submit feedback. Please check your network and try again."
      );
      console.error("Feedback send error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-20 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-black">Feedback</h1>
            <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
              If you attended an engagement, your feedback helps improve future sessions and impact.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="border rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-black mb-2">Leave Your Feedback</h2>
            <p className="text-gray-600 mb-6">
              Please share honest feedback. Short and clear is perfect.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="company_site" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* 🔥 Identify this form for universal template */}
              <input type="hidden" name="form_type" value="Feedback" />

              <input name="full_name" placeholder="Full Name (optional)" className={inputClass} />
              <input name="email" type="email" placeholder="Email (optional)" className={inputClass} />

              <input name="event_name" placeholder="Event Name / Church / Organization" className={inputClass} />
              <input name="event_date" type="date" className={inputClass} />

              {/* Rating */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-2">Rating</label>
                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setRating(n)}
                      className={`p-2 rounded-lg border transition-colors ${
                        rating >= n ? "bg-yellow-400 border-yellow-400" : "bg-white border-black"
                      }`}
                      aria-label={`Rate ${n}`}
                    >
                      <Star size={18} className="text-black" />
                    </button>
                  ))}
                  <input type="hidden" name="rating" value={rating} />
                  <span className="text-sm text-gray-700 ml-1">{rating}/5</span>
                </div>
              </div>

              <textarea
                name="feedback"
                placeholder="Your feedback (what stood out, what can improve, impact, etc.)"
                required
                className={`${inputClass} md:col-span-2 h-28`}
              />

              <select name="recommend" className={`${inputClass} md:col-span-2`}>
                <option value="Yes">Would you recommend? — Yes</option>
                <option value="No">Would you recommend? — No</option>
              </select>

              <div className="md:col-span-2 flex items-center justify-end">
                <button
                  disabled={loading}
                  className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
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
                  {popupType === "success" ? (
                    <CheckCircle2 className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                  <h3 className="text-lg font-bold text-black">
                    {popupType === "success" ? "Submitted" : "Error"}
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
    </div>
  );
};

export default Feedback;
