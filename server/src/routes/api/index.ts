console.log('****starting server/src/routes/api/index.ts****')

import { Router } from 'express';
import { eventRouter } from './event-routes.js';
import { placesRouter } from './places-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/users', userRouter);

// Mount event routes at /api/events
router.use('/events', (req, _res, next) => {
  console.log(`Event route hit: ${req.method} ${req.url}`);
  next();
}, eventRouter);

// Mount place routes at /api/places
router.use('/places', (req, _res, next) => {
  console.log(`Place route hit: ${req.method} ${req.url}`);
  next();
}, placesRouter);

export default router;