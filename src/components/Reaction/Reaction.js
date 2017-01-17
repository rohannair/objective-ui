import React, { PropTypes } from 'react'
import gql from 'graphql-tag'

import styled from 'styled-components'

const Reaction = styled(({ isLiked, onClick, className, readOnly }) => (
  <div onClick={onClick} className={className}>
    <i className="zmdi zmdi-thumb-up"></i>
  </div>
))`
  color: ${props => {
    if (props.isLiked) return '#fff'
    return '#ddd'
  }};
  background-color: ${props => {
    if (props.isLiked) return '#f36'
    return 'transparent'
  }}
  border: ${props => {
    if (props.isLiked) return '1px solid #f36'
    return '1px solid #ddd;'
  }};

  cursor: ${props => {
    if (props.readOnly) return 'initial'
    return 'pointer'
  }};

  border-radius: 3px;
  padding: 2px 5px;
  margin-left: auto;
  margin-right: 5px;
  font-size: 0.75em;

  transition: all 0.25s ease-in-out;

  &:hover {
    color: ${props => {
      if (props.readOnly) return
      if (props.isLiked) return '#fff'
      return '#f36'
    }};
    border-color: ${props => {
      if (props.readOnly) return
      return '#f36'
    }};
  }
`

Reaction.fragments = {
  reaction: gql`
    fragment ReactionBoxFragment on Reaction {
      name
      user {
        id
      }
    }
  `
}

export default Reaction
