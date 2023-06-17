import React, { useEffect, useState } from "react";
import { Chart, initTE } from "tw-elements";
import axios from "axios";

Chart.register(initTE);
interface ProductOrders {
  state: string;
  orderDate: string;
  ponr: string;
}

const Chartt = () => {
  initTE({ Chart });

  const [chartData, setChartData] = useState<ProductOrders[]>([]);

  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        "https://dxc-pfe-project-server.vercel.app/api/customer-order/product",
      );
      const productsData = response.data;
      setChartData(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  const generateChartData = () => {
    const data = chartData.reduce((acc: any, productOrder: ProductOrders) => {
      const orderDate = new Date(productOrder.orderDate);
      const week = getWeekNumber(orderDate);
      if (!acc[week]) {
        acc[week] = 0;
      }
      acc[week]++;
      return acc;
    }, {});

    return {
      labels: Object.keys(data),
      data: Object.values(data),
    };
  };

  const getWeekNumber = (date: Date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);
  };

  const PolarAreaChart = () => {
    useEffect(() => {
      const ctx = document.getElementById("polar-area-chart");

      if (ctx && chartData) {
        const { labels, data } = generateChartData();

        const dataPolar = {
          type: "polarArea",
          data: {
            labels,
            datasets: [
              {
                label: "Customer Orders",
                data,
                backgroundColor: [
                  "rgba(63, 81, 181, 0.5)",
                  "rgba(77, 182, 172, 0.5)",
                  "rgba(66, 133, 244, 0.5)",
                  "rgba(156, 39, 176, 0.5)",
                  "rgba(233, 30, 99, 0.5)",
                  "rgba(66, 73, 244, 0.4)",
                  "rgba(66, 133, 244, 0.2)",
                ],
              },
            ],
          },
        };

        new Chart(ctx, dataPolar);
      }
    }, [chartData]);

    return (
      <div className="mx-auto w-3/5 overflow-hidden">
        <canvas id="polar-area-chart"></canvas>
      </div>
    );
  };

  return (
    <div className="mt-4 flex p-2">
      <PolarAreaChart />
    </div>
  );
};

export default Chartt;
