// Verify all security module imports resolve without errors
import './src/utils/jwt.js';
import './src/middlewares/rateLimiter.js';
import './src/middlewares/authMiddleware.js';
import './src/services/authService.js';
import './src/controllers/authController.js';
import './src/routes/authRoutes.js';
import './src/routes/adminRoutes.js';
import './src/app.js';

console.log('All security modules imported successfully.');
process.exit(0);
