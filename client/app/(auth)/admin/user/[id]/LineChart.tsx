import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Completed Orders By Days",
            data: [0, 0, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {},
    });

    return () => {
      // Clean up the chart when the component is unmounted
      chart.destroy();
    };
  }, []);

  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/customer-order/product",
      );
      const productsData = response.data;

      const completedOrders = [0, 0, 0, 0, 0, 0, 0]; // Array to store the completed order counts for each day

      // Get the current date
      const currentDate = new Date();

      productsData.forEach((product: any) => {
        const completionDate = new Date(product.completionDate);
        const isSameDay =
          completionDate.toDateString() === currentDate.toDateString();
        const isCompleted = product.state === "completed";

        if (isSameDay && isCompleted) {
          const dayOfWeek = completionDate.getDay();
          completedOrders[dayOfWeek] += 1;
        }
      });

      const chart = chartRef.current.chart;
      chart.data.datasets[0].data = completedOrders;
      chart.update();
    } catch (error) {
      console.error("Error retrieving product orders:", error);
    }
  }

  return <canvas ref={chartRef} />;
};

export default LineChart;