"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function MeProfile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    createAt: "",
    avatar: "",
  });

  useEffect(() => {
    const store = Cookies.get("user");
    setUser(
      store
        ? JSON.parse(store)
        : { username: "", email: "", phone: "", createAt: "", avatar: "" }
    );
  }, []);
  return (
    <div className="overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 dark:bg-gray-800">
      <div className="flex justify-center items-end text-center min-h-screen sm:block">
        <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
        <div className="inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transformshadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
            <div className="grid grid-cols-1">
              <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                  <Image
                    src={user?.avatar}
                    alt="avatar"
                    className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                    width={500}
                    height={500}
                  />
                  <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                    {user?.username}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                    I am a fullstack software developer with ReactJS for
                    frontend and NodeJS for backend. My email address is{" "}
                    {user?.email}
                  </p>
                  <div className="w-full mt-6">
                    <a
                      className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                    font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {user?.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
