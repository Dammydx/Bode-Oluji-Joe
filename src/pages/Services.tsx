import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Services: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  const services = [
    {
      title: "Email & Calendar Management",
      description: "Strategic inbox organization and scheduling systems that keep communication efficient and priorities clear."
    },
    {
      title: "Scheduling & Travel Coordination",
      description: "Seamless coordination of meetings, travel, and logistics with attention to detail and efficiency."
    },
    {
      title: "Reports & Presentation Creation",
      description: "Executive-ready reports and presentations designed to communicate insights clearly and professionally."
    },
    {
      title: "File Management & Organization",
      description: "Structured digital systems that improve accessibility, security, and workflow efficiency."
    },
    {
      title: "Meeting Transcriptions & Summaries",
      description: "Accurate documentation and concise summaries to support informed decision-making."
    },
    {
      title: "Client Follow-ups & Communication",
      description: "Professional, timely communication that strengthens relationships and builds trust."
    },
    {
      title: "Task Tracking & Deadline Reminders",
      description: "Reliable task monitoring systems that ensure consistency and accountability."
    },
    {
      title: "Social Media Management",
      description: "Content scheduling and engagement oversight to maintain a polished online presence."
    }
  ];

  return (
    <div className="pt-20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">My Services</h1>
          <p className="mt-4 text-xl text-gray-700">
            Professional support services designed to improve focus, structure, and productivity.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card border-l-4 border-yellow-400 hover:border-yellow-500"
            >
              <div className="flex items-start">
                <div className="text-yellow-500 mr-4 pt-1">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let’s build systems that free up your time and allow you to focus on growth.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn btn-primary">
              Contact Me
            </Link>
            <Link
              to="/about"
              className="btn border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
