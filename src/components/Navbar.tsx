import { Menu, Shield, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold font-mono">RepoVitals</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/explore"
              className={`transition-colors hover:text-primary-600 ${
                isActive('/explore') ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/pricing"
              className={`transition-colors hover:text-primary-600 ${
                isActive('/pricing') ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className={`transition-colors hover:text-primary-600 ${
                isActive('/docs') ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Docs
            </Link>
            <Link
              to="/about"
              className={`transition-colors hover:text-primary-600 ${
                isActive('/about') ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition-colors hover:text-primary-600 ${
                isActive('/contact') ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Contact
            </Link>
            <Link
                to="https://forms.gle/1VstyhtcFYkce562A"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Join Waitlist
              </Link>
            {/* <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Dashboard
              </Link>
            </div> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/explore"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/pricing"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
                to="https://forms.gle/1VstyhtcFYkce562A"
                className="block mx-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors text-center font-medium"
              >
                Join Waitlist
              </Link>
            {/* <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="block mx-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors text-center font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </div> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;