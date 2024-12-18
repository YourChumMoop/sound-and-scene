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
      : "https://via.placeholder.com/400x200";
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
    <div className="row">
      {places.map((place) => (
        <div key={place.fsq_id} className="col-md-4 mb-4">
          <div className="card place-card h-100">
            <div className="icon-wrapper" style={{ textAlign: "center", padding: "10px" }}>
              <img
                src={getIconUrl(place)}
                className="card-img-top"
                alt={place.name}
                style={{
                  maxWidth: "64px",
                  maxHeight: "64px",
                  filter: "invert(0%) sepia(100%) saturate(0%) brightness(0%) contrast(100%)",
                }}
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{place.name}</h5>
              <p className="card-text">
                <strong>Category:</strong>{" "}
                {place.categories?.[0]?.name || "No category available"}
              </p>
              <p className="card-text">
                <strong>Address:</strong>{" "}
                {place.location?.formatted_address || "Address not available"}
              </p>
              {place.distance !== undefined && (
                <p className="card-text">
                  <strong>Distance from event:</strong> {place.distance} meters away
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