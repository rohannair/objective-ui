import {
  LOGIN,
  ACCEPT_INVITE
} from '../constants/auth.constants';

export const tryLogin = auth => ({
  type: LOGIN.ATTEMPT,
  payload: auth
});

export const tryAcceptInvite = auth => ({
  type: ACCEPT_INVITE.ATTEMPT,
  payload: auth
});

