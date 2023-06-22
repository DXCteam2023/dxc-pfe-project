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
import ChartProduct from "./components/ProductChart";

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
      <div className="bg-white min-h-screen-100 w-5/6 ">
        <Header />
        <div className=" mx-4 py-5 bg-gradient-to-r from-white via-purple-200 to-white  rounded-l-lg ">
          <Cards />
          <StatisticCards />
        </div>

        <div className=" flex justify-center p-2 ">
          <div className="mx-3 w-1/2  mt-1 item-end  p-8">
            <div className=" item-end  bg-white rounded-lg shadow-xl ">
              <CercleChart />
            </div>
          </div>
          <div className="mx-3 w-1/2  mt-1 item-end  py-8">
            <div className=" item-end  bg-white rounded-lg shadow-xl ">
              <ChartProduct />
            </div>
          </div>
        </div>
        <div className="mx-3 mt-1 item-end   rounded-lg  p-8">
          <TableProductOfferings />
        </div>
        <div className=" mx-9 mt-4 flex p-2 ">
          <div className="py-16 w-1/2 rounded-lg shadow-xl p-8">
            <Chartt />
          </div>
          <div className="mx-3 w-1/2 rounded-lg shadow-xl p-8">
            <BarChart />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
