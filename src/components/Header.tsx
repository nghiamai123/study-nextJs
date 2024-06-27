"use client"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import Cookies from "js-cookie";
import LinkItem from "./LinkItem";

export default function Header() {
  const route = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  const sessionToken = Cookies.get("sessionToken");

  useEffect(() => {
    setIsLogin(sessionToken ? true : false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLogin(false);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();

      await fetch("api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionToken),
      });

      if (!response.ok) {
        throw new Error("Error logout");
      }

      toast({
        variant: "default",
        title: "Logout successful",
      });

      route.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error during logout",
        description: error.message,
      });
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center" scroll={false}>
            <Image
              src={"/images/Logo.png"}
              className="mr-3 h-6 sm:h-9"
              width={50}
              height={50}
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Restaurants
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {!isLogin && (
              <>
                <LinkItem href="/login" pathname={pathname} text="Log in" />
                <LinkItem
                  href="/register"
                  pathname={pathname}
                  text="Get started"
                />
              </>
            )}
            {isLogin && (
              <Link
                href="#"
                onClick={handleLogout}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log Out
              </Link>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium justify-content lg:flex-row lg:space-x-8 lg:mt-0">
              <LinkItem href="/" pathname={pathname} text="Home" />
              <LinkItem href="/products" pathname={pathname} text="Products" />
              <LinkItem
                href="/management"
                pathname={pathname}
                text="Management"
              />
              <LinkItem href="/contact" pathname={pathname} text="Contact Us" />
              <LinkItem href="/#" pathname={pathname} text="Team" />
              <LinkItem href="/me" pathname={pathname} text="My Profile" />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
