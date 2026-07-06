import filterService from '../services/filterService.js';
import apiResponse from '../utils/apiResponse.js';
import {
  validateFilterQuery,
  validatePagination,
  validateSort,
} from '../validators/filterValidator.js';

/**
 * Helper factory function that generates Express request handler middlewares
 * for filter requests targeting specific fields.
 *
 * @param {string} fieldName - Field to query (e.g. 'category', 'difficulty', 'pattern', 'language', 'tags')
 * @returns {import('express').RequestHandler} - Middleware controller function
 */
const makeFilterController = (fieldName) => {
  return async (req, res, next) => {
    try {
      // 1. Validate main filtering query input
      const filterValue = validateFilterQuery(req.query, fieldName);

      // 2. Validate pagination values
      const { page, limit } = validatePagination(req.query);

      // 3. Validate sorting criteria
      const sort = validateSort(req.query.sort);

      // 4. Delegate fetching results to service layer
      const results = await filterService.filterConcepts({
        fieldName,
        filterValue,
        queryParams: req.query,
        page,
        limit,
        sort,
      });

      // 5. Send standardized successful REST API response
      return apiResponse.sendSuccess(
        res,
        `Concepts filtered by ${fieldName} retrieved successfully`,
        results
      );
    } catch (error) {
      // 6. Handle bad inputs or service errors cleanly with 400 Bad Request
      return apiResponse.sendError(res, error.message, 400);
    }
  };
};

export const filterByCategory = makeFilterController('category');
export const filterByDifficulty = makeFilterController('difficulty');
export const filterByPattern = makeFilterController('pattern');
export const filterByLanguage = makeFilterController('language');
export const filterByTags = makeFilterController('tags');

export default {
  filterByCategory,
  filterByDifficulty,
  filterByPattern,
  filterByLanguage,
  filterByTags,
};
