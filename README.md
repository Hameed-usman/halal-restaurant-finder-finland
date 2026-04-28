# 🌲 Verdant Halal: Finland Restaurant Finder

A premium React web application designed to help users discover and navigate halal restaurants across Finland. Built with a focus on speed, beautiful UI, and professional geospatial features.

![App Status](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38b2ac)

## ✨ Key Features

- **📍 Intelligent "Near Me"**: Automatically find and sort restaurants by proximity using browser geolocation.
- **🗺️ Interactive Map**: Real-time Leaflet map with automatic viewport adjustments as you search.
- **🔍 Multi-Layer Search**: Debounced (150ms) search across names, cities, addresses, and cuisines.
- **🍲 Dynamic Filtering**: Cuisine filters generated directly from live data.
- **📱 Professional Mobile Design**: Native-feeling "Bottom Sheet" layout for mobile users.
- **🛡️ Data Integrity**: Normalizes Google Sheet CSV data for reliable searching and display.

## 🚀 Technical Highlights

- **Zustand State Management**: High-performance state handling with zero "stale closure" issues.
- **Haversine Distance Algorithm**: Custom utility for accurate proximity calculations.
- **Zero-Placeholder Policy**: Uses real-time data and high-quality assets.
- **Optimized for Speed**: Extremely fast filtering and map pin synchronization.

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Mapping**: Leaflet + React Leaflet
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Data Source**: Google Sheets (CSV)

## 📦 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/halal-restaurant-finder-finland
   cd halal-restaurant-finder-finland
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file and add your Google Sheets CSV URL:
   ```env
   VITE_SHEET_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

## 🧪 Verification & Testing

### Testing "Near Me" from Abroad
If you are testing the application from outside Finland (e.g., Pakistan), follow these steps to verify the proximity sorting:

1. Open Browser DevTools (`F12`).
2. Open the **Sensors** tab (under *More tools*).
3. Set your **Location** to **Helsinki** (`Lat: 60.1699, Lng: 24.9384`).
4. Click the **📍 Near Me** button in the app.
5. **Expected Result**: The map will fly to Helsinki, and the restaurant list will sort to show the closest restaurants (e.g., "500m away") at the top.

## 📁 Architecture
```text
src/
├── components/   # Modular UI components (Map, Sidebar, Filters)
├── hooks/        # Reusable logic (useRestaurants, useGeolocation)
├── store/        # Centralized state (Zustand)
├── utils/        # Pure utilities (parser, distance math)
└── constants/    # Global configuration & default state
```

---
Developed with ❤️ for the Halal community in Finland.