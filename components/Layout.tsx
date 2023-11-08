"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

// Define the type for the props expected by the Layout component
type LayoutProps = {
  children: ReactNode;
};

// Define the functional component with the type of its props
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {children}
      {domLoaded && <Toaster position="bottom-center" />}
    </>
  );
};

export default Layout;
