
import ActivityItem from './ActivityItem';
import PropTypes from 'prop-types';

function ActivityList({ activities, onEditActivity, onDeleteActivity }) { 
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityItem 
          key={activity.id} 
          activity={activity} 
          onEdit={() => onEditActivity(activity)} 
          onDelete={() => onDeleteActivity(activity.id)} 
        />
      ))}
    </ul>
  );
}

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onEditActivity: PropTypes.func.isRequired, // <-- Add this line
  onDeleteActivity: PropTypes.func.isRequired,
};
export default ActivityList;