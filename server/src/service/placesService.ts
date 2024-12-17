import '../config/connection.js'
import axios from 'axios';

class VenueService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.FS_API_BASE_URL || '';
    this.apiKey = process.env.FS_API_KEY || '';
  }

  // Build the Foursquare venue query URL
  private buildVenueQuery(lat: string, lng: string): string {
    const url = `${this.baseURL}/search?ll=${lat},${lng}&categories=13065,13003&radius=1000&limit=5`;
    console.log(`Venue query URL: ${url}`);
    return url;
  }

  // Fetch venues by coordinates
  async fetchVenuesByCoordinates(lat: string, lng: string): Promise<any> {
    try {
      console.log(`Fetching venues for coordinates: lat=${lat}, lng=${lng}`);
      const url = this.buildVenueQuery(lat, lng);

      const response = await axios.get(url, {
        headers: {
          Authorization: this.apiKey,
        },
      });
      console.log('Foursquare API response:', response.data);

      return response.data.results || [];
    } catch (err) {
      console.error('Error fetching venues from Foursquare:', err);
      throw new Error('Error fetching venues from Foursquare');
    }
  }
}

export default new VenueService();