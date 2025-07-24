# Smart Route Planning App

A modern, beautiful route planner web app inspired by Google Maps and iOS Maps. Features multi-transport mode selection, budget-friendly suggestions, and a 3D map (Mapbox GL JS).

## Features
- Dark, attractive UI/UX
- Select from Drive (tolls/no tolls), CTA, Train, Metra, Metro, Flight
- Budget-friendly, fastest, and eco-friendly route suggestions
- Sample data for airlines, trains, and transit agencies
- 3D interactive map (Mapbox GL JS)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Add your Mapbox access token:**
   - Open `src/Map3D.tsx`
   - Replace `'YOUR_MAPBOX_ACCESS_TOKEN'` with your token from [mapbox.com](https://account.mapbox.com/)
3. **Run the app:**
   ```bash
   npm run dev
   ```

## Notes
- This is a frontend-only demo with sample data. You can extend it to use real APIs for routes and flights.
- For best results, use the latest version of Chrome or Firefox.

---

Enjoy your smart route planning experience!