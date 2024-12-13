import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const FS_API_KEY = process.env.FOURSQUARE_API_KEY;

// GET /api/venues?lat=num&lng=-num
router.get('/', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    if (!FS_API_KEY) {
      return res.status(500).json({ error: 'Foursquare API key is missing' });
    }

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

    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Error fetching venues from Foursquare' });
  }
  return res.status(400).json({ error: 'Invalid request' });
});

export default router;