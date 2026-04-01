import { type PropsWithChildren } from "react";
import { Outlet } from "react-router";

import ScrollToTop from "../components/ScrollToTop";
import Footer from "./LayoutElements/Footer";
import Navbar from "./LayoutElements/Navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-screen">
      <ScrollToTop />
      <Navbar />
      {children ? children : <Outlet />}
      <Footer />
    </div>
  );
}
