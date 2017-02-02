const modalDefaultState = {
  title: '',
  action: '',
  modalComponent: null
}

export default (state = modalDefaultState, action) => {
  switch (action.type) {
  case 'SHOW_MODAL':
    return {
      title: action.title,
      action: action.action,
      modalComponent: action.modalComponent
    }

  case 'CLOSE_MODAL':
    return modalDefaultState

  default:
    return state
  }
}
