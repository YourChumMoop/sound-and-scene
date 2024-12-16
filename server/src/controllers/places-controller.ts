console.log('****starting server/src/controllers/places-controller.ts****');

import { Request, Response } from 'express';
import PlacesService from '../service/placesService.js';

// GET /api/places?lat=LATITUDE&lng=LONGITUDE
export const getVenuesByCoordinates = async (req: Request, res: Response) => {
  console.log('Inside getVenuesByCoordinates controller');
  console.log(`Request query parameters: ${JSON.stringify(req.query)}`);

  const { lat, lng } = req.query;

  if (!lat || !lng) {
    console.warn('Latitude or longitude is missing in the request');
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    const venues = await PlacesService.fetchVenuesByCoordinates(lat as string, lng as string);
    console.log('Venues fetched successfully:', venues);
    return res.json(venues);
  } catch (error: any) {
    console.error('Error fetching venues by coordinates:', error.message);
    return res.status(500).json({ message: error.message });
  }
};