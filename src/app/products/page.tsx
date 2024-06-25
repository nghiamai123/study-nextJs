"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Loader from "@/components/Loader";

interface Product {
  id: string;
  price: string;
  image: string;
  name: string;
  createAt: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(
      "https://6670df540900b5f8724bd1b7.mockapi.io/products"
    );
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  return loading ? (
    <Loader />
  ) : (
    <div className="m-28">
      <div className="grid grid-cols-4 text-wrap ml-auto gap-5">
        {products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
