import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "sonner";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

interface LayoutProps {
  children: React.ReactNode;
}

dayjs.extend(relativeTime);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
