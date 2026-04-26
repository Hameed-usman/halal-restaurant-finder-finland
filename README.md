# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Halal Restaurant Finder Finland

A React web application for discovering halal restaurants across Finland
with an interactive map, search, cuisine filtering, and geolocation.

## Live Demo
https://your-app.railway.app

## Tech Stack
- React + Vite
- React Leaflet
- Zustand
- Tailwind CSS

## How to Run Locally
git clone https://github.com/YOUR_USERNAME/halal-restaurant-finder-finland
cd halal-restaurant-finder-finland
npm install
cp .env.example .env
# Add your Google Sheet CSV URL to .env
npm run dev

## Environment Variables
VITE_SHEET_URL — Public Google Sheet CSV export URL

## Folder Structure
src/
├── components/   # Map, Sidebar, Filters, UI primitives
├── hooks/        # useRestaurants, useGeolocation
├── store/        # Zustand store with derived filteredRestaurants
├── utils/        # sheetParser, distanceCalculator
└── constants/    # MAP_DEFAULTS, CUISINE_COLORS, NEAR_ME, HALAL_STATUS

## Architecture Decisions
- Zustand over Context: derived state computed synchronously,
  no useEffect chains, no stale closures
- sheetParser as pure utility: CSV logic fully decoupled from React
- distanceCalculator as pure function: Haversine math, independently
  verifiable, zero side effects
- Single filteredRestaurants getter: handles search, cuisine, and
  distance sort in one place — components read, never compute

## Features
- Interactive map centered on Finland with cuisine-colored pins
- Search by name or city — debounced 300ms
- Cuisine filter buttons — dynamic from data, not hardcoded
- Both filters work simultaneously through one derived store getter
- Near Me: Geolocation API, distance sort, map flyTo animation
- Halal status badge — green, amber, grey
- Mobile responsive — bottom drawer sidebar on small screens
- Error boundary — no blank screen on unexpected errors
- Loading spinner on initial data fetch