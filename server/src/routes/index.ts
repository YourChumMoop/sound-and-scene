import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';

const router = Router();

// Middleware for detailed logging
router.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.originalUrl} from ${req.headers['user-agent']}`);
  next();
});

// Mount auth routes at /auth
router.use('/auth', authRoutes);

// Mount API routes at /api
router.use('/api', (req, _res, next) => {
  console.log(`API route hit: ${req.method} ${req.url}`);
  next();
}, apiRoutes);

// Catch-all for invalid routes
router.use((req, res) => {
  console.error(`Invalid route: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

export default router;