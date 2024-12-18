import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEventsByZipcode } from '../services/eventService';
import { Event } from '../interfaces/Event';

// Loading and error messages
const LoadingMessage = () => <p className="text-center">Loading events...</p>;
const ErrorMessage = () => <p className="text-danger text-center">Failed to fetch events. Please try again.</p>;

// EventCard component for better readability
const EventCard = ({ event, handleViewDetails }: { event: Event; handleViewDetails: (event: Event) => void }) => {
  const venueName = event._embedded?.venues[0]?.name || 'Venue Not Available';

  return (
    <div className="col-md-4 mb-4">
      <div className="card event-card h-100">
        <img
          src={event.images[0]?.url || 'https://via.placeholder.com/400x200'}
          className="card-img-top"
          alt={event.name || 'Event Image'}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{event.name || 'Event Name Not Available'}</h5>
          <p className="card-text">
            <strong>Date:</strong> {event.dates.start.localDate || 'Date Not Available'}
          </p>
          <p className="card-text">
            <strong>Venue:</strong> {venueName}
          </p>
          <button className="btn btn-primary mt-auto" onClick={() => handleViewDetails(event)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  // State to manage the zipcode input, events data, loading status, and error status
  const [zipcode, setZipcode] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  // Handle changes to the zipcode input field
  const handleZipcodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  // Handle search for events by zipcode with validation
  const handleSearch = async () => {
    if (!zipcode.match(/^\d{5}$/)) {
      setError(true);
      console.error('Invalid zipcode format');
      return;
    }
  
    setLoading(true);
    setError(false);
  
    try {
      const data = await fetchEventsByZipcode(zipcode);
  
      // Sort the events by date, handling missing 'dates.start' gracefully
      const sortedEvents = data.sort((a, b) => {
        const dateA = a.dates?.start?.localDate ? new Date(a.dates.start.localDate).getTime() : Infinity;
        const dateB = b.dates?.start?.localDate ? new Date(b.dates.start.localDate).getTime() : Infinity;
        return dateA - dateB;
      });
  
      setEvents(sortedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to event details page
  const handleViewDetails = (event: Event) => {
    const venue = event._embedded?.venues[0];

    if (!venue) {
      console.error('Venue information is missing');
      setError(true);
      return;
    }

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

      {/* Loading Message */}
      {loading && <LoadingMessage />}

      {/* Error Message */}
      {error && <ErrorMessage />}

      {/* Events List */}
      <div className="row">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} handleViewDetails={handleViewDetails} />)
        ) : (
          !loading && !error && <p className="text-center">No events found. Please enter a valid zip code and search.</p>
        )}
      </div>
    </div>
  );
};

export default Events;