"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import "./style.css";
import levenshtein from "js-levenshtein";
import ReactPaginate from "react-paginate";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [newDataProducts, setNewDataProducts] = useState([]);
  const [currentDataProducts, setCurrentDataProducts] = useState<Product[]>(products);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const idTimeOut = setTimeout(() => setLoading(false), 1000);
    setCurrentPage(0);

    return () => clearTimeout(idTimeOut);
  }, []);

  useEffect(() => {
    const indexLast = (currentPage + 1) * 6;
    const indexFirst = indexLast - 6;
    setCurrentDataProducts(newDataProducts.slice(indexFirst, indexLast));
  }, [newDataProducts, currentPage]);

  const handlePageClick = (e: any) => {
    setCurrentPage(e.selected);
  };

  const fetchProducts = async () => {
    const response = await fetch(
      "https://6670df540900b5f8724bd1b7.mockapi.io/products"
    );
    const data = await response.json();
    setProducts(data);
    setNewDataProducts(data);
    setError(false);
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
          setNewDataProducts(products);
          setError(false);
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
      setNewDataProducts(result as any);
      if(result.length <= 0) {
        setError(true);
      }
      else {
        setError(false);
      }
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
        onLoad={fetchProducts}
        error={error}
      />
      <div className="m-9">
        <div className="grid text-wrap gap-5">
          {currentDataProducts.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
        <div className="paginate">
          <ReactPaginate
            activeClassName={"item active"}
            breakClassName={"item break-me"}
            breakLabel={"..."}
            containerClassName={"pagination"}
            disabledClassName={"disabled-page"}
            marginPagesDisplayed={2}
            nextClassName={"item next "}
            nextLabel={
              currentDataProducts.length === 0 ? (
                ""
              ) : (
                <FaLongArrowAltRight style={{ fontSize: 18 }} />
              )
            }
            onPageChange={handlePageClick}
            pageCount={Math.ceil(newDataProducts.length / 6)}
            pageClassName={"item pagination-page"}
            pageRangeDisplayed={2}
            previousClassName={"item previous"}
            previousLabel={
              currentDataProducts.length === 0 ? (
                ""
              ) : (
                <FaLongArrowAltLeft style={{ fontSize: 18 }} />
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
