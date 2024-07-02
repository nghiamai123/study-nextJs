"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "@/components/FormInput";

interface Product {
  price: string;
  image: string;
  id: string;
  name: string;
  description: string;
}

export default function Product({ params }: { params: { slug: string } }) {
  const { slug } = params;
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

  useEffect(() => {
    fetch(`https://6670df540900b5f8724bd1b7.mockapi.io/products/${slug}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  }, [slug, toast]);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value, files } = e.target;

      if (id === "image" && files?.length) {
        const file = files[0];
        try {
          const imageUrl = await getUrlUpdateUserImg(file);
          setProduct((prevProduct) => ({ ...prevProduct, [id]: imageUrl }));
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
        }
      } else {
        setProduct((prevProduct) => ({ ...prevProduct, [id]: value }));
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://6670df540900b5f8724bd1b7.mockapi.io/products/${slug}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(product),
        }
      );
      if (!res.ok) throw new Error("Failed to update product");
      await res.json();
      router.push("/management/products");
      toast({
        title: "Success",
        description: "Product updated successfully",
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
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        style={{ width: "110vh", margin: "0 auto" }}
      >
        <FormInput
          id="price"
          label="Price"
          type="text"
          value={product.price}
          onChange={handleChange}
        />
        <FormInput
          id="image"
          label="Image"
          type="file"
          onChange={handleChange}
        />
        <FormInput
          id="description"
          label="Description"
          type="text"
          value={product.description}
          onChange={handleChange}
        />
        <FormInput
          id="name"
          label="Product Name"
          type="text"
          value={product.name}
          onChange={handleChange}
        />
        <div className="flex gap-3 mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Update Product
          </button>
          <Link
            href="/management/products"
            className="text-white bg-red-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800 w-full"
            scroll={false}
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
