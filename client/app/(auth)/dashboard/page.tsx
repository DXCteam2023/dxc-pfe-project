"use client";

// import { useSession } from "next-auth/react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopCards from "./components/TopCards";
import BarChart from "./components/BarChart";
import Card from "./components/Card";
import StatisticCards from "./components/StatisticCards";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";


export default function DashboardHome() {
  // const { data: session } = useSession({ required: true });
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

  return (
    !token && !username ?
    window.location.href = "/login"
    : 
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white  min-h-screen-100 w-5/6">
        <Header />
        <TopCards />
        <StatisticCards />
        <Card />
        <BarChart />
        <Footer />
      </div>
      {/* Autres composants ou contenu de la page */}
    </div>
  );
}
