"use client";

import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute";
import Table from "@/components/Table";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Invoice {
  id: number;
  date: string;
  supplier: string;
  invno: string;
  amount: number;
  authorizer: string;
  documentUrl: string;
  // Include additional fields as needed based on your data structure
}

const Home = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const checkForInvoices = async () => {
      try {
        const res = await fetch(
          `/api/invoice/get-pending/${user?.employmentId}`
        );
        const response = await res.json();
        setInvoices(response);
      } catch (error) {}
    };
    if (user) {
      checkForInvoices();
    }
  }, [user]);

  const handleInstanceApproved = (id: number) => {
    setInvoices((currentInvoices) =>
      currentInvoices.filter((invoice) => invoice.id !== id)
    );
  };

  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col ">
        <div className="w-full flex justify-between items-center mb-4">
          <PageTitle>Invoices</PageTitle>
          <button
            onClick={() => toast.error("Failed to reload")}
            className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer opacity-40 hover:opacity-100 hover:text-gray-800 hover:bg-gray-400  hover:duration-300 hover:ease-linear focus:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 489.533 489.533"
            >
              <g>
                <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z" />
              </g>
            </svg>
          </button>
        </div>
        <Table
          data={invoices}
          onInstanceApprovedForId={(id) => handleInstanceApproved(id)}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Home;
