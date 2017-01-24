import React, { PropTypes } from 'react'
import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;

  background-color: #012a4b;
  border-right: 1px solid #fff;
  color: #fff;
  padding: 40px 0 0;
  width: 200px;

  h3 {
    padding: 0 20px 20px;
    border-bottom: 1px dotted rgba(255, 255, 255, 0.4);
  }

  .item {
    cursor: pointer;
    font-size: 0.85em;
    padding: 10px 20px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`
