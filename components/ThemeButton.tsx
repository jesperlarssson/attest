"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeButton: React.FC = () => {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default ThemeButton;
