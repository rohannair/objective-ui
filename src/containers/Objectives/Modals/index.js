import React, { Component, PropTypes } from 'react'
import ObjectiveChangeModal from './ObjectiveChangeModal'
import AddCollaboratorModal from './AddCollaboratorModal'

export { ObjectiveChangeModal, AddCollaboratorModal }
export const SetOwnerModal = () => (<p>It seems like this Objective was created without an owner. Would you like to set yourself as the owner?</p>)


export const ConfirmTaskDeleteModal = ({task}) => (
  <p>Are you sure you want to delete {task.title}?</p>
)
