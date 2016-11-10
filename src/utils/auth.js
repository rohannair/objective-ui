import Cookies from 'cookies-js';
const QUARTERMASTER_COOKIE = 'qm.tid';

const hasToken = (store) => {
  // TODO: Verify that this actually should work this way
  if (Cookies.get(QUARTERMASTER_COOKIE)) {
    return true;
  }
  return false;
};

const requireAuth = (nextState, replace) => {
  if (!hasToken()) {
    replace({
      pathname: '/auth',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

const checkAuth = (nextState, replace) => {
  if (hasToken()) {
    replace({
      pathname: '/'
    });
  }
};

const clearToken = (nextState, replace) => {
  Cookies.expire(QUARTERMASTER_COOKIE);
  replace({
    pathname: '/auth',
    state: { nextPathname: nextState.location.pathname }
  });
}

module.exports = {
  requireAuth,
  checkAuth,
  clearToken
};
