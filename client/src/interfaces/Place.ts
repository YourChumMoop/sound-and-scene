export interface Place {
    id: string;             // Foursquare Place ID
    name: string;           // Name of the place
    address: string;        // Address of the place
    city: string;           // City where the place is located
    state: string;          // State where the place is located
    country: string;        // Country where the place is located
    latitude: number;       // Latitude of the place
    longitude: number;      // Longitude of the place
    category: string;       // Category of the place (e.g., Restaurant, Bar)
    url?: string;           // Optional URL for the place
  }