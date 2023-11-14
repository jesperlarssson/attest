"use client";

import React from "react";
import { useTableSettings } from "@/hooks/useTableSettings";

const SettingsContent = () => {
  const { tableSpec, toggleColumnActive } = useTableSettings();

  return (
    <div className="container mx-auto w-full mt-4">

      <div className="mb-10">
        <h3 className="text-lg leading-6 font-medium  mb-4">M3 Connection</h3>
        <div className="shadow overflow-hidden rounded-md">
          <div className="px-4 py-5 bg-card-light dark:bg-card-dark border border-edge-light dark:border-edge-dark space-y-6 sm:p-6">
            <input 
              className="appearance-none block w-full px-3 py-2 border border-edge-light dark:border-edge-dark rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="M3 CE URL" 
            />
            <input 
              className="appearance-none block w-full px-3 py-2 border border-edge-light dark:border-edge-dark rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Token" 
            />
            <button 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg leading-6 font-medium  mb-4">Table Column Editor</h3>
        <div className="shadow overflow-hidden rounded-md">
          <div className="px-4 py-5 bg-card-light dark:bg-card-dark border border-edge-light dark:border-edge-dark space-y-6 sm:p-6">
            {tableSpec && tableSpec.map((column) => (
              <div key={column.heading} className="flex items-center">
                <input
                  id={`toggle_${column.heading}`}
                  name={`toggle_${column.heading}`}
                  type="checkbox"
                  checked={column.active}
                  onChange={() => toggleColumnActive(column.heading)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-edge-light dark:border-edge-dark rounded"
                />
                <label htmlFor={`toggle_${column.heading}`} className="ml-3 block text-sm font-medium opacity-80">
                  {column.heading}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
