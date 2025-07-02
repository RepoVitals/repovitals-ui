import React from "react";
import { ExternalLink } from "lucide-react";

interface NoDatatDisplayProps {
  title?: string;
  message?: string;
  type: string;
}

const NoDataDisplay: React.FC<NoDatatDisplayProps> = ({
  title = "Data Not Available",
  message = "Something went wrong on our end. Please try again later.",
  type = "criticality",
}) => {
  return (
    <div className="flex items-center justify-center p-4 ">
      <div
        className={`max-w-md w-full border-gray-900 border rounded-2xl shadow-lg animate-fade-in`}
      >
        <div className="p-8 text-center space-y-5">
          {/* Title */}
          <h1 className="text-2xl font-bold text-white animate-slide-up">
            {title}
          </h1>

          {/* Message */}
          <p className="text-gray-400 leading-relaxed animate-slide-up">
            {message}
          </p>

          <p className="text-gray-200">
            Join the waitist to request free {type} scans
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={"https://forms.gle/1VstyhtcFYkce562A"}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
            >
              <ExternalLink size={18} /> Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDataDisplay;
