export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.data.token as string;
  const expiresAt = body.data.expiresAt as string;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  const expiresDate = new Date(expiresAt).toUTCString();
  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; Expires=${expiresDate}; SameSite=Lax; Secure`,
    },
  });
}
