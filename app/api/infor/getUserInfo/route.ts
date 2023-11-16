import { getInforM3MIv2Axios } from "@/services/infor";

export async function GET() {
  try {
    const user = await getInforM3MIv2Axios(
      "/CRS650MI/GetUserInfo?dateformat=YMD8&excludeempty=false&righttrim=true&format=PRETTY&extendedresult=false"
    );
    return Response.json(user.results[0].records[0]);
  } catch (error) {
    throw error;
  }
}
