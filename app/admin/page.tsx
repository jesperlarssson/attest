"use client";

import InvoiceTable from "@/components/InvoiceTable";
import M3Table from "@/components/M3Table";
import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute";
import Table from "@/components/Table";
import TransactionTable from "@/components/TransactionTable";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
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
  const [invoices, setInvoices] = useState();
  const [transactions, setTransactions] = useState();
  const { user } = useAuth();

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`/api/invoice/admin/transactions`);
      const sortedTransactions = res.data.sort(
        (a: any, b: any) =>
          new Date(b.F1A330).getTime() - new Date(a.F1A330).getTime()
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      toast.error("Error fetching transactions");
    }
  };

  const checkForInvoices = async () => {
    try {
      const res = await axios.get(`/api/invoice/admin/get-invoices`);
      setInvoices(res.data);
    } catch (error) {
      toast.error("Error fetching invoices");
    }
  };

  const reload = async () => {
    try {
      if (user) {
        await fetchTransactions();
        await checkForInvoices();
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
      checkForInvoices();
    }
  }, [user]);

  // const handleInstanceApproved = (id: number) => {
  //   setInvoices((currentInvoices) =>
  //     currentInvoices.filter((invoice) => invoice.id !== id)
  //   );
  // };
  if (!invoices || !transactions) {
    return (
      <ProtectedRoute>
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-pulse rounded-full bg-slate-400 w-10 h-10"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col ">
        <div className="w-full flex justify-between items-center mb-4">
          <PageTitle>Admin Invoices</PageTitle>
          <button
            onClick={async () => {
              const res = reload();
              toast.promise(res, {
                loading: "Loading",
                success: "Reloaded invoices",
                error: "Reload failed",
              });
            }}
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

        {invoices && (
          <div className="py-4">
            <InvoiceTable
              data={invoices}
              activeColumns={[
                "SUNO",
                "SINO",
                "OAMT",
                "LOCD",
                "F1A130",
                "F1A530",
              ]}
            />
          </div>
        )}

        {transactions && (
          <>
            <h2 className="text-xl opacity-60 mt-10">Transactions</h2>
            <div className="py-4">
              <TransactionTable data={transactions} />
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Home;
