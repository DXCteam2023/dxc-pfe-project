"use client";

import React, { useEffect, useState } from "react";

import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar";
import TopCards from "./components/TopCards";
import BarChart from "./components/RecentCustomerOrders";
import StatisticCards from "./components/StatisticCards";
import Footer from "./components/Footer";
import TableProductOfferings from "./components/TableProductOfferings";

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
        <div className="flex p-2 "></div>
        <TopCards />
        {/* <Stats/> */}
        <StatisticCards />
        <TableProductOfferings />
        <BarChart />
        <Footer />
      </div>
    </div>
  );
}
