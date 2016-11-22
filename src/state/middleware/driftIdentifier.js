import { LOAD_USER_DETAILS } from '../constants/auth.constants';

const drift = window.drift ? window.drift : () => {};

const driftLogger = store => next => action => {
  if (action.type === LOAD_USER_DETAILS) {
    drift.identify(
      action.global.user,
      {
        email: action.global.email,
        companyId: action.global.companyId
      }
    );
  }
  return next(action);
}

export default driftLogger;
