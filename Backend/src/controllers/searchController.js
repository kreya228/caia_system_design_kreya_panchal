/**
 * Express controller handlers for search operations.
 */

import searchService from '../services/searchService.js';
import apiResponse from '../utils/apiResponse.js';
import {
  validatePagination,
  validateSearchQuery,
  validateRegexPattern,
  validateCategory,
  validateSort,
  validateRegexFlags,
} from '../validators/searchValidator.js';

/**
 * GET /api/v1/search
 * General search across title, content, and description.
 */
export const generalSearch = async (req, res, next) => {
  try {
    const { q, page, limit, sort } = req.query;

    // Validate inputs
    const query = validateSearchQuery(q);
    const { page: pageNum, limit: pageLimit } = validatePagination({ page, limit });
    const sortBy = validateSort(sort);

    // Perform search
    const result = await searchService.generalSearch(query, pageNum, pageLimit, sortBy);

    return apiResponse.sendSuccess(res, 'Search results retrieved successfully', {
      query,
      ...result,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

/**
 * GET /api/v1/search/title
 * Search concepts by title using regex pattern matching.
 */
export const searchByTitle = async (req, res, next) => {
  try {
    const { q, page, limit } = req.query;

    // Validate inputs
    const query = validateSearchQuery(q);
    const { page: pageNum, limit: pageLimit } = validatePagination({ page, limit });

    // Perform search
    const result = await searchService.regexSearchByTitle(query, pageNum, pageLimit);

    return apiResponse.sendSuccess(res, 'Title search results retrieved successfully', {
      searchScope: 'title',
      query,
      ...result,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

/**
 * GET /api/v1/search/content
 * Search concepts by content using regex pattern matching.
 */
export const searchByContent = async (req, res, next) => {
  try {
    const { q, page, limit } = req.query;

    // Validate inputs
    const query = validateSearchQuery(q);
    const { page: pageNum, limit: pageLimit } = validatePagination({ page, limit });

    // Perform search
    const result = await searchService.regexSearchByContent(query, pageNum, pageLimit);

    return apiResponse.sendSuccess(res, 'Content search results retrieved successfully', {
      searchScope: 'content',
      query,
      ...result,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

/
 */
export const searchByTags = async (req, res, next) => {
  try {
    const { tag, page, limit } = req.query;

    // Validate inputs
    const tagQuery = validateSearchQuery(tag);
    const { page: pageNum, limit: pageLimit } = validatePagination({ page, limit });

    // Perform search
    const result = await searchService.searchByTags(tagQuery, pageNum, pageLimit);

    return apiResponse.sendSuccess(res, 'Tag search results retrieved successfully', {
      searchScope: 'tags',
      tag: tagQuery,
      ...result,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

/**
 * GET /api/v1/search/category
 * Search concepts by category.
 */
export const searchByCategory = async (req, res, next) => {
  try {
    const { category, page, limit } = req.query;

    // Validate inputs
    const categoryName = validateCategory(category);
    const { page: pageNum, limit: pageLimit } = validatePagination({ page, limit });

    // Perform search
    const result = await searchService.searchByCategory(categoryName, pageNum, pageLimit);

    return apiResponse.sendSuccess(res, 'Category search results retrieved successfully', {
      searchScope: 'category',
      category: categoryName,
      ...result,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

/**
 * GET /api/v1/search/patterns
 * Search concepts using regex patterns.
 */
export const regexPatternSearch = async (req, res, next) => {
  try {
    const { pattern, flags, page, limit } = req.query;

    // Validate inputs
    const regexPattern = validateRegexPattern(pattern);
    const regexFlags = validateRegexFlags(flags);
    const { page: pageNum, limit: pageLimit } = validatePagination({ page, limit });

    // Perform search
    const result = await searchService.regexSearch(regexPattern, regexFlags, pageNum, pageLimit);

    return apiResponse.sendSuccess(res, 'Regex pattern search results retrieved successfully', {
      pattern: regexPattern,
      flags: regexFlags,
      ...result,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

/**
 * GET /api/v1/search/fuzzy
 * Perform fuzzy search allowing word reordering and approximate matches.
 */
export const fuzzySearch = async (req, res, next) => {
  try {
    const { q, page, limit } = req.query;

    // Validate inputs
    const query = validateSearchQuery(q, 2); // Minimum 2 characters for fuzzy search
    const { page: pageNum, limit: pageLimit } = validatePagination({ page, limit });

    // Perform search
    const result = await searchService.fuzzySearch(query, pageNum, pageLimit);

    return apiResponse.sendSuccess(res, 'Fuzzy search results retrieved successfully', {
      searchType: 'fuzzy',
      query,
      ...result,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

/**
 * GET /api/v1/search/autocomplete
 * Get autocomplete suggestions based on a prefix.
 */
export const getAutocompleteSuggestions = async (req, res, next) => {
  try {
    const { prefix } = req.query;

    // Validate input
    const searchPrefix = validateSearchQuery(prefix, 1);

    // Get suggestions
    const suggestions = await searchService.getAutocompleteSuggestions(searchPrefix);

    return apiResponse.sendSuccess(res, 'Autocomplete suggestions retrieved successfully', {
      prefix: searchPrefix,
      suggestions,
      count: suggestions.length,
    });
  } catch (error) {
    return apiResponse.sendError(res, error.message, 400);
  }
};

export default {
  generalSearch,
  searchByTitle,
  searchByContent,
  searchByTags,
  searchByCategory,
  regexPatternSearch,
  fuzzySearch,
  getAutocompleteSuggestions,
};
