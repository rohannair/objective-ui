import { fromJS } from 'immutable';
import PUBLISHEDKIT from '../../../mocks/publishedKit';

const defaultState = fromJS(PUBLISHEDKIT);

export default (state = defaultState, action) => {
  return state;
}
