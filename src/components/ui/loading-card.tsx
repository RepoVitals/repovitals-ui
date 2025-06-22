import { HTMLAttributes } from "react";
import cn from "../utils";
import { GitFork, Languages, Star } from "lucide-react";

export default function CardLoader() {
  return [...Array(20)].map((_, idx) => (
    <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-primary-200 dark:hover:border-primary-700">
      <div>
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="w-[200px]" />
          </div>

          <div className="line-clamp-2 grid gap-3 py-5">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Languages className="h-4 w-4" />
              <span>
                <Skeleton className="w-[50px]" />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>
                <Skeleton className="w-[50px]" />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-4 w-4" />
              <span>
                <Skeleton className="w-[50px]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}

/**  bg-gray-500 animate-pulse h-5 rounded-full w-full */
const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "bg-gray-500 animate-pulse h-5 rounded-full w-full",
        className
      )}
    ></div>
  );
};
