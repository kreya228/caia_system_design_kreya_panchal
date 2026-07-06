/**
 * Dynamic query filter and sort builder for Concept queries.
 */

/**
 * Builds a dynamic MongoDB query object based on the requested filter field
 * and optionally any secondary query parameters.
 *
 * @param {string} fieldName - Main field name to filter by (e.g. 'category', 'difficulty')
 * @param {string} filterValue - Main field value
 * @param {object} queryParams - All URL query parameters
 * @returns {object} - MongoDB query filter object
 */
export const buildDynamicFilter = (fieldName, filterValue, queryParams = {}) => {
  const filter = {
    isArchived: { $ne: true },
  };

  // 1. Add the primary filter from the route
  if (fieldName && filterValue) {
    const regexValue = new RegExp(`^${escapeRegex(filterValue.trim())}$`, 'i');
    if (fieldName === 'tags') {
      filter.tags = { $regex: regexValue };
    } else {
      filter[fieldName] = { $regex: regexValue };
    }
  }

  // 2. Add any secondary filters from standard query parameters
  const supportedFilters = ['category', 'difficulty', 'pattern', 'language', 'tags'];
  supportedFilters.forEach(field => {
    // Skip if this is the main field we already filtered on
    if (field === fieldName) return;

    const val = queryParams[field];
    if (val && typeof val === 'string' && val.trim()) {
      const regexValue = new RegExp(`^${escapeRegex(val.trim())}$`, 'i');
      if (field === 'tags') {
        filter.tags = { $regex: regexValue };
      } else {
        filter[field] = { $regex: regexValue };
      }
    }
  });

  return filter;
};

/**
 * Parses and constructs a MongoDB sort object from the sort query parameter.
 * Supports comma-separated list of sort conditions (e.g., '-views,createdAt').
 *
 * @param {string} sortQuery - Sort query parameter (e.g. '-views', 'bookmarks')
 * @returns {object} - MongoDB sort configuration
 */
export const buildSortObject = (sortQuery) => {
  if (!sortQuery || typeof sortQuery !== 'string') {
    return { createdAt: -1 }; // Default: newest first
  }

  const sort = {};
  const fields = sortQuery.split(',');

  fields.forEach(field => {
    let order = 1;
    let fieldName = field.trim();

    if (fieldName.startsWith('-')) {
      order = -1;
      fieldName = fieldName.substring(1).trim();
    } else if (fieldName.startsWith('+')) {
      fieldName = fieldName.substring(1).trim();
    }

    if (!fieldName) return;

    // Normalize field aliases
    if (fieldName === 'date') {
      fieldName = 'createdAt';
    }

    sort[fieldName] = order;
  });

  // Ensure there's a fallback sort key if parsing resulted in empty sort object
  if (Object.keys(sort).length === 0) {
    return { createdAt: -1 };
  }

  return sort;
};

/**
 * Escapes special characters for RegExp.
 *
 * @param {string} string - Input string
 * @returns {string} - Escaped string
 */
function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export default {
  buildDynamicFilter,
  buildSortObject,
};
