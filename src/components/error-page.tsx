import React, { useState } from "react";
import { RefreshCw, Home, Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  details?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = "Internal server error",
  message = "Something went wrong on our end. Please try again later.",
  details,
}) => {
  const [showDetailView, setShowDetailView] = useState(false);
  const navigate = useNavigate();
  const router = window.location;

  const IconComponent = Bug;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div
        className={`max-w-md w-full bg-red-50 border-red-500 border rounded-2xl shadow-lg animate-fade-in`}
      >
        <div className="p-8 text-center">
          <div
            className={`mx-auto w-16 h-16 text-red-500 mb-6 animate-pulse-slow`}
          >
            <IconComponent size={64} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3 animate-slide-up">
            {title}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed animate-slide-up">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.reload()}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
            >
              <Home size={18} />
              Go Home
            </button>
          </div>

          {/* Details Toggle */}
          {details && (
            <div className="mt-6">
              <button
                onClick={() => setShowDetailView(!showDetailView)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
              >
                {showDetailView ? "Hide Details" : "Show Details"}
              </button>

              {showDetailView && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left animate-slide-up">
                  <h4 className="font-mono text-sm font-semibold text-gray-700 mb-2">
                    Error Details:
                  </h4>
                  <pre className="font-mono text-xs text-gray-600 whitespace-pre-wrap break-words">
                    {details}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function QuickStatsError() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-red-500 mb-4">
        <BiError />
      </h3>

      <span className="font-semibold text-gray-900 dark:text-white">
        An error occured while fetching the quick stats
      </span>
    </div>
  );
}

export default ErrorDisplay;
