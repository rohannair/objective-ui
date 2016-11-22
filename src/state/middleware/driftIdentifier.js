import { LOAD_USER_DETAILS } from '../constants/auth.constants';

const drift = window.drift ? window.drift : () => {};

const driftLogger = store => next => action => {
  if (action.type === LOAD_USER_DETAILS) {
    drift.identify(
      action.auth.user,
      {
        email: action.auth.email,
        companyId: action.auth.companyId
      }
    );
  }
  return next(action);
}

export default driftLogger;
