/**
 * Utility functions to format and send standard API JSON responses.
 * Supported features: Analytics, Concepts, Filters, and Health Checks.
 */

/**
 * Sends a standardized success API response.
 *
 * @param {import('express').Response} res - Express response object
 * @param {string} message - User-friendly message description
 * @param {any} data - Content payload returned to the client
 * @param {number} statusCode - HTTP status code (default: 200)
 */
export const sendSuccess = (res, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Sends a standardized error API response.
 *
 * @param {import('express').Response} res - Express response object
 * @param {string} message - User-friendly error summary
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {any} error - Original raw error details (optional)
 */
export const sendError = (res, message, statusCode = 500, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(error && process.env.NODE_ENV === 'development' && {
      error: error.stack || error.message || error,
    }),
  });
};

export default {
  sendSuccess,
  sendError,
};
