import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './reducer';

const rootReducer = combineReducers({
  audioPlayer: audioPlayerReducer,
  another: anotherReducer,
});

export default store;
