import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

const REDIRECT_URL = `${document.location.origin}/auth/login`

const AuthService = (clientId, domain, onAuthenticate) => {
  const COOKIE_KEY = 'qm.tid'
  const signUpSuccessText = 'Thanks for signing up! We just sent you a verification email!'

  const lock = new Auth0Lock(clientId, domain, {
    auth: {
      redirectUrl: REDIRECT_URL,
      responseType: 'token',
      params: {
        scope: 'openid app_metadata role email'
      }
    },
    theme: {
      primaryColor: '#009ED9'
    },
    loginAfterSignUp: false,
    languageDictionary: {
      success: {
        signUp: signUpSuccessText
      }
    },
  })

  lock.on('authenticated', result => {
    setToken(result.idToken)
    browserHistory.replace('/')
  })

  lock.on('authorization_error', function(error) {
    lock.show({
      flashMessage: {
        type: 'error',
        text: error.error_description
      }
    })
  })

  const getToken = () => localStorage.getItem(COOKIE_KEY)
  const setToken = idToken => localStorage.setItem(COOKIE_KEY, idToken)

  return {
    login: () => lock.show(),
    loggedIn: () => !!getToken(),
    setToken,
    getToken,
    logout: () => {
      localStorage.removeItem(COOKIE_KEY)
      browserHistory.replace('/auth/login')
    },
  }
}

export default AuthService
