export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  return Response.json({
    message: `GET Invoice id: ${id}`,
  });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const id = params.id;
  return Response.json({
    message: `POST to Invoice id: ${id} with payload: ${data.payload}`,
  });
}
