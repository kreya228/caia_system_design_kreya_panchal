import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import { generalLimiter } from '../middlewares/rateLimiter.js';
import * as authService from '../services/authService.js';

const router = Router();

// All admin routes require a valid JWT AND the 'admin' role
router.use(generalLimiter);
router.use(protect);
router.use(restrictTo('admin'));

// ─── Admin: User Management ───────────────────────────────────────────────────

/**
 * GET /api/v1/admin/users
 * List all users with pagination.
 */
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const result = await authService.listAllUsers({ page, limit });

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully.',
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to list users.',
    });
  }
});

/**
 * PATCH /api/v1/admin/users/:id/role
 * Promote or demote a user's role.
 * Body: { role: 'admin' | 'user' }
 */
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Role field is required in request body.',
      });
    }

    const updatedUser = await authService.updateUserRole(req.params.id, role);

    return res.status(200).json({
      success: true,
      message: `User role updated to "${role}" successfully.`,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update user role.',
    });
  }
});

/**
 * GET /api/v1/admin/ping
 * Simple liveness check to confirm admin access is working.
 */
router.get('/ping', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Admin access confirmed.',
    data: {
      adminId: req.user._id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

export default router;
