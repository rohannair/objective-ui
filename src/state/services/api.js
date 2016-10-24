import 'isomorphic-fetch';

import { Schema, arrayOf, normalize } from 'normalizr';
import camelCase from 'lodash/camelCase';
import omit from 'lodash/omit';
import Cookies from 'cookies-js';

const API_ROOT = '//localhost:8080/api/v1/';
const PUBLIC_ROOT = '//localhost:8080/api/public/';

///// Meta
const getHeaders = () => {
  const token = Cookies.get('qm.tid');
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : null
  };
}
const getUrl = endpoint => (endpoint.indexOf(API_ROOT) === -1)
  ? API_ROOT + endpoint
  : endpoint;


///// Base
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

////// Public
export const login = payload =>
  fetch(PUBLIC_ROOT + 'login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({...payload})
  })
  .then(response => response.json())
  .then(response => {
    Cookies.set('qm.tid', response.token,
      { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 1.95)) }
    );
    return omit(response, 'token');
  });

///// Apis
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
  callApi(`missions/new`);


