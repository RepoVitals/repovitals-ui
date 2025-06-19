import { AnimatePresence, motion } from "framer-motion";
import {
  Badge,
  BarChart3,
  Check,
  Code2,
  GitFork,
  Globe,
  Lock,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { DiJava, DiJavascript } from "react-icons/di";
import { FaPython, FaRust } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const words = ["Audited", "Trusted", "Ranked", "Quantified"];

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      3000
    );
    return () => clearInterval(timer);
  }, [words.length]);

  const stats = [
    {
      value: "1.2M+",
      label: "Projects Analyzed",
      icon: Globe,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "7.3",
      label: "Average Security Score",
      icon: Shield,
      color: "from-green-500 to-green-600",
    },
    {
      value: "2,847",
      label: "Active Scans Today",
      icon: Zap,
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "45+",
      label: "Languages Supported",
      icon: Code2,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const topLanguages = [
    { name: "JavaScript", percentage: 28, color: "text-yellow-400" , icon: DiJavascript},
    { name: "Python", percentage: 22, color: "text-blue-500", icon : FaPython},
    { name: "TypeScript", percentage: 18, color: "text-blue-600", icon: SiTypescript },
    { name: "Go", percentage: 12, color: "text-cyan-500", icon: FaGolang },
    { name: "Rust", percentage: 8, color: "text-orange-600", icon: FaRust },
    { name: "Java", percentage: 12, color: "text-red-500", icon: DiJava },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">
                    Open Source,
                  </span>
                  <br />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Analyze GitHub repository health, security, and maintenance
                  signals with comprehensive scoring and insights powered by
                  OSSF Scorecard, Criticality Score and Libraries.io.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center px-6 py-3 h-fit bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Explore Repositories
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center px-6 py-3 h-fit border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500 font-semibold rounded-xl transition-all duration-200"
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
                    <span className="font-mono text-lg font-semibold">
                      facebook/react
                    </span>
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
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    9.2
                  </div>
                  <div className="text-sm text-gray-500">
                    Overall Health Score
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Lock className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-green-700 dark:text-green-300">
                      Security
                    </div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      8.7
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      Maintenance
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      9.5
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                      Popularity
                    </div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      9.8
                    </div>
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

      {/* Built on Trusted Tools Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built on Trusted Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              RepoVitals is powered by industry-backed open-source tools trusted
              by Google, OpenSSF, and GitHub.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                OSSF Scorecard
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Comprehensive security assessment tool developed by the Open
                Source Security Foundation to evaluate project security
                practices.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Criticality Score
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Algorithm that determines the influence and importance of open
                source projects based on various quantitative metrics.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Libraries.io
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Open dataset providing dependency information and package
                manager data for better understanding of project ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real-time Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of developers and organizations who trust
              RepoVitals for repository health insights.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Languages */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-8">
              Most Analyzed Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topLanguages.map((language, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  {<language.icon className={`${language.color} mx-auto mb-3 group-hover:scale-110 transition-transform size-8`} />}
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {language.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {language.percentage}%
                  </div>
                </div>
              ))}
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
              Built on industry standards and open-source tools, RepoVitals
              provides comprehensive insights into the security, maintenance,
              and popularity of any GitHub repository.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Security Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Powered by OSSF Scorecard, get detailed security analysis
                including vulnerability management, code review practices, and
                dependency security.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Trust Score
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Comprehensive scoring algorithm that evaluates maintenance
                activity, community engagement, and project sustainability
                metrics.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Badge className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Badges & Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Generate shareable badges and detailed reports for your
                repositories. Perfect for README files and project
                documentation.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Community Health
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Analyze contributor activity, issue response times, and
                community engagement patterns to understand project vitality.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Real-time Monitoring
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Track changes over time with automated scans and alerts for
                security issues, outdated dependencies, and maintenance
                concerns.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Trend Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Historical data and trend analysis to understand how repository
                health evolves over time and identify potential issues early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-800 to-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to quantify your open source?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of developers and organizations who trust RepoVitals
            for repository health insights.
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
