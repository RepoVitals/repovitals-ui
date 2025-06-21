import {
  ExternalLink,
  File,
  GitFork,
  Languages,
  Plus,
  Search,
  Sliders,
  Star,
} from "lucide-react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { repositories } from "../components/constants";
import { GoOrganization } from "react-icons/go";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { getBreakpoint, getScoreColor } from "../components/functions";

const Explore: React.FC = () => {
  const [searchInput, setSearchInput] = useState({
    owner: "",
    repo: "",
  });
  const [scoreRange, setScoreRange] = useState([0, 10]);
  const [sortBy, setSortBy] = useState("score");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedData, setSelectedData] = useState({
    language: "all",
    category: "all",
  });
  const [loading, setLoading] = useState(false);
  const [initialRepos, setInitialRepos] = useState(repositories);

  const breakpoint = getBreakpoint(window.innerWidth);
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

  const fetchRepository = async (owner: string, repo: string) => {
    setLoading(true);
    const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const apiParams = `host/github.com/repositories/${owner}/${repo}`;

    try {
      const { data } = await axios.get<ApiRes>(
        `${VITE_API_ENDPOINT}/${apiParams}`
      );

      console.log(data);

      if (data.success && !data.data) {
        toast.error(`Repo not found with format: ${owner}/${repo}`);
        setLoading(false);
        return;
      }

      if (!data.success) {
        toast.error(data.message);
      }

      setInitialRepos([data.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(err instanceof Error ? err.message : "Internal error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (owner.trim() && repo.trim()) {
      const exists = initialRepos.some(
        (r) =>
          r.owner.toLowerCase() === owner.toLowerCase() &&
          r.full_name.toLowerCase() === `${owner}/${repo}`.toLowerCase()
      );

      if (!exists) {
        await fetchRepository(owner, repo);
      }
    }
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

  const filteredRepos = [
    ...initialRepos.filter((repoItem) => {
      const matchesSearch =
        repoItem.full_name
          .toLowerCase()
          .includes(`${owner}/${repo}`.toLowerCase()) ||
        repoItem.owner.toLowerCase().includes(owner.toLowerCase());
      const matchesLanguage =
        language === "all" || repoItem.language === language;
      // const matchesCategory =
      //   category === "all" || repoItem.category === category;
      const matchesScore =
        repoItem?.health_score >= scoreRange[0] &&
        repoItem?.health_score <= scoreRange[1];

      return matchesSearch && matchesLanguage && matchesScore;
    }),
  ];

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.health_score - a.health_score;
      case "stars":
        return b.stargazers_count - a.stargazers_count;
      case "updated":
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case "name":
        return a.full_name.localeCompare(b.full_name);
      default:
        return 0;
    }
  });
  console.log(sortedRepos[0], filteredRepos[0], sortedRepos);

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
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto space-y-5"
          >
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
              type="submit"
              className="px-6 mx-auto flex items-center font-medium gap-3 py-3 rounded-md bg-primary-800"
              disabled={loading}
            >
              {loading ? (
                <span>Searching...</span>
              ) : (
                <>
                  <Search className="size-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </form>
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
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    viewMode={viewMode}
                    breakPoint={breakpoint}
                  />
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
            {sortedRepos.length > 0 && (
              <button
                type="button"
                className="px-5 py-3 rounded-md bg-primary-600 font-medium my-5"
              >
                See more
              </button>
            )}
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

const RepoCard = ({
  repo,
  viewMode,
  breakPoint,
}: {
  repo: Repositories;
  viewMode: string;
  breakPoint: string;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-primary-200 dark:hover:border-primary-700">
      <div
        className={
          viewMode === "list" && breakPoint !== "sm"
            ? "flex items-center justify-between"
            : "space-y-4"
        }
      >
        <div
          className={viewMode === "list" && breakPoint !== "sm" ? "flex-1" : ""}
        >
          {/* Repo Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Link
                to={`/repo/${repo.full_name}`}
                className="font-mono text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {`${repo.full_name}`}
              </Link>
              <a
                href={`https://github.com/${repo.full_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            {(!repo.scorecard || !repo.criticality) && (
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
              {/* <div className="w-3 h-3 bg-yellow-400 rounded-full"></div> */}
              <Languages className="h-4 w-4" />

              <span>{repo.language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-4 w-4" />
              <span>{repo.forks_count.toLocaleString()}</span>
            </div>
            {/* <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className="capitalize">{dayjs().to(dayjs(new Date(repo.updated_at)))}</span>
            </div> */}
          </div>

          {/* Badges */}
          {/* <div className="flex flex-wrap gap-2 mb-4">
            {repo?.badges?.map((badge, index) => (
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
          </div> */}
        </div>

        {/* Score and Actions */}
        <div
          className={`${
            viewMode === "list" && breakPoint !== "sm"
              ? "flex items-center space-x-6"
              : "flex items-center justify-between"
          }`}
        >
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${getScoreColor(
                repo.health_score
              )} mb-1`}
            >
              {repo.health_score}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Health Score
            </div>
          </div>

          <Link
            to={`/repo/${repo.full_name}`}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            View Report
          </Link>
        </div>
      </div>
    </div>
  );
};
