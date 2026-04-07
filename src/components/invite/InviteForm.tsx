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
  const [eventType, setEventType] = useState("");

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

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Full Name</label>
          <input name="full_name" placeholder="John Doe" required className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Email Address</label>
          <input name="email" type="email" placeholder="john@example.com" required className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Phone / WhatsApp</label>
          <input name="phone" placeholder="+234..." required className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Organization / Institution</label>
          <input name="org" placeholder="Church / Company Name" required className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Event Type</label>
          <select
            name={eventType === "Other" ? "event_type_selection" : "event_type"}
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select Event Type</option>
            <option>Leadership Summit</option>
            <option>Business Conference</option>
            <option>Executive Training</option>
            <option>Church Conference</option>
            <option>Special Service</option>
            <option>Private Executive Session</option>
            <option value="Other">Other (Please specify)</option>
          </select>
        </div>

        {eventType === "Other" && (
          <div className="space-y-1">
            <label className="block text-sm font-bold text-black ml-1">Specify Event Type</label>
            <input
              name="event_type"
              placeholder="Type event type here..."
              required
              className={inputClass}
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Topic / Theme</label>
          <input name="topic" placeholder="The Future of Leadership" required className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Event Date</label>
          <input name="event_date" type="date" required className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Start Time</label>
          <input name="event_time" type="time" required className={inputClass} />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-bold text-black ml-1">Location / Venue</label>
          <input
            name="location"
            placeholder="Venue Name, City, State"
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Duration</label>
          <input name="duration" placeholder="e.g., 45 mins" required className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black ml-1">Budget / Honorarium</label>
          <input name="budget" placeholder="Budget Range (optional)" className={inputClass} />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-bold text-black ml-1">Expected Outcome / Goal</label>
          <textarea
            name="event_goal"
            placeholder="What do you want to achieve?"
            required
            className={`${inputClass} h-24`}
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-bold text-black ml-1">Welfare & Logistics</label>
          <textarea
            name="welfare"
            placeholder="Transport, accommodation, etc. (optional)"
            className={`${inputClass} h-20`}
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-bold text-black ml-1">Additional Notes</label>
          <textarea
            name="notes"
            placeholder="Any other details..."
            className={`${inputClass} h-20`}
          />
        </div>

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
