"use client"
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MeProfile() {
  const token = Cookies.get("sessionToken");
  const [user, setUser] = useState({name: "", email: ""});

  const handleInfo = async () => {
    // try {
    //   const response = await fetch(
    //     `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   const payload = await response.json();

    //   if (!response.ok) {
    //     throw new Error(payload.message || "Failed to fetch user info");
    //   }

    //   return payload.data;
    // } catch (error) {
    //   console.error("Error fetching user info:", error);
    //   return null;
    // }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userData = await handleInfo();
  //     if (userData) {
  //       setUser(userData);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Hello, {user.name || 'User'}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
