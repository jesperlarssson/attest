import { getSupplierInvoiceTotalInfo } from "@/services/infor";

export async function POST(request: Request) {
  const { divi, year, invoice_number, payee, supplier } = await request.json();
  try {
    const invoice = await getSupplierInvoiceTotalInfo(
      divi,
      payee,
      invoice_number,
      year,
      supplier
    );
    return Response.json(invoice);
  } catch (error) {
    throw error;
  }
}
