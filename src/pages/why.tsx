import princessImg from "../assets/princess.jpg";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Shield, Target, Crown, Lightbulb, Smile, Users, Zap, Brain, Bell, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const skills = [
  { name: 'Excellent Communication', icon: <MessageSquare size={20} /> },
  { name: 'Organizational Skills', icon: <Star size={20} /> },
  { name: 'Reliability', icon: <Shield size={20} /> },
  { name: 'Attention to Details', icon: <Target size={20} /> },
  { name: 'Leadership Skills', icon: <Crown size={20} /> },
  { name: 'Problem Solving Skills', icon: <Lightbulb size={20} /> },
  { name: 'Flexibility', icon: <Smile size={20} /> },
  { name: 'Teamwork', icon: <Users size={20} /> },
  { name: 'Proactive', icon: <Zap size={20} /> },
  { name: 'Fast Learner', icon: <Brain size={20} /> },
  { name: 'Responsiveness', icon: <Bell size={20} /> },
];

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">About Me</h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Empowering businesses with personalized virtual support to boost
productivity, save time, and streamline workflows – using 29+ tools to help you focus
on growth and smart decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-15">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-full border-4 border-gold/20 shadow-lg mx-auto max-w-xs">
                  <img
  src={princessImg}
  alt="Princess"
  className="w-full h-full object-cover"
/>

                </div>
                <div className="absolute -bottom-4 -right-4 space-y-2">
                  <div className="bg-gold text-white text-sm font-medium py-2 px-4 rounded-full shadow-md transform rotate-2">
                    Executive Virtual Assistant
                  </div>
                  {/* <div className="bg-gold text-white text-sm font-medium py-2 px-4 rounded-full shadow-md transform -rotate-2">
                    Social Media Manager
                  </div>
                  <div className="bg-gold text-white text-sm font-medium py-2 px-4 rounded-full shadow-md transform rotate-1">
                    Customer Service Representative
                  </div> */}
                </div>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gold mb-4">I am Princess Lewechi (VAYOUCANTRUST) </h2>
              <p className="text-text-secondary mb-4">
              My journey as an Executive Virtual Assistant began in 2024, when I made the leap
into remote work and secured long-term clients across the globe. I specialize in
streamlining the day-to-day operations of busy professionals - CEOs, entrepreneurs,
real estate experts, coaches, and business owners -helping them reclaim 25 to 40
hours each week, depending on their goals and workloads. With a proactive mindset
and high-level remote support, I ensure their operations run seamlessly.
              </p>
              <p className="text-text-secondary mb-4">
              I was inspired to take this path after recognizing how many professionals struggle
with overwhelming administrative tasks and poor time management. I decided to
leverage my organizational and communication skills to create solutions that free up
their most valuable asset -time.
              </p>
              <p className="text-text-secondary mb-6">
              My mission is simple: to help my clients focus on what truly matters, scale their
businesses, and achieve their goals without burnout.
As an Executive Administrative VA, I handle everything behind the scenes -from
executive and administrative support to overseeing key operational tasks. Whether it&#39;s
inbox and calendar management, document prep, travel coordination, or task tracking,
I’m the reliable partner professionals count on to keep things running smoothly.
              </p>

              <div className="flex flex-wrap gap-3 mb-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-warm-beige/30 text-text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <span className="mr-1 text-gold">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* <a
                href="https://drive.google.com/file/d/15kn90R5mYX8zaJMvEZhMYGUilsr7jWkc/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold hover:text-gold-dark transition-colors"
              >
                <Download size={18} className="mr-2" />
                Download Resume/CV
              </a> */}
            </motion.div>
          </div>

          <motion.div
            className="bg-warm-beige/20 rounded-lg p-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-4">My Approach</h2>
            <p className="text-text-secondary mb-4">
              I believe in creating personalized solutions that address your specific needs. My approach is built on three core principles:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-medium text-gold mb-3">Understanding</h3>
                <p className="text-text-secondary">
                  I take the time to truly understand your business, goals, and challenges before suggesting any solutions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-medium text-gold mb-3">Efficiency</h3>
                <p className="text-text-secondary">
                  I focus on creating systems and processes that maximize efficiency and minimize wasted time and resources.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-medium text-gold mb-3">Reliability</h3>
                <p className="text-text-secondary">
                  You can count on me to deliver high-quality work on time, every time, with clear communication throughout.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Ready to Work Together?</h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              If you're looking for a dedicated Virtual Assistant to help streamline your business operations and free up your valuable time, I'd love to hear from you.
            </p>
            <Link to="/contact">
              <Button size="lg">Get in Touch</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;