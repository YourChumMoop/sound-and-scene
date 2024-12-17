import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';

const router = Router();


// Mount auth routes at /auth
router.use('/auth', authRoutes);

// Mount API routes at /api
router.use('/api', (req, _res, next) => {
  console.log(`API route hit: ${req.method} ${req.url}`);
  next();
}, apiRoutes);

export default router;