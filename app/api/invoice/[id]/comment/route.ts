const commentInvoiceInM3 = async (employmentId: string, invoiceId: string, comment: string) => {
    //TODO: add connection to M3
  
    // Implement error handling and connection logic
  
    return { status: "success", message: `Invoice ${invoiceId} commented in M3` };
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
      const res = await commentInvoiceInM3(data.employmentId, id, data.comment);
  
      return Response.json({
        message: `${data.employmentId} commented invoice id: ${id} with ${data.comment}`,
        success: true,
        res,
      });
    } catch (error) {
      throw new Error(`Failed to comment invoice id: ${id}`);
    }
  }
  