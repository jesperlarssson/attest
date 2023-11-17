import { getSqlSelect } from "@/services/infor";

export async function POST(request: Request) {
  const { query } = await request.json();
  try {
    const list = await getSqlSelect(query);
    return Response.json(list);
  } catch (error) {
    throw error;
  }
}
