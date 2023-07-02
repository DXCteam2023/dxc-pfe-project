"use client";
import * as dotenv from "dotenv";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const HomePage = () => {
  dotenv.config();
  const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    await axios.get(`${AXIOS_URL}/api/product-offering`).then((response) => {
      setData(response.data);
    });
  }

  return (
    <div>
      <Header />

      <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-4 m-3 ">
        {data.map((product: any, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
