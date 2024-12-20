export interface Place {
  fsq_id: string;
  name: string;
  categories: {
    name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];
  location: {
    formatted_address: string;
  };
  distance: number;
  link: string;
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
}