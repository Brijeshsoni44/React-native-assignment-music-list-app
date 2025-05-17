import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    clearCurrentSong: (state) => {
      state.currentSong = null;
    },
  },
});

export const { setCurrentSong, clearCurrentSong } = songsSlice.actions;
export default songsSlice.reducer;