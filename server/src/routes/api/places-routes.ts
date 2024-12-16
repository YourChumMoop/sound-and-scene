console.log('****starting server/src/routes/api/places-routes.ts****');

import { Router } from 'express';
import { getVenuesByCoordinates } from '../../controllers/places-controller.js';

const router = Router();

// GET /api/places?lat=LATITUDE&lng=LONGITUDE
router.get('/', (req, res) => {
  console.log(`GET /api/places hit with query: ${JSON.stringify(req.query)}`);
  getVenuesByCoordinates(req, res);
});

export { router as placesRouter };