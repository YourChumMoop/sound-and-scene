import { Router } from 'express';
import { userRouter } from './user-routes.js';
import eventRoutes from './eventRoutes.js';
import venueRoutes from './venuesRoutes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRoutes);
router.use('/venues', venueRoutes);

export default router;