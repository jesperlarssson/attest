// InvoiceDetails.tsx
import React from "react";
import { twMerge } from "tailwind-merge";
import { InvoiceData } from "@/lib/dummy-backend";

interface InvoiceDetailsProps {
  invoice: InvoiceData | any;
  clearSelection: () => void; // Function to clear the selected invoice
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoice,
  clearSelection,
}) => {
  // Implement functions for handling different actions
  const handleEnterNote = () => {
    // Implement the logic to enter a note
    console.log("Entering note for invoice", invoice.invoiceNumber);
  };

  const handleForward = () => {
    // Implement the logic to forward an invoice
    console.log("Forwarding invoice", invoice.invoiceNumber);
  };

  const handleApprove = () => {
    // Implement the logic to approve an invoice
    console.log("Approving invoice", invoice.invoiceNumber);
  };

  return (
    <div
      className={twMerge(
        "p-4 sm:p-6 rounded-lg w-full h-full border border-gray-300",
        invoice
          ? "bg-white shadow-lg absolute top-0 left-0 w-full h-full sm:relative"
          : "bg-gray-200 shadow-inner flex justify-center items-center"
      )}
    >
      {invoice ? (
        <>
          <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-bold mb-4">Invoice Details</h3>
          <dl className="mb-4">
            <dt className="font-semibold">Date of Arrival:</dt>
            <dd className="mb-2">{invoice.dateOfArrival}</dd>
            <dt className="font-semibold">Supplier:</dt>
            <dd className="mb-2">{invoice.supplier}</dd>
            <dt className="font-semibold">Invoice Number:</dt>
            <dd className="mb-2">{invoice.invoiceNumber}</dd>
            <dt className="font-semibold">Amount:</dt>
            <dd className="mb-2">{invoice.amount}</dd>
            <dt className="font-semibold">Authorizer:</dt>
            <dd className="mb-2">{invoice.authorizer}</dd>
            {/* Add more details as needed */}
          </dl>
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={clearSelection}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <button
              onClick={handleEnterNote}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enter Note
            </button>
            <button
              onClick={handleForward}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Forward
            </button>
            <button
              onClick={handleApprove}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Approve
            </button>
          </div>
          </div>
        </>
      ) : (
        <div className="font-bold opacity-30">Select an invoice...</div>
      )}
    </div>
  );
};

export default InvoiceDetails;
