import { mapKeyToHeading } from "@/lib/mapKeyToHeadings";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type TableProps = {
  tableId: string;
  data: Record<string, string>[];
  activeColumns: string[];
  onRowClick: (row: any) => void;
  children: React.ReactNode;
};

export type TableColumnSpec = {
  heading: string;
  M3Heading: string;
  active: boolean;
};

const Table: React.FC<TableProps> = ({
  tableId,
  data,
  onRowClick,
  activeColumns,
  children,
}) => {
  if (data.length == 0 || !data) {
    return children;
  }

  const createTableColumnSpecs = (
    data: Record<string, string>
  ): TableColumnSpec[] => {
    return Object.keys(data).map((key) => ({
      heading: mapKeyToHeading(key),
      M3Heading: key,
      active: activeColumns.includes(key),
    }));
  };

  const initialTableDataSpec = createTableColumnSpecs(data[0]);
  const [tableSpec, setTableSpec] = useState<TableColumnSpec[]>();
  const [rows, setRows] = useState<any[]>(data);

  const setColumnSetupFromStringArray = (list: string[]) => {
    setTableSpec((currentSpec) => {
      if (!currentSpec) {
        return;
      }

      return currentSpec.map((column) => ({
        ...column,
        active: list.includes(column.M3Heading),
      }));
    });
  };

  useEffect(() => {
    setTableSpec(initialTableDataSpec);
    setRows(data);
    const savedColumnSetup = localStorage.getItem(tableId);
    if (savedColumnSetup) {
      const savedColumnSetupObject = JSON.parse(savedColumnSetup);
      setColumnSetupFromStringArray(savedColumnSetupObject);
    }
  }, []);

  const toggleColumnActive = (heading: string) => {
    setTableSpec((currentSpec) => {
      // Check if currentSpec is not null or undefined before mapping
      if (!currentSpec) {
        // Handle the case where currentSpec is null or undefined
        // You could return an empty array or the initial state, for example
        return initialTableDataSpec;
      }

      return currentSpec.map((column) =>
        column.M3Heading === heading
          ? { ...column, active: !column.active }
          : column
      );
    });
    // Store only the active column headings in localStorage
    const activeHeadings =
      tableSpec &&
      tableSpec
        .filter((column) =>
          column.M3Heading === heading ? !column.active : column.active
        )
        .map((column) => column.M3Heading);

    localStorage.setItem(tableId, JSON.stringify(activeHeadings));
    toast(`Updated visibility for ${heading}`);
  };

  const [editModeOpen, setEditModeOpen] = useState<boolean>(false);

  const handleUseDefault = () => {
    setColumnSetupFromStringArray(activeColumns);
    localStorage.setItem(tableId, JSON.stringify(activeColumns));
  };

  return (
    <>
      {editModeOpen && (
        <div className="flex gap-2 flex-wrap mb-2">
          {tableSpec?.map((column) => {
            return (
              <button
                key={column.M3Heading}
                title={
                  column.active
                    ? `Click to deactivate (${column.M3Heading})`
                    : `Click to activate (${column.M3Heading})`
                }
                onClick={() => toggleColumnActive(column.M3Heading)}
                className={twMerge(
                  `rounded-md px-2 py-1 text-xs hover:shadow-md`,
                  column.active
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-200 hover:bg-red-300"
                )}
              >
                {column.heading}
              </button>
            );
          })}
          <button
            onClick={handleUseDefault}
            className="rounded-md px-2 py-1 text-xs hover:shadow-md bg-slate-300 hover:bg-slate-400"
          >
            Use default
          </button>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full  border border-edge-light  dark:border-edge-dark">
          <thead
            title="Double-click to edit"
            onDoubleClick={() => setEditModeOpen(!editModeOpen)}
          >
            <tr>
              {tableSpec &&
                tableSpec
                  .filter((column) => column.active)
                  .map((column) => (
                    <th
                      key={column.M3Heading}
                      className="px-6 py-3 border-b border-gray-200 dark:border-edge-dark bg-slate-600 text-white dark:bg-slate-600 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      {column.heading}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-card-dark">
            {rows.map((row, rowIndex) => (
              <React.Fragment key={`${row.id}-${rowIndex}` || rowIndex}>
                <tr
                  onClick={() => onRowClick(row)}
                  className={`cursor-pointer transition-colors hover:bg-black hover:bg-opacity-10`}
                >
                  {tableSpec &&
                    tableSpec
                      .filter((column) => column.active)
                      .map((column) => (
                        <td
                          key={`${row.id}-${column.heading}`}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          {row[column.M3Heading.replace(/\s+/g, "")]}{" "}
                        </td>
                      ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
