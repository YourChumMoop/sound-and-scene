import { Router } from 'express';
import eventRoutes from './event-routes.js';
import placesRoutes from './places-routes.js';

const router = Router();

// Use event routes
router.use(eventRoutes);

// Use places routes
router.use(placesRoutes);

export default router;