"use client";

import { initialTableDataSpec } from "@/lib/initial";
import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import this if you're using toasts for notifications

// The type for the table column specifications
type TableColumnSpec = {
  heading: string;
  type: StringConstructor;
  active: boolean;
};

// The custom hook
export const useTableSettings = () => {
  // Directly use initialTableDataSpec if it's static and doesn't change
  const [tableSpec, setTableSpec] = useState<TableColumnSpec[] | null>();

  // Load settings from localStorage
  useEffect(() => {
    const savedSpec = localStorage.getItem("tableSettings");
    let specToSet = initialTableDataSpec;
  
    if (savedSpec) {
      const saved = JSON.parse(savedSpec);
      if (saved.length === initialTableDataSpec.length) {
        specToSet = saved;
      }
    }
  
    setTableSpec(specToSet);
  }, []);
   // Removed defaultSpec from dependencies to avoid unnecessary effect triggers

  // Save settings to localStorage when tableSpec changes
  useEffect(() => {
    if (tableSpec) {
      localStorage.setItem("tableSettings", JSON.stringify(tableSpec));
    }
  }, [tableSpec]);

  const toggleColumnActive = (heading: string) => {
    setTableSpec((currentSpec) => {
      // Check if currentSpec is not null or undefined before mapping
      if (!currentSpec) {
        // Handle the case where currentSpec is null or undefined
        // You could return an empty array or the initial state, for example
        return initialTableDataSpec;
      }

      return currentSpec.map((column) =>
        column.heading === heading
          ? { ...column, active: !column.active }
          : column
      );
    });

    toast(`Updated visibility for ${heading}`);
  };

  return {
    tableSpec,
    toggleColumnActive,
  };
};
