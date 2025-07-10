// src/components/CryptoCard.jsx
import { Link } from "react-router-dom";
import CoinChartModal from "./CoinChartModal"; // adjust path as needed
import { useState } from "react";




// src/components/CryptoCard.jsx
const CryptoCard = ({ coin, onChartClick }) => {
  return (
    <div
      title="click to graph view"
      className="p-4 bg-white dark:bg-gray-600 hover:bg-slate-500 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
      onClick={onChartClick} // ⬅️ Clicking card calls parent handler
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">{coin.name}</h2>
        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
      </div>
      <p className="text-gray-700 dark:text-gray-200">
        Symbol: <strong>{coin.symbol.toUpperCase()}</strong>
      </p>
      <p className="text-gray-700 dark:text-gray-200">
        Price: <strong>${coin.current_price.toLocaleString()}</strong>
      </p>
      <p className="text-gray-700 dark:text-gray-200">
        Market Cap: <strong>${coin.market_cap.toLocaleString()}</strong>
      </p>
      <p>
        24h Change:
        <span
          className={
            coin.price_change_percentage_24h >= 0
              ? "text-green-600 font-semibold ml-1"
              : "text-red-600 font-semibold ml-1"
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
    </div>
  );
};

export default CryptoCard;

