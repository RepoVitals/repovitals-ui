import axios from "axios";
import { Github, Mail, Twitter } from "lucide-react";

export const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

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
