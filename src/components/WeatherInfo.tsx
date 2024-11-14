import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
  current: {
    temp: number;
    weather: { description: string }[];
  };
}

const WeatherInfo: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing. Please add it to your .env file.");
      return;
    }

    axios
      .get(
        `api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${apiKey}`
      )
      .then((response) => {
        setWeather(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        setError(
          "Failed to fetch weather data. Please check the API key and network connection."
        );
        console.error("Error fetching weather data:", err);
      });
  }, [lat, lon, apiKey]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      {weather ? (
        <>
          <h4>Поточна погода</h4>
          <p>Температура: {Math.round(weather.current.temp - 273.15)}°C</p>
          <p>Стан: {weather.current.weather[0].description}</p>
        </>
      ) : (
        <p>Завантаження даних про погоду...</p>
      )}
    </div>
  );
};

export default WeatherInfo;
