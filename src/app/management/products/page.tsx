"use client";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Loader from "@/components/Loader";

export default function Products() {
  const [Products, setProducts] = useState([]);
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
  }, [Products]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <ul className="absolute left-80 grid grid-cols-3 gap-5 m-5">
        {Products.map((product) => (
          <Card product={product} />
        ))}
      </ul>
    </div>
  );
}
