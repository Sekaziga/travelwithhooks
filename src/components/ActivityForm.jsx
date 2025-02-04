import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ActivityForm({ onAddActivity, activity, onCancel }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (activity) {
      setName(activity.name);
      setDate(activity.date);
      setLocation(activity.location);
    }
  }, [activity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && date && location) {
      const newActivity = { ...activity, name, date, location };
      onAddActivity(newActivity);
      setName('');
      setDate('');
      setLocation('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return;

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
        setWeather(null);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <div>
      <div className="weather">
        {weather ? (
          <>
            <h1>Weather in {weather.name}</h1>
            <p>
              <span>{weather.main.temp}°C</span>, {weather.weather[0].description}
            </p>
          </>
        ) : (
          'No weather data available'
        )}
      </div>

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
        <button type="submit">{activity ? 'Save Changes' : 'Add Activity'}</button>
        {activity && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
}

ActivityForm.propTypes = {
  onAddActivity: PropTypes.func.isRequired,
  activity: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};

export default ActivityForm;
