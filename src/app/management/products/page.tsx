"use client";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://6670df540900b5f8724bd1b7.mockapi.io/products"
      );
      const data = await response.json();

      if (!data) {
        throw new Error("Could not get products from API ");
      }

      const timeOutId = setTimeout(() => setLoading(false), 1000);

      setProducts(data);

      return () => {
        clearTimeout(timeOutId);
      };
    } catch (error: any) {
      toast({
        title: "Error fetching products",
        variant: "destructive",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <ul className="absolute left-80 grid grid-cols-3 gap-5 m-5">
        {products.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </ul>
      <div data-dial-init className="fixed end-6 bottom-6 group">
        <Link href="/management/products/create">
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
