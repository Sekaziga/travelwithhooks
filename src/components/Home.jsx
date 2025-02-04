import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Home({ activities }) {
  return (
    <div>
      <h1>Planned Activities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <Link to={`/details/${activity.id}`}>{activity.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button>Add New Activity</button>
      </Link>
    </div>
  );
}

Home.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(Home);
