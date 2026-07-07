import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'caia_super_secret_key_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

/**
 * Generate a signed access token for the given payload.
 * @param {object} payload - Data to embed (userId, role, email)
 * @returns {string} Signed JWT access token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Generate a long-lived refresh token.
 * @param {object} payload - Minimal payload (userId)
 * @returns {string} Signed JWT refresh token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
};

/**
 * Verify a JWT and return its decoded payload.
 * Throws JsonWebTokenError or TokenExpiredError on failure.
 * @param {string} token - JWT string
 * @returns {object} Decoded payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

/**
 * Decode a JWT without verifying its signature.
 * Useful for extracting expiry info from an already-validated token.
 * @param {string} token - JWT string
 * @returns {object|null} Decoded payload or null
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};
