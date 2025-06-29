import React, { useState } from 'react';
import { Search, Book, Shield, BarChart3, Code2, Users, HelpCircle, ExternalLink, ChevronRight } from 'lucide-react';

const Docs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      items: [
        'What is RepoVitals?',
        'Quick Start Guide',
        'Understanding Scores',
        'First Repository Analysis'
      ]
    },
    {
      id: 'scoring',
      title: 'Scoring System',
      icon: BarChart3,
      items: [
        'Overall Health Score',
        'Security Metrics',
        'Maintenance Indicators',
        'Popularity Factors'
      ]
    },
    {
      id: 'ossf-scorecard',
      title: 'OSSF Scorecard',
      icon: Shield,
      items: [
        'What is OSSF Scorecard?',
        'Security Checks',
        'Running Fresh Scans',
        'Interpreting Results'
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: Code2,
      items: [
        'Authentication',
        'Endpoints',
        'Rate Limits',
        'Examples'
      ]
    },
    {
      id: 'community',
      title: 'Community',
      icon: Users,
      items: [
        'Contributing',
        'Bug Reports',
        'Feature Requests',
        'Open Source Projects'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the security scores?',
      answer: 'Our security scores are based on OSSF Scorecard, which is the industry standard for evaluating open source project security. The tool checks for various security practices including vulnerability management, code review, dependency updates, and more.'
    },
    {
      question: 'Why is my repository score different from GitHub\'s insights?',
      answer: 'RepoVitals uses a comprehensive scoring algorithm that considers security practices, maintenance activity, and community health - factors that go beyond basic GitHub metrics like stars and forks.'
    },
    {
      question: 'How often are repository scores updated?',
      answer: 'Public repositories are updated based on available data from our sources. Pro users get fresh scans on-demand and automated weekly updates. Enterprise customers can configure custom schedules.'
    },
    {
      question: 'Can I analyze private repositories?',
      answer: 'Yes, private repository analysis is available for Pro and Enterprise plans. You\'ll need to authorize RepoVitals to access your private repositories through GitHub OAuth.'
    },
    {
      question: 'What makes a repository score high or low?',
      answer: 'High-scoring repositories typically have regular maintenance, good security practices, active communities, comprehensive documentation, and follow best practices for dependency management and code review.'
    }
  ];

  const documentationContent = {
    'getting-started': {
      title: 'Getting Started with RepoVitals',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What is RepoVitals?</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              RepoVitals is a comprehensive platform for analyzing the health, security, and maintainability of GitHub repositories. 
              We combine data from industry-standard tools like OSSF Scorecard, Criticality Score, and Ecosyste.ms to provide 
              actionable insights about open source projects.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Key Features:</strong> Security analysis, maintenance tracking, community health metrics, 
                dependency analysis, and trend monitoring.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Start Guide</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300">
              <li>Visit any GitHub repository page or search for a project</li>
              <li>Enter the repository URL or owner/name format (e.g., facebook/react)</li>
              <li>View the instant analysis with basic health metrics</li>
              <li>Sign up for a free account to track repositories and get more detailed insights</li>
              <li>Upgrade to Pro for fresh OSSF scans and advanced features</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Understanding Scores</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">8.0 - 10.0</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Excellent health with strong security and maintenance practices</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-2">6.0 - 7.9</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Good health with room for improvement in some areas</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">0.0 - 5.9</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Needs attention - consider security and maintenance improvements</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'scoring': {
      title: 'Scoring System Deep Dive',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Overall Health Score</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The overall health score is a weighted combination of three key areas: Security (40%), Maintenance (35%), and Popularity (25%). 
              This weighting reflects the importance of security and ongoing maintenance for long-term project sustainability.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                Overall Score = (Security × 0.4) + (Maintenance × 0.35) + (Popularity × 0.25)
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Metrics</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• <strong>Vulnerability Management:</strong> How quickly security issues are addressed</li>
              <li>• <strong>Code Review:</strong> Percentage of code changes that go through review</li>
              <li>• <strong>Dependency Security:</strong> Use of automated dependency scanning</li>
              <li>• <strong>Branch Protection:</strong> Configuration of branch protection rules</li>
              <li>• <strong>SAST Tools:</strong> Integration of static analysis security testing</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Maintenance Indicators</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• <strong>Commit Frequency:</strong> Regular code updates and improvements</li>
              <li>• <strong>Issue Response Time:</strong> How quickly maintainers respond to issues</li>
              <li>• <strong>Documentation Quality:</strong> Presence of README, contributing guides, etc.</li>
              <li>• <strong>Test Coverage:</strong> Automated testing and continuous integration</li>
              <li>• <strong>Release Cadence:</strong> Regular, well-documented releases</li>
            </ul>
          </div>
        </div>
      )
    },
    'ossf-scorecard': {
      title: 'OSSF Scorecard Integration',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What is OSSF Scorecard?</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              OSSF Scorecard is an automated tool developed by the Open Source Security Foundation that assesses the security posture of open source projects. 
              It evaluates repositories against a set of security best practices and provides a score from 0 to 10.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Fresh OSSF Scorecard scans are available for Pro and Enterprise users. 
                Free users see publicly available scorecard data when available.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Checks</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Code Quality Checks</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Code Review enforcement</li>
                  <li>• Signed commits verification</li>
                  <li>• Branch protection rules</li>
                  <li>• Dangerous workflow patterns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Security Practices</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Security policy presence</li>
                  <li>• Vulnerability disclosure</li>
                  <li>• Dependency updates</li>
                  <li>• Static analysis tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'api': {
      title: 'API Reference',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Authentication</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              API access requires authentication using an API key. You can generate API keys from your dashboard settings.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;https://api.repovitals.com/v1/repos/owner/name
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Rate Limits</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="p-3 text-left text-gray-900 dark:text-white">Plan</th>
                    <th className="p-3 text-left text-gray-900 dark:text-white">Requests/Hour</th>
                    <th className="p-3 text-left text-gray-900 dark:text-white">Requests/Month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="p-3 text-gray-600 dark:text-gray-300">Free</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">100</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">1,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-600 dark:text-gray-300">Pro</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">1,000</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">10,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-600 dark:text-gray-300">Enterprise</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">Unlimited</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    'community': {
      title: 'Community & Contributing',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contributing to RepoVitals</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We welcome contributions from the community! Whether you're reporting bugs, suggesting features, 
              or contributing code, there are many ways to help improve RepoVitals.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bug Reports</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Found a bug? Please report it on our GitHub issues page with detailed reproduction steps.
                </p>
                <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Report Bug →
                </a>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Feature Requests</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Have an idea for a new feature? We'd love to hear it! Submit your suggestions on GitHub.
                </p>
                <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Request Feature →
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about RepoVitals, from getting started to advanced API usage.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                    {activeSection === section.id && (
                      <div className="ml-8 mt-2 space-y-1">
                        {section.items.map((item, index) => (
                          <button
                            key={index}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {documentationContent[activeSection]?.title}
                </h2>
                {documentationContent[activeSection]?.content}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External Links */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <a
            href="https://github.com/ossf/scorecard"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">OSSF Scorecard</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Learn more about the OSSF Scorecard project and security best practices.
            </p>
          </a>

          <a
            href="https://github.com/repovitals"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Code2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">GitHub Repository</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              View our source code, report issues, and contribute to the project.
            </p>
          </a>

          <a
            href="/contact"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get Support</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Need help? Contact our support team for assistance with your account.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Docs;