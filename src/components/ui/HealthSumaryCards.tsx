import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

function HealthSummary({ data }: { data: RepoReport["scorecard"] }) {
  if (!data) {
    return null;
  }

  const top3 = data.checks.filter((check) => check.score === 10).slice(0, 3);
  const mediumVulnurability = data.checks.filter(
    (check) => check.score < 10 && check.score > 5
  )[0];
  const lowest = data.checks.filter((check) => check.score < 5)[0];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Health Summary
      </h3>
      <div className="space-y-5 sm:space-y-3">
        {top3.map((check, idx) => (
          <div key={idx} className="flex sm:items-center space-x-3">
            <CheckCircle className="size-5 shrink-0 text-green-500" />
            <span className="text-gray-600 sm:truncate dark:text-gray-300">
              {check.reason}
            </span>
          </div>
        ))}
        <div className="flex sm:items-center space-x-3">
          <AlertTriangle className="size-5 shrink-0 text-yellow-500" />
          <span className="text-gray-600 sm:truncate dark:text-gray-300">
            {mediumVulnurability.reason}
          </span>
        </div>
        <div className="flex sm:items-center space-x-3">
          <XCircle className="size-5 shrink-0 text-red-500" />
          <span className="text-gray-600 sm:truncate dark:text-gray-300">
            {lowest.reason}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HealthSummary;
