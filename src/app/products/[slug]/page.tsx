"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loader";

export default function Product({ params }: any) {
  const { slug } = params;
  const [tab, setTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
    createAt: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://6670df540900b5f8724bd1b7.mockapi.io/products/${slug}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto">
          <div className="dark:bg-[#1f2937] shadow-lg rounded-lg p-6 mt-6">
            <button className="py-2">
              <Link href="/products">
                <FontAwesomeIcon icon={faArrowLeft} /> BACK
              </Link>
            </button>
            <div className="flex flex-col lg:flex-row gap-8">
              <figure>
                <Image
                  src={product.image}
                  alt="image"
                  width={400}
                  height={400}
                  className="object-cover rounded-xl"
                />
              </figure>
              <div className="lg:w-1/2">
                <h2
                  style={{
                    fontWeight: "600",
                    fontSize: "24px",
                    textDecorationColor: "#0ea5e9",
                  }}
                >
                  {product.name}
                </h2>
                <p className="mb-2 underline ">{product.name}</p>
                <p className="mb-2">${product.price}</p>
              </div>
            </div>
            <div className="border-b-2 border-gray-200 my-6"></div>
            <div className="flex space-x-4">
              <button
                onClick={() => setTab("about")}
                className={`py-2 text-xl font-bold ${
                  tab === "about" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                About
              </button>
              <button
                onClick={() => setTab("note")}
                className={`py-2 text-xl font-bold ${
                  tab === "note" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Note
              </button>
            </div>
            {tab === "about" && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">About</h3>
                <p>{product.name}</p>
              </div>
            )}
            {tab === "note" && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Note</h3>
                <p>{product.price}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
