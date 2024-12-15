import '../config/connection.js';
import axios from "axios";

const TM_API_BASE_URL = process.env.TM_API_BASE_URL;
const TM_API_KEY = process.env.TM_API_KEY;
const FS_API_BASE_URL = process.env.FS_API_BASE_URL;
const FS_API_KEY = process.env.FS_API_KEY;

// Fetch events from TicketMaster based on zipcode
export const getTicketMasterEvents = async (postalCode: string) => {
    try {
      const url = `${TM_API_BASE_URL}/events.json`;
  
      const response = await axios.get(url, {
        params: {
          apikey: TM_API_KEY,
          postalCode, // Use 'postalCode' here
          size: 5,    // Limit the number of results
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching TicketMaster events:', error);
      throw error;
    }
  };

// Function to fetch places from Foursquare
export const getFoursquarePlaces = async (ll: string, radius: number, limit: number) => {
    try {
      const url = `${FS_API_BASE_URL}/search`;
  
      const response = await axios.get(url, {
        headers: {
          Authorization: FS_API_KEY || '',
          Accept: 'application/json',
        },
        params: {
          ll,                       // Latitude and longitude
          categories: '13065,13003', // Hardcoded categories
          radius,                   // Search radius in meters
          limit,                    // Limit the number of results
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching Foursquare places:', error);
      throw error;
    }
  };
