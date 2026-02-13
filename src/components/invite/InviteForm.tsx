import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, XCircle, X } from "lucide-react";

type Props = {
  onSuccess?: () => void; // for modal close if you want
};

const InviteForm: React.FC<Props> = ({ onSuccess }) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [popupMsg, setPopupMsg] = useState<string>("");

  const inputClass =
    "w-full min-w-0 rounded-lg border px-4 py-2 bg-white text-black border-black " +
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
      const templateId = import.meta.env.VITE_EMAILJS_INVITE_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      formRef.current.reset();

      openPopup("success", "Request sent successfully. You will be contacted shortly.");

      // Optional: close modal after success (if you're using it inside a modal)
      onSuccess?.();
    } catch (err) {
      console.error("Invite send error:", err);
      openPopup("error", "Failed to send request. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Honeypot */}
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

        <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mt-1">
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
    </>
  );
};

export default InviteForm;
