import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/couterSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});