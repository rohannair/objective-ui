import { fromJS } from 'immutable';

const defaultState = fromJS({
  user: null
});

export default (state = defaultState, action) => {
  return state;
}
