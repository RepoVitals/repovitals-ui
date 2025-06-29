import useSWR from "swr";
import { fetcher, VITE_API_ENDPOINT } from "../constants";
import { QuickStatsLoader } from "./loading-card";
import { QuickStatsError } from "../error-page";

export default function QuickStatsSection() {
  const key = `${VITE_API_ENDPOINT}/host/github.com/details`;

  const { data, error, isLoading } = useSWR<{ data: QuickStats }>(
    key,
    fetcher,
    {
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) {
    return <QuickStatsError />;
  }

  if (isLoading) return <QuickStatsLoader />;

  const { data: stats } = data!;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Stats
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Name</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {stats.name}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            Total Repositories
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {stats.repositories_count.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            Total Repository Owners
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {stats.owners_count.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
