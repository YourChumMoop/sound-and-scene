import { useEffect, useState } from 'react';
import { fetchVenuesByLocation } from '../services/venueService';
import { Venue } from '../interfaces/Venue';

// Define the props for the Venues component
interface VenuesProps {
  lat: string;
  lng: string;
}

const Venues = ({ lat, lng }: VenuesProps) => {
  // State to store the list of venues and error status
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getVenues = async () => {
      setError(false); // Reset error state before fetching
      try {
        const data = await fetchVenuesByLocation(lat, lng);
        setVenues(data);
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError(true);
      }
    };

    getVenues();
  }, [lat, lng]);

  // Display an error message if fetching venues fails
  if (error) {
    return <p className="text-danger text-center">Failed to fetch nearby venues. Please try again.</p>;
  }

  // Display a loading message if no venues have been fetched yet
  if (!venues.length) {
    return <p className="text-center">Loading nearby venues...</p>;
  }

  return (
    <div className="row">
      {venues.map((venue) => (
        <div key={venue.fsq_id} className="col-md-4 mb-4">
          <div className="card venue-card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{venue.name}</h5>
              <p className="card-text">
                <strong>Category:</strong> {venue.categories[0]?.name || 'No category available'}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {venue.location.address || 'Address not available'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Venues;