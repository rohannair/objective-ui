import React, { PropTypes } from 'react'
import styles from './Forms.css'

import Autocomplete from 'react-toolbox/lib/autocomplete'

const AutocompleteDropDown = (props) => {
  return (
    <Autocomplete
      direction="down"
      selectedPosition="above"
      multiple={false}
      label={props.label}
      onChange={props.onChange}
      onQueryChange={props.onQueryChange}
      source={props.source}
      value={props.value}
    />
  )
}

AutocompleteDropDown.propTypes = {
  onQueryChange: PropTypes.func,
  source: PropTypes.object,
}

AutocompleteDropDown.defaultProps = {
  onQueryChange: (e) => console.info('selected value changed'),
  source: {}
}

export default AutocompleteDropDown
