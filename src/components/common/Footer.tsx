import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div>
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold">
                Dolu<span className="text-yellow-400">Global</span>
              </span>
            </Link>
            <p className="mt-3 text-gray-400 max-w-xs">
              Your productivity partner—Helping you focus on what matters most.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['/', '/services', '/about', '/blog', '/contact'].map((path, i) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {['Home', 'Services', 'About', 'Blog', 'Contact'][i]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="text-gray-400 hover:text-yellow-400 transition-colors inline-flex items-center"
                >
                  <Lock size={14} className="mr-1" />
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <a
              href="https://www.linkedin.com/in/lewechi-princess"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </a>

            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left text-gray-500">
          <p>&copy; {currentYear} FlowDesk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
