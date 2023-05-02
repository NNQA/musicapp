import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './reducer';

const rootReducer = combineReducers({
  audioPlayer: audioPlayerReducer,
});
const store = createStore(rootReducer);
export default store;
