import React, { useEffect, useState, useRef } from "react";
import { Chart, initTE } from "tw-elements";
import axios from "axios";

Chart.register(initTE);

interface ProductOffering {
  state: string;
  lastUpdate: string;
  status: string;
}

const CercleChart = () => {
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const [productOfferings, setProductOfferings] = useState<number[]>([]);

  useEffect(() => {
    initTE({ Chart });

    async function getProductOfferings() {
      try {
        const response = await axios.get(
          "https://dxc-pfe-project-server.vercel.app/api/product-offering",
        );
        const allProductOfferings: ProductOffering[] = response.data;
        console.log("chart", allProductOfferings);
        // Calculer le nombre d'offres par mois
        const offersByMonth = Array(12).fill(0);
        allProductOfferings.forEach((offering) => {
          const month = new Date(offering.lastUpdate).getMonth();
          offersByMonth[month]++;
        });

        setProductOfferings(offersByMonth);
        console.log("Offers by month:", offersByMonth);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des offres de produits :",
          error,
        );
      }
    }

    getProductOfferings();
    console.log(productOfferings);
    const dataBarCustomOptions = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Number of Offers",
            data: productOfferings,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };

    const optionsBarCustomOptions = {
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "green",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#4285F4",
          },
        },
        y: {
          ticks: {
            color: "#f44242",
          },
        },
      },
    };

    if (barChartRef.current) {
      new Chart(
        barChartRef.current,
        dataBarCustomOptions,
        optionsBarCustomOptions,
      );
    }
  }, []);

  return (
    <div className="mt-12 mx-auto overflow-hidden">
      <canvas ref={barChartRef} id="bar-chart-custom-options"></canvas>
    </div>
  );
};

export default CercleChart;
