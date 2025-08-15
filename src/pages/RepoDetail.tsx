import React, { useState } from "react";
import {
  Shield,
  Users,
  Activity,
  GitCommit,
  FileText,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import {
  formatDate,
  getCheckIcon,
  getScoreColor,
} from "../components/functions";
import HealthSummary from "../components/ui/HealthSumaryCards";
import NoDataDisplay from "../components/no-data";

const RepoDetail: React.FC<{ repoData: RepoReport }> = ({ repoData }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "scorecard", label: "Security Scorecard", icon: Shield },
    { id: "criticality", label: "Criticality Score", icon: TrendingUp },
    // { id: "contributors", label: "Contributors", icon: Users },
    // { id: "dependencies", label: "Dependencies", icon: Code2 },
  ];

  const mean_commits = repoData.commit_stats.mean_commits
    ? typeof repoData.commit_stats.mean_commits === "number"
      ? repoData.commit_stats.mean_commits.toFixed(1)
      : parseFloat(repoData.commit_stats.mean_commits).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div>
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8 py-4 overflow-x-auto">
              {tabs.map((tab) => {
                if (tab) {
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
                }
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* {activeTab === "contributors" && (
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
            )} */}

            {/* {activeTab === "dependencies" && (
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
            )} */}

            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Quick Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                    <GitCommit className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {repoData.commit_stats.total_commits.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Commits
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                    <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {repoData.commit_stats.total_committers}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Contributors
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                    <Activity className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {mean_commits}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Avg Commits/Contributor
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                    <FileText className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {(repoData.size / 1024).toFixed(1)}MB
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Repository Size
                    </div>
                  </div>
                </div>

                {/* Repository information */}
                <div className="space-y-6 border-y border-gray-300/10 py-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Repository Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Basic Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Repository ID
                          </span>
                          <span className="font-mono text-sm text-gray-900 dark:text-white">
                            {repoData.id}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Default Branch
                          </span>
                          <span className="font-mono text-sm text-gray-900 dark:text-white">
                            {repoData.default_branch}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Created
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {formatDate(repoData.created_at)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Last Push
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {formatDate(repoData.pushed_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Repository Status
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Archived
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              repoData.archived
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {repoData.archived ? "Yes" : "No"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Fork
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              repoData.fork
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                            }`}
                          >
                            {repoData.fork ? "Yes" : "No"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            License
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white uppercase">
                            {repoData.license}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Size
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {(repoData.size / 1024).toFixed(1)} MB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Repository Health Summary */}

                <div className="grid lg:grid-cols-2 gap-8">
                  <HealthSummary data={repoData.scorecard} />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Repository Files
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(repoData.metadata.Files).map(
                        ([key, value]) =>
                          value && (
                            <div
                              key={key}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                              <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                {key.replace("_", " ")}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                                {value}
                              </span>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "scorecard" &&
              (repoData.scorecard ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        OSSF Scorecard Results
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Security assessment based on{" "}
                        {repoData.scorecard.version}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-bold ${getScoreColor(
                          repoData.scorecard.score
                        )} mb-1`}
                      >
                        {repoData.scorecard.score}/10
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last scanned: {repoData.scorecard.last_scanned}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {repoData.scorecard.checks.map((check, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getCheckIcon(check.score)}
                              <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                {check.name}
                              </span>
                              <span
                                className={`text-lg font-bold ${getScoreColor(
                                  check.score
                                )}`}
                              >
                                {check.score === -1
                                  ? "N/A"
                                  : `${check.score}/10`}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {check.reason}
                            </p>
                            {check.details && check.details.length > 0 && (
                              <details className="text-xs text-gray-500 dark:text-gray-400">
                                <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                                  View details ({check.details.length} items)
                                </summary>
                                <ul className="mt-2 space-y-1 ml-4">
                                  {check.details
                                    .slice(0, 3)
                                    .map((detail, idx) => (
                                      <li key={idx} className="list-disc">
                                        {detail}
                                      </li>
                                    ))}
                                  {check.details.length > 3 && (
                                    <li className="text-gray-400">
                                      ... and {check.details.length - 3} more
                                    </li>
                                  )}
                                </ul>
                              </details>
                            )}
                          </div>
                          <a
                            href={check.doc_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ml-4"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <NoDataDisplay type="security scorecard" />
              ))}

            {activeTab === "criticality" &&
              (repoData.criticality ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Criticality Score Analysis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Measures the influence and importance of this project
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-bold ${getScoreColor(
                          repoData.criticality.score
                        )} mb-1`}
                      >
                        {repoData.criticality.score}/10
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last scanned: {repoData.criticality.last_scanned}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Commit Frequency
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {repoData.criticality.commit_frequency.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2  max-w-full rounded-full"
                            style={{
                              width: `${
                                repoData.criticality.commit_frequency * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Issue Comment Frequency
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {repoData.criticality.issue_comment_frequency.toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 max-w-full rounded-full"
                        style={{
                          width: `${
                            repoData.criticality.issue_comment_frequency * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Recent Releases
                        </span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {repoData.criticality.recent_release_count}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          GitHub Mentions
                        </span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {repoData.criticality.github_mention_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NoDataDisplay type="criticality score" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;
