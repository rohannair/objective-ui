const ATTEMPT = 'ATTEMPT';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

const createActions = base =>
  [ATTEMPT, SUCCESS, ERROR]
    .reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc
  }, {});

// Mission fields
export const UPDATE_FIELD = createActions('app/UPDATE_FIELD');
export const ADD_FIELD = createActions('app/ADD_FIELD');

// Mission whole
export const GET_MISSION = createActions('app/GET_MISSION');
export const GET_MISSION_LIST = createActions('app/GET_MISSION_LIST');
