import { Schema, arrayOf, normalize } from 'normalizr';
import camelCase from 'lodash/camelCase';
import 'isomorphic-fetch';

const API_ROOT = 'http://localhost:8080/api/v1/';

function callApi(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1)
  ? API_ROOT + endpoint
  : endpoint;

  return fetch(fullUrl)
    .then(response => response.json())
    .catch(err => console.error(err));
}

export const fetchMission = id => callApi(`missions/${id}`);
export const fetchMissionList = (limit, offset) => callApi(`missions?limit=${limit}&offset=${offset}`);
