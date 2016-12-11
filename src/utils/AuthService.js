import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

// TODO: figure out what the proper url should be here
const REDIRECT_URL = 'http://localhost:8080/auth/login';

const AuthService = (clientId, domain, onAuthenticate) => {
  const COOKIE_KEY = 'qm.tid';
  const lock = new Auth0Lock(clientId, domain, {
    auth: {
      redirectUrl: REDIRECT_URL,
      responseType: 'token',
      params: {
        scope: 'openid email companyId role user_id'
      }
    }
  });

  lock.on('authenticated', result => {
    setToken(result.idToken);
  });

  const getToken = () => localStorage.getItem(COOKIE_KEY);
  const setToken = idToken => localStorage.setItem(COOKIE_KEY, idToken);

  return {
    login: () => lock.show(),
    loggedIn: () => !!getToken(),
    setToken,
    getToken,
    logout: () => localStorage.removeItem(COOKIE_KEY),
  };
};

export default AuthService;
