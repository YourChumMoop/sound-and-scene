import { Router } from 'express';
import { getFoursquarePlaces } from '../../service/apiService.js';

const router = Router();

// Route to fetch places from Foursquare
router.get('/places', async (req, res) => {
  const { ll, radius, limit } = req.query;

  if (!ll) {
    return res.status(400).json({ error: 'll (latitude,longitude) parameter is required' });
  }

  try {
    const places = await getFoursquarePlaces(
      ll as string,
      parseInt(radius as string) || 1000, // Default radius to 1000 meters
      parseInt(limit as string) || 5      // Default limit to 5 results
    );
    return res.json(places);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching Foursquare places' });
  }
});

export default router;