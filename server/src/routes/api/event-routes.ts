import { Router } from 'express';
import {
  getEventsByZipcode,
  getEventDetailsById,
  addEventToFavorites,
  removeEventFromFavorites,
} from '../../controllers/event-controller.js';

const router = Router();

// GET /api/events?postalCode=ZIPCODE - Fetch events by zipcode (server-side proxy)
router.get('/', (req, res) => {
  console.log(`GET /api/events hit with query: ${JSON.stringify(req.query)}`);
  getEventsByZipcode(req, res);
});

// GET /api/events/:id - Fetch event details by ID
router.get('/:id', (req, res) => {
  console.log(`GET /api/events/${req.params.id} hit`);
  getEventDetailsById(req, res);
});

// POST /api/events/favorites - Add event to favorites
router.post('/favorites', (req, res) => {
  console.log(`POST /api/events/favorites hit with data: ${JSON.stringify(req.body)}`);
  addEventToFavorites(req, res);
});

// DELETE /api/events/favorites/:id - Remove event from favorites
router.delete('/favorites/:id', (req, res) => {
  console.log(`DELETE /api/events/favorites/${req.params.id} hit`);
  removeEventFromFavorites(req, res);
});

export { router as eventRouter };