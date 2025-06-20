import React, { useState } from "react";
import {
  Shield,
  Code2,
  Users,
  AlertTriangle,
  Badge,
  Activity,
  Clock,
  GitCommit,
} from "lucide-react";
import { repoDataExport } from "../components/constants";

const RepoDetail: React.FC<{ repoData: typeof repoDataExport }> = ({
  repoData,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

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

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "scorecard", label: "Security Scorecard", icon: Shield },
    { id: "contributors", label: "Contributors", icon: Users },
    { id: "dependencies", label: "Dependencies", icon: Code2 },
    { id: "activity", label: "Activity", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div>
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
                        className="w-12 h-12 object-cover rounded-full"
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
