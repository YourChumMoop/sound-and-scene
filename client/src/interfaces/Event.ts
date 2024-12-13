export interface Event {
    id: string;
    name: string;
    images: { url: string }[];
    dates: {
      start: {
        localDate: string;
      };
    };
    _embedded: {
      venues: Venue[];
    };
  }
  
  // Nested interface for Venue details
  export interface Venue {
    name: string;
    location: {
      latitude: string;
      longitude: string;
    };
  }