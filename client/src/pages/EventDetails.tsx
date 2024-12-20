import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventDetailsById } from "../services/eventService";
import { Event } from "../interfaces/Event";
import Places from "../components/Places";

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

  const state = location.state as LocationState | null;

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
      setEvent({
        id: id || "",
        name: state.eventName,
        images: [{ url: state.imageUrl || "https://via.placeholder.com/400x200" }],
        dates: {
          start: {
            localDate: state.date,
            localTime: state.time,
          },
        },
        _embedded: {
          venues: [
            {
              name: state.venueName,
              location: {
                latitude: state.latitude,
                longitude: state.longitude,
                formatted_address: state.venueAddress || "Address not available",
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

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 display-3 fw-bold">{event.name}</h2>

      <div className="card mb-5 shadow-lg border-0 rounded" style={{ overflow: "hidden" }}>
        <div className="position-relative">
          <img
            src={event.images[0]?.url || "https://via.placeholder.com/400x200"}
            className="card-img-top"
            alt={event.name}
            style={{ maxHeight: "400px", objectFit: "cover", filter: "brightness(90%)" }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.8))" }}></div>
        </div>

        <div className="card-body p-4">
          <h5 className="card-title mb-4 fs-4 text-primary">Event Details</h5>

          {state?.attractions && state.attractions.length > 0 && (
            <div className="mb-4">
              <h6 className="fw-bold">Performers:</h6>
              <p className="fs-5">{state.attractions.join(", ")}</p>
            </div>
          )}

          <p className="card-text mb-2">
            <strong>Date:</strong> {event.dates.start.localDate}
          </p>
          {event.dates.start.localTime && (
            <p className="card-text mb-2">
              <strong>Time:</strong> {event.dates.start.localTime}
            </p>
          )}
          <p className="card-text mb-2">
            <strong>Venue:</strong> {venue?.name}
          </p>
          <p className="card-text mb-4">
            <strong>Location:</strong> {venue?.location.formatted_address || "Address not available"}
          </p>

          {event.priceRanges && event.priceRanges.length > 0 && (
            <p className="card-text">
              <span className="badge bg-success fs-5">
                {event.priceRanges
                  .map((range) => `${new Intl.NumberFormat(undefined, { style: "currency", currency: range.currency }).format(range.min)} - ${new Intl.NumberFormat(undefined, { style: "currency", currency: range.currency }).format(range.max)}`)
                  .join(", ")}
              </span>
            </p>
          )}

          {event.url && (
            <a href={event.url} className="btn btn-primary mt-4" target="_blank" rel="noopener noreferrer">
              Buy Tickets on Ticketmaster
            </a>
          )}

          {state?.pleaseNote && (
            <div className="alert alert-warning mt-4">
              <strong>Note:</strong> {state.pleaseNote}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-center mb-4">Nearby Food & Drink Options</h3>
      <Places lat={venue?.location.latitude || ""} lng={venue?.location.longitude || ""} />
    </div>
  );
};

export default EventDetails;