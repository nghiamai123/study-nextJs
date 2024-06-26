"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MeProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [name, setName] = useState("");
  const [isFormHidden, setIsFormHidden] = useState(true);
  const sessionToken = Cookies.get("sessionToken");

  const fetchingData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/account/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      const result = await response.json();
      setUser(result.data);
      setName(result.data.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeInformation = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/account/me`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );

      const result = await response.json();
      setUser(result.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    changeInformation();
    setIsFormHidden(true);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <>
      <div
        className={`overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 dark:bg-gray-800 ${
          isFormHidden ? "" : "bg-opacity-80"
        }`}
      >
        <div
          className={`flex justify-center items-end text-center min-h-screen sm:block ${
            isFormHidden ? "" : "bg-gray-700 bg-opacity-80"
          }`}
        >
          <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
          <div className="inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
              <div className="grid grid-cols-1">
                <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                    <Image
                      src="https://loremflickr.com/640/480/animals"
                      alt="avatar"
                      className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                      width={500}
                      height={500}
                    />
                    <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                      {user?.name}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                      I am a customer. My name is {user?.name}. My email address
                      is {user?.email}
                    </p>
                    <div className="w-full mt-6">
                      <div
                        onClick={() => setIsFormHidden(!isFormHidden)}
                        className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                    font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        Edit information
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isFormHidden && (
          <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
              >
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    onChange={handleNameChange}
                    value={name}
                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-1 mt-4 space-x-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => setIsFormHidden(!isFormHidden)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
