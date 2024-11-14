import React, { useEffect, useState } from "react";
import { WeatherData } from "../types";

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const city = "Тернопіль";
  const country = "ua";

  const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

  const formatTemperature = (temp: number) => {
    if (temp > 0) {
      return `+${temp}`;
    }
    if (temp === 0) {
      return `${temp}`;
    } else {
      return `${temp}`;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Перетворюємо в мілісекунди
    return date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&lang=uk`
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
          time: data.dt, // UNIX час
        };

        setWeather(weatherData);
      } catch (error) {
        setError((error as Error).message || "Щось пішло не так");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey]);

  return (
    <div className="max-w-xs w-full p-4 bg-white rounded-lg shadow-md text-center mb-5">
      <h2 className="text-2xl font-semibold mb-4">Погода в {city}</h2>
      <p>Зараз </p>
      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div>
          <img
            src={weather.icon}
            alt={weather.description}
            className="mx-auto mb-2"
          />
          <p>
            Температура:{" "}
            {formatTemperature(kelvinToCelsius(weather.temperature))}°C
          </p>
          <p>
            Відчувається як:{" "}
            {formatTemperature(kelvinToCelsius(weather.feelsLike))}°C
          </p>
          <p className="capitalize">{weather.description}</p>
          <p>Останнє оновлення: {formatTime(weather.time)}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
