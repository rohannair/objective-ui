import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import globalReducer from './global.reducer';
import missionReducer from './missions.reducer';

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
    mission: missionReducer,
    form: formReducer
  })
}
