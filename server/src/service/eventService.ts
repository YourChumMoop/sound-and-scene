import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
dotenv.config();

class EventService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.TM_API_BASE_URL || '';
    this.apiKey = process.env.TM_API_KEY || '';

    if (!this.baseURL || !this.apiKey) {
      throw new Error('Ticketmaster API base URL or API key is missing in environment variables.');
    }
  }

  // Build the Ticketmaster event query URL
  private buildEventQuery(zipcode: string): string {
    const url = `${this.baseURL}/events.json?apikey=${this.apiKey}&postalCode=${zipcode}&classificationName=music`;
    console.log(`Event query URL: ${url}`);
    return url;
  }

  // Fetch events by zipcode
  async fetchEventsByZipcode(zipcode: string): Promise<any[]> {
    try {
      console.log(`Fetching events for zipcode: ${zipcode}`);
      const url = this.buildEventQuery(zipcode);

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
}

export default new EventService();