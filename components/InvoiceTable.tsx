"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PDFViewer from "./PdfViewer";
import { useContextViewer } from "@/contexts/ViewerContext";
import ContextInvoice from "./ContextInvoice";
import { transformData } from "@/lib/transformM3Data";
import { SupplierInvoiceM3 } from "@/types";
import { mapKeyToHeading } from "@/lib/mapKeyToHeadings";

export type TableColumnSpec = {
  heading: string;
  M3Heading: string;
  active: boolean;
};



const activeColumns = ["SUNO", "SINO", "OAMT", "LOCD"];

const createTableColumnSpecs = (
  data: Record<string, string>
): TableColumnSpec[] => {
  return Object.keys(data).map((key) => ({
    heading: mapKeyToHeading(key),
    M3Heading: key,
    active: activeColumns.includes(key), //data[key] !== "" && data[key] !== "0",
  }));
};

type TableProps = {
  data: Record<string, string>[];
};

const InvoiceTable: React.FC<TableProps> = ({ data }) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const { openViewer } = useContextViewer();

  const initialTableDataSpec = createTableColumnSpecs(data[0]);
  const [tableSpec, setTableSpec] = useState<TableColumnSpec[]>();
  const [rows, setRows] = useState<any[]>(data);

  useEffect(() => {
    setTableSpec(initialTableDataSpec);
    setRows(data);
  }, []);

  const handleRowClick = (row: any) => {
    openViewer(
      <ContextInvoice
        invoiceId={row.SINO}
        amount={row.OAMT}
        currency={row.LOCD}
        epdudt={row.EPDUDT}
        epivdt={row.EPIVDT}
        invoice={row}
        pdfUrl="/docs/invoice.pdf"
      ></ContextInvoice>
    );
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
      <table className="min-w-full  border border-edge-light  dark:border-edge-dark">
        <thead>
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
                onClick={() => handleRowClick(row)}
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
                        {row[column.M3Heading.replace(/\s+/g, "")]}{" "}
                      </td>
                    ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
