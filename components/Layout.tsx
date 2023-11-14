"use client";

// components/Layout.tsx
import React, { ReactNode, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Image from "next/image";
import CollapseButton from "./CollapseButton";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const pathname = usePathname();

  if (pathname === "/login") {
    return <div>
      {
        children
      }
    </div>;
  }

  return (
    <div className="flex h-screen ">
      <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out p-3 sm:p-8 ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-20"
        }`}
      >
        <>
         {children}
        </>
      </main>
      <div className="absolute bottom-0 right-0 p-4 opacity-50">
        <Image
          src={"/images/meridion-white.png"}
          width={200}
          height={50}
          alt="Meridion"
        />
      </div>
      {domLoaded && <Toaster position="bottom-right" />}
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
