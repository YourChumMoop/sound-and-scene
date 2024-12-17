import { Router } from 'express';
import {
  getEventsByZipcode,
  getEventDetailsById,
  addEventToFavorites,
  removeEventFromFavorites,
} from '../../controllers/event-controller.js';


const router = Router();

router.get('/', (req, res) => {                     // GET /api/events?postalCode=ZIPCODE
  console.log(`GET /api/events hit with query: ${JSON.stringify(req.query)}`);
  getEventsByZipcode(req, res);
});                
router.get('/:id', (req, res) => {                  // GET /api/events/:id
  console.log(`GET /api/events/${req.params.id} hit`);
  getEventDetailsById(req, res);
});           
router.post('/favorites', addEventToFavorites);     // POST /api/events/favorites
router.delete('/favorites/:id', removeEventFromFavorites); // DELETE /api/events/favorites/:id

export { router as eventRouter };