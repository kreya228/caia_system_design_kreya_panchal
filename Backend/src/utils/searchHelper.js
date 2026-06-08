/**
 * Helper utilities for search operations.
 */

/**
 * Builds a text search query for MongoDB text index.
 *
 * @param {string} query - Search query string
 * @returns {object} - MongoDB text search filter
 */
export const buildTextSearchFilter = (query) => {
  return {
    $text: { $search: query },
  };
};

/**
 * Builds a regex search query for case-insensitive pattern matching.
 *
 * @param {string} pattern - Search pattern
 * @param {string} flags - Regex flags (default: 'i' for case-insensitive)
 * @returns {object} - MongoDB regex filter
 */
export const buildRegexFilter = (pattern, flags = 'i') => {
  return {
    $regex: pattern,
    $options: flags,
  };
};

/**
 * Builds a field-specific search query.
 *
 * @param {string} field - Field to search in: title, content, tags
 * @param {string} query - Search query
 * @param {string} searchType - Type of search: text or regex (default: text)
 * @returns {object} - MongoDB filter for specific field
 */
export const buildFieldSearch = (field, query, searchType = 'text') => {
  const validFields = {
    title: 'title',
    content: 'content',
    tags: 'tags',
    category: 'category',
  };

  if (!validFields[field]) {
    throw new Error(`Invalid search field: ${field}`);
  }

  const targetField = validFields[field];

  if (searchType === 'regex') {
    return {
      [targetField]: buildRegexFilter(query),
    };
  }

  // For text search
  return {
    [targetField]: buildRegexFilter(query, 'i'),
  };
};

/**
 * Builds a fuzzy search query using regex for approximate matching.
 *
 * @param {string} query - Search query
 * @returns {object} - MongoDB filter for fuzzy search
 */
export const buildFuzzySearchFilter = (query) => {
  // Create a regex that matches any query word in any order with any characters between
  const words = query.trim().split(/\s+/);
  const patterns = words.map(word => `(?=.*${word})`).join('');
  const fuzzyPattern = patterns + '.*';

  return {
    $or: [
      { title: buildRegexFilter(fuzzyPattern, 'i') },
      { content: buildRegexFilter(fuzzyPattern, 'i') },
      { description: buildRegexFilter(fuzzyPattern, 'i') },
    ],
  };
};

/**
 * Builds a category filter.
 *
 * @param {string} category - Category name
 * @returns {object} - MongoDB filter for category
 */
export const buildCategoryFilter = (category) => {
  return {
    category: buildRegexFilter(`^${category}$`),
  };
};

/**
 * Builds an archive filter to exclude archived documents.
 *
 * @returns {object} - MongoDB filter
 */
export const buildArchiveFilter = () => {
  return {
    isArchived: { $ne: true },
  };
};

/**
 * Builds a combined filter with archive exclusion.
 *
 * @param {object} searchFilter - Main search filter
 * @returns {object} - Combined MongoDB filter
 */
export const addArchiveExclusion = (searchFilter) => {
  return {
    ...searchFilter,
    ...buildArchiveFilter(),
  };
};

/**
 * Calculates skip value for pagination.
 *
 * @param {number} page - Current page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {number} - Skip value for MongoDB query
 */
export const calculateSkip = (page, limit) => {
  return (page - 1) * limit;
};

/**
 * Builds a sort object for MongoDB query.
 *
 * @param {string} sortBy - Sort field: relevance, date, views, bookmarks
 * @returns {object} - MongoDB sort object
 */
export const buildSortObject = (sortBy = 'relevance') => {
  const sortMap = {
    relevance: { score: { $meta: 'textScore' } },
    date: { createdAt: -1 },
    views: { views: -1, createdAt: -1 },
    bookmarks: { bookmarks: -1, createdAt: -1 },
  };

  return sortMap[sortBy] || sortMap.relevance;
};

/**
 * Builds a text search aggregation pipeline with sorting by text score.
 *
 * @param {string} query - Text search query
 * @param {number} skip - Skip value for pagination
 * @param {number} limit - Limit value for pagination
 * @returns {Array<object>} - MongoDB aggregation pipeline
 */
export const buildTextSearchPipeline = (query, skip = 0, limit = 10) => {
  return [
    {
      $match: {
        $text: { $search: query },
        isArchived: { $ne: true },
      },
    },
    {
      $addFields: {
        score: { $meta: 'textScore' },
      },
    },
    {
      $sort: { score: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
};

/**
 * Builds an aggregation pipeline for autocomplete suggestions.
 *
 * @param {string} prefix - Search prefix for autocomplete
 * @returns {Array<object>} - MongoDB aggregation pipeline
 */
export const buildAutocompletePipeline = (prefix) => {
  return [
    {
      $match: {
        title: buildRegexFilter(`^${prefix}`, 'i'),
        isArchived: { $ne: true },
      },
    },
    {
      $group: {
        _id: '$title',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1, _id: 1 },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        suggestion: '$_id',
      },
    },
  ];
};

export default {
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
};
