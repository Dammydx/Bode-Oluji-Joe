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
      title: "Business Strategy",
      description: "Practical guidance to optimize operations, scale businesses, and drive long-term growth."
    },
    {
      title: "Leadership Coaching",
      description: "Empowering leaders with actionable insights and proven frameworks for success."
    },
    {
      title: "Real Estate Advisory",
      description: "Expert advice on property investments, market trends, and wealth building through real estate."
    },
    {
      title: "Wealth & Investment Planning",
      description: "Strategies to grow, preserve, and manage wealth effectively for lasting impact."
    },
    {
      title: "Corporate Growth Solutions",
      description: "Helping companies structure operations, maximize efficiency, and achieve sustainable expansion."
    },
    {
      title: "Public Speaking & Mentoring",
      description: "Engaging sessions on leadership, business growth, and wealth creation."
    },
    {
      title: "Market & Opportunity Analysis",
      description: "Insights and analysis to make informed investment and business decisions."
    },
    {
      title: "Strategic Networking",
      description: "Connecting you with key industry players and opportunities for collaboration and growth."
    }
  ];

  return (
    <div className="pt-20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-black">My Services</h1>
          <p className="mt-4 text-xl text-gray-700">
            Professional guidance and strategies to enhance business growth, leadership, and wealth creation.
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
            Let’s discuss your growth, leadership, and investment opportunities.
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
