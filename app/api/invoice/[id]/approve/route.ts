const approveInvoiceInM3 = async (employmentId: string, invoiceId: string) => {
  //TODO: add connection to M3

  // Implement error handling and connection logic

  return { status: "success", message: `Invoice ${invoiceId} approved in M3` };
};

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const id = params.id;

  if (!data.employmentId || !id) {
    return Response.json({ error: "Missing required fields" });
  }

  try {
    const res = await approveInvoiceInM3(data.employmentId, id as string);

    return Response.json({
      message: `${data.employmentId} approved invoice id: ${id}`,
      success: true,
      res,
    });
  } catch (error) {
    throw new Error(`Failed to approve invoice id: ${id}`);
  }
}
