import { Router } from 'express';
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from '../../controllers/places-controller.js';

const router = Router();

router.get('/', getAllPlaces);          // GET /api/places
router.get('/:id', getPlaceById);       // GET /api/places/:id
router.post('/', createPlace);          // POST /api/places
router.put('/:id', updatePlace);        // PUT /api/places/:id
router.delete('/:id', deletePlace);     // DELETE /api/places/:id

export { router as placesRouter };