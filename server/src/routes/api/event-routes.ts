import { Router, Request, Response } from 'express';
import axios from 'axios';
import {
  getEventDetailsById,
  addEventToFavorites,
  removeEventFromFavorites,
} from '../../controllers/event-controller.js';

const router = Router();

const TM_API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const TM_API_KEY = process.env.TM_API_KEY || '';

// Server-side proxy to fetch events by zipcode
router.get('/', async (req: Request, res: Response) => {
  const { postalCode, classificationName = 'Music', size = 10 } = req.query;

  console.log(`GET /api/events hit with query: ${JSON.stringify(req.query)}`);

  try {
    const response = await axios.get(TM_API_BASE_URL, {
      params: {
        apikey: TM_API_KEY,
        postalCode,
        classificationName,
        size,
      },
    });

    console.log('Ticketmaster API response:', response.data);
    res.json(response.data._embedded?.events || []);
  } catch (error: any) {
    console.error('Error fetching events from Ticketmaster:', error.message);
    res.status(500).json({ message: 'Failed to fetch events from Ticketmaster' });
  }
});

// GET /api/events/:id
router.get('/:id', (req, res) => {
  console.log(`GET /api/events/${req.params.id} hit`);
  getEventDetailsById(req, res);
});

// POST /api/events/favorites
router.post('/favorites', addEventToFavorites);

// DELETE /api/events/favorites/:id
router.delete('/favorites/:id', removeEventFromFavorites);

export { router as eventRouter };