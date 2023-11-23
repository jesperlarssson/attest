"use client";

// components/Layout.tsx
import React, { ReactNode, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CommentModal from "./CommentModal";
import ContextViewer from "./ContextViewer";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved).value : true;
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "sidebarOpen",
      JSON.stringify({ value: isSidebarOpen })
    );
  }, [isSidebarOpen]);

  useEffect(() => {
    const sidebarOpen = localStorage.getItem("sidebarOpen");
    if (sidebarOpen) {
      setIsSidebarOpen(JSON.parse(sidebarOpen).value);
    } else {
      setIsSidebarOpen(true);
    }
    setDomLoaded(true);
  }, []);

  const pathname = usePathname();

  if (pathname === "/login") {
    return <div>{children}</div>;
  }

  return (
    <div className="flex h-screen ">
      <Sidebar
        isSidebarOpen={isSidebarOpen ?? true}
        onToggleSidebar={toggleSidebar}
      />

      {/* Main content area */}
      <main
        className={`flex-1 transition-all z-10 duration-300 ease-in-out p-3 sm:p-8 ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-20"
        }`}
      >
        <>{children}</>
      </main>
      <ContextViewer />

      <div className="fixed bottom-0 right-0 p-4 z-0 opacity-50">
        <Image
          src={"/images/meridion-white.png"}
          width={200}
          height={50}
          alt="Meridion"
        />
      </div>
      {domLoaded && <Toaster position="bottom-right" />}
      <CommentModal />
    </div>
  );
};

export default Layout;

// import React, { ReactNode, useState, useEffect } from "react";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// // Define the type for the props expected by the Layout component
// type LayoutProps = {
//   children: ReactNode;
// };

// // Define the functional component with the type of its props
// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [domLoaded, setDomLoaded] = useState(false);

//   useEffect(() => {
//     setDomLoaded(true);
//   }, []);

//   return (
//     <>
//       <Navbar />
//       {children}
//       <Footer />
//       {domLoaded && <Toaster position="bottom-right" />}
//     </>
//   );
// };

// export default Layout;
