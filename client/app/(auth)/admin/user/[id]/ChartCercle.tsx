import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import * as dotenv from "dotenv";

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
}

Chart.register(...registerables);

const DoughnutChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [chartInstance, setChartInstance] = useState<Chart<
    "doughnut",
    number[],
    string
  > | null>(null);

  useEffect(() => {
    getProductOfferings();
  }, []);

  async function getProductOfferings() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product-offering`,
      );
      const allProductOfferings = response.data;
      setProductOfferings(allProductOfferings);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits offerts :",
        error,
      );
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Comptez le nombre de product offerings par état
      const stateCounts: { [key: string]: number } = {};
      productOfferings.forEach((productOffering) => {
        const { state } = productOffering;
        if (state && Object.prototype.hasOwnProperty.call(stateCounts, state)) {
          stateCounts[state] += 1;
        } else {
          stateCounts[state] = 1;
        }
      });

      // Construisez les données du graphique
      const labels = Object.keys(stateCounts);
      const data = Object.values(stateCounts);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Nombre de product offerings par état",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.9)",
              "rgba(255, 159, 64, 0.9)",
              "rgba(255, 255, 140, 0.9)",
              "rgba(153, 102, 255, 0.9)",
              "rgba(201, 203, 207, 0.9)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      if (chartInstance) {
        chartInstance.destroy();
      }

      if (ctx !== null) {
        const newChartInstance = new Chart(ctx, {
          type: "doughnut",
          data: chartData,
          options: {},
        });
        setChartInstance(newChartInstance);
      } else {
        console.error("Le contexte de rendu du canvas est null.");
      }
    }
  }, [productOfferings]);

  return (
    <div className="mx-auto  text-center">
      <canvas ref={chartRef} />
      <p className="mt-2 text-gray-600 font-semibold">
        Product Offering By State
      </p>
    </div>
  );
};

export default DoughnutChart;
