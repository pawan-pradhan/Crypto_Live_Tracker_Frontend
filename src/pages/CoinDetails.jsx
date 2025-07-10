// src/pages/CoinDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
const API_URL = import.meta.env.VITE_API_URL;
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const CoinDetails = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .post(`${API_URL}/history/${id}`)
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Error fetching history", err));
  }, [id]);

  const chartData = {
    labels: history.map(item => new Date(item.last_updated).toLocaleTimeString()),
    datasets: [
      {
        label: "Price (USD)",
        data: history.map(item => item.current_price),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        📊 {id.toUpperCase()} Price Trend (Past 24 Hours)
      </h2>
      <Line data={chartData} />
      
    </div>
  );
};

export default CoinDetails;
