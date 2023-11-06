"use client";
import React, { useState } from 'react';
import InvoiceDetails from './InvoiceDetails';
import { invoiceList, InvoiceData } from '@/lib/dummy-backend';

const List: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

  const isSelected = (invoice: InvoiceData) => selectedInvoice?.invoiceNumber === invoice.invoiceNumber;

  return (
    <div className="p-4 grid grid-cols-5 gap-6">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden col-span-3">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="text-left p-3">Date of Arrival</th>
              <th className="text-left p-3">Supplier</th>
              <th className="text-left p-3">Invoice Number</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Authorizer</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice, index) => (
              <tr
                key={invoice.invoiceNumber} // It's better to use invoiceNumber if it's unique
                className={`cursor-pointer ${isSelected(invoice) ? 'bg-gray-300' : index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedInvoice(isSelected(invoice) ? null : invoice)}
              >
                <td className="p-3">{invoice.dateOfArrival}</td>
                <td className="p-3">{invoice.supplier}</td>
                <td className="p-3">{invoice.invoiceNumber}</td>
                <td className="p-3">{invoice.amount}</td>
                <td className="p-3">{invoice.authorizer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 <div className='col-span-2'>
 <InvoiceDetails
invoice={selectedInvoice}
    clearSelection={() => setSelectedInvoice(null)}
  />
 </div>
 


     
    </div>
  );
};

export default List;
