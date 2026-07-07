/**
 * Custom in-memory rate limiter middleware.
 * Tracks request counts per IP using a Map with automatic GC cleanup.
 * No external dependency required (pure Node.js).
 */

// Sliding window store: Map<ip, { count, windowStart }>
const ipStore = new Map();

/**
 * Factory that returns a configured rate-limiter middleware.
 * @param {object} options
 * @param {number} options.windowMs  - Time window in milliseconds (default: 15 min)
 * @param {number} options.max       - Max requests per window (default: 100)
 * @param {string} options.message   - Error message when limit exceeded
 */
export const createRateLimiter = ({
  windowMs = 15 * 60 * 1000,
  max = 100,
  message = 'Too many requests. Please try again later.',
} = {}) => {
  // Periodic GC: remove expired entries every windowMs to prevent memory leaks
  const gcInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      if (now - record.windowStart >= windowMs) {
        ipStore.delete(ip);
      }
    }
  }, windowMs);

  // Prevent the GC timer from blocking Node.js process exit
  if (gcInterval.unref) gcInterval.unref();

  return (req, res, next) => {
    // Respect X-Forwarded-For if behind a reverse proxy
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    const record = ipStore.get(ip);

    if (!record || now - record.windowStart >= windowMs) {
      // New window: reset counter
      ipStore.set(ip, { count: 1, windowStart: now });
      return next();
    }

    record.count += 1;

    if (record.count > max) {
      const retryAfter = Math.ceil((record.windowStart + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        success: false,
        message,
        retryAfter,
      });
    }

    next();
  };
};

/** Pre-built limiter for general API routes (100 req / 15 min) */
export const generalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please slow down.',
});

/** Strict limiter for auth routes (10 req / 15 min) */
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many authentication attempts. Please try again later.',
});
