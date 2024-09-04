"use client";

import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />

      <div className="relative md:ml-64 mt-12">
        <main className="px-4 md:px-10 mx-auto w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
