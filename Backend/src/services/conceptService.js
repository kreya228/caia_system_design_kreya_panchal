import Concept from '../models/Concept.js';
import {
  excludeArchived,
  buildRelatedQuery,
  getTrendingPipeline,
} from '../utils/queryHelpers.js';

/**
 * Service to retrieve a random non-archived concept.
 *
 * @returns {Promise<object|null>} - A random concept document or null
 */
export const getRandomConcept = async () => {
  const results = await Concept.aggregate([
    { $match: { isArchived: { $ne: true } } },
    { $sample: { size: 1 } },
  ]);
  return results[0] || null;
};

/**
 * Service to retrieve the latest concepts sorted by creation time.
 * Optimized: Uses .lean() for faster queries.
 *
 * @param {number} limit - Maximum number of concepts to retrieve (default: 10)
 * @returns {Promise<Array<object>>} - List of concept documents
 */
export const getLatestConcepts = async (limit = 10) => {
  const maxLimit = Math.max(1, parseInt(limit, 10) || 10);
  return Concept.find(excludeArchived())
    .sort({ createdAt: -1 })
    .limit(maxLimit)
    .lean();
};

/**
 * Service to retrieve popular concepts sorted by views.
 * Optimized: Uses .lean() for faster queries.
 *
 * @param {number} limit - Maximum number of concepts to retrieve (default: 10)
 * @returns {Promise<Array<object>>} - List of concept documents
 */
export const getPopularConcepts = async (limit = 10) => {
  const maxLimit = Math.max(1, parseInt(limit, 10) || 10);
  return Concept.find(excludeArchived())
    .sort({ views: -1 })
    .limit(maxLimit)
    .lean();
};

/**
 * Service to retrieve trending concepts sorted by views and bookmarks score.
 * Formula: views + (bookmarks * 3)
 *
 * @param {number} limit - Maximum number of concepts to retrieve (default: 10)
 * @returns {Promise<Array<object>>} - List of computed trending concept documents
 */
export const getTrendingConcepts = async (limit = 10) => {
  const maxLimit = Math.max(1, parseInt(limit, 10) || 10);
  return Concept.aggregate(getTrendingPipeline(maxLimit));
};

/**
 * Service to retrieve the summary of a specific concept.
 * Bumps the view count of the concept atomically by 1.
 * Optimized: Uses .lean() for faster queries.
 *
 * @param {string} id - Concept ID
 * @returns {Promise<object|null>} - Selected concept metadata fields or null
 */
export const getConceptSummary = async (id) => {
  return Concept.findOneAndUpdate(
    excludeArchived({ _id: id }),
    { $inc: { views: 1 } },
    {
      new: true,
      projection: {
        title: 1,
        description: 1,
        summary: 1,
        category: 1,
        tags: 1,
        views: 1,
        bookmarks: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    }
  ).lean();
};

/**
 * Service to retrieve revision and lifecycle history for a concept.
 * Optimized: Uses .lean() for faster queries.
 *
 * @param {string} id - Concept ID
 * @returns {Promise<object|null>} - Object containing title and history logs or null
 */
export const getConceptHistory = async (id) => {
  return Concept.findById(id, { title: 1, history: 1 }).lean();
};

/**
 * Service to archive (soft-delete) a concept.
 * Sets isArchived: true, archivedAt: now, and logs action in history.
 * Optimized: Uses .lean() for faster queries.
 *
 * @param {string} id - Concept ID
 * @returns {Promise<object|null>} - The updated concept document or null
 */
export const archiveConcept = async (id) => {
  return Concept.findOneAndUpdate(
    { _id: id, isArchived: { $ne: true } },
    {
      $set: { isArchived: true, archivedAt: new Date() },
      $push: {
        history: {
          action: 'ARCHIVE',
          timestamp: new Date(),
          details: 'Concept soft-deleted/archived.',
          updatedBy: 'System',
        },
      },
    },
    { new: true }
  ).lean();
};

/**
 * Service to restore a soft-deleted concept.
 * Sets isArchived: false, archivedAt: null, and logs action in history.
 * Optimized: Uses .lean() for faster queries.
 *
 * @param {string} id - Concept ID
 * @returns {Promise<object|null>} - The updated concept document or null
 */
export const restoreConcept = async (id) => {
  return Concept.findOneAndUpdate(
    { _id: id, isArchived: true },
    {
      $set: { isArchived: false, archivedAt: null },
      $push: {
        history: {
          action: 'RESTORE',
          timestamp: new Date(),
          details: 'Concept restored from archive.',
          updatedBy: 'System',
        },
      },
    },
    { new: true }
  ).lean();
};

/**
 * Service to retrieve related concepts based on shared category or matching tags.
 * Excludes the target concept itself and any archived items.
 * Optimized: Uses .lean() for faster queries.
 *
 * @param {string} id - Target concept ID to match against
 * @param {number} limit - Maximum concepts to retrieve (default: 5)
 * @returns {Promise<Array<object>>} - List of related concepts
 */
export const getRelatedConcepts = async (id, limit = 5) => {
  const concept = await Concept.findById(id).lean();
  if (!concept) {
    return null;
  }
  const maxLimit = Math.max(1, parseInt(limit, 10) || 5);
  const query = buildRelatedQuery(concept);
  return Concept.find(query).limit(maxLimit).lean();
};

export default {
  getRandomConcept,
  getLatestConcepts,
  getPopularConcepts,
  getTrendingConcepts,
  getConceptSummary,
  getConceptHistory,
  archiveConcept,
  restoreConcept,
  getRelatedConcepts,
};
