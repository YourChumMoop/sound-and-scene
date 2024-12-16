import { Router } from 'express';
import apiRoutes from './api/index.js';

const router = Router();

// Mount API routes under '/api'
router.use('/api', apiRoutes);

export default router;