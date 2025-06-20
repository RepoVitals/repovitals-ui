import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Calendar,
  Activity,
  Check,
  Copy,
} from "lucide-react";
import { repoDataExport } from "../components/constants";
import RepoDetail from "./RepoDetail";

const RepoOverview: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();

  const [copiedBadge, setCopiedBadge] = useState(false);

  // Mock data - in real app this would come from API
  const repoData = {
    name: `${owner}/${name}`,
    hasFullData: false,
    ...repoDataExport,
  };

  const badgeUrl = `https://img.shields.io/badge/RepoVitals-${repoData.overallScore}-brightgreen`;

  const copyBadgeCode = () => {
    const markdownCode = `[![RepoVitals](${badgeUrl})](https://repovitals.com/repo/${owner}/${name})`;
    navigator.clipboard.writeText(markdownCode);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
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
              Vulnerability management, code review
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
              Activity, updates, community health
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
              Stars, forks, community adoption
            </div>
          </div>
        </div>

        {/* Missing Data Alert */}
        {!repoData.hasFullData && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Enhanced Data Available
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                  This repository hasn't been scanned with our full OSSF
                  Scorecard analysis yet. Upgrade to Pro to unlock detailed
                  security insights, dependency analysis, and comprehensive
                  health metrics.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Upgrade to Pro
                  </Link>
                  <Link
                    to="/docs"
                    className="inline-flex items-center px-4 py-2 border border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary-600" />
              Repository Activity
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Recent commits
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  142 this month
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Contributors
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  1,547 total
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Open issues
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  267
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Pull requests
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  45 open
                </span>
              </div>
            </div>
          </div>

          {/* Community Health */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-600" />
              Community Health
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Issue response time
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  2.1 days avg
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  PR merge time
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  4.7 days avg
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Code of conduct
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  ✓ Present
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Contributing guide
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  ✓ Present
                </span>
              </div>
            </div>
          </div>
        </div>
        <RepoDetail repoData={repoData} />
      </div>
    </div>
  );
};

export default RepoOverview;
