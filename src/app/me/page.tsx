import envConfig from "@/config";
import React from "react";
import { cookies } from "next/headers";

export default async function MeProfile() {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  const response = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw { status: response.status, payload };
  }

  return <div>hello! {payload.data.name}</div>;
}
