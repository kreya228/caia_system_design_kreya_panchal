import Concept from '../models/Concept.js';
import { buildDynamicFilter, buildSortObject } from '../utils/filterBuilder.js';
import { getPaginationParams, formatPaginatedResponse } from '../utils/pagination.js';

/**
 * Service to filter Concept documents dynamically.
 *
 * @param {object} params - Input filter parameters
 * @param {string} params.fieldName - The MongoDB field to filter by (e.g. 'category', 'difficulty')
 * @param {string} params.filterValue - The value to filter by
 * @param {object} params.queryParams - Query params for secondary filtering
 * @param {number} params.page - Sanitized page number
 * @param {number} params.limit - Sanitized items limit
 * @param {string} params.sort - Sanitized sort query string
 * @returns {Promise<object>} - Paginated result containing concepts lists and pagination metadata
 */
export const filterConcepts = async ({
  fieldName,
  filterValue,
  queryParams,
  page,
  limit,
  sort,
}) => {
  try {
    // 1. Build query filters (e.g. { category: /security/i, isArchived: { $ne: true } })
    const filter = buildDynamicFilter(fieldName, filterValue, queryParams);

    // 2. Build sorting criteria (e.g. { views: -1 })
    const sortObj = buildSortObject(sort);

    // 3. Get pagination offset parameters
    const { skip } = getPaginationParams({ page, limit });

    // 4. Query Mongoose database. Using .lean() to ensure arbitrary fields like
    // difficulty, pattern, language (which are not in schema.js) are parsed successfully.
    const results = await Concept.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // 5. Query total matched count for pagination metadata
    const totalCount = await Concept.countDocuments(filter);

    // 6. Format standard paginated response payload
    return formatPaginatedResponse(results, totalCount, page, limit);
  } catch (error) {
    throw new Error(`Database filter query failed: ${error.message}`);
  }
};

export default {
  filterConcepts,
};
