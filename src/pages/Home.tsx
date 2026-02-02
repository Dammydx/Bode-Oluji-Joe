import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, FileText, Users } from 'lucide-react';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-yellow-100 via-white to-yellow-50 animate-gradientMove" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Section */}
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight"
              >
                Bode Oluji Joe
              </motion.h1>

              {/* Short tagline/roles */}
                <motion.p
                  variants={itemVariants}
                  className="mt-2 text-xl sm:text-2xl text-gray-700 font-medium"
                >
                CEO | Business Leader | Speaker
              </motion.p>

                {/* Full descriptive line */}
                <motion.p
                  variants={itemVariants}
                  className="mt-2 text-lg sm:text-xl text-gray-600"
                >
                  Chief Executive Officer at Dolu Properties — Real Estate, Leadership & Wealth Creation
                </motion.p>
              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap gap-4"
              >
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
            </div>

            {/* Image Section */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center order-first lg:order-last"
            >
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Image */}
                <img
                  src="/images/bode.jpg" // replace with real portrait
                  alt="Bode Oluji Joe"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                />

                {/* Tags */}
                <span className="absolute top-4 left-4 bg-black text-white text-sm px-3 py-1 rounded-full shadow">
                  CEO
                </span>
                <span className="absolute top-16 right-4 bg-yellow-400 text-black text-sm px-3 py-1 rounded-full shadow">
                  Speaker
                </span>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-sm px-4 py-1 rounded-full shadow">
                  Real Estate Expert
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black">
              My Core Pillars
            </h2>
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let’s discuss your growth, leadership, and investment opportunities.
            </p>
            <Link to="/contact" className="btn bg-yellow-400 hover:bg-yellow-500 text-black">
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
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

export default Home;
