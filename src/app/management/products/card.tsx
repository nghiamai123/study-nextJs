import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card({ product, onDelete }: any) {
  const handleDelete = async () => {
    await fetch(
      `https://6670df540900b5f8724bd1b7.mockapi.io/products/${product.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        toast({
          title: "Success",
          description: "Delete product successfully",
          variant: "default",
        });
        onDelete(product.id);
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
      <Link
        href={`/management/products/${product.id}`}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Image
            className="h-auto w-full object-container"
            src={product.image}
            width={800}
            height={800}
            alt="image description"
          />
          {product.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {product.price}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 pb-5">
          {product.CreateAt}
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          <Link href="#">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Block
          </button>
        </p>
      </Link>
    </>
  );
}
