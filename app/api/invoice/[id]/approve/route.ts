import { getInforM3MIv2Axios } from "@/services/infor";

const approveInvoiceInM3 = async (employmentId: string, invoiceId: string) => {
  //TODO: add connection to M3
  try {
    const response = await getInforM3MIv2Axios(
      "/CRS650MI/GetUserInfo?dateformat=YMD8&excludeempty=false&righttrim=true&format=PRETTY&extendedresult=false"
    );
    return response;
  } catch (error) {
    throw error;
  }
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
