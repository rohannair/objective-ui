import 'isomorphic-fetch';

import { Schema, arrayOf, normalize } from 'normalizr';
import camelCase from 'lodash/camelCase';
import omit from 'lodash/omit';

const API_ROOT = 'http://localhost:8080/api/v1/';

function callApi(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1)
  ? API_ROOT + endpoint
  : endpoint;

  return fetch(fullUrl)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function postApi(endpoint, body) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1)
  ? API_ROOT + endpoint
  : endpoint;

  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
  .catch(err => console.error(err));
}

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
