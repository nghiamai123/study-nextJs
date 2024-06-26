export async function POST(request: Request) {
  const sessionToken = await request.json();

  if (!sessionToken) {
    return Response.json(
      { message: "Invalid session token" },
      {
        status: 401,
      }
    );
  }

  return Response.json(
    {},
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; Max-Age=0`,
      },
    }
  );
}
