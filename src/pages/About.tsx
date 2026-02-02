import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';

import { CheckCircle, } from 'lucide-react';

import heroImg from '/images/Dolu boss 2.png'; // Replace with actual Bode image

const skills = [
  "Executive Leadership",
  "Business Strategy",
  "Real Estate Expertise",
  "Mentorship & Coaching",
  "Wealth Creation",
  "Public Speaking",
  "Operational Excellence",
  "Visionary Planning"
];

const services = [
  {
    title: "Speaking Engagements",
    description: "Insightful and impactful talks on leadership, business growth, wealth creation, and purpose-driven success."
  },
  {
    title: "Leadership & Strategy Advisory",
    description: "Strategic guidance for business owners, executives, and organizations seeking clarity and long-term growth."
  },
  {
    title: "Wealth & Business Mentorship",
    description: "Personal mentorship focused on value creation, disciplined thinking, and sustainable wealth."
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">About Bode Oluji Joe</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Business leader, entrepreneur, and speaker with a strong passion for leadership, innovation, and wealth creation. As the CEO of Dolu Properties, he provides strategic direction and oversight, guiding the company’s vision and long-term growth.
          </p>
        </motion.div>

        {/* Profile & Bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center md:justify-start"
          >
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-full border-4 border-yellow-400 shadow-lg mx-auto max-w-lg">
                <img
                  src={heroImg}
                  alt="Bode Oluji Joe"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Taglines */}
              <div className="absolute -bottom-4 -right-4 flex flex-col space-y-2">
                <div className="bg-yellow-400 text-black text-sm font-medium py-2 px-4 rounded-full shadow-md transform rotate-2">
                  CEO
                </div>
                <div className="bg-yellow-400 text-black text-sm font-medium py-2 px-4 rounded-full shadow-md transform -rotate-2">
                  Business Leader
                </div>
                <div className="bg-yellow-400 text-black text-sm font-medium py-2 px-4 rounded-full shadow-md transform rotate-1">
                  Speaker
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Leadership & Vision</h2>
            <p className="text-gray-700 mb-4">
              With years of experience in business and real estate, Bode is known for his disciplined approach to strategy, value creation, and decision-making. His leadership philosophy is rooted in integrity, clarity of purpose, and a commitment to building systems that endure.
            </p>
            <p className="text-gray-700 mb-4">
              Beyond business, he is deeply driven by faith and personal values, believing that true success is achieved when professional excellence aligns with spiritual grounding and purposeful living. Through speaking engagements and mentorship, he shares practical insights on leadership, business growth, and wealth building.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-3 mb-6">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-yellow-100 text-black px-3 py-1 rounded-full text-sm font-medium"
                >
                  <CheckCircle size={16} className="mr-1 text-yellow-500" />
                  {skill}
                </span>
              ))}
            </div>

            {/* Gallery / Contact */}
            <div className="flex flex-wrap gap-4">
              <Link to="/gallery"
                className="btn btn-primary inline-flex items-center"
              >
                <Image size={18} className="mr-2" />
                My Gallery
              </Link>

              <Link to="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>

          </motion.div>
        </div>

        {/* Services Section */}
        <motion.div
          className="bg-yellow-50 rounded-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-black mb-6 text-center">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-medium text-yellow-500 mb-2">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-black mb-4">Ready to Work Together?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you're looking for a strategic partner and leadership-driven support to grow your business and achieve your goals, get in touch today.
          </p>
          <Link to="/contact" className="btn btn-primary inline-block px-6 py-3 text-lg font-semibold rounded-lg">
  Contact Me
</Link>

        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
