"use client";
import { CITIES, getWeatherData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { WeatherData, ApiErrorResponse, CityNames } from "@/lib/types";
import CityDropdown from "@/components/CityDropdown";
import WeatherDisplay from "@/components/WeatherDisplay";

type loadingState = "idle" | "loading" | "error";

export default function RootPage() {
  const [city, setCity] = useState<CityNames>("Kyiv");
  const [state, setState] = useState<loadingState>("error");
  const [weatherData, setWeatherData] = useState<
    WeatherData | ApiErrorResponse | null
  >(null);

  useEffect(() => {
    setState("loading");
    setWeatherData(null);

    async function fetchData() {
      const data = await getWeatherData(city.toLowerCase());
      setWeatherData(data);
    }
    fetchData().then(() => setState("idle"));
  }, [city]);

  const isLoading = state === "loading";

  return (
    <div className="px-4 sm:px-0">
      <CityDropdown
        selectedCity={city}
        onCityClick={(city: CityNames) => {
          setCity(city);
        }}
      />
      <WeatherDisplay weatherData={weatherData} loading={isLoading} />
    </div>
  );
}
