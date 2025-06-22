import { File, Plus, Search, Sliders } from "lucide-react";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoOrganization } from "react-icons/go";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import ExploreUi from "../components/ui/ExploreCards";
import useFetch from "../hooks/useFetch";
import CardLoader from "../components/ui/loading-card";

const Explore: React.FC = () => {
  const { isLoading, data, error, nextPage } = useFetch();

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
  const [initialRepos, setInitialRepos] = useState<Repositories[] | undefined>(
    undefined
  );

  const { category, language } = selectedData;
  const { owner, repo } = searchInput;

  useEffect(() => {
    if (data) setInitialRepos(data.data);
  }, [data]);

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
      const exists = initialRepos?.some(
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
    setScoreRange([0, 10]);
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

  const filteredRepos = initialRepos
    ? [
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
      ]
    : [];

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
                <GoOrganization className="absolute sm:block hidden left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter Org Name or Username"
                  value={owner}
                  name="owner"
                  onChange={handleSearch}
                  className="w-full pl-4 sm:pl-12 pr-4 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm"
                />
              </div>
              /
              <div className="relative w-full">
                <File className="absolute left-4 sm:block hidden top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter Repo Name"
                  name="repo"
                  value={repo}
                  onChange={handleSearch}
                  className="w-full pl-4 sm:pl-12 pr-4 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm"
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

            {isLoading ? (
              <div className="space-y-5">
                <CardLoader />
              </div>
            ) : error ? (
              <p>error...</p>
            ) : (
              <ExploreUi
                repos={sortedRepos}
                handleReset={handleReset}
                viewMode={viewMode}
                nextPage={nextPage}
              />
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
