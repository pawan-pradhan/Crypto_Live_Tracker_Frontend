**Frontend - README.md**

````md
# 🚀 Crypto Live Tracker - Frontend

This is the **frontend** of the Crypto Live Tracker project built with React and Tailwind CSS. It displays real-time data of top 10 cryptocurrencies including charts, filters, search, and auto-refresh every 10 minutes.

## 🌐 Live URL
[https://cryptolivetracking.netlify.app](https://cryptolivetracking.netlify.app)

## 📊 Features
- Displays top 10 cryptocurrencies
- Shows name, symbol, price, market cap, 24h change, last updated
- Auto-refreshes every 10 minutes
- Filter gainers/losers, sort by price, market cap
- Search by name or symbol
- Modal chart view on clicking a coin
- Dark mode

## 📚 Tech Stack
- React.js (Vite)
- Tailwind CSS
- React Toastify
- Chart.js (react-chartjs-2)
- React Router DOM

## ⚖️ Environment Variables
Create a `.env` file in the root:
```env
VITE_API_URL=https://crypto-live-tracker-backend.onrender.com/api
````

## ⚙️ Local Setup

```bash
git clone https://github.com/pawan-pradhan/Crypto_Live_Tracker_Frontend.git
cd Crypto_Live_Tracker_Frontend
npm install
npm run dev
```

## ⚖️ Deployment

Hosted on [Netlify](https://netlify.com)

## 👥 Author

**Pawan Sharma**

* GitHub: [@pawan-pradhan](https://github.com/pawan-pradhan)

````

---

**Backend - README.md**

```md
# 🚀 Crypto Live Tracker - Backend

This is the **backend** of the Crypto Live Tracker full-stack application. It fetches live data from CoinGecko API, serves it via Express routes, and stores data in MongoDB (current + hourly historical data).

## 🌐 Live API URL
Base URL: [https://crypto-live-tracker-backend.onrender.com/api](https://crypto-live-tracker-backend.onrender.com/api)

### Endpoints
- `GET /coins` ➔ Fetch and update top 10 crypto from CoinGecko
- `POST /history` ➔ Get last 24 hourly entries
- `POST /history/:coinId` ➔ Get 24h historical data for a given coin

## ⚡ Notes
> ⚠️ Free hosting (Render) sleeps the backend after 15 mins of inactivity. First request may take 30-60 seconds.

## ⚙️ Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- Axios
- node-cron

## 🔢 Data Models
### CurrentCrypto
- id, name, symbol, image, current_price, market_cap, price_change_percentage_24h, last_updated

### HistoricalCrypto
- timestamp, coins: [array of CurrentCrypto]

## ⏰ Cron Job
- File: `cron/hourlyJob.js`
- Schedule: Runs every hour
- Function: Fetches data from CoinGecko, updates CurrentCrypto, appends to HistoricalCrypto

## ⚖️ Local Setup
```bash
git clone https://github.com/pawan-pradhan/Crypto_Live_Tracker_Backend.git
cd Crypto_Live_Tracker_Backend
npm install
````

### Create .env file

```env
PORT=5000
MONGO_URI=your_mongodb_uri
```

### Start server

```bash
npm run dev
```

## ⚖️ Deployment

Hosted on [Render](https://render.com) - Free Tier


## 👥 Author

**Pawan Sharma**

* GitHub: [@pawan-pradhan](https://github.com/pawan-pradhan)

```
```
