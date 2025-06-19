import { Bug, Building, Github, HelpCircle, Lightbulb, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const purposeOptions = [
    { value: 'general', label: 'General Inquiry', icon: HelpCircle },
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'sales', label: 'Sales Inquiry', icon: Building },
    { value: 'oss', label: 'OSS Maintainer', icon: Github }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about RepoVitals? Need help with your account? We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What can we help you with? *
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    required
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {purposeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Tell us more about your question or how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Links */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Other ways to reach us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">support@repovitals.com</div>
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <Github className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">GitHub Issues</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">For bug reports and features</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Follow Us</h3>
              
              <div className="flex space-x-4">
                <a
                  href="https://github.com/repovitals"
                  target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/intent/follow?screen_name=repovitals"
                  target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/showcase/repovitalsapp"
                  target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-700">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900 dark:text-white">We're online!</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We typically respond to messages within 24 hours during business days. 
                For urgent issues, please mention "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Common Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">How do I get started?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Simply visit any GitHub repository page or search for a project to get instant health insights. 
                Sign up for free to track repositories and access more features.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Is there a free plan?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Yes! Our free plan includes basic repository analysis, community insights, and more.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Can I analyze private repositories?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Private repository analysis is available with Pro and Enterprise plans. 
                You'll need to authorize RepoVitals through GitHub OAuth.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Do you offer discounts for OSS maintainers?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Absolutely! We offer significant discounts for verified open source maintainers and non-profit organizations. 
                Contact us to learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;