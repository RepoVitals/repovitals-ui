import {
  AlertTriangle,
  Award,
  CheckCircle,
  Clock,
  ExternalLink,
  File,
  GitFork,
  Plus,
  Search,
  Shield,
  Sliders,
  Star,
  TrendingUp,
} from "lucide-react";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { repositories } from "../components/constants";
import { GoOrganization } from "react-icons/go";

function getBreakpoint(width: number): string {
  if (width < 640) return "sm";
  if (width < 768) return "md";
  if (width < 1024) return "lg";
  if (width < 1280) return "xl";
  return "2xl";
}

const Explore: React.FC = () => {
  const [searchInput, setSearchInput] = useState({
    owner: "",
    repo: "",
  });
  const [scoreRange, setScoreRange] = useState([0, 10]);
  const [sortBy, setSortBy] = useState("score");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth)
  );
  const [selectedData, setSelectedData] = useState({
    language: "all",
    category: "all",
  });

  const { category, language } = selectedData;
  const { owner, repo } = searchInput;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLanguageAndCategorySelection = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSelectedData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleReset = () => {
    setSelectedData({
      category: "all",
      language: "all",
    });
    setSearchInput({
      owner: "",
      repo: "",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);
      setBreakpoint(newBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const languages = [
    "All",
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "Rust",
    "Java",
    "C++",
  ];
  const categories = [
    "All",
    "Web Framework",
    "Developer Tool",
    "AI/ML",
    "Runtime",
    "Database",
    "Security",
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "maintained":
        return <CheckCircle className="h-3 w-3" />;
      case "secure":
        return <Shield className="h-3 w-3" />;
      case "popular":
        return <TrendingUp className="h-3 w-3" />;
      case "at-risk":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Award className="h-3 w-3" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "maintained":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "secure":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "popular":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "at-risk":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchInput.repo.toLowerCase()) ||
      repo.owner.toLowerCase().includes(owner.toLowerCase());
    // repo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = language === "all" || repo.language === language;
    const matchesCategory = category === "all" || repo.category === category;
    const matchesScore =
      repo.score >= scoreRange[0] && repo.score <= scoreRange[1];

    return matchesSearch && matchesLanguage && matchesCategory && matchesScore;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.score - a.score;
      case "stars":
        return b.stars - a.stars;
      case "updated":
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Open Source
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover and analyze the health, security, and maintenance status
              of popular GitHub repositories.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="flex items-center gap-5">
              <div className="relative w-full">
                <GoOrganization className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter Org Name or Username"
                  value={owner}
                  name="owner"
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm"
                />
              </div>
              /
              <div className="relative w-full">
                <File className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter Repo Name"
                  name="repo"
                  value={repo}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm"
                />
              </div>
            </div>
            <button
              type="button"
              className="px-6 mx-auto flex items-center font-medium gap-3 py-3 rounded-md bg-primary-800 "
            >
              <span>
                <Search className="size-5" />
              </span>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Sliders className="h-5 w-5" />
                </button>
              </div>

              <div
                className={`space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Language
                  </label>
                  <select
                    name="language"
                    value={language}
                    onChange={handleLanguageAndCategorySelection}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Category
                  </label>
                  <select
                    name="category"
                    value={category}
                    onChange={handleLanguageAndCategorySelection}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Score Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Health Score: {scoreRange[0]} - {scoreRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreRange[0]}
                      onChange={(e) =>
                        setScoreRange([
                          parseFloat(e.target.value),
                          scoreRange[1],
                        ])
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scoreRange[1]}
                      onChange={(e) =>
                        setScoreRange([
                          scoreRange[0],
                          parseFloat(e.target.value),
                        ])
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="score">Health Score</option>
                    <option value="stars">Stars</option>
                    <option value="updated">Recently Updated</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Repositories
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1.2M+
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Scanned Today
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    2,847
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Average Score
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    7.3
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {sortedRepos.length} repositories found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing results for your search and filters
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <div className="space-y-1 w-4 h-4">
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Repository Grid/List */}
            {sortedRepos.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 gap-6"
                    : "space-y-4"
                }
              >
                {sortedRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-primary-200 dark:hover:border-primary-700"
                  >
                    <div
                      className={
                        viewMode === "list" && breakpoint !== "sm"
                          ? "flex items-center justify-between"
                          : "space-y-4"
                      }
                    >
                      <div
                        className={
                          viewMode === "list" && breakpoint !== "sm"
                            ? "flex-1"
                            : ""
                        }
                      >
                        {/* Repo Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/repo/${repo.owner}/${repo.name}`}
                              className="font-mono text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              {`${repo.owner}/${repo.name}`}
                            </Link>
                            <a
                              href={`https://github.com/${repo.owner}/${repo.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          </div>
                          {!repo.hasFullData && (
                            <span className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                              Limited Data
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {repo.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span>{repo.language}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{repo.stars.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="h-4 w-4" />
                            <span>{repo.forks.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{repo.lastUpdated}</span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {repo.badges.map((badge, index) => (
                            <span
                              key={index}
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                                badge
                              )}`}
                            >
                              {getBadgeIcon(badge)}
                              <span className="ml-1 capitalize">{badge}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Score and Actions */}
                      <div
                        className={`${
                          viewMode === "list" && breakpoint !== "sm"
                            ? "flex items-center space-x-6"
                            : "flex items-center justify-between"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${getScoreColor(
                              repo.score
                            )} mb-1`}
                          >
                            {repo.score}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Health Score
                          </div>
                        </div>

                        <Link
                          to={`/repo/${repo.owner}/${repo.name}`}
                          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm"
                        >
                          View Report
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No repositories found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    handleReset();
                    setScoreRange([0, 10]);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
            <button
              type="button"
              className="px-5 py-3 rounded-md bg-primary-600 font-medium my-5"
            >
              See more
            </button>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't see your repository?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Add any GitHub repository to get instant health insights. Sign up to
            track repositories, run private scans, and get alerts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter GitHub repository URL..."
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 text-gray-900"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
