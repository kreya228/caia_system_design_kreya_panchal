/**
 * Query builder utility for building optimized MongoDB search and filter queries.
 */

/**
 * Builds a query filter object with dynamic conditions and ensures archived concepts are excluded.
 * Reuses standard format for queries.
 *
 * @param {object} baseFilter - Base filter criteria
 * @returns {object} - Standard MongoDB query filter including archive exclusion
 */
export const buildFilterQuery = (baseFilter = {}) => {
  return {
    ...baseFilter,
    isArchived: { $ne: true }
  };
};

/**
 * Validates and normalizes offset pagination parameters.
 *
 * @param {object} params - Input parameters
 * @param {number|string} params.page - Selected page
 * @param {number|string} params.limit - Selected items limit
 * @returns {object} - Normalized pagination parameters (page, limit, skip)
 */
export const getNormalizedPagination = ({ page, limit } = {}) => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
  const skip = (parsedPage - 1) * parsedLimit;

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip
  };
};

export default {
  buildFilterQuery,
  getNormalizedPagination
};
