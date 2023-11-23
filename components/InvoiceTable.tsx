"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContextViewer } from "@/contexts/ViewerContext";
import ContextInvoice from "./ContextInvoice";
import Table from "./Table";

type TableProps = {
  data: Record<string, string>[];
  activeColumns?: string[];
};

const InvoiceTable: React.FC<TableProps> = ({
  data,
  activeColumns = ["SUNO", "SINO", "OAMT", "LOCD"],
}) => {
  const { openViewer } = useContextViewer();

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

  return (
    <Table
      data={data}
      onRowClick={handleRowClick}
      activeColumns={activeColumns}
    >
      <div className="w-full h-full flex justify-center items-center font-semibold tracking-wide text-lg text-slate-400">
        Nothing to attest...
      </div>
    </Table>
  );
};

export default InvoiceTable;
