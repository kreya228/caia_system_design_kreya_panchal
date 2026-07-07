import * as authService from '../services/authService.js';

// ─── Public Auth Handlers ────────────────────────────────────────────────────

/**
 * POST /api/v1/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const result = await authService.registerUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Registration failed.',
    });
  }
};

/**
 * POST /api/v1/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const result = await authService.loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Login failed.',
    });
  }
};

/**
 * POST /api/v1/auth/refresh
 */
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required.',
      });
    }

    const result = await authService.refreshAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully.',
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Token refresh failed.',
    });
  }
};

// ─── Protected User Handlers ─────────────────────────────────────────────────

/**
 * GET /api/v1/auth/profile
 * Requires: protect middleware
 */
export const getMyProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user._id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch profile.',
    });
  }
};

/**
 * POST /api/v1/auth/logout
 * Stateless logout — client should discard stored tokens.
 */
export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully. Please discard your tokens.',
  });
};
