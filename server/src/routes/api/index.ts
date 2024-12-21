import { Router } from 'express';
import { eventRouter } from './event-routes.js';
import { placesRouter } from './places-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

// Log API route hits
router.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] API route hit: ${req.method} ${req.originalUrl}`);
  next();
});

// Mount user routes at /api/users
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

// Catch-all for invalid API routes
router.use((req, res) => {
  console.error(`Invalid API route: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'API route not found' });
});

export default router;