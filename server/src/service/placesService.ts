import '../config/connection.js';
import axios from 'axios';

class PlacesService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.FS_API_BASE_URL || '';
    this.apiKey = process.env.FS_API_KEY || '';
  }

  // Build the Foursquare places query URL
  private buildPlacesQuery(lat: string, lng: string): string {
    const url = `${this.baseURL}/search?ll=${lat},${lng}&categories=13065,13003&radius=1000&limit=5`;
    console.log(`Places query URL: ${url}`);
    return url;
  }

  // Fetch places by coordinates
  async fetchPlacesByCoordinates(lat: string, lng: string): Promise<any> {
    try {
      console.log(`Fetching places for coordinates: lat=${lat}, lng=${lng}`);
      const url = this.buildPlacesQuery(lat, lng);

      const response = await axios.get(url, {
        headers: {
          Authorization: this.apiKey,
        },
      });
      console.log('Foursquare API response:', response.data);

      return response.data.results || [];
    } catch (err) {
      console.error('Error fetching places from Foursquare:', err);
      throw new Error('Error fetching places from Foursquare');
    }
  }
}

export default new PlacesService();