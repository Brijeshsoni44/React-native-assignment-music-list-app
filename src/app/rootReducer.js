import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from '../features/songs/api/songsSlice';
import { songsApi } from '../features/songs/api/songsApi';

const rootReducer = combineReducers({
  songs: songsReducer,
  [songsApi.reducerPath]: songsApi.reducer,
});

export default rootReducer;