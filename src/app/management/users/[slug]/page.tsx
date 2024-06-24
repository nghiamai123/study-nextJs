"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function User({ params }: any) {
  const { slug } = params;
  const [user, setUser] = useState({
    email: "",
    password: "",
    id: "",
    username: "",
    phone: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://6670df540900b5f8724bd1b7.mockapi.io/users/${slug}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  }, [slug, toast]);

  const handleEmail = (e: any) => {
    e.preventDefault();
    setUser({ ...user, email: e.target.value });
  };

  const handlePassword = (e: any) => {
    e.preventDefault();
    setUser({ ...user, password: e.target.value });
  };

  const handleUsername = (e: any) => {
    e.preventDefault();
    setUser({ ...user, username: e.target.value });
  };

  const handlePhone = (e: any) => {
    e.preventDefault();
    setUser({ ...user, phone: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`https://6670df540900b5f8724bd1b7.mockapi.io/users/${slug}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((user) => {
        router.push("/management/users");
        console.log(user);
        toast({
          title: "Success",
          description: "User updated successfully",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <form className="max-w-sm mx-auto mt-20" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={user?.email}
            value={user?.email}
            onChange={handleEmail}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone Number
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={user?.phone}
            value={user?.phone}
            onChange={handlePhone}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={user?.password}
            value={user?.password}
            onChange={handlePassword}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={user?.username}
            value={user?.username}
            onChange={handleUsername}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Update User
        </button>
      </form>
    </>
  );
}
