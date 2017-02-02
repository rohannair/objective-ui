import globalReducer from './global.reducer'
import squadListReducer from './squadList.reducer'
import userListReducer from './userList.reducer'
import userReducer from './user.reducer'
import modalReducer from './modal.reducer'

// Create main reducer

export default {
  global: globalReducer,
  modal: modalReducer,
  squads: squadListReducer,
  user: userReducer,
  users: userListReducer
}
