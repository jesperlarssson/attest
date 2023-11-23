"use client";

import React from "react";
import { useContextViewer } from "@/contexts/ViewerContext";
import Table from "./Table";

type TableProps = {
  data: Record<string, string>[];
};

const TransactionTable: React.FC<TableProps> = ({ data }) => {
  const activeColumns = ["F1A330", "F1PK02", "F1PK03", "F1A230"];
  const { openViewer } = useContextViewer();

  const handleRowClick = (row: any) => {
    openViewer(
      <div className="w-full h-screen flex flex-col justify-center items-center ">
        <p className="text-center font-bold opacity-50">
          {" "}
          Transaction information.
          <br /> To be implemented...
        </p>
        <a
          href="mailto:jesper.larsson@meridion.se?subject=Transaction Information Request&body=It would be useful to be able to..."
          className="mt-4 px-6 py-4 bg-slate-700 hover:bg-slate-800 text-white text-sm rounded-sm uppercase"
        >
          Leave functionality request
        </a>
      </div>
    );
  };

  return (
    <Table
      data={data}
      onRowClick={handleRowClick}
      activeColumns={activeColumns}
    >
      <div className="w-full h-full flex justify-center items-center font-semibold tracking-wide text-lg text-slate-400">
        No transactions...
      </div>
    </Table>
  );
};

export default TransactionTable;
