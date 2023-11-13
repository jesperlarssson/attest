// Define a type for the invoice data
export type InvoiceData = {
    dateOfArrival: string;
    supplier: string;
    invoiceNumber: string;
    amount: number;
    authorizer: string;
    documentUrl?: string;
  };



export const credentials = {
    employmentID: "LARJES",
    pincode: "12345",
    level: 0,
}

export const invoiceList: InvoiceData[] = [
    {
      dateOfArrival: '2023-10-01',
      supplier: 'Supplier1',
      invoiceNumber: 'INV001',
      amount: 1500,
      authorizer: 'John Doe',
      documentUrl: '/docs/invoice.pdf' 
    },
    {
      dateOfArrival: '2023-10-02',
      supplier: 'Supplier2',
      invoiceNumber: 'INV002',
      amount: 2500,
      authorizer: 'Jane Smith',
      documentUrl: '/docs/invoice.pdf' 
    },
    {
      dateOfArrival: '2023-10-03',
      supplier: 'Supplier3',
      invoiceNumber: 'INV003',
      amount: 3500,
      authorizer: 'Alice Johnson',
      documentUrl: '/docs/invoice.pdf' 
    },
    {
      dateOfArrival: '2023-10-04',
      supplier: 'Supplier4',
      invoiceNumber: 'INV004',
      amount: 4500,
      authorizer: 'Steve Brown',
      documentUrl: '/docs/invoice.pdf' 
    },
    {
      dateOfArrival: '2023-10-05',
      supplier: 'Supplier5',
      invoiceNumber: 'INV005',
      amount: 5500,
      authorizer: 'Rachel Green',
      documentUrl: '/docs/invoice.pdf' 
    },
    {
      dateOfArrival: '2023-10-06',
      supplier: 'Supplier6',
      invoiceNumber: 'INV006',
      amount: 6500,
      authorizer: 'Monica Geller',
      documentUrl: '/docs/invoice.pdf' 
    },
    {
      dateOfArrival: '2023-10-07',
      supplier: 'Supplier7',
      invoiceNumber: 'INV007',
      amount: 7500,
      authorizer: 'Ross Geller'

    },
    {
      dateOfArrival: '2023-10-08',
      supplier: 'Supplier8',
      invoiceNumber: 'INV008',
      amount: 8500,
      authorizer: 'Chandler Bing'
    }
  ];

 export  const exampleDataArray = [
    {
      id: 1,
      date: '2021-07-01',
      supplier: 'Supplier A',
      invno: 'INV001',
      amount: 5500,
      authorizer: 'LARJES',
      documentUrl: '/docs/invoice.pdf' 
      // ...additional fields corresponding to other columns
    },
    {
      id: 2,
      date: '2021-07-02',
      supplier: 'Supplier B',
      invno: 'INV002',
      amount: 5500,
      authorizer: 'LARJES',
      documentUrl: '/docs/invoice.pdf' 
      // ...additional fields corresponding to other columns
    },
    {
      id: 3,
      date: '2021-07-03',
      supplier: 'Supplier C',
      invno: 'INV003',
      amount: 5500,
      authorizer: 'LARJES',
      documentUrl: '/docs/invoice.pdf' 
      // ...additional fields corresponding to other columns
    },
    // ...additional data objects
  ];