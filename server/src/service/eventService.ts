import '../config/connection.js';
import axios, { AxiosResponse } from 'axios';

class EventService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.TM_API_BASE_URL || 'https://app.ticketmaster.com/discovery/v2';
    this.apiKey = process.env.TM_API_KEY || '';

    if (!this.baseURL || !this.apiKey) {
      throw new Error('Ticketmaster API base URL or API key is missing in environment variables.');
    }
  }

  // Build the Ticketmaster event query URL for fetching events by zipcode
  private buildEventQuery(zipcode: string, classificationName = 'Music', size = 10): string {
    const url = `${this.baseURL}/events.json?apikey=${this.apiKey}&postalCode=${zipcode}&classificationName=${classificationName}&size=${size}`;
    console.log(`Event query URL: ${url}`);
    return url;
  }

  // Fetch events by zipcode
  async fetchEventsByZipcode(zipcode: string, classificationName = 'Music', size = 10): Promise<any[]> {
    try {
      console.log(`Fetching events for zipcode: ${zipcode}`);
      const url = this.buildEventQuery(zipcode, classificationName, size);

      const response: AxiosResponse = await axios.get(url);
      console.log('Ticketmaster API response:', response.data);

      // Return the events if available
      return response.data._embedded?.events || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching events:', error.response?.data || error.message);
        throw new Error(`Error fetching events: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected error fetching events:', error);
        throw new Error('Unexpected error fetching events from Ticketmaster');
      }
    }
  }

  // Build the Ticketmaster event details query URL for fetching event by ID
  private buildEventDetailsQuery(eventId: string): string {
    const url = `${this.baseURL}/events/${eventId}.json?apikey=${this.apiKey}`;
    console.log(`Event details query URL: ${url}`);
    return url;
  }

  // Fetch event details by ID
  async fetchEventDetailsById(eventId: string): Promise<any> {
    try {
      console.log(`Fetching event details for event ID: ${eventId}`);
      const url = this.buildEventDetailsQuery(eventId);

      const response: AxiosResponse = await axios.get(url);
      console.log('Ticketmaster API event details response:', response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching event details:', error.response?.data || error.message);
        throw new Error(`Error fetching event details: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected error fetching event details:', error);
        throw new Error('Unexpected error fetching event details from Ticketmaster');
      }
    }
  }
}

// Export an instance of EventService
export default new EventService();