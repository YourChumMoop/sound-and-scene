import { useLocation, useNavigate } from 'react-router-dom';
import Places from '../components/Places'; // Updated import to refer to Places
import { useEffect } from 'react';

// Define the type for the state passed via `useNavigate`
interface LocationState {
  eventName: string;
  date: string;
  venueName: string;
  latitude: string;
  longitude: string;
}

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely destructure state with a fallback
  const state = location.state as LocationState | null;

  // Redirect to home page if state is missing
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  // If state is missing, don't render the component
  if (!state) {
    return null;
  }

  const { eventName, date, venueName, latitude, longitude } = state;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{eventName}</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Event Details</h5>
          <p className="card-text">
            <strong>Date:</strong> {date}
          </p>
          <p className="card-text">
            <strong>Venue:</strong> {venueName}
          </p>
        </div>
      </div>

      <h3 className="text-center mb-3">Nearby Food & Drink Options</h3>
      <Places lat={latitude} lng={longitude} />
    </div>
  );
};

export default EventDetails;