import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import { v4 as uuidv4 } from 'uuid';

const Home = lazy(() => import('./components/Home'));
const NewTrip = lazy(() => import('./components/NewTrip'));
const TripDetails = lazy(() => import('./components/TripDetails'));

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
    <Router>
      <div className="App">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewTrip onAddActivity={handleAddActivity} />} />
            <Route path="/details/:id" element={<TripDetails />} />
          </Routes>
        </Suspense>
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
    </Router>
  );
}

export default App;
