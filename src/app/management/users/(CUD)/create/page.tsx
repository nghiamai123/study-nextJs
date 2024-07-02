"use client";
import React, { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "@/components/FormInput";

export default function User() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    id: "",
    username: "",
    phone: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://6670df540900b5f8724bd1b7.mockapi.io/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        await response.json();
        router.push("/management/users");
        toast({
          title: "Success",
          description: "User created successfully",
          variant: "default",
        });
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        style={{ width: "110vh", margin: "0 auto" }}
      >
        <FormInput
          id="email"
          label="Email"
          type="text"
          value={user.email}
          onChange={handleChange}
        />
        <FormInput
          id="phone"
          label="Phone Number"
          type="text"
          value={user.phone}
          onChange={handleChange}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <FormInput
          id="username"
          label="Username"
          type="text"
          value={user.username}
          onChange={handleChange}
        />
        <div className="flex gap-3 mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Create User
          </button>
          <Link
            href="/management/users"
            className="text-white bg-red-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-full"
            scroll={false}
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
