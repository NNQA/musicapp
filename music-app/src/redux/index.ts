import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './reducer';

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
  },
});

export default store;
