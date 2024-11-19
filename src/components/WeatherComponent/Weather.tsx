import React, { useEffect, useState, useCallback } from "react";
import { WeatherData } from "../../types";
import Tooltip from "../../utils/Tooltip";
import { BsCaretDown, BsCaretUpFill } from "react-icons/bs";

interface CitySearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("Київ");
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

  const formatTemperature = (temp: number) =>
    temp > 0 ? `+${temp}` : `${temp}`;

  const fetchWeather = useCallback(
    async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);
      setShowResults(false);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=uk`
        );

        if (!response.ok) {
          throw new Error("Не вдалося отримати дані про погоду");
        }

        const data = await response.json();
        const weatherData: WeatherData = {
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          temperatureMin: data.main.temp_min,
          temperatureMax: data.main.temp_max,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          time: data.dt,
        };

        setWeather(weatherData);
      } catch (error) {
        setError((error as Error).message || "Щось пішло не так");
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  const searchCity = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Не вдалося знайти міста");
      }

      const data: CitySearchResult[] = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      setError((error as Error).message || "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=Київ&limit=1&appid=${apiKey}`
      );
      const data: CitySearchResult[] = await response.json();
      if (data[0]) {
        fetchWeather(data[0].lat, data[0].lon);
      }
    };

    fetchDefaultWeather();
  }, [apiKey, fetchWeather]);

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {weather && (
          <>
            <Tooltip text={weather.description}>
              <img
                src={weather.icon}
                alt={weather.description}
                className="w-10 h-10"
              />
            </Tooltip>
            <p className="ml-2 font-semibold">
              {loading
                ? "..."
                : `${formatTemperature(
                    kelvinToCelsius(weather?.temperature || 0)
                  )}°C`}
            </p>
            <p className="ml-2">
              {expanded ? <BsCaretUpFill /> : <BsCaretDown />}
            </p>
          </>
        )}
      </div>

      {expanded && (
        <div className="absolute right-0 bg-white shadow-lg rounded-lg p-4 z-10 top-full mt-3 w-64 max-w-[90vw]">
          <div className="search-bar mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Введіть назву міста"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={searchCity}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
            >
              Пошук
            </button>
          </div>

          {showResults && (
            <ul className="search-results bg-gray-100 border rounded mt-2 max-h-40 overflow-y-auto">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => fetchWeather(result.lat, result.lon)}
                >
                  {result.name}, {result.country}
                </li>
              ))}
            </ul>
          )}

          {loading && <p>Завантаження...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {weather && (
            <div className="weather-details mt-4">
              <p className=" font-semibold">{}</p>
              <p className="capitalize">{weather.description}</p>
              <p>
                Температура:{" "}
                {formatTemperature(kelvinToCelsius(weather.temperature))}°C
              </p>
              <p>
                Відчувається як:{" "}
                {formatTemperature(kelvinToCelsius(weather.feelsLike))}°C
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
