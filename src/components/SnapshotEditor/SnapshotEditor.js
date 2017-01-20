import React, { Component } from 'react'
import styles from './SnapshotEditor.css'

import TextArea from '../Forms/TextArea'
import Editor from '../Editor'

import Button from '../Button'
import Checkbox from 'react-toolbox/lib/checkbox'
import IconButton from '../IconButton'
import Tag from '../Tag'
import TagContainer from '../TagContainer'
import Uploader from '../Uploader'

import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

class SnapshotEditor extends Component {
  constructor(props) {
    super(props)

    this.getDefaultState = () => ({
      blocker: false,
      body: '',
      objective: '',
      img: '',
      editorState: EditorState.createEmpty(),
    })

    this.state = {
      ...this.getDefaultState()
    }
  }

  render() {
    const tagValues = this.props.dropdownValues
      .map(v => ({
        value: v.id,
        label: v.name
      }))

    return (
      <div className={styles.SnapshotEditor}>
        <h4 className={styles.header}>Post New Snapshot</h4>
        <div className={styles.body}>
          {
            this.state.img && (
              <img
                src={`data:image/jpeg;base64,${this.state.img}`}
                className={styles.imgPreview}
              />
            )
          }
          <Editor
            placeholder="Snapshot Body"
            editorState={this.state.editorState}
            onChange={this._onEditorChange}
          />
        </div>
        <div className={styles.meta}>
          <TagContainer
            editable
            placeholder="Enter objective"
            tagValues={tagValues}
            value={ this.state.objective }
            onClear={this._clearStateProperty.bind(this, 'objective')}
            onChange={this._handleChange.bind(this, 'objective')}
          />
          <IconButton
            checked={this.state.blocker}
            icon="alert-circle-o"
            tooltip="Blocker"
            tooltipPosition="bottom"
            onClick={this._handleChange.bind(this, 'blocker')}
          />
          <Uploader
            submitImage={this._handleChange.bind(this, 'img')}
            imageExists={!!this.state.img}
            resizeOptions={{ height: 720, width: 1280, type: 'resize' }}
           >
            <i className={'zmdi zmdi-image'} />
           </Uploader>
          <div className={styles.buttonContainer}>
            <Button primary small
              onClick={this._onSubmit}>Post Snapshot</Button>
            </div>
          </div>
      </div>
    )
  }

  _clearState = () => {
    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''))

    this.setState({
      ...this.getDefaultState(),
      editorState
    })
  }

  _clearStateProperty = (property) => {
    this.setState(prev => ({
      ...prev.state,
      [property]: this.getDefaultState()[property]
    }))
  }
  _handleChange = (name, val) => this.setState({ [name]: val })
  _onEditorChange = (editorState) => this.setState({editorState})
  _onSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { editorState, objective, blocker, img } = this.state
    if (!(editorState.getCurrentContent().getBlockMap().reduce((acc, val) => acc + val.getText().trim().length, 0) > 5)) return

    const body = stateToHTML(editorState.getCurrentContent()).toString()
    this.props.submit(this._clearState, {
      objective: objective.value,
      blocker,
      body,
      img
    })
  }
};

export default SnapshotEditor
