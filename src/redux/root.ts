import { combineReducers } from 'redux';

import { deliveryReducer } from './reducers';

export const reducers = {
  delivery: deliveryReducer,
};

export const CombinedReducers = combineReducers(reducers);
export type RootReducerType = typeof CombinedReducers;
export const rootReducer: RootReducerType = (state, action) => {
  return CombinedReducers(state, action);
};
