"use client";

import { useTableSettings } from "@/hooks/useTableSettings";
import React, { useState } from "react";
import toast from "react-hot-toast";

export type TableColumnSpec = {
  heading: string;
  type: StringConstructor; // using StringConstructor for type as it's more accurate for a type specification
  active: boolean;
};

type TableProps = {
  data: any[]; // you would replace any with a more specific type that matches your row data structure
};


const Table: React.FC<TableProps> = ({ data }) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const { tableSpec } = useTableSettings();

  const handleRowClick = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  if (data.length == 0 || !data) {
    return (
      <div className="w-full h-full flex justify-center items-center font-semibold tracking-wide text-lg text-slate-400">
        Nothing to attest...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            {tableSpec && tableSpec
              .filter((column) => column.active)
              .map((column) => (
                <th
                  key={column.heading}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.heading}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={row.id || rowIndex}>
              <tr
                onClick={() => handleRowClick(row.id)}
                className={`cursor-pointer bg-white transition-colors hover:bg-blue-100 ${
                  expandedRowId === row.id
                    ? "bg-slate-200 hover:bg-slate-300"
                    : ""
                }`}
              >
                {tableSpec && tableSpec
                  .filter((column) => column.active)
                  .map((column) => (
                    <td
                      key={`${row.id}-${column.heading}`}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {row[column.heading.toLowerCase().replace(/\s+/g, "")]}{" "}
                      {/* Assuming row data keys are formatted from column headings */}
                    </td>
                  ))}
              </tr> 
              <tr className="overflow-hidden">
                <td colSpan={tableSpec ? tableSpec.length : 0}>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedRowId === row.id ? "h-auto py-4" : "h-0 py-0"
                    }`}
                  >
                    {/* Expanded content goes here, e.g., a div with more info and action buttons */}
                    {expandedRowId === row.id && (
                      <div className="text-sm text-gray-700 px-4 py-2 flex gap-2 w-full justify-center">
                        {/* Expanded content and action buttons */}
                        <button
                          onClick={() => toast("Comment added")}
                          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Comment
                        </button>
                        <button
                          onClick={() => toast.error("Declined")}
                          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => toast("Forwarded")}
                          className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Forward
                        </button>
                        <button
                          onClick={() => toast.success("Approved")}
                          className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Approve
                        </button>
                        {/* Additional content */}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
