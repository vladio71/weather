import { redirect } from "next/navigation";
import { CITIES } from "@/lib/utils";

export default function WeatherRedirectPage() {
  const firstCity = CITIES[0].name.toLowerCase();
  redirect(`/weather/${firstCity}`);
}
