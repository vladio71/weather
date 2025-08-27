import Image from "next/image";

export default function WeatherIcon({ condition }: { condition: string }) {
  switch (condition) {
    case "Clear":
      return (
        <Image
          src="/sun.svg"
          alt="Clear weather"
          width={96}
          height={96}
          className="text-white"
        />
      );
    case "Partly Cloudy":
      return (
        <Image
          src="/cloud-sun.svg"
          alt="Partly cloudy weather"
          width={96}
          height={96}
          className="text-white"
        />
      );
    case "Cloudy":
      return (
        <Image
          src="/cloud.svg"
          alt="Cloudy weather"
          width={96}
          height={96}
          className="text-white"
        />
      );
    case "Rain":
      return (
        <Image
          src="/cloud-drizzle.svg"
          alt="Rainy weather"
          width={96}
          height={96}
          className="text-white"
        />
      );
    case "Snow":
      return (
        <Image
          src="/cloud-snow.svg"
          alt="Snowy weather"
          width={96}
          height={96}
          className="text-white"
        />
      );
    case "Thunderstorm":
      return (
        <Image
          src="/cloud-lightning.svg"
          alt="Thunderstorm weather"
          width={96}
          height={96}
          className="text-white"
        />
      );
    default:
      return (
        <Image
          src="/globe.svg"
          alt="Weather"
          width={96}
          height={96}
          className="text-white"
        />
      );
  }
}
