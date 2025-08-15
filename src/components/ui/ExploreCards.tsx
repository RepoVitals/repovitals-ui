import {
    AlertTriangle,
    ExternalLink,
    GitFork,
    Languages,
    Search,
    Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getBreakpoint, getScoreColor } from "../functions";
import cn from "../utils";

type Props = {
  repos: Repositories[];
  viewMode: "grid" | "list";
  handleReset: () => void;
  nextPage: () => void;
};
export default function ExploreUi({
  repos,
  viewMode,
  handleReset,
  nextPage,
}: Props) {
  const breakpoint = getBreakpoint(window.innerWidth);
  return (
    <>
      {repos.length > 0 ? (
        <div
          className={
            viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"
          }
        >
          {repos.map((repo) => (
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
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
      {repos.length > 0 && (
        <button
          onClick={nextPage}
          type="button"
          className="px-5 py-3 rounded-md bg-primary-600 font-medium my-5"
        >
          See more
        </button>
      )}
    </>
  );
}

const RepoCard = ({
  repo,
  viewMode,
  breakPoint,
}: {
  repo: Repositories;
  viewMode: string;
  breakPoint: string;
}) => {
  const mobile = viewMode === "list" && breakPoint !== "sm";
  return (
    <div className="bg-white dark:bg-gray-800 min-w-full rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-primary-200 dark:hover:border-primary-700">
      <div
        className={cn(mobile ? "flex items-center justify-between gap-5" : "space-y-4", "relative")}
      >
        <div className={mobile ? "flex-1" : ""}>
          {/* Repo Header */}
          <div className="flex items-center justify-between w-full gap-5 mb-3">
            <div className="flex items-center truncate space-x-2">
              <Link
                to={`/repo/${repo.full_name}`}
                className="font-mono text-lg  truncate font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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
              <div className={cn("group sm:flex-none flex-1 relative ml-auto", mobile && "absolute left-full right-7 w-fit")}>
                <AlertTriangle className="size-4 text-yellow-400 cursor-help" />
                <p className="text-xs absolute w-fit group-hover:block hidden  animate-fade-in mt-3 left-auto backdrop-blur-3xl -right-2.5 whitespace-nowrap text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                  Limited Data
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {repo.description || "No description"}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              {/* <div className="w-3 h-3 bg-yellow-400 rounded-full"></div> */}
              <Languages className="h-4 w-4" />

              <span>{repo.language || "none"}</span>
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
            mobile
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
            <div className="text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
              VitalScore
            </div>
          </div>

          <Link
            to={`/repo/${repo.full_name}`}
            className="inline-flex items-center whitespace-nowrap px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            View Report
          </Link>
        </div>
      </div>
    </div>
  );
};
