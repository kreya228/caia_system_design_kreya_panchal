import { Router } from 'express';
import { register, login, refresh, getMyProfile, logout } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

// Apply strict rate limiting to all auth endpoints
router.use(authLimiter);

// ─── Public Routes ────────────────────────────────────────────────────────────
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// ─── Protected Routes ─────────────────────────────────────────────────────────
router.get('/profile', protect, getMyProfile);
router.post('/logout', protect, logout);

export default router;
