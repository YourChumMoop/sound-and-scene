export interface Place {
  id: string;                // Foursquare Place ID (fsq_id)
  name: string;              // Name of the place
  address: string;           // Formatted address of the place
  city: string;              // Locality (city) where the place is located
  state: string;             // Region (state) where the place is located
  country: string;           // Country where the place is located
  latitude: number;          // Latitude from geocodes.main
  longitude: number;         // Longitude from geocodes.main
  category: string;          // Category name (e.g., Restaurant, Bar)
  link?: string;             // Optional link to the Foursquare place
  distance?: number;         // Optional distance in meters from the search location
  timezone?: string;         // Optional timezone
}