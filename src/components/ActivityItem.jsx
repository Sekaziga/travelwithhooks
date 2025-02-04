import  { memo } from 'react';
import PropTypes from 'prop-types';

const ActivityItem = memo(function ActivityItem({ activity, onEdit, onDelete }) {
  return (
    <li>
      <h3>{activity.name}</h3>
      <p>Date: {activity.date}</p>
      <p>Location: {activity.location}</p>
      <button onClick={() => onEdit(activity.id)}>Edit</button>
      <button onClick={() => onDelete(activity.id)}>Delete</button>
    </li>
  );
});

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActivityItem;
