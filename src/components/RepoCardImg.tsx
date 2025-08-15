import { toPng } from "html-to-image";
import {
  Badge,
  Download,
  Eye,
  GitFork,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import { RefObject, useRef } from "react";
import { getScoreBg, getScoreColor } from "./functions";

export default function RepoDetailsImg({ repoData }: { repoData: RepoReport }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const downloadFunction = () => {
    if (ref.current) {
      toPng(ref.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${repoData.full_name}-card.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };
  return (
    <div
      role="button"
      onClick={downloadFunction}
      className="flex gap-3 border-b-2 border-primary-400 pb-2 font-semibold text-sm w-fit items-center text-white"
    >
      {/*  className="absolute opacity-0 -z-50" */}
      <div className="absolute opacity-0 -z-50">
        <ImgCard cardRef={ref} repoData={repoData} />
      </div>
      <Download className="size-5" /> Download Card
    </div>
  );
}

const ImgCard = ({
  cardRef,
  repoData,
}: {
  cardRef: RefObject<HTMLDivElement>;
  repoData: RepoReport;
}) => (
  <div ref={cardRef} className="w-[750px]">
    <div className="bg-white w-full dark:bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-5 sm:space-x-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary-600" />
          <span className="font-mono text-lg font-semibold">
            {repoData.full_name}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>{repoData.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="h-4 w-4" />
            <span>{repoData.forks_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Eye className="h-4 w-4" />
            <span>{repoData.subscribers_count} watchers</span>
          </div>
        </div>
      </div>

      <p className="text-zinc-100 ">
        {repoData.description || "No description"}
      </p>

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

      <div className="text-center">
        <div
          className={`text-5xl font-bold ${getScoreColor(
            repoData.health_score
          )} mb-2`}
        >
          {repoData.health_score}
        </div>
        <div className="text-sm font-semibold text-gray-500">
          Overall Health Score
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`${getScoreBg(
            repoData.scorecard?.score
          )} rounded-xl p-4 text-center`}
        >
          <Shield
            className={`h-6 w-6 ${getScoreColor(
              repoData.scorecard?.score
            )} mx-auto mb-2`}
          />
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Security
          </div>
          <div
            className={`text-2xl font-bold ${getScoreColor(
              repoData.scorecard?.score
            )}`}
          >
            {repoData.scorecard?.score || "N/A"}
          </div>
        </div>

        <div
          className={`${getScoreBg(
            repoData.criticality?.score
          )} rounded-xl p-4 text-center`}
        >
          <TrendingUp
            className={`h-6 w-6 ${getScoreColor(
              repoData.criticality?.score
            )} mx-auto mb-2`}
          />
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Criticality
          </div>
          <div
            className={`text-2xl font-bold ${getScoreColor(
              repoData.criticality?.score
            )}`}
          >
            {repoData.criticality?.score || "N/A"}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <Badge className="h-4 w-4" />
        <span>
          Made from RepoVitals @{" "}
          <span className="text-primary-400">repovitals.com</span>
        </span>
      </div>
    </div>
  </div>
);
