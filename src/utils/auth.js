import Cookies from 'cookies-js'
import decode from 'jwt-decode'

export const COOKIE_NAME = 'qm.tid'

export const getToken = () => localStorage.getItem(COOKIE_NAME)

export const getTokenExpirationDate = token => {
  const decoded = decode(token)
  if (!decoded.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)
  return date
}

export const isTokenExpired = token => {
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}

const hasToken = () => !!getToken()

export const requireAuth = (nextState, replace) => {
  if (!hasToken()) {
    replace({
      pathname: '/auth/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export const checkAuth = (nextState, replace) => {
  if (hasToken() && isTokenExpired(getToken())) {
    replace({
      pathname: '/'
    })
  }
}

export const clearToken = (nextState, replace) => {
  localStorage.removeItem(COOKIE_NAME)
  replace({
    pathname: '/auth/',
    state: { nextPathname: nextState.location.pathname }
  })
}

