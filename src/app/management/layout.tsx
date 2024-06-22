"use client";
import "@/css/satoshi.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeOutId = setTimeout(() => setLoading(false), 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <Toaster />
      <SideBar />
      {loading ? <Loader /> : children}
    </div>
  );
}
