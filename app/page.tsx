"use client";

import M3Table from "@/components/M3Table";
import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute";
import Table from "@/components/Table";
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

type RecordObject = {
  [key: string]: string;
};

function transformData(
  inputArray: Array<{ REPL: string }>,
  idColumnName: string
): RecordObject[] {
  if (inputArray.length === 0) {
    return [];
  }

  // Extract column names from the first element
  const columnNames = inputArray[0].REPL.split(";");

  // Find the index of the id column
  const idColumnIndex = columnNames.indexOf(idColumnName);
  if (idColumnIndex === -1) {
    throw new Error(`Column name "${idColumnName}" not found.`);
  }

  // Transform the rest of the array
  return inputArray.slice(1).map((item) => {
    const values = item.REPL.split(";");
    const record: RecordObject = {};

    columnNames.forEach((columnName, index) => {
      record[columnName] = values[index];
    });

    // Add the 'id' attribute
    record["id"] = values[idColumnIndex];

    return record;
  });
}

const Home = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesFromM3, setInvoicesFromM3] = useState<any[]>([]);
  const [columnString, setColumnString] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoicesM3 = await axios.get("/api/invoice/get-pending");
      console.log(invoicesM3.data[0].REPL);
      setColumnString(invoicesM3.data[0].REPL);
      const transformedData = transformData(invoicesM3.data, "EPVONO");
      setInvoicesFromM3(transformedData);
    };
    fetchInvoices();
  }, []);

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
        {/* <Table
          data={invoices}
          onInstanceApprovedForId={(id) => handleInstanceApproved(id)}
        /> */}
        {columnString && (
          <M3Table
            data={invoicesFromM3}
            columnString={columnString}
            onInstanceApprovedForId={() => {}}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Home;
