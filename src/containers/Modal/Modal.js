import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'react-toolbox/lib/dialog'

export default connect(state => state.modal)(({
  title,
  action,
  modalComponent,
  dispatch
}) => {
  const close = () => dispatch({ type: 'CLOSE_MODAL' })
  const save = () => {
    action.event()
    close()
  }
  return (
    <Dialog
      active={!!modalComponent}
      onEscKeyDown={close}
      onOverlayClick={close}
      title={title}
      actions={[
        { label: 'Cancel', onClick: close },
        { label: action.label, onClick: save, primary: true }
      ]}
    >
      { modalComponent }
    </Dialog>
  )
})
