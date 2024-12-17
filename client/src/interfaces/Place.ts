export interface Place {
  fsq_id: string;
  name: string;
  categories: { name: string }[];
  location: { formatted_address: string };
  distance: number;
  link?: string;
  photoUrl?: string;
  rating?: number;
}