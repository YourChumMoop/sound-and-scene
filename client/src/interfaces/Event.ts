export interface Event {
  id: string;
  name: string;
  url: string;
  images: { url: string }[];
  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
    };
    timezone?: string;
    status?: {
      code: string;
    };
  };
  classifications?: {
    segment?: { name: string };
    genre?: { name: string };
    subGenre?: { name: string };
  }[];
  priceRanges?: {
    type: string;
    currency: string;
    min: number;
    max: number;
  }[];
  pleaseNote?: string;
  info?: string; 
  promoter?: {
    id: string;
    name: string;
    description?: string;
  };
  seatmap?: {
    staticUrl: string;
  };
  _embedded?: {
    venues: Venue[];
    attractions?: Attraction[];
  };
}

export interface Venue {
  name: string;
  address: {
    line1: string;
  };
  city: {
    name: string;
  };
  state: {
    name: string;
    stateCode: string;
  };
  country: {
    name: string;
  };
  postalCode: string;
  location: {
    latitude: string;
    longitude: string;
    formatted_address?: string;
  };
}

export interface Attraction {
  name: string;
  images?: { url: string }[];
}