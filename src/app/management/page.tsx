import BarChart from "@/components/BarChart";
import SideBar from "@/components/SideBar";
import React from "react";

export default function Management() {
  return (
    <>
      <SideBar />
      <div className="max-w-3xl mx-auto" style={{height: "80vh", marginTop: "auto"}}>
        <BarChart />
      </div>
    </>
  );
}
