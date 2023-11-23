import { transformData } from "@/lib/transformM3Data";
import { getInforM3MIv2Axios } from "@/services/infor";

const getAllTransactions = async () => {
  try {
    const list = await getInforM3MIv2Axios(
      `/EXPORTMI/Select?SEPC=;&HDRS=1&QERY=F1PK01, F1PK02, F1PK03, F1PK04, F1A030, F1A130, F1A230, F1A330, F1A430, F1A530 from CUGEX1 where F1FILE = 'MATE_E'`
    );
    const transformedRes = transformData(list.results[0].records);

    // Filter out undefined items and return
    return transformedRes.filter((item) => item !== undefined && item !== null);
  } catch (error) {
    throw error;
  }
};

export async function GET(request: Request) {
  try {
    const list = await getAllTransactions();
    return Response.json(list);
  } catch (error) {
    throw error;
  }
}
