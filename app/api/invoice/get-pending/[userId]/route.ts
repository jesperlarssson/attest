import { exampleDataArray } from "@/lib/dummy-backend";

const getAllInvoicesForUser = async (userId: string) => {
  const invoices = exampleDataArray;
  return invoices.filter(invoice => invoice.authorizer === userId);
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
    return Response.json({
      message: `Error for userId: ${userId}`,
    });
  }
}
