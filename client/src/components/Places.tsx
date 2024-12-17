import { useEffect, useState } from 'react';
import { fetchPlacesByLocation } from '../services/placesService';
import { Place } from '../interfaces/Place';

// Define the props for the Places component
interface PlacesProps {
  lat: string;
  lng: string;
}

const Places = ({ lat, lng }: PlacesProps) => {
  // State to store the list of places and error status
  const [places, setPlaces] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPlaces = async () => {
      setError(false);
      setLoading(true);
      try {
        const data = await fetchPlacesByLocation(lat, lng);
        setPlaces(data);
      } catch (err) {
        console.error('Error fetching places:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPlaces();
  }, [lat, lng]);

  // Display an error message if fetching places fails
  if (error) {
    return <p className="text-danger text-center">Failed to fetch nearby places. Please try again.</p>;
  }

  // Display a loading message while fetching
  if (loading) {
    return <p className="text-center">Loading nearby places...</p>;
  }

  // Display a message if no places are found
  if (!places.length) {
    return <p className="text-center">No nearby places found.</p>;
  }

  return (
    <div className="row">
      {places.map((place) => (
        <div key={place.fsq_id} className="col-md-4 mb-4">
          <div className="card place-card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{place.name}</h5>
              <p className="card-text">
                <strong>Category:</strong>{' '}
                {place.categories?.[0]?.name || 'No category available'}
              </p>
              <p className="card-text">
                <strong>Address:</strong>{' '}
                {place.location?.formatted_address || 'Address not available'}
              </p>
              <p className="card-text">
                <strong>Distance:</strong> {place.distance} meters away
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Places;