// src/services/eventService.ts
import axios from 'axios';
import { Event } from '../interfaces/Event';

const TM_BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const TM_API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

export const fetchEventsByZipcode = async (zipcode: string): Promise<Event[]> => {
  try {
    const response = await axios.get(TM_BASE_URL, {
      params: {
        apikey: TM_API_KEY,
        postalCode: zipcode,
        classificationName: 'Music',
        size: 10,
      },
    });

    return response.data._embedded?.events || [];
  } catch (error) {
    console.error('Error fetching events from Ticketmaster:', error);
    throw new Error('Failed to fetch events');
  }
};