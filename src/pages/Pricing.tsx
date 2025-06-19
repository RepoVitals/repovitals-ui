import { ArrowRight, Building, Check, Star, X, Zap } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for exploring open source health',
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      features: [
        'Public repository analysis',
        'Basic health metrics',
        'Community insights',
        'Repository badges',
        'Basic support'
      ],
      limitations: [
        'No private repositories',
        'No fresh OSSF scans',
        'No API access',
        'No custom reports'
      ]
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For maintainers and serious developers',
      icon: Zap,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      buttonColor: 'bg-primary-600 hover:bg-primary-700',
      popular: true,
      features: [
        'Everything in Free',
        'Private repository scanning',
        'Frequent data sync & refresh',
        'Fresh OSSF Scorecard and Criticality Score scans',
        'Advanced security insights',
        'Shareable reports',
        'API access (1000 calls/month)',
        'Priority support',
        'Unlimited repositories',
        'Historical data tracking',
        'Custom badges'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For organizations managing large portfolios',
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      features: [
        'Everything in Pro',
        'Priority data sync & refresh',
        'Bulk repository management',
        'Advanced portfolio analytics',
        'Custom integrations',
        'SSO authentication',
        'Dedicated support manager',
        'SLA guarantees',
        'On-premise deployment',
        'Custom reporting',
        'Unlimited API calls'
      ],
      limitations: []
    }
  ];

  const faqs = [
    {
      question: 'What is OSSF Scorecard?',
      answer: 'OSSF Scorecard is an automated tool that assesses the security posture of open source projects. It evaluates various security practices and provides a score to help users make informed decisions about using or contributing to projects.'
    },
    {
      question: 'What is OSSF Criticality Score?',
      answer: 'OSSF Criticality Score measures how essential an open-source project is based on usage, activity, and maintenance. It helps identify which projects are most important to secure and support.'
    },
    {
      question: 'How often are repositories scanned?',
      answer: 'Free tier repositories are scanned when data is available from public sources. Pro users get fresh scans on-demand and weekly automated scans. Enterprise customers can configure custom scan schedules.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period, and you won\'t be charged for the next cycle.'
    },
    {
      question: 'Do you offer discounts for open source maintainers?',
      answer: 'Yes! We offer significant discounts for verified open source maintainers and non-profit organizations. Contact us to learn more about our community support programs.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers. All payments are processed securely through Stripe.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core repository health analysis features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative ${plan.bgColor} rounded-2xl p-8 border-2 ${
                  plan.popular 
                    ? 'border-primary-200 dark:border-primary-700 shadow-xl' 
                    : 'border-gray-200 dark:border-gray-700'
                } transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${plan.color} mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                      {plan.period !== 'contact sales' && (
                        <span className="text-gray-500 dark:text-gray-400 ml-2">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {plan.name === 'Enterprise' ? (
                    <Link
                      to="https://form.typeform.com/to/E7dTSAHv"
                      className={`w-full inline-flex items-center justify-center px-6 py-3 ${plan.buttonColor} text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      Join Waitlist {/* Contact Sales (Link should also be updated to /contact)*/}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      to={plan.name === 'Free' ? '/explore' : 'https://form.typeform.com/to/E7dTSAHv'}
                      className={`w-full inline-flex items-center justify-center px-6 py-3 ${plan.buttonColor} text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      {plan.name === 'Free' ? 'Start Exploring' : 'Join Waitlist'} {/* Start Free Trial (also update Link) */}
                    </Link>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Not included:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <X className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 dark:text-gray-400 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-16">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Features</th>
                  <th className="text-center p-4 font-medium text-gray-900 dark:text-white">Free</th>
                  <th className="text-center p-4 font-medium text-gray-900 dark:text-white">Pro</th>
                  <th className="text-center p-4 font-medium text-gray-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="p-4 text-gray-900 dark:text-white">Public repositories</td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 dark:text-white">Private repositories</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 dark:text-white">Fresh OSSF scans</td>
                  <td className="p-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 dark:text-white">API access</td>
                  <td className="p-4 text-center text-gray-400">-</td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300">1K calls/month</td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-900 dark:text-white">Support</td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300">Community</td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300">Priority</td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers who trust RepoVitals for their open source health insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="https://form.typeform.com/to/E7dTSAHv"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Join Waitlist {/* Start Free Trial (also update link)*/}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;