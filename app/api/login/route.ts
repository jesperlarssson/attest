const getM3User = async (employmentId: string, pincode: string) => {
  //TODO: Call M3 API to check for user
  return {
    employmentId,
  };
};

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const user = await getM3User(data.employmentId, data.pincode);
    return Response.json(user);
  } catch (error) {
    return Response.json({ error });
  }
}
