import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Minus,
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
