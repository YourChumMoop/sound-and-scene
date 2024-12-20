import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEventsByZipcode } from '../services/eventService';
import { Event } from '../interfaces/Event';

// Loading and error messages
const LoadingMessage = () => <p className="text-center">Loading events...</p>;
const ErrorMessage = () => <p className="text-danger text-center">Failed to fetch events. Please try again.</p>;

// EventCard component for better readability
const EventCard = ({ event, handleViewDetails }: { event: Event; handleViewDetails: (event: Event) => void }) => {
  const venue = event._embedded?.venues[0];
  const venueName = venue?.name || 'Venue Not Available';

  return (
    <div className="col-md-4 mb-4">
      <div className="card event-card h-100 shadow-lg border-0 rounded-3">
        <img
          src={event.images?.[0]?.url || 'https://via.placeholder.com/400x200'}
          className="card-img-top"
          alt={event.name || 'Event Image'}
          style={{ objectFit: 'cover', height: '200px' }}
        />
        <div className="card-body p-4 d-flex flex-column">
          <h5 className="card-title fw-bold">{event.name || 'Event Name Not Available'}</h5>
          <p className="card-text mb-2">
            <strong>Date:</strong> {event.dates.start.localDate || 'Date Not Available'}
          </p>
          <p className="card-text mb-2">
            <strong>Venue:</strong> {venueName}
          </p>
          <button className="btn btn-primary mt-auto rounded-pill" onClick={() => handleViewDetails(event)}>
            View Details
          </button>
          {event.url && (
            <a
              href={event.url}
              className="btn btn-outline-secondary mt-2 rounded-pill"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Ticketmaster
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [zipcode, setZipcode] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleZipcodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

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

  const handleViewDetails = (event: Event) => {
    const venue = event._embedded?.venues[0];

    if (!venue) {
      console.error('Venue information is missing');
      setError(true);
      return;
    }

    const state = {
      eventName: event.name,
      date: event.dates.start.localDate,
      time: event.dates.start.localTime,
      venueName: venue.name,
      venueAddress:
        venue.location.formatted_address ||
        `${venue.address.line1}, ${venue.city.name}, ${venue.state.stateCode} ${venue.postalCode}`,
      latitude: venue.location.latitude,
      longitude: venue.location.longitude,
      imageUrl: event.images?.[0]?.url,
      classification: event.classifications?.[0]?.genre?.name || event.classifications?.[0]?.segment?.name,
      attractions: event._embedded?.attractions?.map((attraction) => attraction.name),
      priceRanges: event.priceRanges?.map((range) => `${range.currency} ${range.min} - ${range.max}`),
      ticketUrl: event.url,
      pleaseNote: event.pleaseNote,
    };

    // Add console.log to debug the state
    console.log('Navigating with state:', state);

    navigate('/event-details', { state });
  };

  return (
    <div>
      <h2 className="text-center mb-4">Find Music Events</h2>

      <div className="search-bar input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Zip Code"
          value={zipcode}
          onChange={handleZipcodeChange}
        />
        <button style={{marginLeft:'10px'}} className="btn btn-primary rounded-pill" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <LoadingMessage />}
      {error && <ErrorMessage />}

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