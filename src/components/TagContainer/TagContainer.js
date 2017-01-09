import React, { PropTypes, Component } from 'react'
import styles from './TagContainer.css'

import Tag from '../Tag'
import TextInput from '../Forms/TextInput'

class TagContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredValues: []
    }
  }

  render() {
    const dropdown = this.state.filteredValues.length > 0 && (
      <div className={styles.dropdown}>
        { this.state.filteredValues.map(v =>
          <div
            className={styles.item}
            key={v.value}
            onClick={this._selectOption.bind(this, v)}>
              {v.label}
          </div>
        )}
      </div>
    )

    if (Object.keys(this.props.value).length > 0) {
      return (
        <div className={styles.TagContainer}>
          <Tag onClick={this.props.onClear}>{ this.props.value.label }</Tag>
        </div>
      )
    }

    return (
      <div className={styles.TagContainer}>
        <input
          className={styles.input}
          type="text"
          onChange={this._filterResults}
          ref={(e) => {
            this.inputLabel = e
          }}
          placeholder={this.props.placeholder}
        />

        { dropdown }
      </div>
    )
  }

  _selectOption = (selected) => {
    this.setState({
      filteredValues: []
    })

    this.props.onChange(selected)
  }

  _clearSelected = () => {

  }

  _filterResults = (e) => {
    const { value } = e.target
    let filteredValues = []
    if (value.length > 0) {
      filteredValues = this.props.tagValues.filter(({label}) =>
        label.toLowerCase().indexOf(value.toLowerCase()) > -1)
    }

    this.setState({
      filteredValues
    })
  }
}

export default TagContainer
