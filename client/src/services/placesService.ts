import axios from 'axios';
import { Place } from '../interfaces/Place';

const BASE_URL = '/api/places';

export const fetchPlacesByLocation = async (latitude: string, longitude: string): Promise<Place[]> => {
  try {
    console.log(`Fetching places for latitude: ${latitude}, longitude: ${longitude}`);
    const response = await axios.get(BASE_URL, {
      params: {
        lat: latitude,
        lng: longitude,
        radius: 1000,
        limit: 10,
      },
    });

    return response.data || [];
  } catch (error) {
    console.error('Error fetching places from backend:', error);
    throw new Error('Failed to fetch places');
  }
};