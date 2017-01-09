import Cookies from 'cookies-js'
export const COOKIE_NAME = 'qm.tid'

export const getToken = () => localStorage.getItem(COOKIE_NAME)

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
  if (hasToken()) {
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
