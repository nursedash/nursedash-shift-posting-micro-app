import { counterReducer } from './counter/slice';
import { coreReducer } from './core/slice';
import { facilityReducer } from './facility/slice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  counter: counterReducer,
  core: coreReducer,
  facility: facilityReducer
});

export default rootReducer;
