import { transformData } from "@/lib/transformM3Data";
import {
  getCugexInstancesForUserId,
  getSupplierInvoiceTotalInfo,
} from "@/services/infor";

const getAllInvoicesForUser = async (userId: string) => {
  try {
    const res = await getCugexInstancesForUserId(userId);
    const transformedRes = transformData(res);

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
    console.log(invoices);

    // Filter out undefined items and return
    return invoices.filter((item) => item !== undefined && item !== null);
  } catch (error) {
    throw error;
  }
};

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  try {
    const list = await getAllInvoicesForUser(userId);
    return Response.json(list);
  } catch (error) {
    throw error;
  }
}
