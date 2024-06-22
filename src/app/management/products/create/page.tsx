"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Product {
  price: "";
  image: "";
  id: "";
  name: "";
  description: "";
}

export default function Product() {
  const { toast } = useToast();
  const router = useRouter();
  const [product, setProduct] = useState<Product>({
    price: "",
    image: "",
    id: "",
    name: "",
    description: "",
  });

  const handlePrice = (e: any) => {
    e.preventDefault();
    setProduct({ ...product, price: e.target.value });
  };

  const handleImage = (e: any) => {
    e.preventDefault();
    setProduct({ ...product, image: e.target.value });
  };

  const handleProductName = (e: any) => {
    e.preventDefault();
    setProduct({ ...product, name: e.target.value });
  };

  const handleDescription = (e: any) => {
    e.preventDefault();
    setProduct({ ...product, description: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`https://6670df540900b5f8724bd1b7.mockapi.io/products`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((product) => {
        router.push("/management/products");
        console.log(product);
        toast({
          title: "Success",
          description: "Product create successfully",
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
            Price
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={product?.price}
            value={product?.price}
            onChange={handlePrice}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Image Url
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={product?.image}
            value={product?.image}
            onChange={handleImage}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={product?.description}
            value={product?.description}
            onChange={handleDescription}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Name
          </label>
          <input
            type="text"
            id="large-input"
            placeholder={product?.name}
            value={product?.name}
            onChange={handleProductName}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Create Product
        </button>
      </form>
    </>
  );
}
