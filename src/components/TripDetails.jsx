import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function TripDetails({ activities, onDeleteActivity }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.find((activity) => activity.id === id);

  if (!activity) {
    return <div>Activity not found.</div>;
  }

  const handleDelete = () => {
    onDeleteActivity(id);
    navigate('/');
  };

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>Date: {activity.date}</p>
      <p>Location: {activity.location}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
    </div>
  );
}

export default TripDetails;
