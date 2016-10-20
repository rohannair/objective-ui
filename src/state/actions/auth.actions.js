import { LOGIN } from '../constants/auth.constants';

export const tryLogin = auth => ({
  type: LOGIN.ATTEMPT,
  payload: {
    ...auth
  }
});
