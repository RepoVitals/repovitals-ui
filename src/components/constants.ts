import axios from "axios";
import { Linkedin, Mail } from "lucide-react";
import { BsGithub, BsTwitter } from "react-icons/bs";

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
  { icon: BsGithub, href: "https://github.com/repovitals" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/showcase/repovitalsapp",
  },
  {
    icon: BsTwitter,
    href: "https://twitter.com/intent/follow?screen_name=repovitals",
  },
  { icon: Mail, href: "mailto:support@repovitals.com" },
];
