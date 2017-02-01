import globalReducer from './global.reducer'
import squadListReducer from './squadList.reducer'
import userListReducer from './userList.reducer'
import userReducer from './user.reducer'

// Create main reducer
export default {
  global: globalReducer,
  modal: (state = {}, action) => {
    switch (action.type) {
    case 'SHOW_MODAL':
      return {
        title: action.title,
        action: action.action,
        modalComponent: action.modalComponent
      }

    case 'CLOSE_MODAL':
      return {
        title: '',
        action: '',
        modalComponent: null
      }

    default:
      return {
        title: state.title || '',
        action: state.action || '',
        modalComponent: state.modalComponent || null
      }
    }
  },
  squads: squadListReducer,
  user: userReducer,
  users: userListReducer
}
