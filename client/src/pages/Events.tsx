import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEventsByZipcode } from '../services/eventService';
import { Event } from '../interfaces/Event';

const Events = () => {
  // State to manage the zipcode input, events data, and error status
  const [zipcode, setZipcode] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  // Handle changes to the zipcode input field
  const handleZipcodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  // Handle search for events by zipcode
  const handleSearch = async () => {
    setError(false);
    try {
      const data = await fetchEventsByZipcode(zipcode);
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(true);
    }
  };

  // Handle navigation to event details page
  const handleViewDetails = (event: Event) => {
    const venue = event._embedded.venues[0];
    navigate('/event-details', {
      state: {
        eventName: event.name,
        date: event.dates.start.localDate,
        venueName: venue.name,
        latitude: venue.location.latitude,
        longitude: venue.location.longitude,
      },
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Find Music Events</h2>

      {/* Search Bar */}
      <div className="search-bar input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Zip Code"
          value={zipcode}
          onChange={handleZipcodeChange}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-danger text-center">Failed to fetch events. Please try again.</p>}

      {/* Events List */}
      <div className="row">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card event-card h-100">
                <img
                  src={event.images[0]?.url || 'https://via.placeholder.com/400x200'}
                  className="card-img-top"
                  alt={event.name}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.dates.start.localDate}</p>
                  <button className="btn btn-primary mt-auto" onClick={() => handleViewDetails(event)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No events found. Please enter a valid zip code and search.</p>
        )}
      </div>
    </div>
  );
};

export default Events;