"use client";

import React, { useEffect, useState } from "react";

import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar";
import TopCards from "./components/TopCards";
import BarChart from "./components/RecentCustomerOrders";
import StatisticCards from "./components/StatisticCards";
import Chartt from "./components/chart";
import Footer from "./components/Footer";
import TableProductOfferings from "./components/TableProductOfferings";
import CercleChart from "./components/ChartCercle";
import Cards from "./components/Cards";

export default function DashboardHome() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(JSON.stringify({}));
  useEffect(() => {
    let tokenUser;
    let user;
    // Get the value from local storage if it exists
    tokenUser = localStorage.getItem("token") || "";
    setToken(tokenUser);

    user = localStorage.getItem("user") || "";
    setUsername(user);
  }, []);

  return !token && !username ? (
    (window.location.href = "/login")
  ) : (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white  min-h-screen-100 w-5/6  ">
        <Header />
        <div className=" mx-4 py-5 bg-gradient-to-r from-white via-purple-200 to-white  rounded-l-lg ">
        {/* <TopCards /> */}
        <Cards/>
        {/* <Stats/> */}
        <StatisticCards /></div>
        
        <div className="mt-4 flex p-2 ">
          <div className="w-1/2 ">
            <TableProductOfferings />
          </div>
          <div className="w-1/2 py-12 mt-8">
           <CercleChart/>
          </div>
        </div>
        <div className="mt-4 flex p-2 ">
          <div className="w-1/2 ">
          <Chartt />
          </div>
          <div className="w-1/2 ">
            <BarChart />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
