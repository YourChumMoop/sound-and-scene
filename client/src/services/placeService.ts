// src/services/venueService.ts
import axios from 'axios';
import { Place } from '../interfaces/Place';

const FS_BASE_URL = 'https://api.foursquare.com/v3/places/search';
const FS_API_KEY = import.meta.env.VITE_FS_API_KEY;

export const fetchPlacesByLocation = async (latitude: string, longitude: string): Promise<Place[]> => {
  try {
    const response = await axios.get(FS_BASE_URL, {
      headers: {
        Authorization: FS_API_KEY,
      },
      params: {
        ll: `${latitude},${longitude}`,
        categories: '13065,13003', // Restaurants and bars
        radius: 1000,
        limit: 10,
      },
    });

    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching venues from Foursquare:', error);
    throw new Error('Failed to fetch venues');
  }
};