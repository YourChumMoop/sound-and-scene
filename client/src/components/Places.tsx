import { useEffect, useState } from "react";
import { fetchPlacesByLocation } from "../services/placesService";
import { Place } from "../interfaces/Place";

// Define the props for the Places component
interface PlacesProps {
  lat: string;
  lng: string;
}

const Places = ({ lat, lng }: PlacesProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
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
        console.error("Error fetching places:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPlaces();
  }, [lat, lng]);

  const getIconUrl = (place: Place) => {
    const icon = place.categories?.[0]?.icon;
    return icon
      ? `${icon.prefix}64${icon.suffix}`
      : "https://via.placeholder.com/64";
  };

  if (error) {
    return (
      <p className="text-danger text-center">
        Failed to fetch nearby places. Please try again.
      </p>
    );
  }

  if (loading) {
    return <p className="text-center">Loading nearby places...</p>;
  }

  if (!places.length) {
    return <p className="text-center">No nearby places found.</p>;
  }

  return (
    <div className="row g-4">
      {places.map((place) => (
        <div key={place.fsq_id} className="col-md-4">
          <div className="card h-100 shadow-lg border-0 rounded-3">
            <div className="icon-wrapper text-center p-3">
              <img
                src={getIconUrl(place)}
                className="img-fluid"
                alt={place.name}
                style={{
                  maxWidth: "64px",
                  maxHeight: "64px",
                  filter: "brightness(0%) saturate(100%)", // Converts the icon to black
                }}
              />
            </div>
            <div className="card-body d-flex flex-column p-4">
              <h5 className="card-title fw-bold mb-2">{place.name}</h5>
              <p className="card-text mb-1">
                <strong>Category:</strong>{" "}
                {place.categories?.[0]?.name || "No category available"}
              </p>
              <p className="card-text mb-1">
                <strong>Address:</strong>{" "}
                {place.location?.formatted_address || "Address not available"}
              </p>
              {place.distance !== undefined && (
                <p className="card-text mt-auto">
                  <strong>Distance from event:</strong> {place.distance} meters
                  away
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Places;
