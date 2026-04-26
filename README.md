# Halal Restaurant Finder Finland 🇫🇮

A modern React application to help you discover verified halal restaurants, mosques, and halal-friendly options across Finland. Built with React, Vite, and Zustand for state management.

## Features
- **Interactive Map**: View all restaurants on a dynamic Leaflet map.
- **Real-time Search**: Search restaurants by name or city with instant results.
- **Cuisine Filters**: Filter dynamically based on available data from the sheet.
- **Near Me**: Find the closest halal restaurants using geolocation API.
- **Responsive Layout**: Optimized for both desktop and mobile devices.

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Leaflet (Maps)
- Papaparse (CSV parsing)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file and add the Google Sheets CSV URL:
```env
VITE_SHEET_URL=your_google_sheets_csv_url
```

3. Start development server:
```bash
npm run dev
```
