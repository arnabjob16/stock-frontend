import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
  <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
