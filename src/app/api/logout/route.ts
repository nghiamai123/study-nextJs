import { NextRequest } from "next/server";

export async function POST() {
  const expiresString = "Thu, 01 Jan 1970 00:00:00 GMT";
  const cookie = `user=; expires=${expiresString}; path=/`;

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  });
}
