import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';

import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

// 🔹 Custom Storage Implementation
const customStorage = {
  getItem: (key) => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? Promise.resolve(value) : Promise.resolve(null);
    } catch (error) {
      console.error('Storage getItem error:', error);
      return Promise.reject(error);
    }
  },
  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
      return Promise.resolve();
    } catch (error) {
      console.error('Storage setItem error:', error);
      return Promise.reject(error);
    }
  },
  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
      return Promise.resolve();
    } catch (error) {
      console.error('Storage removeItem error:', error);
      return Promise.reject(error);
    }
  },
};

// 🔹 Logger
const logger = createLogger({
  collapsed: true,
});

// 🔹 Persist config
const persistConfig = {
  key: 'root',
  storage: customStorage,
  whitelist: ['employees', 'auth', 'ui'],
};

// 🔹 Combine reducers
const rootReducer = combineReducers({
  employees: employeeReducer,
  auth: authReducer,
  ui: uiReducer,
});

// 🔹 Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(logger),
  devTools: true,
});

// 🔹 Persistor
export const persistor = persistStore(store);
