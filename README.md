# 🌤️ Weather Widget - Next.js 15

A modern, responsive weather application built with Next.js 15 that displays current weather conditions for selected cities using the Stormglass API.

## 📹 Preview

[🎥 Watch Demo](https://www.loom.com/share/1714328bc9e24d28a650eea8ed79b4a9)

## ✨ Features

- **Real-time Weather Data**: Current temperature, wind speed, wind direction, and weather conditions
- **Multi-City Support**: Pre-configured cities with easy city selection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Auto-refresh**: Automatic data refresh every 10 minutes
- **Error Handling**: Comprehensive error states and user feedback
- **TypeScript**: Full type safety throughout the application

## 🏗️ Architecture

### Route Structure

- **`/`** - Client-side app with city selection and weather display
- **`/weather/[city]`** - Server-side rendered weather pages for each city
- **`/api/weather/[city]`** - API route for fetching weather data

## 🚀 Getting Started

1. **Create `.env.local` file**

   ```env
   STORMGLASS_API_KEY=
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

2. **Run development server**

   ```bash
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
weather/
├── components/           # Reusable UI components
│   ├── CityDropdown.tsx # City selection dropdown
│   ├── WeatherDisplay.tsx # Weather information display
│   ├── WeatherIcon.tsx  # Weather condition icons
├── lib/                 # Utility functions and types
│   ├── types.ts        # TypeScript type definitions
│   └── utils.ts        # Helper functions
├── public/              # Static assets
│   ├── wind.svg        # Wind speed icon
│   ├── compass.svg     # Wind direction icon
│   ├── sun.svg         # Clear weather icon
│   └── ...             # Other weather icons
├── src/app/            # Next.js App Router
│   ├── api/            # API routes
│   ├── weather/        # Dynamic weather pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── middleware.ts       # Route redirects
└── package.json        # Dependencies and scripts
```

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
