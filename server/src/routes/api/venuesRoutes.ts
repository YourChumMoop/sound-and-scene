import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const FS_API_KEY = process.env.FOURSQUARE_API_KEY;

// GET /api/venues?lat=num&lng=-num
router.get('/', async (req, res) => {
  const { lat, lng } = req.query;

  // Validate latitude and longitude
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  if (!FS_API_KEY) {
    return res.status(500).json({ error: 'Foursquare API key is missing' });
  }

  try {
    const response = await axios.get('https://api.foursquare.com/v3/places/search', {
      headers: {
        Authorization: FS_API_KEY,
      },
      params: {
        ll: `${lat},${lng}`,
        categories: '13065,13003', // Restaurants and bars
        radius: 1000,              // Search within 1km
        limit: 5,
      },
    });

    return res.json(response.data.results); // Ensure a return statement here
  } catch (error: any) {
    console.error('Error fetching venues:', error.message);
    return res.status(500).json({ error: 'Error fetching venues from Foursquare' }); // Ensure a return statement here
  }
});

export default router;