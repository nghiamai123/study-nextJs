"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import "./style.css";

interface Product {
  id: string;
  price: string;
  image: string;
  name: string;
  createAt: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const idTimeOut = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(idTimeOut);
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(
      "https://6670df540900b5f8724bd1b7.mockapi.io/products"
    );
    const data = await response.json();
    setProducts(data);
  };

  const handleCategory = async (category = "cow") => {
    const url = new URL("https://6670df540900b5f8724bd1b7.mockapi.io/products");

    if (category) {
      url.searchParams.append("category", `${category}`);

      await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error ("Error fetching");
        })
        .then((products) => {
          setProducts(products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="m-28">
      <Search onCategory={handleCategory} />
      <div className="m-10">
        <div className="grid text-wrap gap-5">
          {products.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
