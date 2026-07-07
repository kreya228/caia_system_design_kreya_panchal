import Concept from '../models/Concept.js';
import {
  getTotalConceptsPipeline,
  getCategoryDistributionPipeline,
  getDifficultyStatsPipeline,
  getTopPatternsPipeline,
  getTopLanguagesPipeline,
  getTopViewsPipeline,
  getTopBookmarksPipeline,
  getTrendingAnalyticsPipeline,
} from '../utils/aggregationHelper.js';

/**
 * Get count of concepts: total, active, and archived.
 *
 * @returns {Promise<object>} Count breakdown details
 */
export const getTotalConcepts = async () => {
  try {
    const stats = await Concept.aggregate(getTotalConceptsPipeline());
    return stats[0] || { total: 0, active: 0, archived: 0 };
  } catch (error) {
    throw new Error(`Failed to calculate total concepts stats: ${error.message}`);
  }
};

/**
 * Get counts of active concepts grouped by category.
 *
 * @returns {Promise<Array<object>>} Concept counts per category
 */
export const getCategoryDistribution = async () => {
  try {
    return await Concept.aggregate(getCategoryDistributionPipeline());
  } catch (error) {
    throw new Error(`Failed to calculate category distribution: ${error.message}`);
  }
};

/**
 * Get difficulty levels stats (count, avg views, avg bookmarks).
 *
 * @returns {Promise<Array<object>>} Key metrics per difficulty level
 */
export const getDifficultyStats = async () => {
  try {
    return await Concept.aggregate(getDifficultyStatsPipeline());
  } catch (error) {
    throw new Error(`Failed to calculate difficulty statistics: ${error.message}`);
  }
};

/**
 * Get top patterns by concept count.
 *
 * @param {number} limit - Maximum results to retrieve
 * @returns {Promise<Array<object>>} Top design patterns list
 */
export const getTopPatterns = async (limit = 10) => {
  try {
    const cleanLimit = Math.max(1, parseInt(limit, 10) || 10);
    return await Concept.aggregate(getTopPatternsPipeline(cleanLimit));
  } catch (error) {
    throw new Error(`Failed to retrieve top design patterns: ${error.message}`);
  }
};

/**
 * Get top languages by concept count.
 *
 * @param {number} limit - Maximum results to retrieve
 * @returns {Promise<Array<object>>} Top programming languages list
 */
export const getTopLanguages = async (limit = 10) => {
  try {
    const cleanLimit = Math.max(1, parseInt(limit, 10) || 10);
    return await Concept.aggregate(getTopLanguagesPipeline(cleanLimit));
  } catch (error) {
    throw new Error(`Failed to retrieve top programming languages: ${error.message}`);
  }
};

/**
 * Get top concepts by views.
 *
 * @param {number} limit - Maximum results to retrieve
 * @returns {Promise<Array<object>>} Top viewed concepts list
 */
export const getTopViews = async (limit = 10) => {
  try {
    const cleanLimit = Math.max(1, parseInt(limit, 10) || 10);
    return await Concept.aggregate(getTopViewsPipeline(cleanLimit));
  } catch (error) {
    throw new Error(`Failed to retrieve top viewed concepts: ${error.message}`);
  }
};

/**
 * Get top concepts by bookmarks.
 *
 * @param {number} limit - Maximum results to retrieve
 * @returns {Promise<Array<object>>} Top bookmarked concepts list
 */
export const getTopBookmarks = async (limit = 10) => {
  try {
    const cleanLimit = Math.max(1, parseInt(limit, 10) || 10);
    return await Concept.aggregate(getTopBookmarksPipeline(cleanLimit));
  } catch (error) {
    throw new Error(`Failed to retrieve top bookmarked concepts: ${error.message}`);
  }
};

/**
 * Get trending concepts by views + (bookmarks * 3).
 *
 * @param {number} limit - Maximum results to retrieve
 * @returns {Promise<Array<object>>} Trending concepts list
 */
export const getTrendingAnalytics = async (limit = 10) => {
  try {
    const cleanLimit = Math.max(1, parseInt(limit, 10) || 10);
    return await Concept.aggregate(getTrendingAnalyticsPipeline(cleanLimit));
  } catch (error) {
    throw new Error(`Failed to retrieve trending concepts: ${error.message}`);
  }
};

export default {
  getTotalConcepts,
  getCategoryDistribution,
  getDifficultyStats,
  getTopPatterns,
  getTopLanguages,
  getTopViews,
  getTopBookmarks,
  getTrendingAnalytics,
};
