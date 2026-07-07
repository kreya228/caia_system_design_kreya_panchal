import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

/**
 * protect — Verify JWT and attach the authenticated user to req.user.
 * Rejects with 401 for missing/invalid/expired tokens.
 */
export const protect = async (req, res, next) => {
  try {
    // Accept token from Authorization header or cookie
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    // Verify signature and expiry
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Session expired. Please log in again.',
          code: 'TOKEN_EXPIRED',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.',
        code: 'TOKEN_INVALID',
      });
    }

    // Load fresh user from DB to catch deleted/deactivated accounts
    const user = await User.findById(decoded.userId).select('-password').lean();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('[authMiddleware.protect]', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error. Please try again.',
    });
  }
};

/**
 * restrictTo — RBAC guard factory.
 * Usage: restrictTo('admin') or restrictTo('admin', 'user')
 * Must be used AFTER protect.
 * @param {...string} roles - Allowed roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
    }

    next();
  };
};

/**
 * optionalAuth — Attach user to req.user if a valid token is present,
 * but do NOT reject the request if token is missing or invalid.
 * Useful for public routes that benefit from knowing who the caller is.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId).select('-password').lean();
        if (user) req.user = user;
      } catch {
        // Silently ignore invalid/expired tokens for optional auth
      }
    }

    next();
  } catch (error) {
    next(); // Never block optional auth checks
  }
};
