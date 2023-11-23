import { transformData } from "@/lib/transformM3Data";
import {
  getCugexInstancesForUserId,
  getInforM3MIv2Axios,
  getSupplierInvoiceTotalInfo,
} from "@/services/infor";

const getAllInvoices = async () => {
  try {
    const list = await getInforM3MIv2Axios(
      `/EXPORTMI/Select?SEPC=;&HDRS=1&QERY=F1PK01, F1PK02, F1PK03, F1PK04, F1A030, F1A130, F1A230, F1A330, F1A430, F1A530 from CUGEX1 where F1FILE = 'MATE_H'`
    );
    const transformedRes = transformData(list.results[0].records);

    // Create an array of promises
    const invoicePromises = transformedRes.map(async (cugexInfo) => {
      const invoiceInfo = {
        divi: "CCC",
        payee: cugexInfo.F1PK02,
        invoice_number: cugexInfo.F1PK03,
        year: cugexInfo.F1PK01.substring(0, 4),
        supplier: cugexInfo.F1PK02,
      };

      const supplierInvoiceInfo = await getSupplierInvoiceTotalInfo(
        invoiceInfo.divi,
        invoiceInfo.payee,
        invoiceInfo.invoice_number,
        invoiceInfo.year,
        invoiceInfo.supplier
      );

      if (!supplierInvoiceInfo) {
        return null; // Return null if supplierInvoiceInfo is not received
      }

      return {
        ...supplierInvoiceInfo, // Spread the supplier invoice info
        ...cugexInfo, // Spread the original cugexInfo
      };
    });

    // Wait for all promises to resolve
    const invoices = await Promise.all(invoicePromises);

    // Filter out undefined items and return
    return invoices.filter((item) => item !== undefined && item !== null);
  } catch (error) {
    throw error;
  }
};

export async function GET(
  request: Request,
) {

  try {
    const list = await getAllInvoices();
    return Response.json(list);
  } catch (error) {
    throw error;
  }
}
