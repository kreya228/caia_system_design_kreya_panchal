import User from '../models/User.js';
import { generateToken, generateRefreshToken, verifyToken } from '../utils/jwt.js';

/**
 * Register a new user.
 * @param {object} data - { name, email, password, role? }
 * @returns {{ user: object, token: string, refreshToken: string }}
 */
export const registerUser = async ({ name, email, password, role }) => {
  // Reject duplicate emails early with a clear message
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    const err = new Error('An account with this email already exists.');
    err.statusCode = 409;
    throw err;
  }

  // Only allow role: 'admin' via a separate admin-seeding flow, not public registration
  const safeRole = role === 'admin' ? 'user' : (role || 'user');

  const user = await User.create({ name, email, password, role: safeRole });

  const payload = { userId: user._id, email: user.email, role: user.role };
  const token = generateToken(payload);
  const refreshToken = generateRefreshToken({ userId: user._id });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
    refreshToken,
  };
};

/**
 * Authenticate an existing user and return tokens.
 * @param {object} data - { email, password }
 * @returns {{ user: object, token: string, refreshToken: string }}
 */
export const loginUser = async ({ email, password }) => {
  // Fetch with password field (excluded by default via select: false pattern)
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const payload = { userId: user._id, email: user.email, role: user.role };
  const token = generateToken(payload);
  const refreshToken = generateRefreshToken({ userId: user._id });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
    refreshToken,
  };
};

/**
 * Issue a new access token from a valid refresh token.
 * @param {string} refreshToken
 * @returns {{ token: string }}
 */
export const refreshAccessToken = async (refreshToken) => {
  let decoded;
  try {
    decoded = verifyToken(refreshToken);
  } catch (err) {
    const error = new Error(
      err.name === 'TokenExpiredError'
        ? 'Refresh token expired. Please log in again.'
        : 'Invalid refresh token.'
    );
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.userId).lean();
  if (!user) {
    const err = new Error('User no longer exists.');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken({ userId: user._id, email: user.email, role: user.role });
  return { token };
};

/**
 * Return the authenticated user's profile (strips sensitive fields).
 * @param {string} userId
 * @returns {object} User profile
 */
export const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password').lean();
  if (!user) {
    const err = new Error('User not found.');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

/**
 * List all users — Admin only.
 * @param {{ page?: number, limit?: number }} options
 * @returns {{ users: object[], total: number, page: number, pages: number }}
 */
export const listAllUsers = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find().select('-password').skip(skip).limit(limit).lean(),
    User.countDocuments(),
  ]);
  return {
    users,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

/**
 * Promote a user's role — Admin only.
 * @param {string} userId
 * @param {string} role - 'user' | 'admin'
 * @returns {object} Updated user
 */
export const updateUserRole = async (userId, role) => {
  if (!['user', 'admin'].includes(role)) {
    const err = new Error('Invalid role. Must be "user" or "admin".');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  ).select('-password').lean();

  if (!user) {
    const err = new Error('User not found.');
    err.statusCode = 404;
    throw err;
  }

  return user;
};
