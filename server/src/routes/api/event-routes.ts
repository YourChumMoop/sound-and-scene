import { Router } from 'express';
import {
  getEventsByZipcode,
  getEventDetailsById,
  addEventToFavorites,
  removeEventFromFavorites,
} from '../../controllers/event-controller.js';

const router = Router();

router.get('/', getEventsByZipcode);                // GET /api/events?postalCode=ZIPCODE
router.get('/:id', getEventDetailsById);            // GET /api/events/:id
router.post('/favorites', addEventToFavorites);     // POST /api/events/favorites
router.delete('/favorites/:id', removeEventFromFavorites); // DELETE /api/events/favorites/:id

export { router as eventRouter };