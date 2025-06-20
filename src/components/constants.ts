import { Github, Mail, Twitter } from "lucide-react";

export const productLinks = [
  { label: "Explore", path: "/explore" },
  { label: "Pricing", path: "/pricing" },
  { label: "Documentation", path: "/docs" },
];

export const companyLinks = [
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
];

export const connectLinks = [
  { icon: Github, href: "https://github.com/repovitals" },
  {
    icon: Twitter,
    href: "https://twitter.com/intent/follow?screen_name=repovitals",
  },
  { icon: Mail, href: "mailto:support@repovitals.com" },
];

export const repoDataExport = {
  description:
    "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  language: "JavaScript",
  stars: 218000,
  forks: 45200,
  lastUpdated: "2 hours ago",
  overallScore: 9.2,
  scores: {
    security: 8.7,
    maintenance: 9.5,
    popularity: 9.8,
  },
  badges: ["Maintained", "Security Scan", "Popular"],
  scorecardData: {
    lastScan: "2024-01-15",
    checks: [
      {
        name: "Binary-Artifacts",
        score: 10,
        description: "No binary artifacts found",
      },
      {
        name: "Branch-Protection",
        score: 8,
        description: "Branch protection enabled with some gaps",
      },
      {
        name: "CI-Tests",
        score: 10,
        description: "CI tests run on all changes",
      },
      { name: "Code-Review", score: 9, description: "Most changes reviewed" },
      {
        name: "Contributors",
        score: 10,
        description: "Multiple contributors from different organizations",
      },
      {
        name: "Dangerous-Workflow",
        score: 10,
        description: "No dangerous workflow patterns detected",
      },
      {
        name: "Dependency-Update-Tool",
        score: 8,
        description: "Automated dependency updates configured",
      },
      { name: "Fuzzing", score: 0, description: "No fuzzing tools detected" },
      { name: "License", score: 10, description: "License file present" },
      {
        name: "Maintained",
        score: 10,
        description: "Recent activity and maintenance",
      },
      {
        name: "Packaging",
        score: 10,
        description: "Proper packaging configuration",
      },
      {
        name: "Pinned-Dependencies",
        score: 7,
        description: "Most dependencies pinned",
      },
      {
        name: "SAST",
        score: 5,
        description: "Some static analysis tools detected",
      },
      {
        name: "Security-Policy",
        score: 10,
        description: "Security policy documented",
      },
      {
        name: "Signed-Releases",
        score: 0,
        description: "Releases not signed",
      },
      {
        name: "Token-Permissions",
        score: 8,
        description: "GitHub tokens have appropriate permissions",
      },
      {
        name: "Vulnerabilities",
        score: 10,
        description: "No known vulnerabilities",
      },
      {
        name: "Webhooks",
        score: 9,
        description: "Webhooks properly configured",
      },
    ],
  },
  contributors: [
    {
      name: "Dan Abramov",
      contributions: 1247,
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    {
      name: "Sebastian Markbåge",
      contributions: 892,
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    {
      name: "Andrew Clark",
      contributions: 756,
      avatar:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
    {
      name: "Brian Vaughn",
      contributions: 623,
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    },
  ],
  dependencies: {
    total: 127,
    outdated: 8,
    vulnerable: 2,
    recent: [
      {
        name: "typescript",
        version: "5.1.6",
        latest: "5.2.2",
        status: "outdated",
      },
      {
        name: "eslint",
        version: "8.45.0",
        latest: "8.45.0",
        status: "current",
      },
      {
        name: "react-dom",
        version: "18.2.0",
        latest: "18.2.0",
        status: "current",
      },
      {
        name: "webpack",
        version: "5.88.1",
        latest: "5.88.2",
        status: "outdated",
      },
    ],
  },
  activity: [
    {
      type: "commit",
      message: "Fix concurrent mode rendering issue",
      author: "Dan Abramov",
      time: "2 hours ago",
    },
    {
      type: "release",
      message: "Release v18.2.1",
      author: "React Team",
      time: "1 day ago",
    },
    {
      type: "issue",
      message: "Performance improvement for large lists",
      author: "Community",
      time: "2 days ago",
    },
    {
      type: "pr",
      message: "Add support for React DevTools",
      author: "Brian Vaughn",
      time: "3 days ago",
    },
  ],
};
