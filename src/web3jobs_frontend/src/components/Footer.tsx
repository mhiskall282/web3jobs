// import React from 'react';
import { Link } from 'react-router-dom';
import { Globe as GlobeAfrica, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary-light py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <GlobeAfrica className="w-8 h-8 text-primary" />
              <span className="text-2xl font-display font-bold text-primary">AfriJob</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Empowering African talent in the Web3 space through secure, transparent, and rewarding opportunities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-400 hover:text-primary">Browse Jobs</Link></li>
              <li><Link to="/learning-hub" className="text-gray-400 hover:text-primary">Learning Hub</Link></li>
              <li><Link to="/governance" className="text-gray-400 hover:text-primary">Governance</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-primary">Help Center</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} AfriJob. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};