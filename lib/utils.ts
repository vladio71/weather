import { WeatherData, ApiErrorResponse } from "./types";

export const CITIES = [
  { name: "Kyiv", lat: 50.4501, lng: 30.5234 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
] as const;

export const WEATHER_API_ERROR_MESSAGES: Record<number, string> = {
  400: "Bad request. Please check your query parameters.",
  402: "Payment required. You've exceeded your request limit.",
  403: "Forbidden. Please check your API key.",
  410: "The requested resource is no longer available.",
  500: "Internal server error. Please try again later.",
};

export async function getWeatherData(
  cityName: string
): Promise<WeatherData | ApiErrorResponse> {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/weather/${cityName.toLowerCase()}`;

  const res = await fetch(apiUrl, {
    next: { revalidate: 600 },
  });

  const data = (await res.json()) as WeatherData;
  return data;
}

export function isApiError(
  data: WeatherData | ApiErrorResponse | null
): data is ApiErrorResponse {
  return (data as ApiErrorResponse).message !== undefined;
}

export function formatCityName(raw: string): string {
  return decodeURIComponent(raw)
    .replace(/\d+/g, " ")       
    .replace(/\s+/g, " ")        
    .trim()                     
    .toLowerCase()                
    .replace(/\b\w/g, c => c.toUpperCase());
}
