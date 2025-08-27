import { NextResponse } from "next/server";
import { CITIES } from "./utils";

export type StormglassWeatherData = {
  hours: {
    airTemperature: { sg: number };
    cloudCover: { sg: number };
    time: string;
    windDirection: { sg: number };
    windSpeed: { sg: number };
  }[];
  meta: {
    cost: number;
    dailyQuota: number;
    end: string;
    lat: number;
    lng: number;
    params: string[];
    requestCount: number;
    source: string[];
    start: string;
  };
};

export type WeatherData = {
  city: string;
  temperature: number;
  windSpeed: number;
  windDirection: string;
  weatherCondition: string;
  icon: string;
  message?: string;
};

export type ApiErrorResponse = {
  message: string;
  status: number;
};

export type CityNames = (typeof CITIES)[number]["name"];