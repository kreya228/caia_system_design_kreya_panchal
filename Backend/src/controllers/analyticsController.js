import analyticsService from '../services/analyticsService.js';
import apiResponse from '../utils/apiResponse.js';

/**
 * GET /api/v1/analytics/total-concepts
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getTotalConcepts = async (req, res, next) => {
  try {
    const data = await analyticsService.getTotalConcepts();
    return apiResponse.sendSuccess(res, 'Total concepts count retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/analytics/category-distribution
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getCategoryDistribution = async (req, res, next) => {
  try {
    const data = await analyticsService.getCategoryDistribution();
    return apiResponse.sendSuccess(res, 'Category distribution retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/analytics/difficulty-stats
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getDifficultyStats = async (req, res, next) => {
  try {
    const data = await analyticsService.getDifficultyStats();
    return apiResponse.sendSuccess(res, 'Difficulty statistics retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/analytics/patterns/top
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getTopPatterns = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    if (isNaN(limit) || limit <= 0) {
      return apiResponse.sendError(res, 'Limit query parameter must be a positive integer', 400);
    }
    const data = await analyticsService.getTopPatterns(limit);
    return apiResponse.sendSuccess(res, 'Top design patterns retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/analytics/languages/top
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getTopLanguages = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    if (isNaN(limit) || limit <= 0) {
      return apiResponse.sendError(res, 'Limit query parameter must be a positive integer', 400);
    }
    const data = await analyticsService.getTopLanguages(limit);
    return apiResponse.sendSuccess(res, 'Top programming languages retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/analytics/views/top
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getTopViews = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    if (isNaN(limit) || limit <= 0) {
      return apiResponse.sendError(res, 'Limit query parameter must be a positive integer', 400);
    }
    const data = await analyticsService.getTopViews(limit);
    return apiResponse.sendSuccess(res, 'Top viewed concepts retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/analytics/bookmarks/top
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getTopBookmarks = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    if (isNaN(limit) || limit <= 0) {
      return apiResponse.sendError(res, 'Limit query parameter must be a positive integer', 400);
    }
    const data = await analyticsService.getTopBookmarks(limit);
    return apiResponse.sendSuccess(res, 'Top bookmarked concepts retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/analytics/trending
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getTrending = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    if (isNaN(limit) || limit <= 0) {
      return apiResponse.sendError(res, 'Limit query parameter must be a positive integer', 400);
    }
    const data = await analyticsService.getTrendingAnalytics(limit);
    return apiResponse.sendSuccess(res, 'Trending concepts retrieved successfully', data);
  } catch (error) {
    next(error);
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
  getTrending,
};
