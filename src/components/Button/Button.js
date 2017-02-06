import React, { PropTypes } from 'react'
import styled from 'styled-components'

import styles from './Button.css'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles)

const Button = p => {
  const className = cx({
    [styles.primary]: p.primary,
    [styles.secondary]: p.secondary,
    [styles.transparent]: p.transparent,
    [styles.sm]: p.size === 'sm',
    [styles.right]: p.right,
    [styles.link]: p.link || (!p.primary && !p.secondary),
    [styles.inline]: p.inline
  })

  return (
    <div className={className} onClick={p.onClick}>
      { p.children }
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
}

export default Button

export const StyledButton = styled.button`
  display: flex;
  overflow: hidden;
  position: relative;
  outline: none;
  justify-content: center;
  vertical-align: middle;
  white-space: nowrap;
  user-select: none;

  height: ${ props => props.small ? '27px' : '36px'};
  padding: ${ props => props.small ? '0 15px' : '0 20px'};
  border-radius: ${props => props.squared ? '12px' : '36px' };

  background-color: ${props => {
    if (props.primary) return '#009ed9'
    if (props.secondary) return '#011627'
    if (props.cancel) return '#fff'
    return 'transparent'
  }};

  border: none;
  color: ${props => props.cancel ? '#000' : '#fff' };
  cursor: pointer;
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  line-height: 1.125;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {

  }
`
