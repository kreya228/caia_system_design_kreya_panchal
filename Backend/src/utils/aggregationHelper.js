/**
 * Reusable MongoDB aggregation pipeline builders for the Category & Taxonomy module.
 */

/**
 * Builds a pipeline to extract all unique tags from non-archived Concepts.
 * Unwinds the tags array, groups by tag name, and counts occurrences.
 * Results are sorted by descending count (most-used tags first).
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getUniqueTagsPipeline = () => [
  {
    $match: { isArchived: { $ne: true } },
  },
  {
    $unwind: { path: '$tags', preserveNullAndEmptyArrays: false },
  },
  {
    $group: {
      _id: '$tags',
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1, _id: 1 },
  },
  {
    $project: {
      _id: 0,
      tag: '$_id',
      count: 1,
    },
  },
];

/**
 * Builds a pipeline to extract a flat list of all subcategories across all Categories.
 * Each result item carries the subcategory name and the parent category name.
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getAllSubcategoriesPipeline = () => [
  {
    $match: { subcategories: { $exists: true, $not: { $size: 0 } } },
  },
  {
    $unwind: '$subcategories',
  },
  {
    $group: {
      _id: '$subcategories',
      parentCategories: { $addToSet: '$name' },
      count: { $sum: 1 },
    },
  },
  {
    $sort: { _id: 1 },
  },
  {
    $project: {
      _id: 0,
      subcategory: '$_id',
      parentCategories: 1,
      count: 1,
    },
  },
];

/**
 * Builds a pipeline to extract all design patterns from all Category documents.
 * Each result carries the pattern details alongside the parent category name.
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getAllPatternsPipeline = () => [
  {
    $match: { patterns: { $exists: true, $not: { $size: 0 } } },
  },
  {
    $unwind: '$patterns',
  },
  {
    $project: {
      _id: 0,
      category: '$name',
      patternId: '$patterns._id',
      name: '$patterns.name',
      description: '$patterns.description',
      useCases: '$patterns.useCases',
      keyFeatures: '$patterns.keyFeatures',
    },
  },
  {
    $sort: { category: 1, name: 1 },
  },
];

/**
 * Builds a pipeline to retrieve a single design pattern by name (case-insensitive).
 *
 * @param {string} patternName - The pattern name to search for
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getSinglePatternPipeline = (patternName) => [
  {
    $match: {
      'patterns.name': { $regex: new RegExp(`^${patternName}$`, 'i') },
    },
  },
  {
    $unwind: '$patterns',
  },
  {
    $match: {
      'patterns.name': { $regex: new RegExp(`^${patternName}$`, 'i') },
    },
  },
  {
    $project: {
      _id: 0,
      category: '$name',
      patternId: '$patterns._id',
      name: '$patterns.name',
      description: '$patterns.description',
      useCases: '$patterns.useCases',
      keyFeatures: '$patterns.keyFeatures',
    },
  },
  {
    $limit: 1,
  },
];

/**
 * Builds a pipeline to aggregate concepts for a given tag.
 * Returns concept list with projected fields for client consumption.
 *
 * @param {string} tag - The tag name to filter by
 * @returns {Array<object>} Aggregation pipeline stages for Concept collection
 */
export const getConceptsByTagPipeline = (tag) => [
  {
    $match: {
      isArchived: { $ne: true },
      tags: { $in: [tag] },
    },
  },
  {
    $project: {
      title: 1,
      description: 1,
      summary: 1,
      category: 1,
      tags: 1,
      views: 1,
      bookmarks: 1,
      createdAt: 1,
    },
  },
  {
    $sort: { views: -1 },
  },
];

/**
 * Builds a pipeline to get the counts of concepts: total, active, and archived.
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getTotalConceptsPipeline = () => [
  {
    $group: {
      _id: null,
      total: { $sum: 1 },
      active: { $sum: { $cond: [{ $ne: ['$isArchived', true] }, 1, 0] } },
      archived: { $sum: { $cond: [{ $eq: ['$isArchived', true] }, 1, 0] } },
    },
  },
  {
    $project: {
      _id: 0,
      total: 1,
      active: 1,
      archived: 1,
    },
  },
];

/**
 * Builds a pipeline to get counts of active concepts grouped by category.
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getCategoryDistributionPipeline = () => [
  {
    $match: { isArchived: { $ne: true } },
  },
  {
    $group: {
      _id: '$category',
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1, _id: 1 },
  },
  {
    $project: {
      _id: 0,
      category: '$_id',
      count: 1,
    },
  },
];

/**
 * Builds a pipeline to get difficulty levels statistics (concept count, avg views, avg bookmarks).
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getDifficultyStatsPipeline = () => [
  {
    $match: { isArchived: { $ne: true }, difficulty: { $exists: true, $ne: null } },
  },
  {
    $group: {
      _id: '$difficulty',
      count: { $sum: 1 },
      avgViews: { $avg: '$views' },
      avgBookmarks: { $avg: '$bookmarks' },
    },
  },
  {
    $sort: { count: -1, _id: 1 },
  },
  {
    $project: {
      _id: 0,
      difficulty: '$_id',
      count: 1,
      avgViews: { $round: [{ $ifNull: ['$avgViews', 0] }, 2] },
      avgBookmarks: { $round: [{ $ifNull: ['$avgBookmarks', 0] }, 2] },
    },
  },
];

/**
 * Builds a pipeline to get top patterns by concept count.
 *
 * @param {number} limit - Maximum results to return
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getTopPatternsPipeline = (limit = 10) => [
  {
    $match: { isArchived: { $ne: true }, pattern: { $exists: true, $ne: null } },
  },
  {
    $group: {
      _id: '$pattern',
      count: { $sum: 1 },
      totalViews: { $sum: '$views' },
      totalBookmarks: { $sum: '$bookmarks' },
    },
  },
  {
    $sort: { count: -1, _id: 1 },
  },
  {
    $limit: limit,
  },
  {
    $project: {
      _id: 0,
      pattern: '$_id',
      count: 1,
      totalViews: 1,
      totalBookmarks: 1,
    },
  },
];

/**
 * Builds a pipeline to get top languages by concept count.
 *
 * @param {number} limit - Maximum results to return
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getTopLanguagesPipeline = (limit = 10) => [
  {
    $match: { isArchived: { $ne: true }, language: { $exists: true, $ne: null } },
  },
  {
    $group: {
      _id: '$language',
      count: { $sum: 1 },
      totalViews: { $sum: '$views' },
      totalBookmarks: { $sum: '$bookmarks' },
    },
  },
  {
    $sort: { count: -1, _id: 1 },
  },
  {
    $limit: limit,
  },
  {
    $project: {
      _id: 0,
      language: '$_id',
      count: 1,
      totalViews: 1,
      totalBookmarks: 1,
    },
  },
];

/**
 * Builds a pipeline to retrieve top concepts by view count.
 *
 * @param {number} limit - Maximum results to return
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getTopViewsPipeline = (limit = 10) => [
  {
    $match: { isArchived: { $ne: true } },
  },
  {
    $sort: { views: -1, createdAt: -1 },
  },
  {
    $limit: limit,
  },
  {
    $project: {
      title: 1,
      category: 1,
      views: 1,
      bookmarks: 1,
      difficulty: 1,
      language: 1,
      pattern: 1,
    },
  },
];

/**
 * Builds a pipeline to retrieve top concepts by bookmark count.
 *
 * @param {number} limit - Maximum results to return
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getTopBookmarksPipeline = (limit = 10) => [
  {
    $match: { isArchived: { $ne: true } },
  },
  {
    $sort: { bookmarks: -1, createdAt: -1 },
  },
  {
    $limit: limit,
  },
  {
    $project: {
      title: 1,
      category: 1,
      views: 1,
      bookmarks: 1,
      difficulty: 1,
      language: 1,
      pattern: 1,
    },
  },
];

/**
 * Builds a pipeline to retrieve trending concepts based on views and bookmarks score.
 * Formula: views + (bookmarks * 3).
 *
 * @param {number} limit - Maximum results to return
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getTrendingAnalyticsPipeline = (limit = 10) => [
  {
    $match: { isArchived: { $ne: true } },
  },
  {
    $addFields: {
      trendingScore: {
        $add: [
          { $ifNull: ['$views', 0] },
          { $multiply: [{ $ifNull: ['$bookmarks', 0] }, 3] },
        ],
      },
    },
  },
  {
    $sort: { trendingScore: -1, createdAt: -1 },
  },
  {
    $limit: limit,
  },
  {
    $project: {
      title: 1,
      category: 1,
      views: 1,
      bookmarks: 1,
      trendingScore: 1,
      difficulty: 1,
      language: 1,
      pattern: 1,
    },
  },
];

export default {
  getUniqueTagsPipeline,
  getAllSubcategoriesPipeline,
  getAllPatternsPipeline,
  getSinglePatternPipeline,
  getConceptsByTagPipeline,
  getTotalConceptsPipeline,
  getCategoryDistributionPipeline,
  getDifficultyStatsPipeline,
  getTopPatternsPipeline,
  getTopLanguagesPipeline,
  getTopViewsPipeline,
  getTopBookmarksPipeline,
  getTrendingAnalyticsPipeline,
};
