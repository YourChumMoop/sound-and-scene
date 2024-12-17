import { Request, Response } from 'express';
import PlacesService from '../service/placesService.js';

// GET /api/places?ll=latitude,longitude&radius=1000&limit=5
export const getPlacesByCoordinates = async (req: Request, res: Response) => {
  console.log('Inside getPlacesByCoordinates controller');
  console.log(`Request query parameters: ${JSON.stringify(req.query)}`);

  const { ll } = req.query;

  if (!ll) {
    console.warn('Latitude and longitude are missing in the request');
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  // Split the 'll' parameter into latitude and longitude
  const [latitude, longitude] = (ll as string).split(',');

  if (!latitude || !longitude) {
    console.warn('Latitude or longitude is missing in the request');
    return res.status(400).json({ message: 'Both latitude and longitude are required' });
  }

  try {
    const places = await PlacesService.fetchPlacesByCoordinates(latitude, longitude);
    console.log('Places fetched successfully:', places);
    return res.json(places);
  } catch (error: any) {
    console.error('Error fetching places by coordinates:', error.message);
    return res.status(500).json({ message: error.message });
  }
};