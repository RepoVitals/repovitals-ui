import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, TrendingUp, Badge, Star, GitFork, Code2, ArrowRight, Check, Users, Zap, BarChart3, Search } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">Open Source,</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                    Quantified
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Analyze GitHub repository health, security, and maintenance signals with comprehensive scoring and insights powered by OSSF Scorecard.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Explore Repositories
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500 font-semibold rounded-xl transition-all duration-200"
                >
                  View Docs
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary-500" />
                  <span>Open source friendly</span>
                </div>
              </div>
            </div>

            {/* Demo Card */}
            <div className="lg:pl-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary-600" />
                    <span className="font-mono text-lg font-semibold">facebook/react</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>218k</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>45.2k</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">9.2</div>
                  <div className="text-sm text-gray-500">Overall Health Score</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Lock className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-green-700 dark:text-green-300">Security</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">8.7</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Maintenance</div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">9.5</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">Popularity</div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">9.8</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Badge className="h-4 w-4" />
                  <span>Last updated 2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to assess repository health
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built on industry standards and open-source tools, RepoVitals provides comprehensive insights into the security, maintenance, and popularity of any GitHub repository.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Security Insights</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Powered by OSSF Scorecard, get detailed security analysis including vulnerability management, code review practices, and dependency security.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Trust Score</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Comprehensive scoring algorithm that evaluates maintenance activity, community engagement, and project sustainability metrics.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Badge className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Badges & Reports</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Generate shareable badges and detailed reports for your repositories. Perfect for README files and project documentation.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Community Health</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Analyze contributor activity, issue response times, and community engagement patterns to understand project vitality.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Real-time Monitoring</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Track changes over time with automated scans and alerts for security issues, outdated dependencies, and maintenance concerns.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Trend Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Historical data and trend analysis to understand how repository health evolves over time and identify potential issues early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to quantify your open source?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of developers and organizations who trust RepoVitals for repository health insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Repositories
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;