"use client";
import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import toast from "react-hot-toast";
import axios from "axios";
import M3Table from "@/components/M3Table";
import ProtectedRoute from "@/components/ProtectedRoute";

const Sql = () => {
  const [select, setSelect] = useState("");
  const [from, setFrom] = useState("");
  const [where, setWhere] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const handleFillInExample = () => {
    // Setting the example values for SELECT, FROM, and WHERE
    setSelect(
      "EPDIVI, EPSPYN, EPSUNO, EPSINO, EPINYR, EPVONO, EPIVDT, EPDUDT, EPCUCD, EPCUAM"
    );
    setFrom("FPLEDG");
    setWhere(
      "EPCONO = '790' and EPDIVI = 'CCC' and EPTRCD = '40' and EPAPRV <> 1"
    );
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle your form submission logic here
    setLoading(true);
    setData([]);
    try {
      const response = await axios.post("/api/infor/sql", {
        query: `${select} from ${from} ${where != "" && ` where ${where}`}`,
      });
      setData(response.data);
      toast.success(
        "Success: select " + select + " from " + from + " where " + where
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="relative">
        <PageTitle>SQL TEMP PAGE</PageTitle>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 my-10">
          <div>
            <h3 className="text-lg leading-6 font-medium  mb-4 ">SELECT</h3>
            <textarea
              className="w-full rounded-md border p-2 bg-transparent"
              placeholder="FIELD, FIELD2, ..."
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            />
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium  mb-4">FROM</h3>
            <textarea
              className="w-full rounded-md border  p-2 bg-transparent"
              placeholder="TABLE"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium  mb-4">WHERE</h3>
            <textarea
              className="w-full rounded-md border  p-2 bg-transparent"
              placeholder="Condition"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            />
          </div>
          <div className="col-span-3 flex gap-4 mt-4">
            <button
              onClick={handleFillInExample}
              className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
            >
              Add example query
            </button>
            <button
              disabled={loading}
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Run Query
            </button>
          </div>
        </form>

        {data.length > 0 && (
          <div className="mt-4 width-custom">
            <div className="overflow-x-auto">
              <M3Table data={data} idAttribute={null} />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Sql;
