/**
 * Service for search operations on Concept collection.
 * Handles text search, regex search, pagination, and various search scenarios.
 */

import Concept from '../models/Concept.js';
import {
  buildTextSearchFilter,
  buildRegexFilter,
  buildFieldSearch,
  buildFuzzySearchFilter,
  buildCategoryFilter,
  buildArchiveFilter,
  addArchiveExclusion,
  calculateSkip,
  buildSortObject,
  buildTextSearchPipeline,
  buildAutocompletePipeline,
} from '../utils/searchHelper.js';

/**
 * Performs a general search across title, content, and description using text index.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @param {string} sortBy - Sort by field (default: relevance)
 * @returns {Promise<object>} - Search results with pagination metadata
 */
export const generalSearch = async (query, page = 1, limit = 10, sortBy = 'relevance') => {
  try {
    const skip = calculateSkip(page, limit);

    // Use aggregation for text search with sorting by score
    const results = await Concept.aggregate(
      buildTextSearchPipeline(query, skip, limit)
    ).lean();

    // Get total count
    const totalCount = await Concept.countDocuments(
      addArchiveExclusion(buildTextSearchFilter(query))
    );

    return {
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    // Fallback to regex search if text index fails
    return regexSearchByTitle(query, page, limit);
  }
};

/**
 * Searches concepts by title using regex pattern matching.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const regexSearchByTitle = async (query, page = 1, limit = 10) => {
  try {
    const skip = calculateSkip(page, limit);
    const filter = addArchiveExclusion(buildFieldSearch('title', query, 'regex'));

    const results = await Concept.find(filter)
      .select('_id title description category tags views bookmarks createdAt')
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await Concept.countDocuments(filter);

    return {
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    throw new Error(`Title search failed: ${error.message}`);
  }
};

/**
 * Searches concepts by content using regex pattern matching.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const regexSearchByContent = async (query, page = 1, limit = 10) => {
  try {
    const skip = calculateSkip(page, limit);
    const filter = addArchiveExclusion(buildFieldSearch('content', query, 'regex'));

    const results = await Concept.find(filter)
      .select('_id title description content category tags views createdAt')
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await Concept.countDocuments(filter);

    return {
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    throw new Error(`Content search failed: ${error.message}`);
  }
};

/**
 * Searches concepts by tags using exact or partial matching.
 *
 * @param {string} tag - Tag to search
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const searchByTags = async (tag, page = 1, limit = 10) => {
  try {
    const skip = calculateSkip(page, limit);
    const filter = addArchiveExclusion({
      tags: buildRegexFilter(tag, 'i'),
    });

    const results = await Concept.find(filter)
      .select('_id title description tags category views bookmarks createdAt')
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await Concept.countDocuments(filter);

    return {
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    throw new Error(`Tag search failed: ${error.message}`);
  }
};

/**
 * Searches concepts by category.
 *
 * @param {string} category - Category name
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const searchByCategory = async (category, page = 1, limit = 10) => {
  try {
    const skip = calculateSkip(page, limit);
    const filter = addArchiveExclusion(buildCategoryFilter(category));

    const results = await Concept.find(filter)
      .select('_id title description category tags views bookmarks createdAt')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const totalCount = await Concept.countDocuments(filter);

    return {
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    throw new Error(`Category search failed: ${error.message}`);
  }
};

/**
 * Performs a regex-based search across title, content, and description.
 *
 * @param {string} pattern - Regex pattern
 * @param {string} flags - Regex flags (default: 'i')
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const regexSearch = async (pattern, flags = 'i', page = 1, limit = 10) => {
  try {
    const skip = calculateSkip(page, limit);
    const regexFilter = buildRegexFilter(pattern, flags);

    const filter = addArchiveExclusion({
      $or: [
        { title: regexFilter },
        { content: regexFilter },
        { description: regexFilter },
      ],
    });

    const results = await Concept.find(filter)
      .select('_id title description content category tags views createdAt')
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await Concept.countDocuments(filter);

    return {
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    throw new Error(`Regex search failed: ${error.message}`);
  }
};

/**
 * Performs a fuzzy search that allows word reordering and approximate matches.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<object>} - Search results with pagination
 */
export const fuzzySearch = async (query, page = 1, limit = 10) => {
  try {
    const skip = calculateSkip(page, limit);
    const filter = addArchiveExclusion(buildFuzzySearchFilter(query));

    const results = await Concept.find(filter)
      .select('_id title description category tags views bookmarks createdAt')
      .skip(skip)
      .limit(limit)
      .lean();

    const totalCount = await Concept.countDocuments(filter);

    return {
      results,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    throw new Error(`Fuzzy search failed: ${error.message}`);
  }
};

/**
 * Provides autocomplete suggestions based on a search prefix.
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
