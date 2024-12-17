import { Request, Response } from 'express';
import PlacesService from '../service/placesService.js';

// GET /api/places?lat=latitude&lng=longitude&radius=1000&limit=5
export const getPlacesByCoordinates = async (req: Request, res: Response) => {
  console.log('Inside getPlacesByCoordinates controller');
  console.log(`Request query parameters: ${JSON.stringify(req.query)}`);

  const { lat, lng } = req.query;

  if (!lat || !lng) {
    console.warn('Latitude and longitude are missing in the request');
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    const places = await PlacesService.fetchPlacesByCoordinates(lat as string, lng as string);
    console.log('Places fetched successfully:', places);
    return res.json(places);
  } catch (error: any) {
    console.error('Error fetching places by coordinates:', error.message);
    return res.status(500).json({ message: error.message });
  }
};