import axios from 'axios';
import { Event } from '../interfaces/Event';

const BASE_URL = 'https://sound-and-scene-1.onrender.com/api/events'; // --production
// const BASE_URL = 'http://localhost:3001/api/events'; -- development


// Fetch events by zipcode from the server-side proxy.
export const fetchEventsByZipcode = async (zipcode: string): Promise<Event[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { postalCode: zipcode },
    });

    // Ensure that the response data is an array of events
    const events = response.data;
    if (!Array.isArray(events)) {
      throw new Error('Invalid data format: Expected an array of events');
    }

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
};


// Fetch event details by event ID.

export const fetchEventDetailsById = async (eventId: string): Promise<Event> => {
  try {
    const response = await axios.get(`${BASE_URL}/${eventId}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching event details for ID ${eventId}:`, error);
    throw new Error('Failed to fetch event details');
  }
};