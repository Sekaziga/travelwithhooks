import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ActivityForm({ onAddActivity }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && date && location) {
      onAddActivity({ name, date, location });
      setName('');
      setDate('');
      setLocation('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return; // Avoid unnecessary API calls if location is empty

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=752a15f467b4f4a83ff17fe3bcd1816e&units=metric`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather(null); // Handle errors gracefully
      }
    };

    fetchWeatherData();
  }, [location]); // Re-fetch when location changes

  return (
    <div>
     
      <p>
        {weather
          ? `Weather in ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}`
          : 'No weather data available'}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

ActivityForm.propTypes = {
  onAddActivity: PropTypes.func.isRequired,
};

export default ActivityForm;
