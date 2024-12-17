import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Places from '../components/Places'; // Import Places component

// Define the type for the state passed via `useNavigate`
interface LocationState {
  eventName: string;
  date: string;
  time?: string;
  venueName: string;
  venueAddress: string;
  latitude: string;
  longitude: string;
  imageUrl?: string;
  classification?: string;
  attractions?: string[];
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

  const {
    eventName,
    date,
    time,
    venueName,
    venueAddress,
    latitude,
    longitude,
    imageUrl,
    classification,
    attractions,
  } = state;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{eventName}</h2>

      <div className="card mb-4">
        <img
          src={imageUrl || 'https://via.placeholder.com/400x200'}
          className="card-img-top"
          alt={eventName}
        />
        <div className="card-body">
          <h5 className="card-title">Event Details</h5>
          <p className="card-text"><strong>Date:</strong> {date}</p>
          {time && <p className="card-text"><strong>Time:</strong> {time}</p>}
          <p className="card-text"><strong>Venue:</strong> {venueName}</p>
          <p className="card-text"><strong>Address:</strong> {venueAddress}</p>
          {classification && <p className="card-text"><strong>Classification:</strong> {classification}</p>}
          {attractions && attractions.length > 0 && (
            <p className="card-text">
              <strong>Attractions:</strong> {attractions.join(', ')}
            </p>
          )}
        </div>
      </div>

      <h3 className="text-center mb-3">Nearby Food & Drink Options</h3>
      <Places lat={latitude} lng={longitude} />
    </div>
  );
};

export default EventDetails;