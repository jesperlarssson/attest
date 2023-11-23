import { postToCugex, updateInCugex } from "@/services/infor";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await updateInCugex(body);
    const eventObject = {
      file: "MATE_E",
      pk01: body.pk01,
      pk02: body.pk02,
      pk03: body.pk03,
      pk04: body.user,
      a030: "1",
      a130: body.user,
      a230: `Approved by ${body.user}`,
      a330: new Date().toISOString(),
      a430: body.a030 + body.a030,
    };
    const response = await postToCugex(eventObject);
    return Response.json(res);
  } catch (error) {
    throw error;
  }
}
