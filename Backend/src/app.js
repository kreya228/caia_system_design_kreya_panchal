import express from 'express';
import apiRouter from './routes/index.js';
import categoryRouter, { subcategoryRouter, tagRouter, patternRouter } from './routes/categoryRoutes.js';
// Disable searchRouter since the required searchValidator.js file is missing in the workspace codebase
// import searchRouter from './routes/searchRoutes.js';
import filterRouter from './routes/filterRoutes.js';

const app = express();

// Enable standard parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom CORS middleware to avoid external packages
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Global API Prefix /api/v1 (mounts health checks and mongodb aggregation analytics)
app.use('/api/v1', apiRouter);

// Category & Taxonomy Routes
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subcategories', subcategoryRouter);
app.use('/api/v1/tags', tagRouter);
app.use('/api/v1/patterns', patternRouter);

// Search Routes (disabled due to missing searchValidator.js in codebase)
// app.use('/api/v1/search', searchRouter);

// Filter Routes
app.use('/api/v1/filter', filterRouter);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.method} ${req.originalUrl} on this server`,
  });
});

// Global Error-Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error Log] ${req.method} ${req.originalUrl} - ${statusCode} - ${err.stack}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
