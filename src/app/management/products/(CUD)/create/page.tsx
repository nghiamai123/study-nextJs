"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  price: string;
  image: string;
  id: string;
  name: string;
  description: string;
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

  const getUrlUpdateUserImg = async (file: File) => {
    const CLOUD_NAME = "dkvvko14m";
    const PRESET_NAME = "l7vyrfgr";
    const FOLDER_NAME = "internShip";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);
    const options = {
      method: "POST",
      body: formData,
    };
    try {
      const res = await fetch(api, options);
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await getUrlUpdateUserImg(file);
        setProduct({ ...product, image: imageUrl });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://6670df540900b5f8724bd1b7.mockapi.io/products`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      router.push("/management/products");
      toast({
        title: "Success",
        description: "Product created successfully",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form className="mt-20" onSubmit={handleSubmit} style={{ width: "110vh" }}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Price
        </label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Image
        </label>
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex gap-3 mb-5">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Create Product
        </button>
        <Link
          href="/management/products"
          className="text-white bg-red-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-full"
          scroll={false}
        >
          Back
        </Link>
      </div>
    </form>
  );
}
