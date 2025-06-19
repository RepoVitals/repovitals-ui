import { Github, Mail, Shield, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import boltLogo from '../assets/bolt_icon.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold font-mono">RepoVitals</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Open source repository health and security analysis, powered by OSSF Scorecard and community standards.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Explore</Link></li>
              <li><Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Pricing</Link></li>
              <li><Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Contact</Link></li>
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Privacy</a></li>
              <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/repovitals" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/intent/follow?screen_name=repovitals" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:support@repovitals.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div>
              <img src={boltLogo} alt="Bolt.new Logo" className='h-20 w-20 mt-3' />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 RepoVitals. All rights reserved. Built with ❤️ for the open source community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;