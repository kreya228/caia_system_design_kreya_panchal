/**
 * Validation rules for filtering, sorting, and pagination.
 */

/**
 * Validates and extracts the main filtering value.
 *
 * @param {object} query - Express request query object
 * @param {string} fieldName - Field to look for (e.g. 'category', 'difficulty')
 * @returns {string} - Clean, non-empty filter value
 * @throws {Error} - If filter value is missing or invalid
 */
export const validateFilterQuery = (query = {}, fieldName) => {
  // Check if '?value=' or '?[fieldName]=' (or '?tag=' for tags) is provided
  const value = query.value || query[fieldName] || (fieldName === 'tags' ? query.tag : undefined);

  if (!value || typeof value !== 'string' || !value.trim()) {
    throw new Error(`Filter value for '${fieldName}' is required`);
  }

  return value.trim();
};

/**
 * Validates and sanitizes pagination parameters.
 *
 * @param {object} params - Object containing page and limit
 * @param {any} params.page - Page query value
 * @param {any} params.limit - Limit query value
 * @returns {object} - Standard parsed integers for page and limit
 * @throws {Error} - If values are present but invalid
 */
export const validatePagination = ({ page, limit } = {}) => {
  const parsedPage = page !== undefined ? parseInt(page, 10) : 1;
  const parsedLimit = limit !== undefined ? parseInt(limit, 10) : 10;

  if (page !== undefined && (isNaN(parsedPage) || parsedPage <= 0)) {
    throw new Error('Page query parameter must be a positive integer');
  }

  if (limit !== undefined && (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 100)) {
    throw new Error('Limit query parameter must be a positive integer between 1 and 100');
  }

  return {
    page: parsedPage,
    limit: parsedLimit,
  };
};

/**
 * Validates the sort parameter.
 *
 * @param {any} sort - Sort query value
 * @returns {string} - Cleaned sort parameter
 * @throws {Error} - If sort parameter is invalid
 */
export const validateSort = (sort) => {
  if (sort !== undefined && typeof sort !== 'string') {
    throw new Error('Sort parameter must be a string');
  }
  return sort ? sort.trim() : '';
};

export default {
  validateFilterQuery,
  validatePagination,
  validateSort,
};
