"use client";
import { useState } from "react";
import Drawer from "../Drawer";
import Footer from "../Footer";
import Header from "../Header";
import AOSInit from "../../aos";
import { useMediaQuery } from "react-responsive";

import { Toaster } from "react-hot-toast";

export default function Layout({ children, childrenClasses, user, category }) {
  const [drawer, setDrawer] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ top: isMobile ? 15 : 115 }}
      />
      <AOSInit />
      <Drawer
        open={drawer}
        action={() => setDrawer(!drawer)}
        category={category}
      />
      <div className="w-full h-full overflow-hidden">
        <Header
          drawerAction={() => setDrawer(!drawer)}
          user={user}
          category={category}
        />
        <main className={`w-full  ${childrenClasses || ""}`}>
          {children && children}
        </main>

        <Footer />
      </div>
    </>
  );
}
