import { useEffect, useState } from "react";
import axios from "axios";
import CryptoCard from "../components/CryptoCard";
import CoinChartModal from "../components/CoinChartModal";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortType, setSortType] = useState("");

  const REFRESH_INTERVAL = 30 * 60;
  const [timeRemaining, setTimeRemaining] = useState(REFRESH_INTERVAL);

  // 👇 Countdown Timer
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : REFRESH_INTERVAL));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  // 👇 Fetching Crypto Data
  useEffect(() => {
    setLoading(true);
    toast.info("Fetching crypto data...");

    const fetchData = () => {
      axios
        .get(`${API_URL}/coins`)
        .then((res) => {
          const data = res.data.current;
          setCoins(data);

          if (data.length === 0) {
            toast.error("No records found");
          } else {
            toast.success("✅ Success fetching data!");
            setLastUpdated(data[0].last_updated);
          }

          setTimeRemaining(REFRESH_INTERVAL);
        })
        .catch((err) => {
          toast.error("Failed to fetch!");
          console.error("Error fetching data", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, []);

  // 👇 Filtering & Sorting
  let filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterType === "gainers") {
    filteredCoins = filteredCoins.filter((coin) => coin.price_change_percentage_24h >= 0);
  } else if (filterType === "losers") {
    filteredCoins = filteredCoins.filter((coin) => coin.price_change_percentage_24h < 0);
  }

  if (sortType === "price-desc") {
    filteredCoins.sort((a, b) => b.current_price - a.current_price);
  } else if (sortType === "price-asc") {
    filteredCoins.sort((a, b) => a.current_price - b.current_price);
  } else if (sortType === "marketcap") {
    filteredCoins.sort((a, b) => b.market_cap - a.market_cap);
  } else if (sortType === "percent-desc") {
    filteredCoins.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  }

  // ✅ Inline SkeletonCard Component
  const SkeletonCard = () => (
    <div className="bg-gray-800 rounded p-4 animate-pulse shadow-lg h-[150px]">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Top 10 Cryptocurrencies
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-md border bg-gray-800 border-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-4 mb-4">
        <select
          className="pl-2 py-2 border rounded bg-gray-800 border-gray-700 text-white"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All</option>
          <option value="gainers">Gainers</option>
          <option value="losers">Losers</option>
        </select>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 rounded-md border bg-gray-800 border-gray-700 text-white"
        >
          <option value="">Sort By</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="marketcap">Market Cap</option>
          <option value="percent-desc">Top Gainers %</option>
        </select>
      </div>

      {/* ✅ Display Data / Skeleton / No Result */}
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : filteredCoins.length === 0 ? (
        <p className="text-white text-center mt-8">🚫 No cryptocurrencies found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCoins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} onChartClick={() => setSelectedCoin(coin.id)} />
          ))}
        </div>
      )}

      {selectedCoin && (
        <CoinChartModal
          coinId={selectedCoin}
          isOpen={true}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </div>
  );
};

export default Home;




























// import { useEffect, useState } from "react";
// import axios from "axios";
// import CryptoCard from "../components/CryptoCard";
// import CoinChartModal from "../components/CoinChartModal";
// import { toast } from "react-toastify";
// import Spinner from "../components/Spinner";
// const API_URL = import.meta.env.VITE_API_URL;




// const Home = () => {
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCoin, setSelectedCoin] = useState(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("");
//   const [sortType, setSortType] = useState("");

//   const REFRESH_INTERVAL = 30 * 60; 

//   const [timeRemaining, setTimeRemaining] = useState(REFRESH_INTERVAL);


//     useEffect(() => {
//         const countdownInterval = setInterval(() => {
//             setTimeRemaining(prev => (prev > 0 ? prev - 1 : REFRESH_INTERVAL));
//         }, 1000); 

//         return () => clearInterval(countdownInterval);
//     }, []);






//   useEffect(() => {
//     setLoading(true);
//     toast.info("Fetching crypto data...");

//     const fetchData = () => {
//       axios
//         .get(`${API_URL}/coins`)
//         .then((res) => {
//           toast.success("✅ Success fetching data!");
//           setCoins(res.data.current);

//           if (res.data.current.length > 0) {
//             setLastUpdated(res.data.current[0].last_updated);
//           }

//           setTimeRemaining(REFRESH_INTERVAL);

//         })
//         .catch((err) => {
//           toast.error("Failed to fetch!");
//           console.error("Error fetching data", err);
//         })
//         .finally(() => {
//           setLoading(false); // 👈 hide spinner after all
//         });
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 30 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // filter records based on the search query
//   var filteredCoins = coins.filter(
//     (coin) =>
//       coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   //   filter records based on the filter type
//   if (filterType === "gainers") {
//     filteredCoins = filteredCoins.filter(
//       (coin) => coin.price_change_percentage_24h >= 0
//     );
//   } else if (filterType === "losers") {
//     filteredCoins = filteredCoins.filter(
//       (coin) => coin.price_change_percentage_24h < 0
//     );
//   }

//   //  Sort data based on the sort type
//   if (sortType === "price-desc") {
//     filteredCoins.sort((a, b) => b.current_price - a.current_price);
//   } else if (sortType === "price-asc") {
//     filteredCoins.sort((a, b) => a.current_price - b.current_price);
//   } else if (sortType === "marketcap") {
//     filteredCoins.sort((a, b) => b.market_cap - a.market_cap);
//   } else if (sortType === "percent-desc") {
//     filteredCoins.sort(
//       (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center  text-white">
//         Top 10 Cryptocurrencies
//       </h1>
// {/*       {lastUpdated && (
//         <p className="text-center text-sm text-gray-500 mt-2 ">
//           Last updated: {new Date(lastUpdated).toLocaleString()}
//         </p>
//       )} */}

//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or symbol..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-md border bg-gray-800 border-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="flex justify-end gap-4 mb-2 ">
// {/*         <p className="text-center text-sm text-white  mb-4">
//         ⏱️ Next refresh in: {Math.floor(timeRemaining / 60)}m {timeRemaining % 60}s
//         </p>
//         <div className="w-[63%]">
//             <p className="text-white justify-self-end">Dashboard  data auto update in every 30 min...</p>
//         </div> */}
//         <div className="flex  gap-2 ml-[68px] ">
//             <select
//                 className="pl-2 py-2 border rounded bg-gray-800 border-gray-700 text-white ml-20"
//                 onChange={(e) => setFilterType(e.target.value)}
//                 >
//                 <option value="">All</option>
//                 <option value="gainers">Gainers</option>
//                 <option value="losers">Losers</option>
//                 </select>
//                 <select
//                 value={sortType}
//                 onChange={(e) => setSortType(e.target.value)}
//                 className="w-full sm:w-48 px-4 py-2 rounded-md border bg-gray-800 border-gray-700 text-white"
//                 >
//                 <option value="">Sort By</option>
//                 <option value="price-desc">Price: High → Low</option>
//                 <option value="price-asc">Price: Low → High</option>
//                 <option value="marketcap">Market Cap</option>
//                 <option value="percent-desc">Top Gainers %</option>
//             </select>
//         </div>
//       </div>

//       {/* <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//         {filteredCoins.map((coin) => (
//           <CryptoCard
//             key={coin.id}
//             coin={coin}
//             onChartClick={() => setSelectedCoin(coin.id)}
//           />
//         ))}
//       </div> */}
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {filteredCoins.map((coin) => (
//             <CryptoCard key={coin.id} coin={coin} onChartClick={() => setSelectedCoin(coin.id)} />
//           ))}
//         </div>
//       )}

//       {selectedCoin && (
//         <CoinChartModal
//           coinId={selectedCoin}
//           isOpen={true}
//           onClose={() => setSelectedCoin(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;
