import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '0964d1357dfa9746cf09719d4013aae2';

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}

      {weather && (
        <div>
          <h2>Weather in {weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
