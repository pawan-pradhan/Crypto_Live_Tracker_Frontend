// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import CoinDetails from "./pages/CoinDetails.jsx"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;