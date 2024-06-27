"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <Toaster />
      {children}
    </div>
  );
}
