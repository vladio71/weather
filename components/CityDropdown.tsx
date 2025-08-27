"use client";

import React, { useState, useEffect, useRef } from "react";
import { CITIES } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CityNames } from "@/lib/types";

export default function CityDropdown({
  selectedCity,
  onCityClick,
}: {
  selectedCity: string;
  onCityClick?: (city: CityNames) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selectedCity);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (city: CityNames) => {
    setIsOpen(false);
    setInputValue(city);
    if (onCityClick) {
      onCityClick(city);
    } else {
      router.push(`/weather/${city.toLowerCase()}`);
    }
  };

  return (
    <div
      className="relative w-full max-w-lg mx-auto pt-6 mb-8 px-4 sm:px-0"
      ref={dropdownRef}
    >
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder="Search for a city..."
          className="w-full px-6 py-4 text-gray-800 text-xl font-medium rounded-full shadow-lg focus:outline-none cursor-pointer bg-white transition-shadow duration-300 hover:shadow-xl"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
          <ul
            className="py-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {CITIES.map((city) => (
              <li key={city.name}>
                <a
                  onClick={() => handleSelect(city.name)}
                  className="block px-6 py-3 text-lg text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  role="menuitem"
                >
                  {city.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
