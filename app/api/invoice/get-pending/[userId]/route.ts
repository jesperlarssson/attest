
import { getCugexInstancesForUserId } from "@/services/infor";

const getAllInvoicesForUser = async (userId: string) => {
  try {
    const res = await getCugexInstancesForUserId(userId);
    //TODO: fetch more invoice details using res[index].F1PK03(?)
    return res;
  } catch (error) {
    throw error
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
