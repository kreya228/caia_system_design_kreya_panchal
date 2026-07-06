import express from 'express';
import {
  filterByCategory,
  filterByDifficulty,
  filterByPattern,
  filterByLanguage,
  filterByTags,
} from '../controllers/filterController.js';

const router = express.Router();

/**
 * GET /api/v1/filter/category
 * GET /api/v1/filter/difficulty
 * GET /api/v1/filter/pattern
 * GET /api/v1/filter/language
 * GET /api/v1/filter/tags
 */
router.get('/category', filterByCategory);
router.get('/difficulty', filterByDifficulty);
router.get('/pattern', filterByPattern);
router.get('/language', filterByLanguage);
router.get('/tags', filterByTags);

export default router;
