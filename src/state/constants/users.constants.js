import { createActions } from './utils';

export const GET_USER = createActions('app/GET_USER');
export const GET_USER_LIST = createActions('app/GET_USER_LIST');
export const SEARCH_USERS = createActions('app/SEARCH_USERS');

export const INVITE_USER = createActions('app/INVITE_USER');
export const EDIT_USER = createActions('app/EDIT_USER');

export const CLEAR_USER_MESSAGE = 'app/CLEAR_USER_MESSAGE';
