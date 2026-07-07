import { configureStore } from '@reduxjs/toolkit';

/**
 * Central Redux store.
 * Feature slices will be added here in subsequent PRs.
 *
 * Example (PR-2+):
 *   import conceptsReducer from '../features/concepts/conceptsSlice';
 *   reducer: { concepts: conceptsReducer }
 */
export const store = configureStore({
  reducer: {
    // Feature reducers will be registered here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Allow non-serializable values in development (e.g. Date objects in payloads)
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: import.meta.env.DEV,
});

/** @type {ReturnType<typeof store.getState>} */
export const RootState = store.getState;

/** @type {typeof store.dispatch} */
export const AppDispatch = store.dispatch;
