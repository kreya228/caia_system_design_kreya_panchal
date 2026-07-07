/**
 * Service for search operations on Concept collection.
 * Handles text search, regex search, pagination, and various search scenarios.
 * Optimized with Promise.all concurrency, queryBuilder, and pagination reuse.
 */

import Concept from '../models/Concept.js';
import {
  buildTextSearchFilter,
  buildRegexFilter,
  buildFieldSearch,
  buildFuzzySearchFilter,
  buildCategoryFilter,
  addArchiveExclusion,
  buildTextSearchPipeline,
  buildAutocompletePipeline,
} from '../utils/searchHelper.js';
import { getPaginationParams, formatPaginatedResponse } from '../utils/pagination.js';

/**
 * Performs a general search across title, content, and description using text index.
 * Optimized: Executes aggregation and count queries concurrently using Promise.all.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @param {string} sortBy - Sort by field (default: relevance)
 * @returns {Promise<object>} - Search results with pagination metadata
 */
export const generalSearch = async (query, page = 1, limit = 10, sortBy = 'relevance') => {
  try {
    const { skip, limit: parsedLimit } = getPaginationParams({ page, limit });

    // Use aggregation for text search with sorting by score concurrently with count
    const [results, totalCount] = await Promise.all([
      Concept.aggregate(buildTextSearchPipeline(query, skip, parsedLimit)),
      Concept.countDocuments(addArchiveExclusion(buildTextSearchFilter(query))),
    ]);

    return formatPaginatedResponse(results, totalCount, page, parsedLimit);
  } catch (error) {
    // Fallback to regex search if text index fails
    return regexSearchByTitle(query, page, limit);
  }
};

/**
 * Searches concepts by title using regex pattern matching.
 * Optimized: Executes DB find and count queries concurrently using Promise.all.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const regexSearchByTitle = async (query, page = 1, limit = 10) => {
  try {
    const { skip, limit: parsedLimit } = getPaginationParams({ page, limit });
    const filter = addArchiveExclusion(buildFieldSearch('title', query, 'regex'));

    const [results, totalCount] = await Promise.all([
      Concept.find(filter)
        .select('_id title description category tags views bookmarks createdAt')
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Concept.countDocuments(filter),
    ]);

    return formatPaginatedResponse(results, totalCount, page, parsedLimit);
  } catch (error) {
    throw new Error(`Title search failed: ${error.message}`);
  }
};

/**
 * Searches concepts by content using regex pattern matching.
 * Optimized: Executes DB find and count queries concurrently using Promise.all.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const regexSearchByContent = async (query, page = 1, limit = 10) => {
  try {
    const { skip, limit: parsedLimit } = getPaginationParams({ page, limit });
    const filter = addArchiveExclusion(buildFieldSearch('content', query, 'regex'));

    const [results, totalCount] = await Promise.all([
      Concept.find(filter)
        .select('_id title description content category tags views createdAt')
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Concept.countDocuments(filter),
    ]);

    return formatPaginatedResponse(results, totalCount, page, parsedLimit);
  } catch (error) {
    throw new Error(`Content search failed: ${error.message}`);
  }
};

/**
 * Searches concepts by tags using exact or partial matching.
 * Optimized: Executes DB find and count queries concurrently using Promise.all.
 *
 * @param {string} tag - Tag to search
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const searchByTags = async (tag, page = 1, limit = 10) => {
  try {
    const { skip, limit: parsedLimit } = getPaginationParams({ page, limit });
    const filter = addArchiveExclusion({
      tags: buildRegexFilter(tag, 'i'),
    });

    const [results, totalCount] = await Promise.all([
      Concept.find(filter)
        .select('_id title description tags category views bookmarks createdAt')
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Concept.countDocuments(filter),
    ]);

    return formatPaginatedResponse(results, totalCount, page, parsedLimit);
  } catch (error) {
    throw new Error(`Tag search failed: ${error.message}`);
  }
};

/**
 * Searches concepts by category.
 * Optimized: Executes DB find and count queries concurrently using Promise.all.
 *
 * @param {string} category - Category name
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const searchByCategory = async (category, page = 1, limit = 10) => {
  try {
    const { skip, limit: parsedLimit } = getPaginationParams({ page, limit });
    const filter = addArchiveExclusion(buildCategoryFilter(category));

    const [results, totalCount] = await Promise.all([
      Concept.find(filter)
        .select('_id title description category tags views bookmarks createdAt')
        .skip(skip)
        .limit(parsedLimit)
        .sort({ createdAt: -1 })
        .lean(),
      Concept.countDocuments(filter),
    ]);

    return formatPaginatedResponse(results, totalCount, page, parsedLimit);
  } catch (error) {
    throw new Error(`Category search failed: ${error.message}`);
  }
};

/**
 * Performs a regex-based search across title, content, and description.
 * Optimized: Executes DB find and count queries concurrently using Promise.all.
 *
 * @param {string} pattern - Regex pattern
 * @param {string} flags - Regex flags (default: 'i')
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const regexSearch = async (pattern, flags = 'i', page = 1, limit = 10) => {
  try {
    const { skip, limit: parsedLimit } = getPaginationParams({ page, limit });
    const regexFilter = buildRegexFilter(pattern, flags);

    const filter = addArchiveExclusion({
      $or: [
        { title: regexFilter },
        { content: regexFilter },
        { description: regexFilter },
      ],
    });

    const [results, totalCount] = await Promise.all([
      Concept.find(filter)
        .select('_id title description content category tags views createdAt')
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Concept.countDocuments(filter),
    ]);

    return formatPaginatedResponse(results, totalCount, page, parsedLimit);
  } catch (error) {
    throw new Error(`Regex search failed: ${error.message}`);
  }
};

/**
 * Performs a fuzzy search that allows word reordering and approximate matches.
 * Optimized: Executes DB find and count queries concurrently using Promise.all.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const fuzzySearch = async (query, page = 1, limit = 10) => {
  try {
    const { skip, limit: parsedLimit } = getPaginationParams({ page, limit });
    const filter = addArchiveExclusion(buildFuzzySearchFilter(query));

    const [results, totalCount] = await Promise.all([
      Concept.find(filter)
        .select('_id title description category tags views bookmarks createdAt')
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Concept.countDocuments(filter),
    ]);

    return formatPaginatedResponse(results, totalCount, page, parsedLimit);
  } catch (error) {
    throw new Error(`Fuzzy search failed: ${error.message}`);
  }
};

/**
 * Provides autocomplete suggestions based on a search prefix.
 * Optimized: Executes aggregation pipeline and automatically returns lean arrays.
 *
 * @param {string} prefix - Search prefix for autocomplete
 * @returns {Promise<Array<object>>} - List of title suggestions
 */
export const getAutocompleteSuggestions = async (prefix) => {
  try {
    const suggestions = await Concept.aggregate(
      buildAutocompletePipeline(prefix)
    );

    return suggestions;
  } catch (error) {
    throw new Error(`Autocomplete failed: ${error.message}`);
  }
};

export default {
  generalSearch,
  regexSearchByTitle,
  regexSearchByContent,
  searchByTags,
  searchByCategory,
  regexSearch,
  fuzzySearch,
  getAutocompleteSuggestions,
};
