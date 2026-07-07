import axios from 'axios';

/**
 * Pre-configured Axios instance for all CAIA API requests.
 *
 * Features:
 *  - Base URL from VITE_API_BASE_URL environment variable
 *  - Automatic Authorization header injection from localStorage
 *  - Centralized 401 token-expiry handling (logs out user)
 *  - Request/response logging in development mode
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15-second request timeout
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('caia_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Token expired or invalid — force logout
    if (status === 401) {
      const code = error.response?.data?.code;
      if (code === 'TOKEN_EXPIRED' || code === 'TOKEN_INVALID') {
        localStorage.removeItem('caia_token');
        localStorage.removeItem('caia_refresh_token');
        // Redirect to login (router integration added in auth PR)
        window.location.href = '/login';
      }
    }

    if (import.meta.env.DEV) {
      console.error('[API Error]', error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
