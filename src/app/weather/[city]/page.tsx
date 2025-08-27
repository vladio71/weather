import CityDropdown from "@/components/CityDropdown";
import WeatherDisplay from "@/components/WeatherDisplay";
import { formatCityName, getWeatherData, isApiError } from "@/lib/utils";
import { CITIES } from "@/lib/utils";
import { WeatherData, ApiErrorResponse } from "@/lib/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    city: city.name.toLowerCase(),
  }));
}

export default async function WeatherPage({
  params,
}: {
  params: { city: string };
}) {
  const selectedCity = params.city;
  const weatherData = await getWeatherData(selectedCity);
  const city = formatCityName(selectedCity);

  if (!weatherData) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-10 px-4 sm:px-0">
      <CityDropdown selectedCity={city} />
      <div className="w-full max-w-[650px]">
        <WeatherDisplay weatherData={weatherData} />
      </div>
    </div>
  );
}
