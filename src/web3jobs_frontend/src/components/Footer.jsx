import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Twitter, Linkedin, Github } from 'lucide-react';

// Discord
 const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] border-t border-gold/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-gold" />
              <span className="text-2xl font-bold bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
                Worka
              </span>
            </Link>
            <p className="text-gray-300">
              Bridging African Web3 talent with global opportunities through blockchain-powered solutions.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/jobs" className="text-gray-300 hover:text-gold transition-colors">Find Work</Link></li>
              <li><Link to="/hire" className="text-gray-300 hover:text-gold transition-colors">Hire Talent</Link></li>
              <li><Link to="/learning" className="text-gray-300 hover:text-gold transition-colors">Learning Hub</Link></li>
              <li><Link to="/governance" className="text-gray-300 hover:text-gold transition-colors">DAO Governance</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/docs" className="text-gray-300 hover:text-gold transition-colors">Developer Docs</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/security" className="text-gray-300 hover:text-gold transition-colors">Security</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-gold transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-gold transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-gold transition-colors">
                <Github className="w-6 h-6" />
              </a>
              {/* <a href="https://discord.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-gold transition-colors">
                <Discord className="w-6 h-6" />
              </a> */}
            </div>
            
            <div className="border-t border-gold/20 pt-4">
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-300 hover:text-gold transition-colors">Terms</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-gold transition-colors">Privacy</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gold/20">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} Worka • 
            <span className="mx-2">Built on</span>
            <span className="text-gold">Internet Computer Protocol</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;