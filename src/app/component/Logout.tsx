"use client";
import envConfig from "@/config";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import clsx from "clsx";
import Cookies from "js-cookie";
export default function Logout({ value }: any) {
  const navigation = useRouter();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      // const token = Cookies.get("sessionToken");

      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!result.ok) {
        throw new Error("Logout failed");
      }

      Cookies.remove("sessionToken");

      toast({
        variant: "default",
        title: "Logout successful",
      });

      navigation.push("/login");
    } catch (error) {
      console.error("Logout error:", error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to log out",
      });
    }
  };
  return (
    <button
      className="hidden lg:flex lg:flex-1 lg:justify-end"
      onClick={handleLogout}
    >
      <div>
        <Link
          href="#"
          className={clsx("text-sm font-semibold leading-6 text-gray-900", [
            {
              dark: true,
              "dark:text-gray-300": true,
            },
          ])}
        >
          Log Out
        </Link>
      </div>
    </button>
  );
}
