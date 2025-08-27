import React from "react";
import { ApiErrorResponse, WeatherData } from "@/lib/types";
import WeatherIcon from "./WeatherIcon";
import { isApiError } from "@/lib/utils";
import Image from "next/image";

export default function WeatherDisplay({
  weatherData,
  loading,
}: {
  weatherData: WeatherData | ApiErrorResponse | null;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="flex w-full max-w-[650px] h-[450px] flex-col items-center transition-colors duration-500 ease-in-out justify-center p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 text-white mx-auto mt-8 animate-pulse">
        <p className="text-xl font-medium">Loading weather...</p>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  if (isApiError(weatherData)) {
    return (
      <div className="flex w-full max-w-[650px] h-[450px] flex-col items-center transition-colors duration-500 ease-in-out justify-center p-8 bg-red-500/15 backdrop-blur-md rounded-3xl shadow-2xl border border-red-400/20 text-white mx-auto mt-8">
        <p className="text-xl font-medium mb-2 text-center">
          {weatherData.message}
        </p>
        <p className="text-sm font-light">Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center transition-colors duration-500 ease-in-out p-6 sm:p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 text-white w-full max-w-[650px] mx-auto mt-8 relative">
      <div className="mb-4 animate-float">
        <WeatherIcon condition={weatherData.weatherCondition} />
      </div>

      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-5xl sm:text-7xl font-light leading-none">
          {weatherData.temperature}°C
        </h2>
        <p className="text-lg sm:text-xl font-medium mt-1">
          {weatherData.weatherCondition}
        </p>
        <p className="text-xl sm:text-2xl mt-2 font-semibold">
          {weatherData.city}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-around w-full text-base font-medium gap-4 sm:gap-0">
        <div className="flex flex-col items-center space-y-1">
          <span className="text-3xl sm:text-4xl text-white/80">
            <Image
              src="/wind.svg"
              alt="Wind"
              width={24}
              height={24}
              className="text-white/80"
            />
          </span>
          <p className="text-sm">{weatherData.windSpeed} km/h</p>
          <p className="text-sm">Wind Speed</p>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-3xl sm:text-4xl text-white/80">
            <Image
              src="/compass.svg"
              alt="Compass"
              width={24}
              height={24}
              className="text-white/80"
            />
          </span>
          <p className="text-sm">{weatherData.windDirection}</p>
          <p className="text-sm">Wind Direction</p>
        </div>
      </div>
    </div>
  );
}
