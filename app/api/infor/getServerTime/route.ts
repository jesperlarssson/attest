import { getInforM3MIv2Axios } from "@/services/infor";

export async function GET() {
  try {
    const time = await getInforM3MIv2Axios("/MMS200MI/GetServerTime");
    return  Response.json(time.results[0].records[0]);;
  } catch (error) {
    throw error;
  }
}
