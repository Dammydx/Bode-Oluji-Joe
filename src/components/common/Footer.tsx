import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageSquare, Calendar, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo */}
          <div>
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold">
                Bode Oluji<span className="text-yellow-400"> Joe</span>
              </span>
            </Link>
            <p className="mt-3 text-gray-400 max-w-xs">
              Real Estate, Leadership & Wealth Creation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-400 border-b border-yellow-400/20 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
                { name: 'Request Invite', path: '/invite' },
                { name: 'Feedback', path: '/feedback' }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group"
                  >
                    <ChevronRight size={14} className="mr-2 text-yellow-500/50 group-hover:text-yellow-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-400 border-b border-yellow-400/20 pb-2">Services</h4>
            <ul className="space-y-3">
              {[
                'Business Strategy',
                'Leadership Coaching',
                'Real Estate Advisory',
                'Wealth & Investment',
                'Public Speaking'
              ].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services" 
                    className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group"
                  >
                    <ChevronRight size={14} className="mr-2 text-yellow-500/50 group-hover:text-yellow-400 transition-colors" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-400">Connect</h4>

            <div className="flex flex-col space-y-4">
              <a
                href="https://www.instagram.com/davidoluji/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <div className="w-8 flex justify-center">
                  <Instagram size={20} />
                </div>
                <span className="ml-2">Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/bodejoe.oluji/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <div className="w-8 flex justify-center">
                  <Facebook size={20} />
                </div>
                <span className="ml-2">Facebook</span>
              </a>

              <Link
                to="/feedback"
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <div className="w-8 flex justify-center">
                  <MessageSquare size={20} />
                </div>
                <span className="ml-2">Leave Feedback</span>
              </Link>

              <Link
                to="/invite"
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <div className="w-8 flex justify-center">
                  <Calendar size={20} />
                </div>
                <span className="ml-2">Request an Invite</span>
              </Link>
            </div>

            <div className="mt-8 pt-2">
              <Link to="/contact" className="btn btn-primary inline-block px-8 py-2.5">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left text-gray-500">
          <p>&copy; {currentYear} Bode Oluji Joe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
