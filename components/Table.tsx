"use client";

import { useTableSettings } from "@/hooks/useTableSettings";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PDFViewer from "./PdfViewer";
import { useAuth } from "@/contexts/AuthContext";
import useCommentModal from "@/hooks/useModal";

export type TableColumnSpec = {
  heading: string;
  type: StringConstructor; // using StringConstructor for type as it's more accurate for a type specification
  active: boolean;
};

type TableProps = {
  data: any[]; // you would replace any with a more specific type that matches your row data structure
  onInstanceApprovedForId: (id: number) => void;
};

const Table: React.FC<TableProps> = ({ data, onInstanceApprovedForId }) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const { tableSpec } = useTableSettings();
  const { user } = useAuth();
  const { openModal } = useCommentModal();

  const handleRowClick = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const handleOnApprove = async (id: number) => {
    try {
      const res = await fetch(`/api/invoice/${id}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employmentId: user?.employmentId,
        }),
      });
      const response = await res.json();
      toast.success(response.message);
      console.log(response)
      onInstanceApprovedForId(id);
    } catch (error: any) {
      //TODO: handle error
      toast.error(error.message);
    }
  };

  const handleOnForward = async (id: number) => {
    try {
      const res = await fetch(`/api/invoice/${id}/forward`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employmentId: user?.employmentId,
        }),
      });
      const response = await res.json();
      toast.success(response.message);
    } catch (error: any) {
      //TODO: handle error
      toast.error(error.message);
    }
  };

  const handleOnComment = async (id: number, comment: string) => {
    openModal();
  };

  const handleGetInvoice = async (id: number) => {
    try {
      const res = await fetch(`/api/invoice/${id}`);
      const response = await res.json();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
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
      <table className="min-w-full  border border-edge-light  dark:border-edge-dark">
        <thead>
          <tr>
            {tableSpec &&
              tableSpec
                .filter((column) => column.active)
                .map((column) => (
                  <th
                    key={column.heading}
                    className="px-6 py-3 border-b border-gray-200 dark:border-edge-dark bg-card-light dark:bg-card-dark text-left text-xs font-medium  uppercase tracking-wider"
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
                className={`cursor-pointer transition-colors hover:bg-black hover:bg-opacity-10 ${
                  expandedRowId === row.id
                    ? "bg-black bg-opacity-20 hover:bg-slate-300"
                    : ""
                }`}
              >
                {tableSpec &&
                  tableSpec
                    .filter((column) => column.active)
                    .map((column) => (
                      <td
                        key={`${row.id}-${column.heading}`}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                      >
                        {row[column.heading.toLowerCase().replace(/\s+/g, "")]}{" "}
                      </td>
                    ))}
              </tr>
              <tr className="overflow-hidden">
                <td colSpan={tableSpec ? tableSpec.length : 0}>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedRowId === row.id
                        ? "h-auto py-4"
                        : "h-0 py-0 border-b border-edge-light dark:border-edge-dark"
                    }`}
                  >
                    {/* Expanded content goes here, e.g., a div with more info and action buttons */}
                    {expandedRowId === row.id && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <PDFViewer pdfURL={row.documentUrl} />
                        <div className=" text-gray-700 px-4 py-2 w-full justify-center grid grid-cols-2 gap-4">
                          <button
                            onClick={() =>
                              handleOnComment(row.id, "Ny kommentar")
                            }
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Comment
                          </button>
                          <button
                            onClick={() => handleOnForward(row.id)}
                            className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Forward
                          </button>
                          <button
                            onClick={() => toast.error("Declined")}
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Decline
                          </button>

                          <button
                            onClick={() => handleOnApprove(row.id)}
                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Approve
                          </button>
                          {/* Additional content */}
                        </div>
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
