import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

import Spinner from "../components/Spinner";

const API_URL = import.meta.env.VITE_API_URL;


import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const CoinChartModal = ({ coinId, isOpen, onClose }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    

  useEffect(() => {
    if (isOpen && coinId) {
      setLoading(true);
      axios
        .post(`${API_URL}/history/${coinId}`)
        .then((res) => {
          setHistory(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching history", err);
          setLoading(false);
        });
    }
  }, [coinId, isOpen]);

  const chartData = {
    labels: history.map(item =>
      item?.last_updated ? new Date(item.last_updated).toLocaleTimeString() : "?"
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: history.map(item => item?.current_price || 0),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📈 {coinId?.toUpperCase()} - 24h Chart
          </Dialog.Title>
          {loading ? (
            <Spinner />
          ) : history.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p className="text-sm text-gray-500">No data available for this coin.</p>
          )}
          {/* {history.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p className="text-sm text-gray-500">Loading chart...</p>
          )} */}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CoinChartModal;
