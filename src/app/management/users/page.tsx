"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function Users() {
  const [users, setUsers] = useState([
    { id: "", email: "", password: "", username: "", phone: "" },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        "https://6670df540900b5f8724bd1b7.mockapi.io/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const id = setTimeout(() => setLoading(false), 1000);

      if (!response.ok) {
        throw new Error("Could not fetch users");
      }

      const data = await response.json();
      setUsers(data);

      return () => {
        clearTimeout(id);
      };
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch users",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchingData();
  }, [users]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <ul className="absolute left-96 grid grid-cols-3 gap-5 m-5">
        {users.map((user) => (
          <Card user={user} key={user.id} />
        ))}
      </ul>
      <div data-dial-init className="fixed end-6 bottom-6 group">
        <Link href="/management/users/create">
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-bottom-right"
            aria-controls="speed-dial-menu-bottom-right"
            aria-expanded="false"
            className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-45"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">Open actions menu</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
