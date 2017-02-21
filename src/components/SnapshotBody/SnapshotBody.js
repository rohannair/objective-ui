import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Draft from 'draft-js-plugins-editor'
import { EditorState, ContentState, convertFromRaw, CompositeDecorator, convertFromHTML, ContentBlock } from 'draft-js'
import createLinkifyPlugin from 'draft-js-linkify-plugin'

const SnapshotBody = p => {
  const { img, body, className, bodyJson } = p

  const _body = () => {
    if (bodyJson) {
      const linkifyPlugin = createLinkifyPlugin({ target: '_blank'})
      const decorator = new CompositeDecorator(linkifyPlugin.decorators)
      const contentState = convertFromRaw(JSON.parse(bodyJson))
      const editorState = EditorState.createWithContent(contentState, decorator)

      return (
        <div className='body'>
          <Draft readOnly editorState={editorState} onChange={() => {}}/>
        </div>
      )
    }
    return (
      body && <div className="body" dangerouslySetInnerHTML={{ __html: body }}/>
    )
  }

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
      { _body() }
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
    word-wrap: break-word;
  }
`
