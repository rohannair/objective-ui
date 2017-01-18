import React, { PropTypes } from 'react'
import styled from 'styled-components'

const SnapshotBody = p => {
  const { img, body, className } = p

  return (
    <div className={className}>
      {
        img && (
          <div className="imgContainer">
            <a href={img} target="_blank" rel="noopener">
              <img src={img} />
            </a>
          </div>
        )
      }
      { body && <div className="body" dangerouslySetInnerHTML={{ __html: body} }/>}
    </div>
  )
}

export default styled(SnapshotBody)`
  padding: 20px 0;
  .imgContainer {
    object-fit: cover;
    margin-bottom: 10px;
    overflow: hidden;
  }

  img {
    height: 260px;
    width: 100%;
    object-fit: cover;
  }

  .body {
    padding: 0 20px;
  }
`
