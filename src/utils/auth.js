import Cookies from 'cookies-js';
export const COOKIE_NAME = 'qm.tid';

const hasToken = (store) => {
  // TODO: Verify that this actually should work this way
  if (Cookies.get(COOKIE_NAME)) {
    return true;
  }
  return false;
};

export const requireAuth = (nextState, replace) => {
  if (!hasToken()) {
    replace({
      pathname: '/auth/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

export const checkAuth = (nextState, replace) => {
  if (hasToken()) {
    replace({
      pathname: '/'
    });
  }
};

export const clearToken = (nextState, replace) => {
  Cookies.expire(COOKIE_NAME);
  replace({
    pathname: '/auth/',
    state: { nextPathname: nextState.location.pathname }
  });
};
