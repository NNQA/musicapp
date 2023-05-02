import { combineReducers, configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './reducer';

const rootReducer = combineReducers({
  audioPlayer: audioPlayerReducer,
  another: anotherReducer,
});
const store = createStore(rootReducer);
export default store;
