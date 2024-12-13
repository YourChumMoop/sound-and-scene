export interface Venue {
    fsq_id: string;
    name: string;
    location: {
      address: string;
      city: string;
      latitude: number;
      longitude: number;
    };
    categories: {
      name: string;
    }[];
  }