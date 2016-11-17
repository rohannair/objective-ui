import 'isomorphic-fetch';

import axios from 'axios';

import camelCase from 'lodash/camelCase';
import omit from 'lodash/omit';
import Cookies from 'cookies-js';

const API_ROOT = '/api/v1/';
const PUBLIC_ROOT = '/api/public/';
let token = Cookies.get('qm.tid');

// /// Meta
const getHeaders = () => {
  let token = token || Cookies.get('qm.tid');
  return {
    'Accept': 'application/json',
    'content-type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : null
  };
};

const getUrl = endpoint => (endpoint.indexOf(API_ROOT) === -1)
  ? API_ROOT + endpoint
  : endpoint;

// /// Base
const apiRequest = axios.create({
  baseUrl: API_ROOT
});

const publicRequest = axios.create({
  baseUrl: PUBLIC_ROOT
});

const handleError = (e) => {
  if (e.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.error(e.response.data);
    console.error(e.response.status);
    console.error(e.response.headers);
  } else {
    console.error('Error', e.message);
  }
  console.error(e.config);
};

const callApi = (endpoint) =>
  fetch(getUrl(endpoint), {
    headers: getHeaders(),
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .catch(err => console.error(err));

const postApi = (endpoint, body) =>
  fetch(getUrl(endpoint), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .catch(err => console.error(err));

// //// Public
export const login = payload =>
  fetch(PUBLIC_ROOT + 'login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(response => {
    Cookies.set('qm.tid', response.token,
      { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 1.95)) }
    );
    return omit(response, 'token');
  });

export const acceptInvite = payload =>
  fetch(PUBLIC_ROOT + 'finishinvite', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(response => {
    Cookies.set('qm.tid', response.token,
      { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 1.95)) }
    );
    return omit(response, 'token');
  });

// /// Apis
export const fetchMission = id =>
  callApi(`missions/${id}`);

export const fetchMissionList = (limit, offset) =>
  callApi(`missions?limit=${limit}&offset=${offset}`);

export const updateMissionField = (payload) => {
  const { id, field, data } = payload;

  const url = data.id
    ? `missions/${id}/${field[0]}/${data.id}`
    : `missions/${id}?field=${field[0]}`; // If a regular field

return postApi(url, omit(data, ['id']));
};

export const addMissionField = (payload) =>
  callApi(`missions/${payload.id}/${payload.field[0]}/add`);

export const newMission = () =>
  callApi('missions/new');

// / ******** CURRENT ******** ///
// / Users
export const fetchUserList = (limit, offset, sort, order) =>
  callApi(`users?limit=${limit}&offset=${offset}`);

export const fetchUser = (id) =>
  callApi(`user/${id}`);

export const editUser = (payload) =>
  postApi(`user/${payload.id}`, payload);

export const editUserPassword = (payload) =>
  postApi(`user/${payload.id}`, payload);

export const inviteUser = payload =>
  postApi('user/invite', payload);

export const searchUsers = payload =>
  callApi(`users/search?q=${payload.query}`);

export const assignUserToSquad = payload =>
  postApi('squads/assign', payload);

export const createUserOKR = payload =>
  postApi(`user/${payload.userId}/objective`, payload);

  // / Squads
export const fetchSquadList = () =>
  callApi('squads');

export const createSquadMission = payload =>
  postApi('objectives/add', payload);

export const editSquadObjective = payload =>
  postApi(`objectives/${payload.squadId}/edit`, payload);

export const createSquad = payload =>
  postApi('squads', payload);

export const createCheckIn = payload =>
postApi(`objectives/${payload.objectiveId}/check_in`, payload);
