import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { songsApi } from '../features/songs/api/songsApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(songsApi.middleware),
});

export default store;

