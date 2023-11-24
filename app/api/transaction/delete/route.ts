import { deleteFromCugex } from "@/services/infor";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    console.log(body);
    const res = await deleteFromCugex(body);

    return Response.json(res);
  } catch (error) {
    throw error;
  }
}
