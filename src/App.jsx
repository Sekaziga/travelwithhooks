import  { useState } from 'react';
import Header from './components/Header';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [activities, setActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentActivity, setCurrentActivity] = useState(null); 

  const handleAddActivity = (newActivity) => {
    const newActivityWithId = { ...newActivity, id: uuidv4() }; 
    setActivities([...activities, newActivityWithId]); 
  };

  const handleEditActivity = (activity) => {
    setIsEditing(true);

    setCurrentActivity(activity);
    console.log(activity)
  };

  const handleSaveEdit = (editedActivity) => {
    const updatedActivities = activities.map((activity) => 
      activity.id === editedActivity.id ? editedActivity : activity
    );
    setActivities(updatedActivities);
    
    setIsEditing(false); 
    setCurrentActivity(null); 
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentActivity(null);
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <div className="App">
      <Header />
      {isEditing ? (
        <ActivityForm 
          onAddActivity={handleSaveEdit} 
          activity={currentActivity} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <ActivityForm onAddActivity={handleAddActivity} />
      )} 
      <ActivityList 
        activities={activities} 
        onEditActivity={handleEditActivity} 
        onDeleteActivity={handleDeleteActivity} 
      />
    </div>
  );
}

export default App;