import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import CercleChart from "./ChartCercle";
import ChartProduct from "./ProductChart";
import Chartt from "./chart";

dotenv.config();

const AXIOS_URL = process.env.AXIOS_URL;

interface ProductOfferings {
  link: string;
  name: string;
  description: string;
  state: string;
  internalVersion: string;
  orderDate: string;
  lastUpdate: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
  month: string;
  quantity: number;
}
const AllCharts = () => {
  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [comparisonResult, setComparisonResult] = useState("");
  useEffect(() => {
    getProductOfferings();
  }, []);

  async function getProductOfferings() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      setProductOfferings(allProductOfferings);

      const months = [];
      const currentDate = new Date();
      for (let i = 0; i < 12; i += 1) {
        const date = new Date(currentDate.getFullYear(), i, 1);
        months.push(date.toLocaleString("default", { month: "long" }));
      }

      const totalsByMonth: { [key: string]: number } = {};
      months.forEach((month) => {
        totalsByMonth[month] = 0;
      });

      allProductOfferings.forEach(
        (product: { validFor: { startDateTime: string } }) => {
          const orderDate = new Date(product.validFor.startDateTime);
          const orderMonth = orderDate.toLocaleString("default", {
            month: "long",
          });
          if (Object.prototype.hasOwnProperty.call(totalsByMonth, orderMonth)) {
            totalsByMonth[orderMonth] += 1;
          }
        },
      );

      console.log("Totals by Month:");
      Object.keys(totalsByMonth).forEach((month) => {
        console.log(month + ": " + totalsByMonth[month]);
      });

      const comparisonResult = compareTotals(totalsByMonth);
      setComparisonResult(String(comparisonResult));

      console.log("Comparison Result:", comparisonResult);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  function compareTotals(totals: { [key: string]: number }): string | number {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (1-12)
    if (currentMonth === 1) {
      // Special case for January, compare with December of the previous year
      return compareWithPreviousMonth(totals, "January", "December");
    } else {
      const previousMonth = getMonthName(currentMonth - 1);
      return compareWithPreviousMonth(
        totals,
        getMonthName(currentMonth),
        previousMonth,
      );
    }
  }

  function compareWithPreviousMonth(
    totalsByMonth: { [key: string]: number },
    currentMonth: string,
    previousMonth: string,
  ): string | number {
    const currentTotal = totalsByMonth[currentMonth];
    const previousTotal = totalsByMonth[previousMonth];
    if (currentTotal > previousTotal) {
      const increasePercentage = (
        ((currentTotal - previousTotal) / previousTotal) *
        100
      ).toFixed(2);
      return `+${increasePercentage}%`;
    } else if (currentTotal < previousTotal) {
      const decreasePercentage = (
        ((previousTotal - currentTotal) / previousTotal) *
        100
      ).toFixed(2);
      return `-${decreasePercentage}%`;
    } else {
      return 0; // Return 0 for no change
    }
  }
  function getMonthName(month: number): string {
    const date = new Date();
    date.setMonth(month - 1); // Set the date to the specified month (0-11)
    return date.toLocaleString("default", { month: "long" });
  }

  const totalProductOfferings = productOfferings.length;
  const PublichedProductOfferings = productOfferings.filter(
    (product) => product.state === "Published",
  );
  const totalPublichedProductOfferings = PublichedProductOfferings.length;
  {
    /*  Statistics %  Published Product Offering  */
  }
  const percentPublichedProductOfferings = Math.floor(
    (totalPublichedProductOfferings / productOfferings.length) * 100,
  );
  const totalsByMonth = {
    /* your totals by month data */
  };

  return (
    <div>
      <div className="px-6 pt-6 2xl:container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="h-full py-8 px-6 space-y-6 rounded-xl hover:scale-105 duration-500 bg-white shadow-indigo-100 shadow-md">
              <ChartProduct />
              <div className="mt-6">
                <h5 className="text-xl text-gray-700 text-center">
                  Total Products
                </h5>
                <div className="mt-2 flex justify-center gap-4">
                  <h3 className="text-3xl font-bold text-gray-700">
                    {totalProductOfferings}
                  </h3>
                  <div className="flex items-end gap-1 text-green-500">
                    <svg
                      className="w-3"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{comparisonResult}</span>
                  </div>
                </div>

                {/* <span className="block text-center text-gray-500">
                  Compared to last week 13
                </span> */}
              </div>
            </div>
          </div>
          <div>
            <div className="h-full py-6 px-6 rounded-xl hover:scale-105 duration-500 bg-white shadow-indigo-100 shadow-mdbg-white">
              <CercleChart />
              <h5 className="text-xl text-gray-700">Published</h5>
              <div className="my-8">
                <h1 className="text-5xl font-bold text-gray-800">
                  {percentPublichedProductOfferings}%
                </h1>
                {/* <span className="text-gray-500">
                  Compared to last week $13,988
                </span> */}
              </div>
            </div>
          </div>
          <div>
            <div className="lg:h-full py-8 px-6 text-gray-600 rounded-xl hover:scale-105 duration-500 bg-white shadow-indigo-100 shadow-md bg-white">
              <Chartt />
              <div className="mt-14">
                <h5 className="text-xl text-gray-600 text-center">
                  Total Revenues
                </h5>
                <div className="mt-2 flex justify-center gap-4">
                  <h3 className="text-3xl font-bold text-gray-700">$23,988</h3>
                  <div className="flex items-end gap-1 text-green-500">
                    <svg
                      className="w-3"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>2%</span>
                  </div>
                </div>
                {/* <span className="block text-center text-gray-500">
                  Compared to last week $13,988
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCharts;
