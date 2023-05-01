import { counterReducer } from './counter/slice';
import { coreReducer } from './core/slice';
import { facilityReducer } from './facility/slice';
import { shiftReducer } from './shift/slice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  counter: counterReducer,
  core: coreReducer,
  facility: facilityReducer,
  shift: shiftReducer
});

export default rootReducer;
