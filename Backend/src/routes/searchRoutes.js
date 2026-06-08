/**
 * Search routes for the Concept API.
 * Provides endpoints for various search operations.
 */

import express from 'express';
import {
  generalSearch,
  searchByTitle,
  searchByContent,
  searchByTags,
  searchByCategory,
  regexPatternSearch,
  fuzzySearch,
  getAutocompleteSuggestions,
} from '../controllers/searchController.js';

const router = express.Router();

/**
 * GET /api/v1/search
 * General search across all indexed fields (title, content, description).
 * Query parameters:
 *   q (required): Search query string
 *   page (optional): Page number (default: 1)
 *   limit (optional): Items per page (default: 10, max: 100)
 *   sort (optional): Sort by 'relevance', 'date', 'views', 'bookmarks' (default: relevance)
 */
router.get('/', generalSearch);

/**
 * GET /api/v1/search/title
 * Search concepts by title.
 * Query parameters:
 *   q (required): Title search query
 *   page (optional): Page number (default: 1)
 *   limit (optional): Items per page (default: 10, max: 100)
 */
router.get('/title', searchByTitle);

/**
 * GET /api/v1/search/content
 * Search concepts by content.
 * Query parameters:
 *   q (required): Content search query
 *   page (optional): Page number (default: 1)
 *   limit (optional): Items per page (default: 10, max: 100)
 */
router.get('/content', searchByContent);

/**
 * GET /api/v1/search/tags
 * Search concepts by tags.
 * Query parameters:
 *   tag (required): Tag to search
 *   page (optional): Page number (default: 1)
 *   limit (optional): Items per page (default: 10, max: 100)
 */
router.get('/tags', searchByTags);

/**
 * GET /api/v1/search/category
 * Search concepts by category.
 * Query parameters:
 *   category (required): Category name
 *   page (optional): Page number (default: 1)
 *   limit (optional): Items per page (default: 10, max: 100)
 */
router.get('/category', searchByCategory);

/**
 * GET /api/v1/search/patterns
 * Search using regex patterns.
 * Query parameters:
 *   pattern (required): Regex pattern string
 *   flags (optional): Regex flags (i, g, m, s) (default: 'i')
 *   page (optional): Page number (default: 1)
 *   limit (optional): Items per page (default: 10, max: 100)
 */
router.get('/patterns', regexPatternSearch);

/**
 * GET /api/v1/search/fuzzy
 * Perform fuzzy search with word reordering.
 * Query parameters:
 *   q (required): Search query (minimum 2 characters)
 *   page (optional): Page number (default: 1)
 *   limit (optional): Items per page (default: 10, max: 100)
 */
router.get('/fuzzy', fuzzySearch);

/**
 * GET /api/v1/search/autocomplete
 * Get title autocomplete suggestions.
 * Query parameters:
 *   prefix (required): Search prefix for autocomplete
 */
router.get('/autocomplete', getAutocompleteSuggestions);

export default router;
