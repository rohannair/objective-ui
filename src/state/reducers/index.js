import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from './global.reducer';
import publishedKitReducer from './publishedKit.reducer';

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null
});

// Merge route into global application state
function routeReducer(state = routeInitialState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

// Create main reducer
export default function createReducer() {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    publishedKit: publishedKitReducer
  })
}
