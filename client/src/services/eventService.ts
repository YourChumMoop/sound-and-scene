import axios from 'axios';
import { Event } from '../interfaces/Event';

const BASE_URL = 'http://localhost:3001/api/events';

export const fetchEventsByZipcode = async (zipcode: string): Promise<Event[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { postalCode: zipcode },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
};