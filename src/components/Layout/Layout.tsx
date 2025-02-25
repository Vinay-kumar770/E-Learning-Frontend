import React from "react";
import "./Layout.css";
import Navbar from "../UI/Navigation/Navbar/Navbar";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="Content">{children}</main>
    </>
  );
};

export default Layout;
