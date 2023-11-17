"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PDFViewer from "./PdfViewer";

export type TableColumnSpec = {
  heading: string;
  type: StringConstructor;
  active: boolean;
};

type RecordObject = {
  [key: string]: string;
};

function transformData(
  inputArray: Array<{ REPL: string }>,
  idColumnName?: string | null
): RecordObject[] {
  if (inputArray.length === 0) {
    return [];
  }

  // Extract column names from the first element
  const columnNames = inputArray[0].REPL.split(";"); //TODO: byta separerare?

  
    // Find the index of the id column
    const idColumnIndex = columnNames.indexOf(idColumnName ?? "");
    // if (idColumnIndex === -1) {
    //   throw new Error(`Column name "${idColumnName}" not found.`);
    // }
  

  // Transform the rest of the array
  return inputArray.slice(1).map((item) => {
    const values = item.REPL.split(";");
    const record: RecordObject = {};

    columnNames.forEach((columnName, index) => {
      record[columnName] = values[index];
    });

    // Add the 'id' attribute
    record["id"] = values[idColumnIndex];

    return record;
  });
}

function mapToTableColumnSpecs(columns: string): TableColumnSpec[] {
  return columns.split(";").map((columnName) => ({
    heading: columnName,
    type: String,
    active: true,
  }));
}

type TableProps = {
  data: any[];
  idAttribute: string | null;
};

const M3Table: React.FC<TableProps> = ({
  data,
  idAttribute = null,
}) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const initialTableDataSpec = mapToTableColumnSpecs(data[0].REPL);
  const [tableSpec, setTableSpec] = useState<TableColumnSpec[]>();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const columns = mapToTableColumnSpecs(data[0].REPL);
    const passedRows = transformData(data, idAttribute);
    setRows(passedRows);
    setTableSpec(columns);
  }, []);

  const handleRowClick = (id: string) => {
    if (idAttribute) {
      setExpandedRowId(expandedRowId === id ? null : id);
    }
  };

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

  if (rows.length == 0 || !rows) {
    return (
      <div className="w-full h-full flex justify-center items-center font-semibold tracking-wide text-lg text-slate-400">
        Nothing to attest...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* <div>
        <button onClick={() => toggleColumnActive("EPDIVI")}>EDIT</button>
      </div> */}
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
          {rows.map((row, rowIndex) => (
            <React.Fragment key={`${row.id}-${rowIndex}` || rowIndex}>
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
                        {row[column.heading.replace(/\s+/g, "")]}{" "}
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
                    {expandedRowId === row.id && idAttribute && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <PDFViewer pdfURL={row.documentUrl} />
                        <div className=" text-gray-700 px-4 py-2 w-full justify-center grid grid-cols-2 gap-4">
                          <button
                            onClick={() => {}}
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Comment
                          </button>
                          <button
                            onClick={() => {}}
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
                            onClick={() => {}}
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

export default M3Table;
