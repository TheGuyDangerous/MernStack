import React, { useState } from 'react';
import apikey from './config';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}
      `);
      const data = await response.json();

      if (data.cod === 200) {
        const temperature = (data.main.temp - 273.15).toFixed(2);
        setWeather(`Weather in ${city}: ${data.weather[0].description}<br>Temperature: ${temperature}°C`);
        setError('');
      } else {
        setWeather('');
        setError('The city could not be found');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather('');
      setError('An error occurred while fetching weather data');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 p-4">
      <div className="text-center text-white">
        <h1>What's the Weather</h1>
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="form-group">
            <label htmlFor="city" className='m-4'>Enter the name of a city</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Eg.London, Tokyo"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>
        </form>
        <div id="weather" className="p-3">
          {weather && (
            <div
              className="alert alert-success"
              role="alert"
              dangerouslySetInnerHTML={{ __html: weather }}
            />
          )}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
