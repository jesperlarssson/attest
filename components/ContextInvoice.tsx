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
import Head from "next/head";
import Image from "next/image";

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

  const [pdfDocumentUrl, setPdfDocumentUrl] = useState<string>("");
  const [imageDocumentUrl, setImageDocumentUrl] = useState();

  const handleOnComment = () => {
    openModal({
      pk01: invoice.F1PK01,
      pk02: invoice.F1PK02,
      pk03: invoice.F1PK03,
    });
  };

  const handleOpenPDF = () => {
    if (pdfDocumentUrl) {
      window.open(pdfDocumentUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleOnForward = () => {
    toast.success(
      `Invoice forwarded to ${nextAttestant} (not implemented yet)`
    );
    closeViewer();
  };

  const handleOnApprove = () => {
    let invoiceNumberStr = invoice.F1A030;
    let invoiceNumber = parseInt(invoiceNumberStr, 10);
    invoiceNumber += 1;
    invoiceNumberStr = invoiceNumber.toString();

    const res = axios.post("/api/invoice/approve", {
      file: "MATE_H",
      pk01: invoice.F1PK01,
      pk02: invoice.F1PK02,
      pk03: invoice.F1PK03,
      a030: invoiceNumberStr,
      a130: user?.nextLevel?.id,
      user: user?.id,
    });
    toast.promise(res, {
      loading: "Loading",
      success: "Successfully approved",
      error: "Failed to approve",
    });
  };

  const fetchTestIDMDocument = async () => {
    try {
      const res = await axios.get("/api/invoice/get-test-document");
      setPdfDocumentUrl(res.data.item.resrs.res[0].url);
      setImageDocumentUrl(res.data.item.resrs.res[1].url);
      console.log(res);
    } catch (error) {
      toast.error("Ajdå...");
    }
  };

  useEffect(() => {
    fetchTestIDMDocument();
  }, []);

  return (
    <>
      <div className="p-8 h-screen overflow-y-scroll">
        <PageTitle>Attest Invoice</PageTitle>
        <div className="grid grid-cols-2 gap-4">
          <div>
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
          </div>
          <div>
            {imageDocumentUrl ? (
              <div
                className="cursor-pointer rounded-md border border-edge-dark border-opacity-20 overflow-hidden max-w-fit transform transition ease-in-out hover:shadow-xl hover:-translate-y-2"
                title="Open in new window"
                onClick={handleOpenPDF}
              >
                <Image
                  width={400}
                  height={600}
                  alt="Document preview"
                  src={imageDocumentUrl}
                />
              </div>
            ) : (
              <div className="border border-edge-dark border-opacity-20 shadow rounded-md p-8 max-w-fit">
                <div className="animate-pulse flex flex-col gap-8 w-80">
                  <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContextInvoice;
