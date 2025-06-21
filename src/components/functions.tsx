import {
  AlertCircle,
  AlertTriangle,
  Award,
  CheckCircle,
  Minus,
  Shield,
  TrendingUp,
  XCircle,
} from "lucide-react";

export const getCheckIcon = (score: number) => {
  if (score === -1) return <Minus className="h-4 w-4 text-gray-400" />;
  if (score >= 8) return <CheckCircle className="h-4 w-4 text-green-500" />;
  if (score >= 6) return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  if (score >= 4) return <AlertTriangle className="h-4 w-4 text-orange-500" />;
  return <XCircle className="h-4 w-4 text-red-500" />;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getBadgeIcon = (badge: string) => {
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

export const getBadgeColor = (badge: string) => {
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

export function getBreakpoint(width: number): string {
  if (width < 640) return "sm";
  if (width < 768) return "md";
  if (width < 1024) return "lg";
  if (width < 1280) return "xl";
  return "2xl";
}

export const getScoreColor = (score: number) => {
  if (score >= 8) return "text-green-600 dark:text-green-400";
  if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
};

// useEffect(() => {
//   const handleResize = () => {
//     const newBreakpoint = getBreakpoint(window.innerWidth);
//     setBreakpoint(newBreakpoint);
//   };

//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);
