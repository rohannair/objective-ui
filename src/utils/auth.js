import Cookies from 'cookies-js';

const hasToken = (store) => {
  // TODO: Verify that this actually should work this way
  if (Cookies.get('token')) {
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

module.exports = {
  requireAuth, checkAuth
};
