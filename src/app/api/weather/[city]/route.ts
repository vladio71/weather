import { NextRequest, NextResponse } from "next/server";
import { CITIES, WEATHER_API_ERROR_MESSAGES } from "@/lib/utils";
import { StormglassWeatherData, WeatherData } from "@/lib/types";

function transformWeatherData(
  data: StormglassWeatherData,
  cityName: string
): WeatherData {
  const latestHourData = data.hours[0];
  const temperature = latestHourData.airTemperature.sg;
  const windSpeed = latestHourData.windSpeed.sg;
  const windDirection = latestHourData.windDirection.sg;
  const cloudCover = latestHourData.cloudCover.sg;

  let weatherCondition = "Clear";
  let icon = "☀️";
  if (cloudCover > 70) {
    weatherCondition = "Cloudy";
    icon = "☁️";
  } else if (cloudCover > 30) {
    weatherCondition = "Partly Cloudy";
    icon = "⛅";
  }

  const windDirectionMap = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const windDirectionIndex = Math.round(windDirection / 45) % 8;
  const windDirectionText = windDirectionMap[windDirectionIndex];

  return {
    city: cityName,
    temperature: parseFloat(temperature.toFixed(1)),
    windSpeed: parseFloat((windSpeed * 3.6).toFixed(1)),
    windDirection: windDirectionText,
    weatherCondition,
    icon,
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { city: string } }
) {
  try {
    const cityName = params.city;
    const city = CITIES.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase()
    );

    if (!city) {
      return NextResponse.json({ message: "City not found" }, { status: 404 });
    }

    const apiKey = process.env.STORMGLASS_API_KEY;
    if (!apiKey) {
      console.error("STORMGLASS_API_KEY is not defined.");
      return NextResponse.json(
        { message: "Internal Server Error: API key not configured" },
        { status: 500 }
      );
    }

    const now = new Date();
    const start = now.toISOString();
    const paramsToFetch = "airTemperature,windSpeed,windDirection,cloudCover";
    const source = "sg";

    const apiUrl = `https://api.stormglass.io/v2/weather/point?lat=${city.lat}&lng=${city.lng}&params=${paramsToFetch}&start=${start}&end=${start}&source=${source}`;

    const res = await fetch(apiUrl, {
      headers: { Authorization: apiKey },
    });

    if (!res.ok) {
      const errorCode = res.status;
      const errorMessage =
        WEATHER_API_ERROR_MESSAGES[errorCode] || "An unknown error occurred.";

      return NextResponse.json(
        { message: errorMessage },
        { status: errorCode }
      );
    }

    const data = (await res.json()) as StormglassWeatherData;

    if (!data.hours || data.hours.length === 0) {
      return NextResponse.json(
        { message: "No weather data found." },
        { status: 404 }
      );
    }

    const processedData = transformWeatherData(data, city.name);
    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch weather data." },
      { status: 500 }
    );
  }
}
