import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const skills = [
    "Executive Support",
    "Operations Management",
    "Strategic Planning",
    "Data & Documentation",
    "Client Relations",
    "Workflow Optimization",
    "Problem Solving",
    "Leadership Support"
  ];

  return (
    <div className="pt-20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">About Me</h1>
          <p className="mt-4 text-xl text-gray-700">
            Leadership-driven support built for growth-focused professionals
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Profile */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center mb-12"
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center overflow-hidden shadow-lg">
              {/* Replace src with your image */}
              <img
                src="/images/hero.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Leadership Background</h2>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                I am a results-driven Virtual Assistant and Operations Support Specialist with a leadership mindset.
                I partner with founders, executives, and business owners to build structured systems that support
                growth, clarity, and long-term efficiency.
              </p>
              <p>
                My approach goes beyond task execution — I focus on understanding business objectives, identifying
                operational gaps, and implementing processes that save time and reduce friction.
              </p>
              <p>
                As a strategic support partner, I value discretion, consistency, and clear communication.
                My mission is to help leaders operate at their highest level by removing distractions and optimizing
                day-to-day operations.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-black mb-6">Core Strengths</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-yellow-100 text-black rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CV */}
          <motion.div variants={itemVariants}>
            <a
              href="https://drive.google.com/file/d/PLACEHOLDER_LINK/view"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center"
            >
              <Download size={18} className="mr-2" />
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Why Me */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-10 text-center">
            Why Work With Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "Detail-Oriented Execution",
              "Clear Executive Communication",
              "Consistency & Reliability",
              "Proactive Problem Solving"
            ].map((title, index) => (
              <div key={index} className="card">
                <div className="flex items-start">
                  <div className="text-yellow-500 mr-4 pt-1">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-600">
                      A leadership-focused approach that supports decision-making and business growth.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Let’s Work Together</h2>
          <p className="text-lg text-gray-700 mb-8">
            If you’re ready to scale with structure and clarity, let’s start the conversation.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
