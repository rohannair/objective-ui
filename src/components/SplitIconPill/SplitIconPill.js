import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Pill from '../Pill'

const SplitIconPill = p => (
  <div className='spliticonpill'>
    <Pill
      { ...p }
      transparent
      onClick={
        p.iconAction
        ? p.iconAction
        : p.action
      }>
      <i className={`zmdi zmdi-${p.icon}`}/>
    </Pill>
    <Pill {...p} onClick={p.action}>{ p.children }</Pill>
  </div>
)

export default SplitIconPill
