import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventDetailsById } from "../services/eventService";
import { Event } from "../interfaces/Event";
import Places from "../components/Places";

// Define the type for the state passed via `useNavigate`
interface LocationState {
  eventName: string;
  date: string;
  time?: string;
  timezone?: string;
  venueName: string;
  venueAddress: string;
  latitude: string;
  longitude: string;
  imageUrl?: string;
  classification?: string;
  attractions?: string[];
  priceRanges?: string[];
  ticketUrl?: string;
  pleaseNote?: string;
}

const EventDetails = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Safely destructure state with a fallback
  const state = location.state as LocationState | null;

  console.log("Received state in EventDetails:", state);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        if (id) {
          const eventData = await fetchEventDetailsById(id);
          setEvent(eventData);
        } else {
          setError("Event ID is missing");
        }
      } catch (err) {
        setError("Failed to load event details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!state) {
      getEventDetails();
    } else {
      // If state is provided, set event data directly from state
      setEvent({
        id: id || "",
        name: state.eventName,
        images: [
          { url: state.imageUrl || "https://via.placeholder.com/400x200" },
        ],
        dates: {
          start: {
            localDate: state.date,
            localTime: state.time,
          },
          timezone: state.timezone,
        },
        _embedded: {
          venues: [
            {
              name: state.venueName,
              location: {
                latitude: state.latitude,
                longitude: state.longitude,
                formatted_address:
                  state.venueAddress || "Address not available",
              },
              address: { line1: "" },
              city: { name: "" },
              state: { name: "", stateCode: "" },
              country: { name: "" },
              postalCode: "",
            },
          ],
        },
        url: state.ticketUrl || "",
        priceRanges: state.priceRanges?.map((range) => {
          const [currency, min, , max] = range.split(" ");
          return {
            type: "standard",
            currency,
            min: parseFloat(min),
            max: parseFloat(max),
          };
        }),
      });
      setLoading(false);
    }
  }, [id, state]);

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  if (loading) {
    return <div className="text-center mt-5">Loading event details...</div>;
  }

  if (!event) {
    return <div className="text-center mt-5">No event details found.</div>;
  }

  const venue = event._embedded?.venues[0];
  const timezone = event.dates.timezone;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{event.name}</h2>

      <div className="card mb-4">
        <img
          src={event.images[0]?.url || "https://via.placeholder.com/400x200"}
          className="card-img-top"
          alt={event.name}
        />
        <div className="card-body">
          <h5 className="card-title">Event Details</h5>

          {state?.attractions && state.attractions.length > 0 && (
            <div className="mb-3">
              <strong>Performers:</strong>
              <ul className="list-unstyled mt-2">
                {state.attractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="card-text">
            <strong>Date:</strong> {event.dates.start.localDate}
          </p>
          {event.dates.start.localTime && (
            <p className="card-text">
              <strong>Time:</strong> {event.dates.start.localTime}{" "}
              {timezone && `(${timezone})`}
            </p>
          )}
          <p className="card-text">
            <strong>Venue:</strong> {venue?.name}
          </p>
          <p className="card-text">
            <strong>Location:</strong>{" "}
            {venue?.location.formatted_address || "Address not available"}
          </p>
          {event.priceRanges && event.priceRanges.length > 0 && (
            <p className="card-text">
              <strong>Price Range:</strong>{" "}
              {event.priceRanges.map((range, index) => {
                const formatter = new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: range.currency,
                });
                return (
                  <span key={index}>
                    {formatter.format(range.min)} -{" "}
                    {formatter.format(range.max)}
                    {event.priceRanges &&
                      index < event.priceRanges.length - 1 &&
                      ", "}
                  </span>
                );
              })}
            </p>
          )}
          {event.url && (
            <a
              href={event.url}
              className="btn btn-primary mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Tickets on Ticketmaster
            </a>
          )}
          {state?.pleaseNote && (
            <div className="alert alert-warning mt-3">
              <strong>Note:</strong> {state.pleaseNote}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-center mb-3">Nearby Food & Drink Options</h3>
      <Places
        lat={venue?.location.latitude || ""}
        lng={venue?.location.longitude || ""}
      />
    </div>
  );
};

export default EventDetails;
