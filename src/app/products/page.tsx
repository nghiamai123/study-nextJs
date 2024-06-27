"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import "./style.css";
import levenshtein from "js-levenshtein";

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
  const [search, setSearch] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
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
          throw new Error("Error fetching");
        })
        .then((products) => {
          setProducts(products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearch = async (keyword = "") => {
    if (keyword === "") {
      setError(true);
    } else {
      const lowerCaseKeyword = keyword.toLowerCase();

      const result = products
        .filter((product) => {
          return (
            product.category.toLowerCase().includes(lowerCaseKeyword) ||
            product.price.toString().includes(lowerCaseKeyword) ||
            product.name.toLowerCase().includes(lowerCaseKeyword)
          );
        })
        .sort((a, b) => {
          const categoryDistanceA = levenshtein(
            a.category.toLowerCase(),
            lowerCaseKeyword
          );
          const categoryDistanceB = levenshtein(
            b.category.toLowerCase(),
            lowerCaseKeyword
          );

          const nameDistanceA = levenshtein(
            a.name.toLowerCase(),
            lowerCaseKeyword
          );
          const nameDistanceB = levenshtein(
            b.name.toLowerCase(),
            lowerCaseKeyword
          );

          return (
            Math.min(categoryDistanceA, nameDistanceA) -
            Math.min(categoryDistanceB, nameDistanceB)
          );
        });

      setError(false);
      setSearch(result);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="m-28">
      <Search
        onCategory={handleCategory}
        onSearch={handleSearch}
        error={error}
      />
      <div className="m-10">
        <div className="grid text-wrap gap-5">
          {(search.length > 0 ? search : products).map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
