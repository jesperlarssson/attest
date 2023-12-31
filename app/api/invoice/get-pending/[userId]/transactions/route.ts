import { transformData } from "@/lib/transformM3Data";
import {
  getCugexInstancesForUserId,
} from "@/services/infor";

const getAllTransactionsForUser = async (userId: string) => {
  try {
    const res = await getCugexInstancesForUserId(userId, "MATE_E");
    const transformedRes = transformData(res);

    // Filter out undefined items and return
    return transformedRes.filter((item) => item !== undefined && item !== null);
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
    const list = await getAllTransactionsForUser(userId);
    return Response.json(list);
  } catch (error) {
    throw error;
  }
}
