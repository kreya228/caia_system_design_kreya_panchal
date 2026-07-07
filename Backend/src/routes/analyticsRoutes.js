import express from 'express';
import {
  getTotalConcepts,
  getCategoryDistribution,
  getDifficultyStats,
  getTopPatterns,
  getTopLanguages,
  getTopViews,
  getTopBookmarks,
  getTrending,
} from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/total-concepts', getTotalConcepts);
router.get('/category-distribution', getCategoryDistribution);
router.get('/difficulty-stats', getDifficultyStats);
router.get('/patterns/top', getTopPatterns);
router.get('/languages/top', getTopLanguages);
router.get('/views/top', getTopViews);
router.get('/bookmarks/top', getTopBookmarks);
router.get('/trending', getTrending);

export default router;
