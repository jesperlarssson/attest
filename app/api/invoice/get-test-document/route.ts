import { getIDMAxios } from "@/services/infor";

export async function GET() {
  try {
    const item = await getIDMAxios("/items/M3_CustomerInvoice-71-1-LATEST")
    return Response.json(item);
  } catch (error) {
    console.log(error)
    throw error;
  }
}
