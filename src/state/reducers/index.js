import globalReducer from './global.reducer'
import squadListReducer from './squadList.reducer'
import userListReducer from './userList.reducer'
import userReducer from './user.reducer'

// Create main reducer
export default {
  global: globalReducer,
  squads: squadListReducer,
  user: userReducer,
  users: userListReducer
}
