"use client";

import React from "react";
import { useContextViewer } from "@/contexts/ViewerContext";
import Table from "./Table";
import axios from "axios";
import toast from "react-hot-toast";

type TableProps = {
  data: Record<string, string>[];
};

const TransactionTable: React.FC<TableProps> = ({ data }) => {
  const activeColumns = ["F1A330", "F1PK02", "F1PK03", "F1A230"];
  const tableId = "cugex1-mate_e";
  const { openViewer, closeViewer } = useContextViewer();

  const handleDelete = async (row: any) => {
    console.log("DELETE");
    console.log(row);
    try {
      const res = await axios.post("/api/transaction/delete", {
        file: "MATE_E",
        pk01: row.F1PK01,
        pk02: row.F1PK02,
        pk03: row.F1PK03,
        pk04: row.F1PK04,
        pk05: row.F1PK05,
      });
      toast.success("Transaction deleted");
      closeViewer();
    } catch (error) {
      toast.error("Error when trying to delete");
    }
  };

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
          className="mt-4 px-6 py-4 bg-slate-700 hover:bg-slate-800 text-white text-sm rounded-md uppercase"
        >
          Leave functionality request
        </a>
        <button
          className="mt-4 px-6 py-4 bg-red-200 hover:bg-red-300 text-red-800 font-bold text-sm rounded-md"
          onClick={() => handleDelete(row)}
        >
          Delete this transaction
        </button>
      </div>
    );
  };

  return (
    <Table
      tableId={tableId}
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
