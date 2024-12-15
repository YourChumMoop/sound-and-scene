import { Router } from 'express';
import { eventRouter } from './event-routes.js';
import { placesRouter } from './places-routes.js';

const router = Router();

router.use('/events', eventRouter);     // Mount the event routes at /api/events
router.use('/places', placesRouter);    // Mount the places routes at /api/places

export default router;