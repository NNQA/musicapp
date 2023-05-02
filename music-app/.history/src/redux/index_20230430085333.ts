import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './audioPlayerSlice';

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
  },
});

export default store;
