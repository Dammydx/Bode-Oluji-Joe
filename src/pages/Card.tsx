import React from "react";
import { Phone, Mail, Globe, Instagram, Facebook } from "lucide-react";

import heroImg2 from "../assets/gallery/Doluboss.png";

const CONTACT = {
  fullName: "Bode Oluji Joe",
  role: "Chairman | Entrepreneur | Strategic Investor",
  tagline:
    "Chief Executive Officer at Dolu Properties Focused on growth, innovation, and long-term value creation. Explore my official platforms below.",
  phone: "2348012345678",
  email: "mailto:mail@mail.com",
  whatsapp: "2348012345678",
  website: "https://flow-desk-purple.vercel.app/",

  instagram: "https://www.instagram.com/davidoluji/",
  facebook: "https://www.facebook.com/bodejoe.oluji/",
};

const CardPage: React.FC = () => {
  const callLink = `tel:+${CONTACT.phone}`;
  const mailLink = `mailto:${CONTACT.email}`;
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hello ${CONTACT.fullName}, I got your contact from your card.`
  )}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="w-full max-w-xl">

        <div
          className="rounded-3xl bg-white border border-yellow-200/70 overflow-hidden"
          style={{
            boxShadow:
              "0 30px 70px rgba(0,0,0,0.12), 0 18px 45px rgba(234,179,8,0.20)",
          }}
        >
          {/* Top Yellow Strip */}
          <div className="h-4 bg-yellow-400" />

          {/* Card Content */}
          <div className="px-10 pt-10 pb-12 text-center">

            {/* Avatar INSIDE card */}
            <div className="flex justify-center mb-6">
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                <img
                  src={heroImg2}
                  alt={CONTACT.fullName}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Info */}
            <h1 className="text-3xl font-bold text-black">
              {CONTACT.fullName}
            </h1>

            <p className="text-base font-semibold text-gray-700 mt-2">
              {CONTACT.role}
            </p>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-md mx-auto">
              {CONTACT.tagline}
            </p>

            {/* Primary Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <a
                href={callLink}
                className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 transition"
              >
                <Phone size={18} /> Call
              </a>

              <a
                href={waLink}
                className="flex items-center justify-center gap-2 rounded-xl bg-black hover:bg-gray-900 text-white font-semibold py-3 transition"
              >
                <Phone size={18} /> WhatsApp
              </a>

              <a
                href={mailLink}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 hover:border-yellow-400 text-black font-semibold py-3 transition"
              >
                <Mail size={18} /> Email
              </a>
            </div>

            {/* Website */}
            <div className="mt-4">
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 hover:border-yellow-400 text-black font-semibold py-3 transition"
              >
                <Globe size={18} /> Visit Website
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center gap-6 mt-8">
            {CONTACT.instagram && (
                <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-pink-200 bg-white hover:shadow-md hover:scale-105 transition"
                >
                <Instagram
                    size={22}
                    className="text-pink-600"
                />
                </a>
            )}

            {CONTACT.facebook && (
                <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-blue-200 bg-white hover:shadow-md hover:scale-105 transition"
                >
                <Facebook
                    size={22}
                    className="text-blue-600"
                />
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Powered by Dolu Properties • Digital Card
        </p>
      </div>
    </div>
  );
};

export default CardPage;