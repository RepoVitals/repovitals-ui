import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Shield,
  Star,
  GitFork,
  Code2,
  Lock,
  TrendingUp,
  Users,
  AlertTriangle,
  ExternalLink,
  Badge,
  Calendar,
  Activity,
  Copy,
  Check,
  Clock,
  GitCommit,
} from "lucide-react";

const RepoDetail: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app this would come from API
  const repoData = {
    name: `${owner}/${name}`,
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    stars: 218000,
    forks: 45200,
    lastUpdated: "2 hours ago",
    overallScore: 9.2,
    scores: {
      security: 8.7,
      maintenance: 9.5,
      popularity: 9.8,
    },
    badges: ["Maintained", "Security Scan", "Popular"],
    scorecardData: {
      lastScan: "2024-01-15",
      checks: [
        {
          name: "Binary-Artifacts",
          score: 10,
          description: "No binary artifacts found",
        },
        {
          name: "Branch-Protection",
          score: 8,
          description: "Branch protection enabled with some gaps",
        },
        {
          name: "CI-Tests",
          score: 10,
          description: "CI tests run on all changes",
        },
        { name: "Code-Review", score: 9, description: "Most changes reviewed" },
        {
          name: "Contributors",
          score: 10,
          description: "Multiple contributors from different organizations",
        },
        {
          name: "Dangerous-Workflow",
          score: 10,
          description: "No dangerous workflow patterns detected",
        },
        {
          name: "Dependency-Update-Tool",
          score: 8,
          description: "Automated dependency updates configured",
        },
        { name: "Fuzzing", score: 0, description: "No fuzzing tools detected" },
        { name: "License", score: 10, description: "License file present" },
        {
          name: "Maintained",
          score: 10,
          description: "Recent activity and maintenance",
        },
        {
          name: "Packaging",
          score: 10,
          description: "Proper packaging configuration",
        },
        {
          name: "Pinned-Dependencies",
          score: 7,
          description: "Most dependencies pinned",
        },
        {
          name: "SAST",
          score: 5,
          description: "Some static analysis tools detected",
        },
        {
          name: "Security-Policy",
          score: 10,
          description: "Security policy documented",
        },
        {
          name: "Signed-Releases",
          score: 0,
          description: "Releases not signed",
        },
        {
          name: "Token-Permissions",
          score: 8,
          description: "GitHub tokens have appropriate permissions",
        },
        {
          name: "Vulnerabilities",
          score: 10,
          description: "No known vulnerabilities",
        },
        {
          name: "Webhooks",
          score: 9,
          description: "Webhooks properly configured",
        },
      ],
    },
    contributors: [
      {
        name: "Dan Abramov",
        contributions: 1247,
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      },
      {
        name: "Sebastian Markbåge",
        contributions: 892,
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      },
      {
        name: "Andrew Clark",
        contributions: 756,
        avatar:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      },
      {
        name: "Brian Vaughn",
        contributions: 623,
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      },
    ],
    dependencies: {
      total: 127,
      outdated: 8,
      vulnerable: 2,
      recent: [
        {
          name: "typescript",
          version: "5.1.6",
          latest: "5.2.2",
          status: "outdated",
        },
        {
          name: "eslint",
          version: "8.45.0",
          latest: "8.45.0",
          status: "current",
        },
        {
          name: "react-dom",
          version: "18.2.0",
          latest: "18.2.0",
          status: "current",
        },
        {
          name: "webpack",
          version: "5.88.1",
          latest: "5.88.2",
          status: "outdated",
        },
      ],
    },
    activity: [
      {
        type: "commit",
        message: "Fix concurrent mode rendering issue",
        author: "Dan Abramov",
        time: "2 hours ago",
      },
      {
        type: "release",
        message: "Release v18.2.1",
        author: "React Team",
        time: "1 day ago",
      },
      {
        type: "issue",
        message: "Performance improvement for large lists",
        author: "Community",
        time: "2 days ago",
      },
      {
        type: "pr",
        message: "Add support for React DevTools",
        author: "Brian Vaughn",
        time: "3 days ago",
      },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return "bg-green-50 dark:bg-green-900/20";
    if (score >= 6) return "bg-yellow-50 dark:bg-yellow-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  const badgeUrl = `https://img.shields.io/badge/RepoVitals-${repoData.overallScore}-brightgreen`;

  const copyBadgeCode = () => {
    const markdownCode = `[![RepoVitals](${badgeUrl})](https://repovitals.com/repo/${owner}/${name})`;
    navigator.clipboard.writeText(markdownCode);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "scorecard", label: "Security Scorecard", icon: Shield },
    { id: "contributors", label: "Contributors", icon: Users },
    { id: "dependencies", label: "Dependencies", icon: Code2 },
    { id: "activity", label: "Activity", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-primary-600" />
                <h1 className="text-3xl font-bold font-mono text-gray-900 dark:text-white">
                  {repoData.name}
                </h1>
                <a
                  href={`https://github.com/${owner}/${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl">
                {repoData.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>{repoData.language}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{repoData.stars.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="h-4 w-4" />
                  <span>{repoData.forks.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {repoData.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Overall Score */}
            <div className="text-center lg:text-right">
              <div className="text-5xl font-bold text-primary-600 mb-2">
                {repoData.overallScore}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                Overall Health Score
              </div>

              {/* Badge Code */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Embed Badge
                  </span>
                  <button
                    onClick={copyBadgeCode}
                    className="flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {copiedBadge ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedBadge ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <img
                  src={badgeUrl}
                  alt="RepoVitals Score"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div
            className={`${getScoreBg(
              repoData.scores.security
            )} rounded-2xl p-6 text-center`}
          >
            <Lock
              className={`h-8 w-8 ${getScoreColor(
                repoData.scores.security
              )} mx-auto mb-3`}
            />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Security
            </div>
            <div
              className={`text-3xl font-bold ${getScoreColor(
                repoData.scores.security
              )}`}
            >
              {repoData.scores.security}
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              OSSF Scorecard based analysis
            </div>
          </div>

          <div
            className={`${getScoreBg(
              repoData.scores.maintenance
            )} rounded-2xl p-6 text-center`}
          >
            <Code2
              className={`h-8 w-8 ${getScoreColor(
                repoData.scores.maintenance
              )} mx-auto mb-3`}
            />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Maintenance
            </div>
            <div
              className={`text-3xl font-bold ${getScoreColor(
                repoData.scores.maintenance
              )}`}
            >
              {repoData.scores.maintenance}
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Activity and community health
            </div>
          </div>

          <div
            className={`${getScoreBg(
              repoData.scores.popularity
            )} rounded-2xl p-6 text-center`}
          >
            <TrendingUp
              className={`h-8 w-8 ${getScoreColor(
                repoData.scores.popularity
              )} mx-auto mb-3`}
            />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Popularity
            </div>
            <div
              className={`text-3xl font-bold ${getScoreColor(
                repoData.scores.popularity
              )}`}
            >
              {repoData.scores.popularity}
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Community adoption metrics
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8 py-4 overflow-x-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-primary-500 text-primary-600 dark:text-primary-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Total Contributors
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        1,547
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Open Issues
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        267
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Open Pull Requests
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        45
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Latest Release
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        v18.2.1
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Health Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Active maintenance and development
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Strong security practices
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Large, engaged community
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Some dependencies need updates
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "scorecard" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    OSSF Scorecard Results
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last scan: {repoData.scorecardData.lastScan}
                  </span>
                </div>

                <div className="grid gap-4">
                  {repoData.scorecardData.checks.map((check, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                            {check.name}
                          </span>
                          <span
                            className={`text-lg font-bold ${getScoreColor(
                              check.score
                            )}`}
                          >
                            {check.score}/10
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {check.description}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-2 rounded-full ${getScoreBg(
                          check.score
                        )}`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            check.score >= 8
                              ? "bg-green-500"
                              : check.score >= 6
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${(check.score / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "contributors" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Top Contributors
                </h3>
                <div className="grid gap-4">
                  {repoData.contributors.map((contributor, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {contributor.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contributor.contributions} contributions
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "dependencies" && (
              <div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {repoData.dependencies.total}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Dependencies
                    </div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {repoData.dependencies.outdated}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Outdated
                    </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {repoData.dependencies.vulnerable}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Vulnerable
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Dependencies
                </h4>
                <div className="space-y-3">
                  {repoData.dependencies.recent.map((dep, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                          {dep.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Current: {dep.version} | Latest: {dep.latest}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dep.status === "current"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}
                      >
                        {dep.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {repoData.activity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "commit" && (
                          <GitCommit className="h-4 w-4 text-blue-500" />
                        )}
                        {activity.type === "release" && (
                          <Badge className="h-4 w-4 text-green-500" />
                        )}
                        {activity.type === "issue" && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        {activity.type === "pr" && (
                          <Code2 className="h-4 w-4 text-purple-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.message}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          by {activity.author} • {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;
