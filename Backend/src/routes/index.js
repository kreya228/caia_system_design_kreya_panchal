import express from 'express';
import healthRoutes from './healthRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const router = express.Router();

// Mount individual route handlers
// This mounts GET /health onto /api/v1/health
router.use('/health', healthRoutes);

// Mount analytics routes under /api/v1/analytics
router.use('/analytics', analyticsRoutes);

export default router;
