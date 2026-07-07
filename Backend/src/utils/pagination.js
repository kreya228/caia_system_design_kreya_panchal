/**
 * Reusable pagination helper utility.
 */

/**
 * Parses and returns pagination parameters.
 * Assumes inputs are already validated or provides fallback defaults.
 * Optimized: Uses mathematical boundaries to prevent out-of-range memory allocations.
 *
 * @param {object} query - Express request query object
 * @returns {object} - Pagination details (page, limit, skip)
 */
export const getPaginationParams = (query = {}) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

/**
 * Formats data results alongside standard pagination metadata.
 *
 * @param {Array<object>} results - Queried database results
 * @param {number} total - Total records matching the filter
 * @param {number} page - Current page number
 * @param {number} limit - Current items limit per page
 * @returns {object} - Standard pagination structure matching the API design
 */
export const formatPaginatedResponse = (results, total, page, limit) => {
  return {
    results,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export default {
  getPaginationParams,
  formatPaginatedResponse,
};
