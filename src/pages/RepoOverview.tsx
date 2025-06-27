import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Shield,
  Star,
  GitFork,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Badge,
  Calendar,
  Copy,
  Check,
  Home,
  Tag,
  Eye,
  Archive,
} from "lucide-react";
import { fetcher, VITE_API_ENDPOINT } from "../components/constants";
import RepoDetail from "./RepoDetail";
import { getScoreColor } from "../components/functions";
import useSWR from "swr";
import dayjs from "dayjs";

const RepoReport: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [copiedBadge, setCopiedBadge] = useState(false);

  const key = `${VITE_API_ENDPOINT}/host/github.com/repositories/${owner}/${name}`;

  const { data, error, isLoading } = useSWR<{ data: RepoReport }>(key, fetcher);

  if (error) {
    return <p>error...</p>;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  const { data: repoData } = data!;

  const getScoreBg = (score: number) => {
    if (score >= 8) return "bg-green-50 dark:bg-green-900/20";
    if (score >= 6) return "bg-yellow-50 dark:bg-yellow-900/20";
    if (score >= 4) return "bg-orange-50 dark:bg-orange-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  repoData.health_score = parseFloat(repoData.health_score.toFixed(1));

  if (repoData.criticality) {
    repoData.criticality.score = parseFloat(
      repoData.criticality.score.toFixed(1)
    );
  }

  const badgeUrl = `https://img.shields.io/badge/RepoVitals-${
    repoData.health_score
  }-${
    repoData.health_score >= 8
      ? "brightgreen"
      : repoData.health_score >= 6
      ? "yellow"
      : "red"
  }`;

  const copyBadgeCode = () => {
    const markdownCode = `[![RepoVitals](${badgeUrl})](https://repovitals.com/repo/${owner}/${name})`;
    navigator.clipboard.writeText(markdownCode);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1 space-y-6">
              {/* Repository Title */}
              <div className="flex items-center space-x-3 ">
                <Shield className="h-8 w-8 shrink-0 text-primary-600" />
                <h1 className="text-xl sm:text-3xl font-bold font-mono truncate text-gray-900 dark:text-white">
                  {repoData.full_name}
                </h1>
                <a
                  href={`https://github.com/${repoData.full_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
                {repoData.archived && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                    <Archive className="h-3 w-3 mr-1" />
                    Archived
                  </span>
                )}
                {repoData.fork && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <GitFork className="h-3 w-3 mr-1" />
                    Fork
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {repoData.description}
              </p>

              {/* Homepage Link */}
              {repoData.homepage && (
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4 text-gray-400" />
                  <a
                    href={repoData.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                  >
                    {repoData.homepage}
                  </a>
                </div>
              )}

              {/* Repository Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Star className="h-4 w-4" />
                  <span>
                    {repoData.stargazers_count.toLocaleString()} stars
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <GitFork className="h-4 w-4" />
                  <span>{repoData.forks_count.toLocaleString()} forks</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{repoData.open_issues_count} open issues</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Eye className="h-4 w-4" />
                  <span>{repoData.subscribers_count} watchers</span>
                </div>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>{repoData.language}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge className="h-4 w-4" />
                  <span>{repoData.license?.toUpperCase()} license</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>{repoData.tags_count} releases</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Updated {dayjs(new Date(repoData.pushed_at)).fromNow()}
                  </span>
                </div>
              </div>

              {/* Topics */}
              {repoData.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repoData.topics.slice(0, 8).map((topic, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {topic}
                    </span>
                  ))}
                  {repoData.topics.length > 8 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{repoData.topics.length - 8} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Score Section */}
            <div className="lg:w-80 space-y-6">
              {/* Overall Score */}
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl">
                <div
                  className={`text-5xl font-bold ${getScoreColor(
                    repoData.health_score
                  )} mb-2`}
                >
                  {repoData.health_score}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                  RepoVitals Score
                </div>

                {/* Badge Code */}
                <div className="bg-white dark:bg-gray-600 rounded-lg p-3 mb-4">
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

              {/* Component Scores */}
              <div className="grid grid-cols-2 gap-4">
                {repoData.scorecard && (
                  <div
                    className={`${getScoreBg(
                      repoData.scorecard.score
                    )} rounded-xl p-4 text-center`}
                  >
                    <Shield
                      className={`h-6 w-6 ${getScoreColor(
                        repoData.scorecard.score
                      )} mx-auto mb-2`}
                    />
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Security
                    </div>
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        repoData.scorecard.score
                      )}`}
                    >
                      {repoData.scorecard.score}
                    </div>
                  </div>
                )}

                {repoData.criticality && (
                  <div
                    className={`${getScoreBg(
                      repoData.criticality.score
                    )} rounded-xl p-4 text-center`}
                  >
                    <TrendingUp
                      className={`h-6 w-6 ${getScoreColor(
                        repoData.criticality.score
                      )} mx-auto mb-2`}
                    />
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Criticality
                    </div>
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        repoData.criticality.score
                      )}`}
                    >
                      {repoData.criticality.score}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {(!repoData.scorecard || !repoData.criticality) && (
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

        <RepoDetail repoData={repoData} />
      </div>
    </div>
  );
};

export default RepoReport;
