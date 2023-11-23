"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PDFViewer from "./PdfViewer";
import PageTitle from "./PageTitle";
import toast from "react-hot-toast";
import { useContextViewer } from "@/contexts/ViewerContext";
import useModal from "@/hooks/useModal";
import axios from "axios";
import { SupplierInvoiceM3 } from "@/types";
import { mapKeyToHeading } from "@/lib/mapKeyToHeadings";

interface ContextInvoiceProps {
  invoice: SupplierInvoiceM3;
  invoiceId: string;
  amount: string;
  currency: string;
  epivdt?: string;
  epdudt?: string;
  pdfUrl: string;

  children?: React.ReactNode;
}

const ContextInvoice: React.FC<ContextInvoiceProps> = ({
  invoice,
  invoiceId,
  amount,
  currency,
  epivdt,
  epdudt,
  pdfUrl,
  children,
}) => {
  const { user } = useAuth();
  const { closeViewer } = useContextViewer();
  const { openModal } = useModal();
  const nextAttestant = user?.nextLevel?.fullName;
  const shownKeys = [
    "YEA4",
    "JRNO",
    "VONO",
    "APCD",
    "APRV",
    "TBCU",
    "TXCU",
    "RGDT",
    "SUNO",
    "SINO",
    "OAMT",
    "LOCD",
  ];

  const [pdfUrlTest, setPdfUrlTest] = useState<string>("");

  const handleOnComment = () => {
    openModal(invoiceId);
  };

  const handleOnForward = () => {
    toast.success(
      `Invoice forwarded to ${nextAttestant} (not implemented yet)`
    );
    closeViewer();
  };

  const handleOnApprove = () => {
    let invoiceNumberStr = invoice.F1A030;
    let invoiceNumber = parseInt(invoiceNumberStr, 10); // The '10' is for decimal base
    invoiceNumber += 1;
    invoiceNumberStr = invoiceNumber.toString();

    const res = axios.post("/api/invoice/approve", {
      file: "MATE_H",
      pk01: invoice.F1PK01,
      pk02: invoice.F1PK02,
      pk03: invoice.F1PK03,
      a030: invoiceNumberStr,
      a130: user?.nextLevel?.id,
      user: user?.id
    });
    toast.promise(res, {
      loading: "Loading",
      success: "Successfully aprroved",
      error: "Failed to approve",
    });
  };

  const fetchTestIDMDocument = async () => {
    try {
      const res = await axios.get("/api/invoice/get-test-document");
      setPdfUrlTest(res.data.item.resrs.res[0].url);
      console.log(res);
    } catch (error) {
      toast.error("Ajdå...");
    }
  };

  useEffect(() => {
    //fetchTestIDMDocument();
  }, []);

  return (
    <div className="p-8 overflow-y-scroll">
      <PageTitle>Attest Invoice</PageTitle>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(invoice).map(([key, value]) => {
          if (shownKeys.includes(key)) {
            return (
              <div key={key} className="flex items-center">
                <span className="font-bold" title={key}>
                  {mapKeyToHeading(key)}:
                </span>
                <span className="ml-2">{value}</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      {nextAttestant && (
        <p className="mt-10">
          <span className="font-bold">Forward to:</span> {nextAttestant}
        </p>
      )}
      <div className="flex gap-4 my-8">
        <button
          onClick={handleOnComment}
          className="inline-block rounded bg-slate-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-700 transition duration-150 ease-in-out hover:bg-slate-200 focus:bg-slate-200 focus:outline-none focus:ring-0 active:bg-slate-300"
        >
          Comment
        </button>
        <button
          onClick={handleOnForward}
          className="inline-block rounded bg-slate-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-700 transition duration-150 ease-in-out hover:bg-slate-200 focus:bg-slate-200 focus:outline-none focus:ring-0 active:bg-slate-300"
        >
          Forward
        </button>
        <button
          onClick={handleOnApprove}
          className="inline-block rounded bg-slate-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Approve
        </button>
      </div>
      <div>
        <PDFViewer pdfURL={pdfUrlTest} />
      </div>
    </div>
  );
};

export default ContextInvoice;
